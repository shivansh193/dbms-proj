import React from 'react';

interface RatingProps {
  value: number;
  text?: string;
  color?: string;
}

const Rating: React.FC<RatingProps> = ({ value, text, color = 'text-yellow-400' }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          <i
            className={
              value >= star
                ? 'fas fa-star'
                : value >= star - 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
            style={{ color }}
          ></i>
        </span>
      ))}
      {text && <span className="ml-1">{text}</span>}
    </div>
  );
};

export default Rating;
