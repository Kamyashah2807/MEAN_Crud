const express = require("express");
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId

const { employee } = require("../models");

router.get("/", (req, res) => {
    employee.find((err, data) => {
        if (!err) {
            res.send(data);
        }
        else {
            console.log("Error");
        }
    })
})

router.post("/", (req, res) => {
    const emp = new employee({
        name: req.body.name,
        email: req.body.email,
        salary: req.body.salary
    })

    emp.save((err, data) => {
        if (!err) {
            res.send(data);
        }
        else {
            console.log("Error");
        }
    })
})

router.get("/:id", (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No Record with this id: ${req.params.id}`);
    }

    employee.findById(req.params.id, (err, data) => {
        if (!err) {
            res.send(data);
        }
        else {
            console.log("Error");
        }
    })
})

router.put("/:id", (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No Record with this id: ${req.params.id}`);
    }

    const emp = {
        name: req.body.name,
        email: req.body.email,
        salary: req.body.salary
    }

    employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, data) => {
        if (!err) {
            res.send(data);
        }

        else {
            console.log(`Error`);
        }
    })
});

router.delete("/:id", (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No Record with this id: ${req.params.id}`);
    }
    employee.findByIdAndRemove(req.params.id, (err, data) => {
        if (!err) {
            res.send(data);
        }
        else {
            console.log(`Error`);
        }
    })
});

module.exports = router;