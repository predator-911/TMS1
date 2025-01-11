import React, { useState } from 'react';
import { Container } from '../components/ui/Container';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { encodeMessage } from '../lib/api';
import { FileKey } from 'lucide-react';

export function EncodePage() {
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [encodedImage, setEncodedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleEncode(e: React.FormEvent) {
    e.preventDefault();
    if (!image) return;
    
    setError('');
    setIsLoading(true);

    try {
      const imageUrl = await encodeMessage(image, message);
      setEncodedImage(imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to encode message');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container className="py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <FileKey className="w-8 h-8 text-blue-500" />
          Hide Messages in Images
        </h1>

        <form onSubmit={handleEncode} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
          </div>

          <Input
            label="Secret Message"
            placeholder="Enter the message you want to hide..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <Button type="submit" isLoading={isLoading}>
            Encode Message
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </form>

        {encodedImage && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Encoded Image</h2>
            <img
              src={encodedImage}
              alt="Encoded"
              className="w-full rounded-lg shadow-lg"
            />
            <Button
              variant="secondary"
              className="mt-4"
              onClick={() => {
                const link = document.createElement('a');
                link.href = encodedImage;
                link.download = 'encoded-image.png';
                link.click();
              }}
            >
              Download Image
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
}