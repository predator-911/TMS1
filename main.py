import torch
from diffusers import StableDiffusionPipeline
from PIL import Image
import numpy as np
import os

def generate_image_from_text(prompt, output_path, model_path="stable_diffusion_model"):
    # Load Stable Diffusion Model
    if os.path.exists(model_path):
        print("Loading saved model...")
        pipe = StableDiffusionPipeline.from_pretrained(model_path)
    else:
        print("Downloading and saving Stable Diffusion model...")
        pipe = StableDiffusionPipeline.from_pretrained("runwayml/stable-diffusion-v1-5")
        pipe.save_pretrained(model_path)

    pipe.to("cuda" if torch.cuda.is_available() else "cpu")

    # Generate Image
    print("Generating image...")
    image = pipe(prompt, guidance_scale=7.5).images[0]

    # Save the generated image
    image.save(output_path)
    print(f"Image saved to {output_path}")
    return output_path

def encode_text_in_image(image_path, secret_text, output_path):
    # Validate secret text length
    image = Image.open(image_path)
    image = image.convert("RGB")
    pixels = np.array(image)
    max_capacity = pixels.size // 8  # Max text length in bytes
    if len(secret_text) + 1 > max_capacity:  # +1 for EOF marker
        raise ValueError(f"Secret text is too long. Maximum capacity is {max_capacity} characters.")

    # Convert secret text to binary with EOF marker
    binary_text = ''.join(format(ord(c), '08b') for c in secret_text) + '11111111'
    flat_pixels = pixels.flatten()

    # Encode binary text into pixel LSBs
    for i, bit in enumerate(binary_text):
        flat_pixels[i] = (flat_pixels[i] & ~1) | int(bit)

    # Reshape and save the modified image
    modified_pixels = flat_pixels.reshape(pixels.shape)
    stego_image = Image.fromarray(modified_pixels.astype('uint8'))
    stego_image.save(output_path)
    print(f"Stego-image saved to {output_path}")

def decode_text_from_image(image_path):
    # Open the stego image
    image = Image.open(image_path)
    image = image.convert("RGB")
    pixels = np.array(image).flatten()

    # Extract binary text from pixel LSBs
    binary_text = ''.join(str(pixel & 1) for pixel in pixels)

    # Decode binary text until EOF marker
    if '11111111' in binary_text:
        binary_text = binary_text.split('11111111')[0]  # Stop at EOF
        hidden_message = ''.join(
            chr(int(binary_text[i:i + 8], 2)) for i in range(0, len(binary_text), 8)
        )
        print("Decoded Message:", hidden_message)
        return hidden_message
    else:
        print("No hidden message found!")
        return None

if __name__ == "__main__":
    try:
        # Step 1: Text-to-Image Generation
        prompt = "A serene beach during sunset with palm trees."
        generated_image_path = "generated_image.png"
        generate_image_from_text(prompt, generated_image_path)

        # Step 2: Encode Secret Message
        secret_message = "This is a secret hidden message."
        stego_image_path = "stego_image.png"
        encode_text_in_image(generated_image_path, secret_message, stego_image_path)

        # Step 3: Decode Secret Message
        decoded_message = decode_text_from_image(stego_image_path)
        if decoded_message:
            print(f"Decoded Message: {decoded_message}")
    except Exception as e:
        print(f"Error: {e}")
