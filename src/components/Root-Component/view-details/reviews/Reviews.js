import axios from '../../../../helpers/axios'
import './Reviews.css'
import React, { useState, useEffect } from 'react'
import ReviewSlider from './ReviewSlider';


const Reviews = ({ id }) => {

    const [reviews, setReviews] = useState()
    const getRatingList = async () => {
        // console.log('id=>', id)
        const response = await axios.get(`/get-reviews/${id}`)
        console.log('reviews', response.data.list)
        setReviews(response.data.list)
    }
    useEffect(() => {
        getRatingList();
        //eslint-disable-next-line
    }, [])

    return (
        <div className='review-wrapper'>
            <h5>Reviews</h5>

            <ReviewSlider reviews={reviews} />
        </div >
    )
}

export default Reviews