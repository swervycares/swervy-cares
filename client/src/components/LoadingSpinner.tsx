interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  color?: "pink" | "turquoise" | "purple" | "white";
  text?: string;
}

export default function LoadingSpinner({ 
  size = "medium", 
  color = "pink", 
  text = "Loading..." 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8", 
    large: "w-12 h-12"
  };

  const colorClasses = {
    pink: "text-swervy-pink",
    turquoise: "text-swervy-turquoise",
    purple: "text-swervy-purple",
    white: "text-white"
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <div 
        className={`animate-spin rounded-full border-2 border-transparent border-t-current ${sizeClasses[size]} ${colorClasses[color]}`}
        style={{
          borderTopColor: 'currentColor',
          borderRightColor: 'currentColor',
          borderBottomColor: 'transparent',
          borderLeftColor: 'transparent'
        }}
      ></div>
      {text && (
        <span className={`text-sm ${colorClasses[color]}`}>
          {text}
        </span>
      )}
    </div>
  );
}