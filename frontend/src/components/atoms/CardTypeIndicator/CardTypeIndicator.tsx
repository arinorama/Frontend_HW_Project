import React from 'react';
import { cn } from '../../../lib/utils';
import '../../../styles/card-sprite.css';

export type CardType = 'star' | 'pulsa' | 'maestro' | 'mastercard' | 'plus' | 'visa';

type CardTypeIndicatorProps = {
  activeCardType: CardType;
  className?: string;
  'data-testid'?: string;
  showAll?: boolean; // Tüm logoları göster ya da sadece aktif olanı
};

const CardTypeIndicator: React.FC<CardTypeIndicatorProps> = ({
  activeCardType,
  className = '',
  showAll = true,
  'data-testid': testId = 'card-type-indicator'
}) => {
  const cardTypes: CardType[] = ['star', 'pulsa', 'maestro', 'mastercard', 'plus', 'visa'];

  if (!showAll) {
    // Sadece aktif kart tipini göster
    return (
      <div 
        className={cn("card-type-indicator card-type-indicator--single", className)}
        data-testid={testId}
      >
        <div
          className={cn(
            "card-sprite",
            `card-sprite--${activeCardType}`,
            "card-sprite--active"
          )}
          data-testid={`card-type-${activeCardType}`}
          title={activeCardType.toUpperCase()}
        />
      </div>
    );
  }

  // Tüm kart tiplerini göster, aktif olan vurgulanır
  return (
    <div 
      className={cn("card-type-indicator", className)}
      data-testid={testId}
    >
      {cardTypes.map((cardType) => {
        const isActive = cardType === activeCardType;
        
        return (
          <div
            key={cardType}
            className={cn(
              "card-sprite",
              `card-sprite--${cardType}`,
              isActive ? "card-sprite--active" : "card-sprite--inactive"
            )}
            data-testid={`card-type-${cardType}`}
            title={cardType.toUpperCase()}
          />
        );
      })}
    </div>
  );
};

export default CardTypeIndicator;