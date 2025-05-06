import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

const PetsViewer = ({ pet, onBuy }) => {
  const formatTimeAgo = (updatedAt) => {
    const date = new Date(updatedAt);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <div className='pet-view-card'>
      <div className='pet-card-pic'>
        <img src={`http://localhost:5174/images/${pet.filename}`} alt={pet.name} />
      </div>
      <div className='pet-card-details'>
        <h2>{pet.name}</h2>
        <p><b>Type:</b> {pet.type}</p>
        <p><b>Age:</b> {pet.age}</p>
        <p><b>Price:</b> ₹{pet.price}</p>
        <p><b>Location:</b> {pet.area}</p>
        <p>{formatTimeAgo(pet.updatedAt)}</p>
      </div>
      <div className='show-interest-btn'>
        <button onClick={() => onBuy(pet)}>Buy <i className="fa fa-shopping-cart"></i></button>
      </div>
    </div>
  );
};

export default PetsViewer;
