const express = require('express');
const router = express.Router();

let contacts = [];
let newId = 1;

router.get("/getContacts", (req, res) => {
    const term = (req.query.term || "").toLowerCase();

    const filteredContacts = term.length === 0 ? contacts : contacts.filter(c => {
        return c.name.toLowerCase().indexOf(term) >= 0
            || c.lastName.toLowerCase().indexOf(term) >= 0
            || c.phoneNumber.indexOf(term) >= 0;
    });

    res.send(filteredContacts);
});

router.post("/deleteContact", (req, res) => {
    const id = req.body.request;

    const contact = contacts.find(c => {
        return c.id === id;
    });

    if (contact === undefined) {
        res.send({
            success: false,
            message: "Contact with id = " + id + " not found"
        });

        return;
    }

    contacts = contacts.filter(c => {
        return c.id !== id;
    });

    res.send({
        success: true,
        message: null
    });
});

router.post("/addContact", (req, res) => {
    const contact = req.body.request;

    const isContactExist = contacts.some(c => {
        return c.phoneNumber.toLowerCase() === contact.phoneNumber.toLowerCase();
    });

    if (isContactExist) {
        res.send({
            success: false,
            message: "Contact with this phone number already exists."
        });

        return;
    }

    contact.id = newId;
    newId++;

    contacts.push(contact);

    res.send({
        success: true,
        message: null
    });
});

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

module.exports = router;
