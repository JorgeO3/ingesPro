import { UserIcon } from 'lucide-react';

interface AvatarProps {
  src?: string;
  alt?: string;
  className?: string;
}

export const Avatar = ({
  src,
  alt = 'User Avatar',
  className = '',
}: AvatarProps) => {
  const AvatarClasses = `
    relative inline-flex items-center justify-center 
    bg-primary text-secondary-foreground rounded-full 
    w-10 h-10 ${className}
  `;
  return (
    <div className={AvatarClasses}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="rounded-full object-cover w-full h-full"
        />
      ) : (
        <UserIcon className="w-3/5 h-3/5 text-secondary-foreground" />
      )}
    </div>
  );
};
