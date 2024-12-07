import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { StarRatingProps } from './types';
import { Icons } from '@/components/atom/Icons/Icons';

export const StarRating: React.FC<StarRatingProps> = props => {
  const {
    className,
    initialRating,
    onRatingChanged,
    readOnlyRating,
    size,
    hideDisabledStar,
    totalRating = 5,
  } = props;

  const [rating, setRating] = useState(initialRating || 0);

  useEffect(() => {
    if (!initialRating) return;
    setRating(initialRating);
  }, [initialRating]);

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {Array.from({ length: totalRating }, (v, i) => i + 1).map(star => {
        if (hideDisabledStar && star > rating) return null;
        return (
          <button
            key={star}
            type="button"
            className={cn(
              `h-${size || 8} w-${size || 8}`,
              {
                'cursor-pointer': !readOnlyRating,
                'text-yellow-400': star <= rating,
                'text-gray-400': star > rating
              }
            )}
            onClick={() => {
              if (readOnlyRating) return;

              if (onRatingChanged) {
                onRatingChanged(star);
              }
              setRating(star);
            }}
            aria-label={`Rate ${star} stars`}
          >
            <Icons.StarIcon
              className={cn(
                `h-${size || 8} w-${size || 8}`,
                {
                  'text-yellow-400': star <= rating,
                  'text-gray-400': star > rating
                }
              )}
            />
          </button>
        );
      })}
    </div>
  );
};
