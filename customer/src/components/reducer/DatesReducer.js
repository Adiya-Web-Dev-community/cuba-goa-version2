const intitalData = {
    checkIn: null,
    checkOut: null,
    dataObj: null,
    totalAmount: null
}


const DatesReducer = (state = intitalData, action) => {
    switch (action.type) {
        case 'set_checkin':
            return {
                ...state,
                checkIn: action.payload.checkindate
            };

        case 'set_checkout':
            return {
                ...state,
                checkOut: action.payload.checkoutdate
            };


        case 'setbookingcart':
            return {
                ...state,
                dataobj: action.payload.dataobj
            };

        case 'setTotalAmount':
            return {
                ...state,
                setTotalAmount: action.payload.setTotalAmount
            };

        default: {
            return state
        }
    }
}


export default DatesReducer