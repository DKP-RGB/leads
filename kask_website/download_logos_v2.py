import os
import requests

# Define logos and their URLs
logos = {
    "kirloskar.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Kirloskar_Group_Logo.svg/1200px-Kirloskar_Group_Logo.svg.png",
    "chicagopneumatic.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Chicago_Pneumatic_logo.svg/2560px-Chicago_Pneumatic_logo.svg.png",
    "elgi.png": "https://upload.wikimedia.org/wikipedia/commons/2/23/ELGi_Equipments_Logo_%282020%29.png",
    "ingersollrand.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Ingersoll_Rand_logo.svg/2560px-Ingersoll_Rand_logo.svg.png",
    "atlascopco.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Atlas_Copco_logo.svg/2560px-Atlas_Copco_logo.svg.png"
}

save_dir = r"d:\leads\kask_website\assets"

if not os.path.exists(save_dir):
    os.makedirs(save_dir)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Referer': 'https://www.google.com/'
}

for filename, url in logos.items():
    file_path = os.path.join(save_dir, filename)
    try:
        print(f"Downloading {filename}...")
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code == 200:
            with open(file_path, 'wb') as f:
                f.write(response.content)
            print(f"Saved to {file_path}")
        else:
            print(f"Failed to download {filename}: Status {response.status_code}")
    except Exception as e:
        print(f"Error downloading {filename}: {e}")
