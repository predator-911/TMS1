import React from 'react';
import { Container } from './ui/Container';
import { Lock } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gray-900 py-24 sm:py-32">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20" />
      
      <div className="relative">
        <Container className="text-center">
          <Lock className="mx-auto h-16 w-16 text-blue-500 animate-pulse" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Unlock the Secrets of Steganography
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
            Discover the art of hiding messages in plain sight. Our powerful tools let you encode
            secret messages within images and decode hidden information with ease.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/generate"
              className="rounded-md bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 transition-colors"
            >
              Get Started
            </a>
            <a href="/guide" className="text-sm font-semibold leading-6 text-white hover:text-blue-400 transition-colors">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </Container>
      </div>
    </div>
  );
}