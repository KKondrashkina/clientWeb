import Ajax from "./ajax";

export default {
    getContacts(term) {
        return Ajax.get("/getContacts", { term: term });
    },
    addContact(contact) {
        return Ajax.post("/addContact", contact);
    },
    deleteContact(id) {
        return Ajax.post("/deleteContact", id);
    }
};