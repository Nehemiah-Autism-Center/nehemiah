import {
  Facebook,
  Instagram,
  Linkedin,
  Music2,
  Twitter,
  Youtube,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { SITE_CONFIG, type SocialProfile } from '@/shared/lib/constants';

// lucide-react has no TikTok or X marks; Music2 and the Twitter bird stand in for them.
const ICONS: Record<SocialProfile['network'], LucideIcon> = {
  Instagram,
  Facebook,
  TikTok: Music2,
  YouTube: Youtube,
  LinkedIn: Linkedin,
  X: Twitter,
};

interface SocialLinksProps {
  className?: string;
  linkClassName?: string;
}

export default function SocialLinks({ className, linkClassName }: SocialLinksProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {SITE_CONFIG.social.map(({ network, href }) => {
        const Icon = ICONS[network];
        return (
          <a
            key={network}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${SITE_CONFIG.name} on ${network}`}
            className={cn('hover:text-primary transition', linkClassName)}
          >
            <Icon className="size-4" />
          </a>
        );
      })}
    </div>
  );
}
