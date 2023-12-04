import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination, Navigation } from 'swiper'
import 'swiper/css';
import 'swiper/css/effect-coverflow'
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/autoplay';
import { MdArrowBackIos } from 'react-icons/md';
import { MdArrowForwardIos } from 'react-icons/md';
import { TbStarFilled } from 'react-icons/tb';
import { TbStar } from 'react-icons/tb';
import user from '../../../../assets/profile.png'
import './ReviewSlider.css'

const ReviewSlider = ({ reviews }) => {
    console.log("REV => ", reviews)
    if (!reviews) {
        return
    }
    return (
        <>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                loop={true}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true
                }}
                spaceBetween={75}
                pagination={{ el: '.swiper-pagination', type: 'progressbar' }}
                navigation={{
                    nextEl: '.swiper-nxt-btn',
                    prevEl: '.swiper-prev-btn',
                    clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                classNameName='my-Swiper'
            // autoplay={{ delay: 500, disableOnInteraction: false }}
            >
                <SwiperSlide>
                    <section className="review-card">
                        <div className="review-card-r3">
                            Grab and slide left or right to see more reviews
                        </div>
                        {/* <div className="review-card-r3">
                            {item.additionalComments.length < 350 ? <p> {item.additionalComments} </p> : <p>{item.additionalComments.substr(0, 350)}...</p>}
                        </div> */}
                    </section>
                </SwiperSlide>
                <section>
                    {reviews.map((item) => {
                        const { rating } = item
                        return (
                            <>
                                <SwiperSlide>
                                    <section className="review-card">
                                        <div className="review-card-r1">
                                            <section>
                                                <img className="testmonials-img" src={user} alt='userIcon' />
                                            </section>
                                            <section>
                                                <p>{item.name}</p>
                                                <p>{[...Array(rating)].map(() => {
                                                    return (
                                                        <span style={{ color: 'goldenrod' }}>
                                                            <TbStarFilled />
                                                        </span>
                                                    )
                                                })}
                                                    {[...Array(5 - rating)].map(() => {
                                                        return (
                                                            <span>
                                                                <TbStar />
                                                            </span>
                                                        )
                                                    })}
                                                    {/* <TbStarFilled />
                                                    <TbStarFilled />
                                                    <TbStarFilled />
                                                    <TbStarFilled />
                                                    <TbStar /> */}
                                                </p>
                                            </section>
                                        </div>
                                        <div className="review-card-r3">
                                            {item.additionalComments.length < 350 ? <p> {item.additionalComments} </p> : <p>{item.additionalComments.substr(0, 350)}...</p>}
                                            {/* {item.additionalComments} */}
                                        </div>
                                    </section>
                                </SwiperSlide>
                            </>
                        )
                    })}
                </section>
                <div className='slider-controller'>
                    <div className='swiper-prev-btn'><MdArrowBackIos/></div>
                    <div className='swiper-nxt-btn'><MdArrowForwardIos/></div>
                </div>
            </Swiper>
        </>
    );
};

export default ReviewSlider;