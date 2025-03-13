import React, { useState } from "react";
import {
  CreditCard,
  Smartphone,
  CheckCircle,
  Shield,
  AlertCircle,
} from "lucide-react";
import { SiGooglepay, SiPhonepe } from "react-icons/si";
import "./Payment.css";

const Payment = ({ bookingDetails }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});
  const totalAmount = bookingDetails?.amount || 1999;

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: <CreditCard size={30} />,
    },
    {
      id: "gpay",
      name: "Google Pay",
      icon: <SiGooglepay size={30} style={{ color: "#4285F4" }} />,
    },
    {
      id: "phonepe",
      name: "PhonePe",
      icon: <SiPhonepe size={30} style={{ color: "#5f259f" }} />,
    },
    {
      id: "upi",
      name: "UPI",
      icon: <Smartphone size={30} />,
    },
  ];

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const parts = [];
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.slice(i, i + 4));
    }
    return parts.join(" ").substr(0, 19);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value);
    } else if (name === "expiryDate") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .substr(0, 5);
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").substr(0, 3);
    }

    setPaymentDetails((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsSuccess(true);
      setIsLoading(false);
    }, 2000);
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case "card":
        return (
          <div className="form-group">
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={paymentDetails.cardNumber}
                onChange={handleInputChange}
                maxLength="19"
              />
            </div>
            <div className="form-group">
              <label>Card Holder Name</label>
              <input
                type="text"
                name="cardHolder"
                placeholder="JOHN DOE"
                value={paymentDetails.cardHolder}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={paymentDetails.expiryDate}
                  onChange={handleInputChange}
                  maxLength="5"
                />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input
                  type="password"
                  name="cvv"
                  placeholder="123"
                  value={paymentDetails.cvv}
                  onChange={handleInputChange}
                  maxLength="3"
                />
              </div>
            </div>
          </div>
        );

      case "upi":
      case "gpay":
      case "phonepe":
        return (
          <div className="form-group">
            <label>{paymentMethod === "upi" ? "UPI ID" : "Phone Number"}</label>
            <input
              type={paymentMethod === "upi" ? "text" : "tel"}
              name={paymentMethod === "upi" ? "upiId" : "phoneNumber"}
              placeholder={
                paymentMethod === "upi"
                  ? "yourname@upi"
                  : "10-digit phone number"
              }
              value={
                paymentMethod === "upi"
                  ? paymentDetails.upiId
                  : paymentDetails.phoneNumber
              }
              onChange={handleInputChange}
            />
          </div>
        );

      default:
        return null;
    }
  };

  if (isSuccess) {
    return (
      <div className="success-message">
        <CheckCircle size={48} />
        <h2>Payment Successful!</h2>
        <p>Your booking has been confirmed.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="payment-containers">
        <h2>Complete Your Booking</h2>

        <div className="booking-summary">
          <h3>Booking Details</h3>
          <div className="summary-row">
            <span>Name</span>
            <strong>{bookingDetails?.name || "John Doe"}</strong>
          </div>
          <div className="summary-row">
            <span>Date</span>
            <strong>{bookingDetails?.date || "21 Feb 2024"}</strong>
          </div>
          <div className="summary-row">
            <span>Service</span>
            <strong>{bookingDetails?.therapyChoice || "Spa Therapy"}</strong>
          </div>
          <div className="summary-row">
            <span>Amount</span>
            <strong>₹{totalAmount}</strong>
          </div>
        </div>
      </div>
      <div className="payment-container">
        <div className="payment-left">
          <img
            src="https://cdn.dribbble.com/userupload/4167565/file/original-56d19f3b52a65668aa7e1c26b79bdc4f.jpg?resize=1504x1128&vertical=center"
            alt="Spa relaxation"
            className="payment-image"
          />
        </div>

        <div className="payment-right">
         <h2>Select Your Payment Method  </h2>
          <div className="payment-methods">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`method-card ${
                  paymentMethod === method.id ? "active" : ""
                }`}
                onClick={() => setPaymentMethod(method.id)}
              >
                <div className="method-icon">
                  {method.icon}
                  <span>{method.name}</span>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="payment-form">
            {renderPaymentForm()}

            {errors.submit && (
              <div className="error-message">
                <AlertCircle size={16} />
                {errors.submit}
              </div>
            )}

            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : `Pay ₹${totalAmount}`}
            </button>

            <div className="security-badge">
              <Shield size={16} />
              <span>Your payment is secure and encrypted</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
