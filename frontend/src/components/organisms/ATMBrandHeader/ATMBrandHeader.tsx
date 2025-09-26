import React from 'react';
import { cn } from '../../../lib/utils';

type ATMBrandHeaderProps = {
  className?: string;
  'data-testid'?: string;
}

const ATMBrandHeader: React.FC<ATMBrandHeaderProps> = ({ 
  className = '',
  'data-testid': testId = 'atm-brand-header'
}) => {
  return (
    <div 
      className={cn(
        "bg-atm-primary shadow-lg rounded-2xl flex flex-col items-center justify-center w-atm-brand h-atm-brand-height",
        className
      )}
      data-testid={testId}
    >
      <img 
        src="/atm_sign.png"
        alt="ATM Sign"
        className="max-h-full w-auto object-contain"
        data-testid="atm-brand-image"
      />
    </div>
  );
};

export default ATMBrandHeader;