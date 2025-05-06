import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

const PetCards = ({ pet, deleteBtnText = "Delete", approveBtn = true, updateCards }) => {
  const [showJustificationPopup, setShowJustificationPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showApproved, setShowApproved] = useState(false);
  const [showDeletedSuccess, setShowDeletedSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  const formatTimeAgo = (updatedAt) => {
    const date = new Date(updatedAt);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const truncateText = (text, maxLength = 40) => {
    return text.length <= maxLength ? text : text.substring(0, maxLength) + '...';
  };

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      const response = await fetch(`http://localhost:5174/api/pets/approve/${pet._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: "Approved" }),
      });
      if (!response.ok) throw new Error("Approval failed");
      setShowApproved(true);
    } catch (err) {
      console.error(err);
      setShowErrorPopup(true);
    } finally {
      setIsApproving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`http://localhost:5174/api/pets/delete/${pet._id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error("Delete failed");
      setShowDeletedSuccess(true);
    } catch (err) {
      console.error(err);
      setShowErrorPopup(true);
    } finally {
      setIsDeleting(false);
    }
  };
  

  return (
    <div className="req-containter">
      <div className="pet-view-card">
        <div className="pet-card-pic">
          <img src={`http://localhost:5174/images/${pet.filename}`} alt={pet.name} />
        </div>

        <div className="pet-card-details">
          <h2>{pet.name}</h2>
          <p><b>Type:</b> {pet.type}</p>
          <p><b>Age:</b> {pet.age}</p>
          <p><b>Location:</b> {pet.area}</p>
          <p><b>Price:</b> ₹{pet.price}</p>
          <p><b>Purpose:</b> {pet.purpose}</p>
          <p><b>Owner Email:</b> <a href={`mailto:${pet.email}`}>{pet.email}</a></p>
          <p><b>Owner Phone:</b> <a href={`tel:${pet.phone}`}>{pet.phone}</a></p>
          <p><b>Justification:</b> {truncateText(pet.justification)}
            {pet.justification.length > 40 && (
              <span onClick={() => setShowJustificationPopup(true)} className="read-more-btn"> Read More</span>
            )}
          </p>
          <p><b>Posted:</b> {formatTimeAgo(pet.updatedAt)}</p>
        </div>

        <div className="app-rej-btn">
          <button onClick={handleDelete} disabled={isDeleting || isApproving}>
            {isDeleting ? "Deleting..." : deleteBtnText}
          </button>
          {approveBtn && (
            <button onClick={handleApprove} disabled={isDeleting || isApproving}>
              {isApproving ? "Approving..." : "Approve"}
            </button>
          )}
        </div>

        {/* Popup for full justification */}
        {showJustificationPopup && (
          <div className="popup">
            <div className="popup-content">
              <h4>Justification:</h4>
              <p>{pet.justification}</p>
              <button onClick={() => setShowJustificationPopup(false)} className="close-btn">
                Close <i className="fa fa-times" />
              </button>
            </div>
          </div>
        )}

        {/* Error Popup */}
        {showErrorPopup && (
          <div className="popup">
            <div className="popup-content">
              <p>Oops!... Connection Error</p>
              <button onClick={() => setShowErrorPopup(false)} className="close-btn">
                Close <i className="fa fa-times" />
              </button>
            </div>
          </div>
        )}

        {/* Approval Popup */}
        {showApproved && (
          <div className="popup">
            <div className="popup-content">
              <p>Approval Successful!</p>
              <p>Please contact the owner at <a href={`mailto:${pet.email}`}>{pet.email}</a> or <a href={`tel:${pet.phone}`}>{pet.phone}</a>.</p>
              <button onClick={() => { setShowApproved(false); updateCards(); }} className="close-btn">
                Close <i className="fa fa-times" />
              </button>
            </div>
          </div>
        )}

        {/* Deletion Popup */}
        {showDeletedSuccess && (
          <div className="popup">
            <div className="popup-content">
              <p>Deleted Successfully from Database.</p>
              <button onClick={() => { setShowDeletedSuccess(false); updateCards(); }} className="close-btn">
                Close <i className="fa fa-times" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetCards;
