const API_BASE_URL = 'https://text-to-image-steganography.onrender.com';

export async function generateImage(prompt: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/generate-image/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  return data.imageUrl;
}

export async function encodeMessage(image: File, message: string): Promise<string> {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('message', message);

  const response = await fetch(`${API_BASE_URL}/encode/`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  return data.imageUrl;
}

export async function decodeMessage(image: File): Promise<string> {
  const formData = new FormData();
  formData.append('image', image);

  const response = await fetch(`${API_BASE_URL}/decode/`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  return data.message;
}