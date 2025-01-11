import React, { useState } from 'react';
import { Container } from '../components/ui/Container';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { generateImage } from '../lib/api';
import { Wand2 } from 'lucide-react';

export function GeneratePage() {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const imageUrl = await generateImage(prompt);
      setGeneratedImage(imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate image');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container className="py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <Wand2 className="w-8 h-8 text-blue-500" />
          Create Stunning Images
        </h1>

        <form onSubmit={handleGenerate} className="space-y-6">
          <Input
            label="Image Description"
            placeholder="Enter a detailed description of the image you want to generate..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />
          <Button type="submit" isLoading={isLoading}>
            Generate Image
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </form>

        {generatedImage && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Generated Image</h2>
            <img
              src={generatedImage}
              alt="Generated"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    </Container>
  );
}