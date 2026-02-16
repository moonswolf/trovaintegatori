'use client';

import { useState } from 'react';

interface ImageLightboxProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
}

export default function ImageLightbox({ src, alt, className, fallback }: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasImage = src && src.startsWith('http');

  return (
    <>
      {hasImage ? (
        <img
          src={src}
          alt={alt}
          className={`${className} cursor-zoom-in`}
          loading="lazy"
          width={400}
          height={400}
          onClick={() => setIsOpen(true)}
        />
      ) : (
        fallback
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition z-[101]"
            aria-label="Chiudi"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
