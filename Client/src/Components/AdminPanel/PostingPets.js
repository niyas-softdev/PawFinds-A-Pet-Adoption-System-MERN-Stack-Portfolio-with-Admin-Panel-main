import React, { useState, useEffect } from 'react';
import PetCards from './PetCards';

const PostingPets = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5174/api/pets/pending');
      if (!response.ok) {
        throw new Error('Failed to fetch pending pets');
      }
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="pet-container">
      {loading ? (
        <p>Loading...</p>
      ) : requests.length > 0 ? (
        requests.map((request) => (
          <PetCards
            key={request._id}
            pet={request}
            updateCards={fetchRequests}
            deleteBtnText="Reject"
            approveBtn={true}
          />
        ))
      ) : (
        <p>No requests available</p>
      )}
    </div>
  );
};

export default PostingPets;
