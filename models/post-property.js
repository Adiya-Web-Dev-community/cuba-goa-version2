const mongoose = require("mongoose");

const PostPropertySchema = mongoose.Schema({

    resortName: { type: String },
    resortLocation: { type: String },
    resortDescription: { type: String },
    resortImgURL: { type: String },
    aboutUs: { type: String },
    resortAddress: { type: String },
    pincode: { type: String },
    resortPhoneNumber: { type: String },
    resortEmail: { type: String },
    cubaGoaHelpLineNumber: { type: String },
    rooms: [
        {
            imgUrl: [
                { type: String },
            ],
            roomType: { type: String },
            totalRooms: { type: Number },
            adultCapacity: { type: Number },
            childrenCapacity: { type: Number },
            availableRooms: { type: Number },
            weekdayPerNightRate: { type: Number },
            weekendPerNightRate: { type: Number },
            occassionName: { type: String },
            occassionStartDate: { type: String },
            occassionEndDate: { type: String },
            occassionPerNightRate: { type: Number },

            //aminities
            nonRefundable: { type: Boolean },
            wardrobe: { type: Boolean },
            breakfast: { type: Boolean },
            bedsideTable: { type: Boolean },
            mosquitonet: { type: Boolean },
            Wifi: { type: Boolean },
            houseKeeping: { type: Boolean },
            balcony: { type: Boolean },
            hotNcoldshower_24hrs: { type: Boolean },
            airconditioned: { type: Boolean, },
            roomService: { type: Boolean },
            seaView: { type: Boolean },
            fitnessCenter: { type: Boolean },
            swimmingPool: { type: Boolean },
            spa: { type: Boolean },
            roomId: { type: String }
        }
    ]
});

const PostProperty = mongoose.model("PostProperty", PostPropertySchema);

module.exports = PostProperty;
