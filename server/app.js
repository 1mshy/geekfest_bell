const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8080;
const Password = require('./models/Password');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    res.send("Hello Luca Lapenna");
});

app.post('/api/password', async (req, res) => {
    try {
        const password = new Password({
            website: req.body.website,
            password: req.body.password
        });
        await password.save();
        res.send(password);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log("Server is running on port: " + port);
});

