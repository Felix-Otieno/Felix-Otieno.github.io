
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
require("dotenv").config();

admin.initializeApp();
const db = admin.firestore();

const transporter =  nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
    }
});
//function to send emails to user after booking the location/stay

exports.sendEmailToUsersLogin = functions.firestore
.document("usersBookings/{docId}").onCreate(async (snapshot) => {
    const tourData = snapshot.data()
    const userEmail = tourData.email()

    const mailoptions = {
        from: process.env.USER_EMAIL,
        to: userEmail,
        subject: "Welcome",
        text: "karibu Kenya" 
    };

    try {
        await transporter.sendMail(mailoptions);
    } catch (error) {
        console.log("Error sending email", error);
    }
});
