'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackClassName?: string;
  fallbackContent?: React.ReactNode;
}

export default function SafeImage({
  fallbackClassName,
  fallbackContent,
  className,
  alt,
  ...props
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={fallbackClassName ?? 'absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center'}>
        {fallbackContent ?? <span className="text-primary-300 text-4xl">🖼</span>}
      </div>
    );
  }

  return (
    <Image
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
