import React, { useState } from 'react'
import PostingPets from './PostingPets'
import AdoptingRequests from './AdoptingRequests'
import AdoptedHistory from './AdoptedHistory'
import ApprovedRequests from './ApprovedRequests'
import PetFoodManager from './FoodController'
import InterestList from './InterestList'

const AdminScreen = () => {
  const [screen, setScreen] = useState('postingPet')

  return (
    <div className='admin-screen-container'>
      <div className='admin-screen-left'>
        <div>
          <p onClick={() => setScreen('postingPet')}>Post Pet Requests</p>
          <p onClick={() => setScreen('approvedRequests')}>Approved Pets</p>
          <p onClick={() => setScreen('adoptingPet')}>Adoption Requests</p>
          <p onClick={() => setScreen('adoptedHistory')}>Adopted History</p>
          <p onClick={() => setScreen('PetFoodManager')}>Pet Food Manager </p>
          <p onClick={() => setScreen('InterestList')}>InterestList  </p>
        </div>
      </div>
      <div className='admin-screen-right'>
        {screen === 'postingPet' && <PostingPets />}
        {screen === 'approvedRequests' && <ApprovedRequests />}
        {screen === 'adoptingPet' && <AdoptingRequests />}
        {screen === 'adoptedHistory' && <AdoptedHistory />}
        {screen === 'PetFoodManager' && <PetFoodManager />}
        {screen === 'InterestList' && <InterestList />}

      </div>
    </div>
  )
}

export default AdminScreen
