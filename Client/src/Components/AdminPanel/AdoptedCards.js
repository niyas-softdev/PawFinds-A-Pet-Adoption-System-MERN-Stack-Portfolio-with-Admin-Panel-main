import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

const AdoptedCards = ({ pet, deleteBtnText = "Delete", updateCards }) => {
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showDeletedSuccess, setShowDeletedSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const formatTimeAgo = (updatedAt) => {
    const date = new Date(updatedAt);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`http://localhost:5174/api/form/reject/${pet._id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete pet');
      }

      setShowDeletedSuccess(true);
    } catch (err) {
      console.error('Error deleting pet:', err);
      setShowErrorPopup(true);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="req-containter">
      <div className="pet-view-card">
        {/* Pet Image */}
        <div className="pet-card-pic">
          <img
            src={`http://localhost:5174/images/${pet.filename}`}
            alt={pet.name || "Pet"}
          />
        </div>

        {/* Pet Details */}
        <div className="pet-card-details">
          <h2>{pet.name || "Unnamed Pet"}</h2>
          <p><b>Type:</b> {pet.type || "N/A"}</p>
          <p><b>Location:</b> {pet.area || "N/A"}</p>
          <p><b>Purpose:</b> {pet.purpose || "N/A"}</p>
          <p><b>Price:</b> ₹{pet.price || "0"}</p>
          <p><b>Buyer Email:</b> <a href={`mailto:${pet.email}`}>{pet.email}</a></p>
          <p><b>Buyer Phone:</b> <a href={`tel:${pet.phone}`}>{pet.phone}</a></p>
          <p><b>Sold:</b> {formatTimeAgo(pet.updatedAt)}</p>
        </div>

        {/* Delete Button */}
        <div className="app-rej-btn">
          <button onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : deleteBtnText}
          </button>
        </div>

        {/* Error Popup */}
        {showErrorPopup && (
          <div className="popup">
            <div className="popup-content">
              <p>Oops! Something went wrong while deleting.</p>
            </div>
            <button onClick={() => setShowErrorPopup(false)} className="close-btn">
              Close <i className="fa fa-times"></i>
            </button>
          </div>
        )}

        {/* Success Popup */}
        {showDeletedSuccess && (
          <div className="popup">
            <div className="popup-content">
              <p>Pet removed from listings successfully.</p>
            </div>
            <button onClick={() => {
              setShowDeletedSuccess(false);
              updateCards(); // Refresh list
            }} className="close-btn">
              Close <i className="fa fa-times"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdoptedCards;
