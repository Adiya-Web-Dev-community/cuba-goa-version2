import RoomCard from "./Room-Card/RoomCards"

const RoomList = ({ rooms, resort, deleteRoom, getProperty }) => {
    return(
        <>
         {/* <RoomCard room={rooms}/> */}
         {rooms?.map((room, index) => {
            return(
                <div key={room.roomId}>
                   <RoomCard room={room} resort={resort} deleteRoom={deleteRoom} index={index} getProperty={getProperty}/>
                </div>
            )
         })}
        </>
    )
}

export default RoomList