import Link from 'next/link';
import { NAV_LINKS } from '@/lib/constants';

interface NavigationProps {
  className?: string;
  onLinkClick?: () => void;
}

export default function Navigation({ className = '', onLinkClick }: NavigationProps) {
  return (
    <nav className={className}>
      <ul className="flex flex-col md:flex-row items-center gap-8">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onLinkClick}
              className="text-white hover:text-amber-300 transition-all duration-300 text-sm uppercase tracking-wide font-semibold relative group/link"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-300 group-hover/link:w-full transition-all duration-300"></span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
