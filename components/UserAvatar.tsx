import { AvatarFallback, AvatarImage, Avatar } from './ui/avatar';

export const UserAvatar = () => {
  const avatarClasses = `
    text-gray-950 mt-auto hover:ring-2 hover:ring-gray-300
    transition-all duration-200
  `;
  return (
    <Avatar className={avatarClasses}>
      <AvatarImage src="/user.png" alt="User avatar" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
