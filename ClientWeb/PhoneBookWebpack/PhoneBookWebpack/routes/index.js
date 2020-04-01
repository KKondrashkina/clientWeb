var express = require('express');
var router = express.Router();

var contacts = [];
var newId = 1;

router.get("/getContacts", function (req, res) {
    var term = (req.query.term || "").toLowerCase();

    var filteredContacts = term.length === 0 ? contacts : contacts.filter(function (c) {
        return c.name.toLowerCase().indexOf(term) >= 0
            || c.lastName.toLowerCase().indexOf(term) >= 0
            || c.phoneNumber.indexOf(term) >= 0;
    });

    res.send(filteredContacts);
});

router.post("/deleteContact", function (req, res) {
    var id = req.body.request;

    var contact = contacts.find(function (c) {
        return c.id === id;
    });

    if (contact === undefined) {
        res.send({
            success: false,
            message: "Contact with id = " + id + " not found"
        });

        return;
    }

    contacts = contacts.filter(function (c) {
        return c.id !== id;
    });

    contacts.forEach(function (c, i) {
        if (i >= contact.number - 1) {
            c.number = i + 1;
        }

        i++;
    });

    res.send({
        success: true,
        message: null
    });
});

router.post("/addContact", function (req, res) {
    var contact = req.body.request;

    var isContactExist = contacts.some(function (c) {
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
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
