import os
import requests

# Define logos and their domains
logos = {
    "kirloskar.png": "https://logo.clearbit.com/kirloskar.com",
    "chicagopneumatic.png": "https://logo.clearbit.com/cp.com",
    "elgi.png": "https://logo.clearbit.com/elgi.com",
    "ingersollrand.png": "https://logo.clearbit.com/ingersollrand.com",
    "atlascopco.png": "https://logo.clearbit.com/atlascopco.com"
}

save_dir = r"d:\leads\kask_website\assets"

if not os.path.exists(save_dir):
    os.makedirs(save_dir)

for filename, url in logos.items():
    file_path = os.path.join(save_dir, filename)
    try:
        print(f"Downloading {filename} from {url}...")
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            with open(file_path, 'wb') as f:
                f.write(response.content)
            print(f"Saved to {file_path}")
        else:
            print(f"Failed to download {filename}: Status {response.status_code}")
    except Exception as e:
        print(f"Error downloading {filename}: {e}")
