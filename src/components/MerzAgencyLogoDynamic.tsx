import React, { useState, useEffect } from 'react';
import { MerzAgencyLogo as VectorLogo } from './MerzOfficialLogo';

export const LOGO_STORAGE_KEY = 'merz_custom_official_logo_image';
export const LOGO_RAW_STORAGE_KEY = 'merz_custom_official_logo_raw';

/**
 * Official Permanent MERZ Security Solutions Agency Inc. Shield Logo.
 * Locked: Editing is strictly disabled.
 * Renders the saved transparent official emblem across headers, payslips, masterlist, and modals.
 */
export const MerzAgencyLogo: React.FC<{ 
  size?: string; 
  className?: string; 
  allowUpload?: boolean;
}> = ({ 
  size = "w-14 h-14", 
  className = "" 
}) => {
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem(LOGO_STORAGE_KEY);
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem(LOGO_STORAGE_KEY);
        setCustomLogoUrl(stored);
      } catch {
        // ignore
      }
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('merz-logo-updated', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('merz-logo-updated', handleStorageChange);
    };
  }, []);

  return (
    <div className={`relative ${size} shrink-0 inline-flex items-center justify-center select-none ${className}`}>
      {customLogoUrl ? (
        <img
          src={customLogoUrl}
          alt="MERZ Security Solutions Agency Inc. Official Logo"
          className="w-full h-full object-contain drop-shadow-sm pointer-events-none select-none"
        />
      ) : (
        <VectorLogo size={size} />
      )}
    </div>
  );
};

/**
 * Locked: Modal disabled to prevent logo alteration.
 */
export const LogoUploaderModal: React.FC<{
  isOpen?: boolean;
  onClose?: () => void;
}> = () => null;
