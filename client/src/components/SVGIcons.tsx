interface IconProps {
  className?: string;
}

export const SparkleIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0L14.4 8.4L24 12L14.4 15.6L12 24L9.6 15.6L0 12L9.6 8.4L12 0Z" />
  </svg>
);

export const HeartIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

export const MagicWandIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

export const StarsIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    <path d="M6 2l2.09 4.26L14 7.27l-3 2.87.58 3.44L6 11.77l-5.58 1.81L1 10.14 2 7.27l4.91-.01L6 2z" opacity="0.5"/>
  </svg>
);

export const RainbowIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12c0-8-4-8-8-8s-8 0-8 8m16 0c0-6-3-6-6-6s-6 0-6 6m12 0c0-4-2-4-4-4s-4 0-4 4"/>
  </svg>
);

export const CrownIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M5 16L3 12l3.5-1L12 16l5.5-5L21 12l-2 4H5zm2.7-2h8.6l.9-1.4L12 16l-5.2-3.4L6.7 14z"/>
    <path d="M12 8l-1-3 1-3 1 3-1 3z"/>
    <circle cx="6" cy="8" r="1"/>
    <circle cx="18" cy="8" r="1"/>
  </svg>
);

export const GiftIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
  </svg>
);