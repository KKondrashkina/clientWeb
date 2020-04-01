import $ from "jquery";

export default {
    post: function (url, data) {
        return $.post({
            url: url,
            contentType: "application/json",
            data: JSON.stringify({ request: data })
        });
    },
    get: function (url, data) {
        return $.get(url, data);
    }
};

/*function PhoneBookService() {
    this.getContacts = function (term) {
        return $.get("/getContacts?term=" + term);
    };

    this.addContact = function (contact) {
        return $.post({
            url: "/addContact",
            contentType: "application/json",
            data: JSON.stringify({ request: contact })
        });
    };

    this.deleteContact = function (id) {
        return $.post({
            url: "/deleteContact",
            contentType: "application/json",
            data: JSON.stringify({ id: id })
        });
    };
}*/