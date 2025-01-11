import React from 'react';
import { Container } from '../components/ui/Container';
import { BookOpen, Image, FileKey, FileSearch } from 'lucide-react';

export function GuidePage() {
  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-blue-500" />
          User Guide
        </h1>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Image className="w-6 h-6 text-blue-500" />
              Generating Images
            </h2>
            <div className="prose prose-blue max-w-none">
              <ol className="list-decimal pl-4 space-y-4">
                <li>Navigate to the Generate page</li>
                <li>Enter a detailed description of the image you want to create</li>
                <li>Click the "Generate Image" button</li>
                <li>Wait for the AI to create your image</li>
                <li>Save the generated image to use it for encoding messages</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <FileKey className="w-6 h-6 text-blue-500" />
              Encoding Messages
            </h2>
            <div className="prose prose-blue max-w-none">
              <ol className="list-decimal pl-4 space-y-4">
                <li>Go to the Encode page</li>
                <li>Upload an image (either generated or your own)</li>
                <li>Type your secret message</li>
                <li>Click "Encode Message"</li>
                <li>Download the encoded image</li>
              </ol>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800">
                  <strong>Tip:</strong> Keep your messages concise to maintain image quality
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <FileSearch className="w-6 h-6 text-blue-500" />
              Decoding Messages
            </h2>
            <div className="prose prose-blue max-w-none">
              <ol className="list-decimal pl-4 space-y-4">
                <li>Visit the Decode page</li>
                <li>Upload an image containing a hidden message</li>
                <li>Click "Decode Message"</li>
                <li>View the revealed message</li>
              </ol>
            </div>
          </section>
        </div>
      </div>
    </Container>
  );
}