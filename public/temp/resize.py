from PIL import Image
import os

def resize_image(image_path, max_width=600):
    with Image.open(image_path) as img:
        width, height = img.size
        if width > max_width:
            # Calculate the new height to maintain the aspect ratio
            new_height = int(max_width * height / width)
            # Resize the image
            resized_img = img.resize((max_width, new_height), Image.ANTIALIAS)
            # Save the image with the same filename
            resized_img.save(image_path)
            print(f"Resized {image_path}")

def resize_images_in_directory(directory, max_width=600):
    for root, dirs, files in os.walk(directory):
        for filename in files:
            if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
                full_path = os.path.join(root, filename)
                resize_image(full_path, max_width)

# Replace 'your_directory_path' with the path to the directory containing your images
resize_images_in_directory('stones')
