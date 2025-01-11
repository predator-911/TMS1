import React from 'react';
import { Container } from '../components/ui/Container';
import { Info } from 'lucide-react';

export function AboutPage() {
  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <Info className="w-8 h-8 text-blue-500" />
          About Steganography
        </h1>

        <div className="prose prose-blue max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">What is Steganography?</h2>
            <p className="text-gray-700 leading-relaxed">
              Steganography is the practice of concealing messages or information within other non-secret text or data. 
              Unlike cryptography, which makes data unreadable, steganography hides the fact that a secret message exists 
              by making it appear as something else.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Historical Timeline</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-24 font-bold text-blue-600">440 BC</div>
                <div>
                  <h3 className="font-semibold">Ancient Greece</h3>
                  <p className="text-gray-700">Messages tattooed on shaved heads of slaves, concealed by regrown hair</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-24 font-bold text-blue-600">1499</div>
                <div>
                  <h3 className="font-semibold">Trithemius</h3>
                  <p className="text-gray-700">Publication of Steganographia, one of the first books on steganography</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-24 font-bold text-blue-600">WW II</div>
                <div>
                  <h3 className="font-semibold">Microdots</h3>
                  <p className="text-gray-700">Development of microdot technology to hide messages in period or dots</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-24 font-bold text-blue-600">Modern</div>
                <div>
                  <h3 className="font-semibold">Digital Era</h3>
                  <p className="text-gray-700">Advanced techniques for hiding data within digital images, audio, and video</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Modern Applications</h2>
            <ul className="list-disc pl-4 space-y-4 text-gray-700">
              <li>Digital Watermarking for copyright protection</li>
              <li>Secure Communication in sensitive environments</li>
              <li>Privacy protection in social media</li>
              <li>Military and intelligence communications</li>
              <li>Digital forensics and cybersecurity</li>
            </ul>
          </section>
        </div>
      </div>
    </Container>
  );
}