import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: "#050914" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 700px 500px at 70% 50%, rgba(59,130,246,0.06) 0%, transparent 70%), radial-gradient(ellipse 500px 400px at 30% 30%, rgba(168,85,247,0.04) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white">Conversing AI</span>
          </div>
          <p className="text-slate-400 text-sm">Create your dashboard account</p>
        </div>
        <SignUp />
      </div>
    </div>
  );
}
