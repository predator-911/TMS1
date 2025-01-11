import React from 'react';
import { Container } from './ui/Container';
import { Lock, Image, FileKey, FileSearch, BookOpen, Info } from 'lucide-react';
import { NavItem } from '../types';

const navigation: NavItem[] = [
  { title: 'Generate', href: '/generate', icon: Image },
  { title: 'Encode', href: '/encode', icon: FileKey },
  { title: 'Decode', href: '/decode', icon: FileSearch },
  { title: 'Guide', href: '/guide', icon: BookOpen },
  { title: 'About', href: '/about', icon: Info },
];

export function Navigation() {
  return (
    <nav className="bg-gray-900 text-white py-4 sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center space-x-2 text-xl font-bold">
            <Lock className="w-6 h-6" />
            <span>Steganography Studio</span>
          </a>
          
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                <span>{item.title}</span>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </nav>
  );
}