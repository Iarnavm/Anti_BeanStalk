require("dotenv").config();

const express = require('express');
const cors = require('cors');
const path = require('path')
const axios = require('axios');
const app = express();
const helpers = require('./public/js/helper');
const { type } = require("os");
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname , 'public')));

app.post('/', async (request, response) => {
    // Extract the website URL from the request parameters
    const websiteURL = request.body.websiteURL;
    console.log(websiteURL)
    // Call testIfPhishy with the extracted website URL
    const check = await helpers.testIfWebsitePhishy(websiteURL);
    response.json({'phishingWebsite': check});
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
