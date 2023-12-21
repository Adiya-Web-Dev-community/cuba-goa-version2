import './ResortAminities.css'
import { IoCheckmark } from 'react-icons/io5';
import { IoWifiOutline } from 'react-icons/io5';
import { CiParking1 } from 'react-icons/ci';
// import { LuParkingCircle } from 'react-icons/lu';
import { TbParking } from 'react-icons/tb';
import { MdOutlineAirportShuttle } from 'react-icons/md';
import { MdRoomService } from 'react-icons/md';
import { RiRestaurantLine } from 'react-icons/ri';
import { TbBeach } from 'react-icons/tb';
import { MdOutlineFamilyRestroom } from 'react-icons/md';
import { BiDrink } from 'react-icons/bi';
import { MdOutlineFreeBreakfast } from 'react-icons/md';
import { MdOutlineBathtub } from 'react-icons/md';
import { SlScreenDesktop } from 'react-icons/sl';
import { IoBedOutline } from 'react-icons/io5';
import { GiPalmTree } from 'react-icons/gi';
import { TbGolf } from 'react-icons/tb';
import { TbSofa } from 'react-icons/tb';
import { SlLock } from 'react-icons/sl';
import { BsInfoCircle } from 'react-icons/bs';
import { TbMessages } from "react-icons/tb";

const ResortAminities = ({ resortname }) => {
    return (
        <div className="resort-aminities-container">
            <h4>Resort facilities of {resortname ? resortname : <span>Resort Name</span>}</h4>
            <section className='popular-facities'>
                <h6>Most popular facilities</h6>
                <ul>
                    <li><span><TbParking /></span>Free parking</li>
                    <li><span><MdOutlineAirportShuttle/></span>Airport shuttle</li>
                    <li><span><MdRoomService/></span>Room service</li>
                    <li><span><RiRestaurantLine/></span>Restaurant</li>
                    <li><span><IoWifiOutline/></span>Free Wifi</li>
                    <li><span><TbBeach/></span>Beachfront</li>
                    <li><span><MdOutlineFamilyRestroom/></span>Family rooms</li>
                    <li><span><BiDrink/></span>Bar</li>
                    <li><span><MdOutlineFreeBreakfast/></span>Breakfast</li>
                </ul>
            </section>
            <section className='aminities-block'>
                <div className='r1'>
                    <section>
                        <h6><span><MdOutlineBathtub/></span>Bathroom</h6>
                        <ul>
                            <li><span><IoCheckmark /></span>Towels</li>
                            <li><span><IoCheckmark /></span>Pivate bathroom</li>
                            <li><span><IoCheckmark /></span>Toilet</li>
                            <li><span><IoCheckmark /></span>Shower</li>
                        </ul>
                    </section>
                    <section>
                        <h6><span><IoBedOutline/></span>Bedroom</h6>
                        <ul>
                            <li><span><IoCheckmark /></span>Linen</li>
                            <li><span><IoCheckmark /></span>Wardrobe or closet</li>
                        </ul>
                    </section>
                    <section>
                        <h6><span><GiPalmTree/></span>Outdoors</h6>
                        <ul>
                            <li><span><IoCheckmark /></span>Beachfront</li>
                            <li><span><IoCheckmark /></span>Garden</li>
                        </ul>
                    </section>
                    <section>
                        <h6><span><TbGolf/></span>Activities</h6>
                        <ul>
                            <li><span><IoCheckmark /></span>Beach</li>
                            <li><span><IoCheckmark /></span>Fishing</li>
                        </ul>
                    </section>
                    <section>
                        <h6><span><TbSofa/></span>Living Area</h6>
                        <ul>
                            <li><span><IoCheckmark /></span>Seating Area</li>
                            <li><span><IoCheckmark /></span>Desk</li>
                        </ul>
                    </section>
                </div>
                <div className='r2'>
                    <section>
                        <h6><span><SlScreenDesktop/></span>Media & Technology</h6>
                        <ul>
                            <li><span><IoCheckmark /></span>Telephone</li>
                        </ul>
                    </section>
                    <section>
                        <h6><span><RiRestaurantLine/></span>Food & Drink</h6>
                        <ul>
                            <li><span><IoCheckmark /></span>Snack bar</li>
                            <li><span><IoCheckmark /></span>Bar</li>
                            <li><span><IoCheckmark /></span>Restaurant</li>
                        </ul>
                    </section>
                    <section>
                        <h6><span><IoWifiOutline/></span>Internet</h6>
                        <ul>
                            <li><span><IoCheckmark /></span>WiFi is available in all areas and is free of charge.</li>
                        </ul>
                    </section>
                    <section>
                        <h6><span><TbParking/></span>Parking</h6>
                        <ul>
                            <li><span><IoCheckmark /></span>Free public parking is possible on site (reservation is needed).</li>
                        </ul>
                    </section>
                </div>
                <div className='r3'>
                    <section>
                        <h6><span><MdRoomService/></span>Services</h6>
                        <ul>
                            <li><span><IoCheckmark /></span>Shuttle service</li>
                            <li><span><IoCheckmark /></span>Luggage storage</li>
                            <li><span><IoCheckmark /></span>Wake-up service</li>
                            <li><span><IoCheckmark /></span>Car hire</li>
                            <li><span><IoCheckmark /></span>Ironing service</li>
                            <li><span><IoCheckmark /></span>Laundry</li>
                            <li><span><IoCheckmark /></span>Airport shuttle</li>
                            <li><span><IoCheckmark /></span>Room service</li>
                        </ul>
                    </section>
                    <section>
                        <h6><span><SlLock/></span>Safety & Security</h6>
                        <ul>
                            <li><span><IoCheckmark /></span>Safety deposit box</li>
                        </ul>
                    </section>
                    <section>
                        <h6><span><BsInfoCircle/></span>General</h6>
                        <ul>
                            <li><span><IoCheckmark /></span>Private entrance</li>
                            <li><span><IoCheckmark /></span>Fan</li>
                            <li><span><IoCheckmark /></span>Family rooms</li>
                        </ul>
                    </section>
                    <section>
                        <h6><span><TbMessages/></span>Languages spoken</h6>
                        <ul>
                            <li><span><IoCheckmark /></span>English</li>
                            <li><span><IoCheckmark /></span>Hindi</li>
                        </ul>
                    </section>
                </div>
            </section>
        </div>
    )
}

export default ResortAminities