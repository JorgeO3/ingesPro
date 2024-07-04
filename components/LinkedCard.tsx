import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  description: string;
  href: string;
  className?: string;
}

export const LinkedCard = ({ description, title, className, href }: Props) => {
  const cardClasses = cn(
    'flex w-80 flex-col rounded-xl border p-4 shadow transition-colors',
    'bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground',
    'hover:bg-muted/50 sm:p-6',
    className,
  );

  return (
    <Link className={cardClasses} href={href}>
      <h3 className="text-base font-semibold leading-tight tracking-tight mb-1">
        {title}
      </h3>
      <p className="text-xs text-muted-foreground pt-3">{description}</p>
    </Link>
  );
};
