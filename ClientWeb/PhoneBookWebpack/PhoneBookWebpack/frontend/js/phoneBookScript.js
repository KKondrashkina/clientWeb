import "bootstrap/dist/css/bootstrap.css";
import "../css/style.scss";

import $ from "jquery";
import Vue from "vue";
import "bootstrap";

import PhoneBookService from "./phoneBookService"

Vue.component("contact", {
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    template: "#contact-template",
    methods: {
        remove: function () {
            this.$emit("delete-contact", this.item);
        },
        check: function () {
            this.$emit("check-contact", this.item);
        }
    }
});

Vue.component("phone-book-table", {
    props: {
        contacts: {
            type: Array,
            required: true
        }
    },
    data: function () {
        return {
            isAllChecked: false
        };
    },
    template: "#phone-book-table-template",
    methods: {
        deleteContact: function (item) {
            this.$emit("delete-item", item);
        },
        checkContact: function (item) {
            this.$emit("check-item", item);
        },
        checkAll: function () {
            this.isAllChecked = !this.isAllChecked;
            this.$emit("check-all", this.isAllChecked);
        }
    }
});

Vue.component("add-delete-form", {
    data: function () {
        return {
            lastName: "",
            name: "",
            phoneNumber: "",

            isValidLastName: false,
            isValidName: false,
            isValidPhoneNumber: false,

            isInvalidLastName: false,
            isInvalidName: false,
            isInvalidPhoneNumber: false,
        };
    },
    template: "#add-delete-form-template",
    methods: {
        addContact: function () {
            this.isInvalidLastName = this.lastName === "";
            this.isInvalidName = this.name === "";
            this.isInvalidPhoneNumber = this.phoneNumber === "" || isNaN(this.phoneNumber);

            this.isValidLastName = false;
            this.isValidName = false;
            this.isValidPhoneNumber = false;

            if (this.isInvalidLastName || this.isInvalidName || this.isInvalidPhoneNumber) {
                this.isValidLastName = !this.isInvalidLastName;
                this.isValidName = !this.isInvalidName;
                this.isValidPhoneNumber = !this.isInvalidPhoneNumber;

                return;
            }

            this.$emit("add-contact", this);

            this.lastName = "";
            this.name = "";
            this.phoneNumber = "";
        },
        deleteContacts: function () {
            this.$emit("delete-contacts");
        }
    }
});

Vue.component("navbar", {
    data: function () {
        return {
            isVisibleText: false,
            term: ""
        };
    },
    template: "#navbar-template",
    methods: {
        search: function () {
            this.isVisibleText = this.searchText !== "";
            this.$emit("search-contacts", this.term);
        },
        cancel: function () {
            this.isVisibleText = false;
            this.term = "";
            this.$emit("search-contacts", this.searchText);
        }
    }
});

Vue.component("phone-book", {
    data: function () {
        return {
            //service: new PhoneBookService(),
            contacts: [],
            itemId: 0
        };
    },
    template: "#phone-book-template",
    created: function () {
        this.getItems();
    },
    methods: {
        getItems: function (term) {
            var self = this;

            PhoneBookService.getContacts(term || "").done(function (contacts) {
                self.contacts = contacts;
            });
        },
        addItem: function (item) {
            var self = this;

            PhoneBookService.addContact({
                name: item.name,
                lastName: item.lastName,
                phoneNumber: item.phoneNumber,
                number: self.contacts.length + 1,
                isChecked: false,
                isVisible: true
            }).done(function (response) {
                if (!response.success) {
                    alert(response.message);
                    return;
                }

                self.getItems();
            });
        },
        deleteItem: function (item, isSeveral) {
            if (!isSeveral) {
                if (!confirm("Are you sure you want to delete " + item.lastName + " " + item.name + "?")) {
                    return;
                }
            }

            var self = this;

            PhoneBookService.deleteContact(item.id).done(function (response) {
                if (!response.success) {
                    alert(response.message);
                    return;
                }

                self.getItems();
            });
        },
        deleteItems: function () {
            var self = this;

            var checkedContacts = this.contacts.filter(function (e) {
                return e.isChecked;
            }, 0);

            var checkedContactsCount = checkedContacts.length;

            if (checkedContactsCount === 0) {
                alert("No contacts selected.");
                return;
            }

            if (!confirm("Are you sure you want to delete " + checkedContactsCount + " contacts?")) {
                return;
            }

            this.contacts.forEach(function (c) {
                if (c.isChecked) {
                    self.deleteItem(c, true);
                }
            });
        },
        checkItems: function (isAllChecked) {
            this.contacts.forEach(function (contact) {
                if (contact.isVisible) {
                    contact.isChecked = isAllChecked;
                }
            });
        },
        checkItem: function (item) {
            item.isChecked = !item.isChecked;
        }
    }
});

new Vue({
    el: "#app"
});
