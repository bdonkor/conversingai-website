import os

# Define the corrupted patterns and their replacements using HTML entities for safety
replacements = {
    'â€”': '&mdash;',
    'â€“': '&ndash;',
    'â†’': '&rarr;',
    'â–¼': '&#9660;',
    'âœ“': '&#10003;',
    'â ±ï¸ ': '&#9201;', # Clock
    'â °': '&#9200;',    # Alarm Clock
    'ðŸŽ¨': '&#127912;', # Palette
    'ðŸ“ˆ': '&#128200;', # Chart
    'ðŸ †': '&#127942;', # Trophy
    'ðŸ› ï¸ ': '&#128736;', # Hammer & Wrench
    'ðŸ“ž': '&#128222;', # Phone
    'ðŸ’µ': '&#128181;', # Money
    'ðŸ˜Š': '&#128522;', # Smile
    'ðŸ”—': '&#128279;', # Link
    'ðŸŽ¯': '&#127919;', # Target
    'ðŸ’°': '&#128176;', # Money bag
    'ðŸš€': '&#128640;', # Rocket
}

def fix_file(filepath):
    print(f"Processing {filepath}...")
    try:
        # Read the file as bytes then decode
        with open(filepath, 'rb') as f:
            content_bytes = f.read()
            
        content = content_bytes.decode('utf-8', errors='ignore')
        
        original_content = content
        # Perform replacements
        for search, replace in replacements.items():
            content = content.replace(search, replace)
            
        if content != original_content:
            # Write back as UTF-8
            with open(filepath, 'w', encoding='utf-8', newline='') as f:
                f.write(content)
            print(f"  Fixed {filepath}")
        else:
            print(f"  No issues found in {filepath}")
            
    except Exception as e:
        print(f"  Error processing {filepath}: {e}")

if __name__ == "__main__":
    for filename in os.listdir('.'):
        if filename.endswith('.html'):
            fix_file(filename)
    print("Clean up complete.")
