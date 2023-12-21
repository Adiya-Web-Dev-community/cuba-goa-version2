const express = require("express");
const adminMiddleware = require('../middleware/admin')

const router = express.Router();
const Contactus = require('../models/contactus')
const nodemailer = require('nodemailer')

router.post("/contactus", async (req, res) => {
    try {
        const contactus = await Contactus.create(req.body);
        console.log('contact query', contactus)
        res.status(200).json(contactus);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});


router.get('/contactus', adminMiddleware, async (req, res) => {
    try {
        const queries = await Contactus.find();
        res.status(200).json(queries);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})


//send mail on contact us query acknowledgement

router.post('/query-acknowledgement-mail', adminMiddleware, async (req, res) => {
    console.log(req.body);
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: req.body.email,
            subject: "Query Acknowledgement Mail",
            text: `
  
        Dear ${req.body.firstName + " " + req.body.lastName},
        
        I would like to express my sincere gratitude for the reservation you made for our upcoming event. Your professionalism and efficiency in handling the process have been truly commendable.
        From the moment we reached out to inquire about availability to the final confirmation, your team has been incredibly helpful and accommodating. The seamless communication and attention to detail have made the entire reservation experience smooth and hassle-free.
        We are particularly grateful for your efforts in understanding our specific requirements and ensuring that everything is in place for our event. Your expertise and willingness to go the extra mile have exceeded our expectations.
        The venue itself is absolutely stunning, and we are thrilled to have the opportunity to host our event there. The facilities are top-notch, and the ambiance perfectly matches the vision we had in mind. We are confident that our guests will be equally impressed and thoroughly enjoy their time at your establishment.
        Once again, please accept our heartfelt thanks for your exceptional service. We genuinely appreciate your dedication and commitment to making our event a success. We look forward to working with you and your team in the future and will gladly recommend your venue to others seeking a memorable experience.
        
        With sincere appreciation,
        CUBA GOA
        `
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: error })
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(201).json({ message: "success", data: info.response });
            }
        })

    }
    catch (err) {
        console.log(error)
        res.status(401).json({ message: err })
    }
})

module.exports = router
