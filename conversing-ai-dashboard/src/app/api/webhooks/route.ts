import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/webhooks
 * Receives call data from AI providers: Vapi, Retell, Twilio, Upfirst
 * Normalizes the payload and saves to Supabase
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const provider = req.headers.get("x-provider") ?? "unknown";
    const secret = req.headers.get("x-webhook-secret");

    // Verify webhook secret
    if (secret !== process.env.WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Normalize payload from different providers into our format
    const normalized = normalizePayload(provider, body);

    // TODO: Insert into Supabase
    // const { data, error } = await createSupabaseAdminClient()
    //   .from("calls")
    //   .insert(normalized);

    console.log(`[Webhook] Received from ${provider}:`, normalized);

    return NextResponse.json({ success: true, id: normalized.id });
  } catch (error) {
    console.error("[Webhook Error]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

function normalizePayload(provider: string, body: Record<string, unknown>) {
  switch (provider) {
    case "vapi":
      return {
        id: `call_${Date.now()}`,
        callerName: (body.caller as any)?.name ?? "Unknown Caller",
        phone: (body.caller as any)?.phoneNumber ?? "",
        duration: body.duration ?? 0,
        outcome: mapVapiOutcome(body.endedReason as string),
        sentiment: "neutral",
        transcript: body.messages ?? [],
        summary: body.summary ?? "",
        recordingUrl: body.recordingUrl ?? null,
        provider: "vapi",
        rawPayload: body,
      };

    case "retell":
      return {
        id: `call_${Date.now()}`,
        callerName: "Unknown Caller",
        phone: (body.from_number as string) ?? "",
        duration: body.duration_seconds ?? 0,
        outcome: "resolved",
        sentiment: (body.call_analysis as any)?.user_sentiment?.toLowerCase() ?? "neutral",
        transcript: body.transcript ?? [],
        summary: (body.call_analysis as any)?.call_summary ?? "",
        recordingUrl: body.recording_url ?? null,
        provider: "retell",
        rawPayload: body,
      };

    case "twilio":
      return {
        id: `call_${(body.CallSid as string) ?? Date.now()}`,
        callerName: "Unknown Caller",
        phone: (body.From as string) ?? "",
        duration: parseInt((body.CallDuration as string) ?? "0"),
        outcome: mapTwilioStatus(body.CallStatus as string),
        sentiment: "neutral",
        provider: "twilio",
        rawPayload: body,
      };

    default:
      return { id: `call_${Date.now()}`, ...body, provider };
  }
}

function mapVapiOutcome(reason: string): string {
  const map: Record<string, string> = {
    customer_ended_call: "resolved",
    assistant_ended_call: "resolved",
    voicemail: "voicemail",
    no_answer: "voicemail",
    busy: "callback_requested",
  };
  return map[reason] ?? "resolved";
}

function mapTwilioStatus(status: string): string {
  const map: Record<string, string> = {
    completed: "resolved",
    no_answer: "voicemail",
    busy: "callback_requested",
    failed: "voicemail",
  };
  return map[status] ?? "resolved";
}
