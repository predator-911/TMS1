from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
from diffusers import StableDiffusionPipeline
from PIL import Image
import numpy as np
import torch
import os
import uvicorn

app = FastAPI()

def generate_image_from_text(prompt, output_path, model_path="stable_diffusion_model"):
    if os.path.exists(model_path):
        print("Loading saved model...")
        pipe = StableDiffusionPipeline.from_pretrained(model_path)
    else:
        print("Downloading and saving Stable Diffusion model...")
        pipe = StableDiffusionPipeline.from_pretrained("runwayml/stable-diffusion-v1-5")
        pipe.save_pretrained(model_path)

    pipe.to("cuda" if torch.cuda.is_available() else "cpu")

    print("Generating image...")
    image = pipe(prompt, guidance_scale=7.5).images[0]

    image.save(output_path)
    print(f"Image saved to {output_path}")
    return output_path

def encode_text_in_image(image_path, secret_text, output_path):
    image = Image.open(image_path)
    image = image.convert("RGB")
    pixels = np.array(image)
    max_capacity = pixels.size // 8
    if len(secret_text) + 1 > max_capacity:
        raise ValueError(f"Secret text is too long. Maximum capacity is {max_capacity} characters.")

    binary_text = ''.join(format(ord(c), '08b') for c in secret_text) + '11111111'
    flat_pixels = pixels.flatten()

    for i, bit in enumerate(binary_text):
        flat_pixels[i] = (flat_pixels[i] & ~1) | int(bit)

    modified_pixels = flat_pixels.reshape(pixels.shape)
    stego_image = Image.fromarray(modified_pixels.astype('uint8'))
    stego_image.save(output_path)
    print(f"Stego-image saved to {output_path}")

def decode_text_from_image(image_path):
    image = Image.open(image_path)
    image = image.convert("RGB")
    pixels = np.array(image).flatten()

    binary_text = ''.join(str(pixel & 1) for pixel in pixels)

    if '11111111' in binary_text:
        binary_text = binary_text.split('11111111')[0]
        hidden_message = ''.join(
            chr(int(binary_text[i:i + 8], 2)) for i in range(0, len(binary_text), 8)
        )
        print("Decoded Message:", hidden_message)
        return hidden_message
    else:
        print("No hidden message found!")
        return None

@app.get("/")
async def home():
    return {"message": "Welcome to the Steganography App"}

@app.post("/generate-image/")
async def generate(prompt: str):
    output_path = "generated_image.png"
    generate_image_from_text(prompt, output_path)
    return FileResponse(output_path)

@app.post("/encode/")
async def encode(file: UploadFile = File(...), secret_text: str = ""):
    input_path = file.filename
    output_path = "stego_image.png"
    with open(input_path, "wb") as f:
        f.write(await file.read())
    encode_text_in_image(input_path, secret_text, output_path)
    return FileResponse(output_path)

@app.post("/decode/")
async def decode(file: UploadFile = File(...)):
    input_path = file.filename
    with open(input_path, "wb") as f:
        f.write(await file.read())
    decoded_message = decode_text_from_image(input_path)
    return {"decoded_message": decoded_message}

# To run the FastAPI app properly on Render
if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
