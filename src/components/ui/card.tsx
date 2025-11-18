import React from 'react';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, price }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={imageUrl} alt={title} loading="lazy" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="text-gray-900 font-bold">${price.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Card;