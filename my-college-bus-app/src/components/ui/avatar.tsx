import React from 'react';

interface AvatarProps {
  src: string;
  alt?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt }) => (
  <div className="w-12 h-12 rounded-full overflow-hidden">
    <AvatarImage src={src} alt={alt} />
    <AvatarFallback />
  </div>
);

interface AvatarImageProps {
  src: string;
  alt?: string;
}

export const AvatarImage: React.FC<AvatarImageProps> = ({ src, alt }) => (
  <img src={src} alt={alt} className="w-full h-full object-cover" />
);

export const AvatarFallback: React.FC = () => (
  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
    <span className="text-white">?</span>
  </div>
);
