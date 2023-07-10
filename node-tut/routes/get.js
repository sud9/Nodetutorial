const express = require('express');
const {getApi,postApi,putApi,deleteApi,searchApi,Loginapi,sendMail,ForgotPassword,generateotp,Verifyotp,authenticateToken} = require('../controller/apicontroller')

const app = express();
require('../config')

app.use(express.json());

app.route("/lists").get(getApi);

app.route("/login").post(Loginapi);

app.route("/create").post(postApi)

app.route("/delete/:_id").delete(deleteApi)

app.route("/update/:_id").put(putApi)

app.route("/search/:key").get(searchApi)

app.route("/forgot-password").post(ForgotPassword)

// app.route("/reset-password/:id/:token").get(Resetpasscode)
app.route("/reset-password").put(authenticateToken,(ForgotPassword))
app.route("/generate-otp").post(generateotp)
app.route("/verify-otp").post(Verifyotp)
// app.route("/sendmail").post(sendMail)
// app.route('/forgot').post(changePassword)
module.exports = app;


