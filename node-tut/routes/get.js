const express = require('express');
const product = require('../product');
const {getApi,postApi,putApi,deleteApi,searchApi} = require('../controller/apicontroller')
const app = express();
require('../config')
app.use(express.json());

app.route("/lists").get(getApi);

app.route("/create").post(postApi)

app.route("/delete/:_id").delete(deleteApi)

app.route("/update/:_id").put(putApi)

app.route("/search/:key").get(searchApi)
module.exports = app;


