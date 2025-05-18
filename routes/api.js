const express = require("express");
const router = express.Router();

router.get('/hello', (req, res) => {
    console.log("Hello from the API route!");
    res.json({ 'message': "Hello! We will start the server soon!" });
});


module.exports = router;