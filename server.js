const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./db.js');

app.get(`/`, (req, res, next) => {

    try {
        res.sendfile(__dirname + '/index.html')
    }
    catch (e) {
        next(e)
    }
});

app.get(`/api/users`, async (req, res, next) => {

    try {
        res.send(await db.findAllOffices())
    }
    catch (e) {
        next(e)
    }
});

app.get(`/api/departments`, async (req, res, next) => {

    try {
        res.send(await db.findAllDepartments())
    }
    catch (e) {
        next(e)
    }
});


db.sync()
    .then(() => app.listen(PORT));


