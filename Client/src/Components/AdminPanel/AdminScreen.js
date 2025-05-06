import React, { useState } from 'react'
import PostingPets from './PostingPets'
import ApprovedRequests from './ApprovedRequests'
import PetFoodManager from './FoodController'
import AdminFoodOrders from './AdminFoodOrders'
import AdminPetOrders from './AdminPetOrders'

const AdminScreen = () => {
  const [screen, setScreen] = useState('postingPet')

  return (
    <div className='admin-screen-container'>
      <div className='admin-screen-left'>
        <div>
          <p onClick={() => setScreen('postingPet')}>Post Pet Requests</p>
          <p onClick={() => setScreen('approvedRequests')}>Approved Pets</p>
          <p onClick={() => setScreen('PetFoodManager')}>Pet Food Manager </p>
          <p onClick={() => setScreen('AdminFoodOrders')}>Food Orders  </p>

          <p onClick={() => setScreen('AdminPetOrders')}>Pet Orders  </p>
        </div>
      </div>
      <div className='admin-screen-right'>
        {screen === 'postingPet' && <PostingPets />}
        {screen === 'approvedRequests' && <ApprovedRequests />}
        {screen === 'PetFoodManager' && <PetFoodManager />}
        {screen === 'AdminFoodOrders' && <AdminFoodOrders />}

        {screen === 'AdminPetOrders' && <AdminPetOrders />}

      </div>
    </div>
  )
}

export default AdminScreen
