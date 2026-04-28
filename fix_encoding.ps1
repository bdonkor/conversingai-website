$replacements = @{
    'â€”' = '&mdash;'
    'â€“' = '&ndash;'
    'â†’' = '&rarr;'
    'â–¼' = '&#9660;'
    'âœ“' = '&#10003;'
    'â ±ï¸ ' = '&#9201;' 
    'â °' = '&#9200;'    
    'ðŸŽ¨' = '&#127912;' 
    'ðŸ“ˆ' = '&#128200;' 
    'ðŸ †' = '&#127942;' 
    'ðŸ› ï¸ ' = '&#128736;' 
    'ðŸ“ž' = '&#128222;' 
    'ðŸ’µ' = '&#128181;' 
    'ðŸ˜Š' = '&#128522;' 
    'ðŸ”—' = '&#128279;' 
    'ðŸŽ¯' = '&#127919;' 
    'ðŸ’°' = '&#128176;' 
    'ðŸš€' = '&#128640;' 
}

$files = Get-ChildItem -Path "c:\Users\Benjamin\Desktop\ConversingAI-Website" -Filter "*.html"

foreach ($file in $files) {
    Write-Host "Processing $($file.FullName)..."
    try {
        $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
        
        $originalContent = $content
        foreach ($search in $replacements.Keys) {
            $replace = $replacements[$search]
            $content = $content.Replace($search, $replace)
        }
        
        if ($content -ne $originalContent) {
            Set-Content -Path $file.FullName -Value $content -Encoding UTF8
            Write-Host "  Fixed $($file.Name)"
        } else {
            Write-Host "  No issues found in $($file.Name)"
        }
    } catch {
        Write-Host "  Error processing $($file.Name): $_"
    }
}
Write-Host "Clean up complete."
