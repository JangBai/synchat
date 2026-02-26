type AvatarProps = {
  emoji: string;
  backgroundColor: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const sizeClasses = {
  sm: "w-8 h-8 text-base",
  md: "w-10 h-10 text-xl",
  lg: "w-12 h-12 text-2xl",
  xl: "w-16 h-16 text-3xl",
};

export default function Avatar({
  emoji,
  backgroundColor,
  size = "md",
  className = "",
}: AvatarProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-full border-2 border-white/20 shadow-sm dark:border-gray-700/50 ${sizeClasses[size]} ${className}`}
      style={{ backgroundColor }}
    >
      <span className="leading-none">{emoji}</span>
    </div>
  );
}
