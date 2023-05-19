import React from 'react'
import Background from '../assets/images/Car_Inventory.jpg'

function Home() {
  return (
    <div 
      style={{ backgroundImage: `url(${ Background })`}} 
      className='flex flex-row justify-center mx-auto bg-cover bg-fixed'
      >
        <div className='flex place-items-center h-screen'>
          <h2 className='p-10 bg-black bg-opacity-50 text-white rounded'>Welcome to the Car Inventory</h2>
        </div>
    </div>
  )
}

export default Home