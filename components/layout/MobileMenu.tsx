'use client';

import { useEffect } from 'react';
import Navigation from './Navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        onClick={onClose}
      />

      {/* Menu */}
      <div className="fixed top-20 left-0 right-0 bottom-0 bg-white z-50 md:hidden overflow-y-auto">
        <div className="p-6">
          <Navigation className="flex" onLinkClick={onClose} />
        </div>
      </div>
    </>
  );
}
