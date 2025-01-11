import React from 'react';
import { Container } from './ui/Container';
import { Image, FileKey, FileSearch } from 'lucide-react';

const features = [
  {
    name: 'Generate Images',
    description: 'Create unique images from text descriptions using advanced AI technology.',
    icon: Image,
  },
  {
    name: 'Encode Messages',
    description: 'Hide your secret messages within images using sophisticated steganography techniques.',
    icon: FileKey,
  },
  {
    name: 'Decode Messages',
    description: 'Extract hidden messages from images that contain encoded information.',
    icon: FileSearch,
  },
];

export function Features() {
  return (
    <div className="py-24 bg-white">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Powerful Features
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our suite of tools provides everything you need to work with steganography.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="relative rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="absolute -top-4 left-4">
                <span className="inline-flex rounded-lg bg-blue-500 p-3 text-white ring-4 ring-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                  {feature.name}
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}