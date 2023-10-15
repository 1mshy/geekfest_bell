const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const Password = require('./models/Password');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const ExpressError = require('./utils/ExpressError');
const catchAsync = require('./utils/catchAsync');
require('dotenv').config();

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

app.get('/', catchAsync(async (req, res, next) => {
    res.send(await Password.find({}));
}));

app.post('/', catchAsync(async (req, res, next) => {
    if (req.body.password)
        req.body.password = await bcrypt.hash(req.body.password, 12);
    const password = new Password({
        website: req.body.website,
        password: req.body.password
    });
    await password.save();
    res.send("Password saved");
}));

app.get('/:id', catchAsync(async (req, res, next) => {
    const password = await Password.findById(req.params.id);
    res.send(password);
}));

app.listen(port, () => {
    console.log("Server is running on port: " + port);
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong!' } = err;
    const updatedErr = new ExpressError(message, statusCode);
    res.status(statusCode).send(updatedErr);
});