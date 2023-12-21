const intitalData = {
  checkIn: null,
  checkOut: null,
  dataObj: null,
  totalAmount: null,
  userdetail: [],
};

const DatesReducer = (state = intitalData, action) => {
  console.log(action.payloade);
  switch (action.type) {
    case "set_checkin":
      return {
        ...state,
        checkIn: action.payload.checkindate,
      };

    case "set_checkout":
      return {
        ...state,
        checkOut: action.payload.checkoutdate,
      };

    case "setbookingcart":
      return {
        ...state,
        dataobj: action.payload.dataobj,
      };

    case "setTotalAmount":
      return {
        ...state,
        setTotalAmount: action.payload.setTotalAmount,
      };

    case "userDetails":
      return {
        ...state,
        userdetail: [...state.userdetail, action.payloade],
      };

    default: {
      return state;
    }
  }
};

export default DatesReducer;
