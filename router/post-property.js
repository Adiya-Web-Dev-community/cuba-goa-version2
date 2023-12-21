
require("dotenv").config();

const express = require("express");
const router = express.Router();
const HotelBook = require("../models/post-property");
const adminMiddleware=require('../middleware/admin')


//post new property
router.post("/hotelbook", adminMiddleware, async (req, res) => {
  try {
    const resortData = await HotelBook.create(req.body);
    // console.log(resortData)
    res.json({ success: true, data: resortData });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});


//to update only rooms by id
router.put("/hotelbook/:id", adminMiddleware, async (req, res) => {
//   console.log(req.params.id)
  // res.json({message: req.body})
  try {
    const { id } = req.params;
    const hotelBook = await HotelBook.findByIdAndUpdate(id, { rooms: req.body.rooms });
    //we cannot find any product in database
    if (!hotelBook) {
      return res
        .status(404)
        .json({ message: `cannot find any hotel Book with ${id}` });
    }
    const updatedHotelBook = await HotelBook.findById(id);
    res.status(200).json(updatedHotelBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



//to update whole Resort by id
router.put("/entire-hotelbook/:id", adminMiddleware, async (req, res) => {
  // console.log(req.params.id)
  // res.json({message: req.body})
  try {
    const { id } = req.params;
    const hotelBook = await HotelBook.findByIdAndUpdate(id, req.body);
    //we cannot find any product in database
    if (!hotelBook) {
      return res
        .status(404)
        .json({ message: `cannot find any hotel Book with ${id}` });
    }
    const updatedHotelBook = await HotelBook.findById(id);
    res.status(200).json(updatedHotelBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



//GET ALL HOTEL DATA TO SHOW TO CLIENTS
router.get("/hotelbook", async (req, res) => {
  try {
    const hotelBook = await HotelBook.find({});

    res.status(200).json(hotelBook);
  } catch (error) {
    res.status(5009).json({ message: error.message });
  }
});


//GET SPECIFIC HOTEL BY ID
router.get("/resort-details/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const resortData = await HotelBook.find({ _id: id });
    res.json({ success: true, resortData: resortData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



//get specific room details
router.get('/resort-room/:resortId/:roomId', async (req, resp) => {
  const { resortId, roomId } = req.params
  // console.log(resortId, roomId)
  try {
    const resort = await HotelBook.findOne({ _id: resortId })
    let resortRoom = resort.rooms.find((room) => room.roomId === roomId)
    resp.json({ success: true, data: resortRoom })
  }
  catch (err) {
    resp.json({ success: false, message: `cannot find data ${err}`, })
  }
})


// delete a hotel Book
router.delete("/hotelbook/:id", adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const hotelBook = await HotelBook.findByIdAndDelete(id, req.body);
    //we cannot find any product in database
    if (!hotelBook) {
      return res
        .status(404)
        .json({ message: `cannot find any hotel Book with ${id}` });
    }

    res.status(200).json(hotelBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




router.get('/images', async (req, resp) => {
  const imgArr = []
  try {
    const Data = await HotelBook.find()
    for (let property of Data) {
      for (let i = 0; i < property.rooms.length; i++) {
        for (let j = 0; j < property.rooms[i].imgUrl.length; j++) {
          imgArr.push(property.rooms[i].imgUrl[j])
        }
      }
    }
    // console.log('imgArr=>', imgArr)
    resp.json({ success: true, data: imgArr })
  }
  catch (err) {
    resp.json({ success: false, message: err })
  }
})


//get images of specific resort
router.post('/images/:id', async (req, resp) => {
  const resortId = req.params.id
//   console.log(resortId)
  try {
    // console.log(resortId)
    const resort = await HotelBook.find({ _id: resortId })
    console.log('clicked resort for images', resort)
    resp.json({ success: true, resort: resort })
  }
  catch (err) {
    resp.json({ success: false, message: err })
  }
})


// delete a hotel Book
router.delete("/hotelbook/:id", adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const hotelBook = await HotelBook.findByIdAndDelete(id, req.body);
    //we cannot find any product in database
    if (!hotelBook) {
      return res
        .status(404)
        .json({ message: `cannot find any hotel Book with ${id}` });
    }

    res.status(200).json(hotelBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});






module.exports = router;
