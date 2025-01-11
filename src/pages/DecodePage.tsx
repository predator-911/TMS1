import React, { useState } from 'react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { decodeMessage } from '../lib/api';
import { FileSearch } from 'lucide-react';

export function DecodePage() {
  const [image, setImage] = useState<File | null>(null);
  const [decodedMessage, setDecodedMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleDecode(e: React.FormEvent) {
    e.preventDefault();
    if (!image) return;
    
    setError('');
    setIsLoading(true);

    try {
      const message = await decodeMessage(image);
      setDecodedMessage(message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to decode message');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container className="py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <FileSearch className="w-8 h-8 text-blue-500" />
          Reveal Hidden Messages
        </h1>

        <form onSubmit={handleDecode} className="space-y-6">
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

          <Button type="submit" isLoading={isLoading}>
            Decode Message
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </form>

        {decodedMessage && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Hidden Message</h2>
            <p className="text-gray-800 whitespace-pre-wrap">{decodedMessage}</p>
          </div>
        )}
      </div>
    </Container>
  );
}