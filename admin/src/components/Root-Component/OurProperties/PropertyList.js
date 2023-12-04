import './PropertyList.css'
import React, { useEffect, useState } from 'react'
import PropertyCard from './Property-Card/PropertyCard'

const PropertyList = ({ allProperties, getPropertiesData, deleteProperty }) => {
  const [resortList, setResortsList] = useState([])
  const [restaurantsList, setRestaurantsList] = useState([])

  useEffect(() => {
    const resorts = allProperties.filter((resort) => resort.type === 'resort')
    setResortsList(resorts)
    const restaurants = allProperties.filter((restaurant) => restaurant.type === 'restaurant')
    setRestaurantsList(restaurants)
  }, [])

  return (
    <>
      <h3 style={{ letterSpacing: '4px', textAlign: 'center' }}>RESORTS</h3>
      <div className='card-wrapper' style={{ display: 'flex', flexWrap: 'wrap' }}>
        {
          resortList.map((property, i) => {
            return (
              <>
                <PropertyCard property={property} key={property._id} allProperties={allProperties} getPropertiesData={getPropertiesData} deleteProperty={deleteProperty} />
              </>
            )
          })
        }
      </div>

      <h3 style={{ letterSpacing: '4px', textAlign: 'center', marginTop: '2rem' }}>RESTAURANTS</h3>
      <div className='card-wrapper' style={{ display: 'flex', flexWrap: 'wrap' }}>
        {
          restaurantsList.map((property, i) => {
            return (
              <>
                <PropertyCard property={property} key={property._id} allProperties={allProperties} getPropertiesData={getPropertiesData} deleteProperty={deleteProperty} />
              </>
            )
          })

        }
      </div>
    </>
  )
}

export default PropertyList