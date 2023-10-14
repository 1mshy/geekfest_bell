const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8080;
const Password = require('./models/Password');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    res.send(await Password.find({}));
});

app.get('/:id', async (req, res) => {
    try {
        const password = await Password.findById(req.params.id);
        res.send(password);
    } catch (e) {
        res.send("Password not found")
    }
});

app.post('/', async (req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, 12);
    try {
        const password = new Password({
            website: req.body.website,
            password: req.body.password
        });
        await password.save();
        res.send(password);
    } catch (error) {
        res.send(error);
    }
});

app.listen(port, () => {
    console.log("Server is running on port: " + port);
});

app.all('*', (req, res, next) => {
    next(new Error('Page not found'));
});

app.use((err, req, res, next) => {
    console.log(err.message);
});