import Ajax from "./ajax";

export default {
    getContacts: function (term) {
        var data = {
            term: term
        };

        return Ajax.get("/getContacts", data);
    },
    addContact: function (contact) {
        return Ajax.post("/addContact", contact);
    },
    deleteContact: function (id) {
        return Ajax.post("/deleteContact", id);
    }
};