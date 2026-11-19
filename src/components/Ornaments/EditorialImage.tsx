import React, {useState} from 'react';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  fallbackTitle?: string;
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto',
  fallbackTitle,
}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F2EBDD] via-[#EAE0CF] to-[#D8B77C]/30 text-[#651E2B] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10 mb-3 opacity-60" aria-hidden="true">
          <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="1" />
          <path d="M32 14C36 22 36 28 32 34C28 28 28 22 32 14Z" stroke="currentColor" strokeWidth="1.2" />
          <path d="M32 50C36 42 36 36 32 30C28 36 28 42 32 50Z" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        <span className="font-display italic text-lg">{fallbackTitle || alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      fetchPriority={fetchPriority}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};
