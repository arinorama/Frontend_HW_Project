import React from 'react';
import { cn } from '../../../lib/utils';
import { useTranslation } from '../../../hooks/useTranslation';

type ATMBrandHeaderProps = {
  className?: string;
  'data-testid'?: string;
}

const ATMBrandHeader: React.FC<ATMBrandHeaderProps> = ({ 
  className = '',
  'data-testid': testId = 'atm-brand-header'
}) => {
  const { t } = useTranslation();
  return (
    <div 
      className={cn(
        "bg-atm-primary shadow-lg rounded-2xl flex flex-col items-center justify-center w-atm-brand h-atm-brand-height",
        className
      )}
      data-testid={testId}
    >
      <div 
        className="text-center font-primary text-text-white"
        data-testid="atm-brand-text"
      >
        <div className="text-8xl font-semibold tracking-widest leading-tight text-shadow-sm mb-2">
          {t('branding.atm')}
        </div>
        <div className="text-3xl font-medium tracking-wider">
          {t('branding.tagline')}
        </div>
      </div>
    </div>
  );
};

export default ATMBrandHeader;