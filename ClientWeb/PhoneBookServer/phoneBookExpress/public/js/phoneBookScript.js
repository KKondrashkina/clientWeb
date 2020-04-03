function PhoneBookService() {
    this.getContacts = function (term) {
        return get("/getContacts", { term: term });
    };

    this.addContact = function (contact) {
        return post("/addContact", contact);
    };

    this.deleteContact = function (id) {
        return post("/deleteContact", id);
    };
}

function post(url, data) {
    return $.post({
        url: url,
        contentType: "application/json",
        data: JSON.stringify({ request: data })
    });
}

function get(url, data) {
    return $.get({
        url: url,
        data: data
    });
}

Vue.component("contact", {
    props: {
        item: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
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
    props: {
        isExist: {
            type: Boolean,
            required: true
        }
    },
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
    watch: {
        isExist: function () {
            var self = this;

            if (this.isExist === false) {
                self.clearFields();
            }
        }
    },
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
        },
        deleteContacts: function () {
            this.$emit("delete-contacts");
        },
        clearFields: function () {
            this.lastName = "";
            this.name = "";
            this.phoneNumber = "";
            this.isExist = true;
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
            service: new PhoneBookService(),
            contacts: [],
            isExist: true,
            checkedContactsId: []
        };
    },
    template: "#phone-book-template",
    created: function () {
        this.getItems();
    },
    methods: {
        getItems: function (term) {
            var self = this;

            this.service.getContacts(term || "").done(function (contacts) {
                self.contacts = contacts.map(function (c) {
                    return {
                        name: c.name,
                        lastName: c.lastName,
                        phoneNumber: c.phoneNumber,
                        id: c.id,
                        isChecked: (self.checkedContactsId).includes(c.id) || false
                    };
                });
            });
        },
        addItem: function (item) {
            var self = this;

            this.service.addContact({
                name: item.name,
                lastName: item.lastName,
                phoneNumber: item.phoneNumber
            }).done(function (response) {
                if (!response.success) {
                    bootbox.alert(response.message);
                    return;
                }

                self.isExist = false;

                self.getItems();
            });
        },
        remove: function (item) {
            var self = this;

            this.service.deleteContact(item.id).done(function (response) {
                if (!response.success) {
                    bootbox.alert(response.message);
                    return;
                }

                self.getItems();
            });
        },
        deleteItem: function (item) {
            var self = this;

            bootbox.confirm("Are you sure you want to delete " + item.lastName + " " + item.name + "?", function (result) {
                if (!result) {
                    return;
                }

                self.remove(item);
            });
        },
        deleteItems: function () {
            var self = this;

            var checkedContacts = this.contacts.filter(function (e) {
                return e.isChecked;
            }, 0);

            var checkedContactsCount = checkedContacts.length;

            if (checkedContactsCount === 0) {
                bootbox.alert("No contacts selected.");
                return;
            }

            bootbox.confirm("Are you sure you want to delete " + checkedContactsCount + " contacts?", function (result) {
                if (!result) {
                    return;
                }

                self.contacts.forEach(function (c) {
                    if (c.isChecked) {
                        self.remove(c);
                    }
                });
            })
        },
        checkItems: function (isAllChecked) {
            this.contacts.forEach(function (c) {
                c.isChecked = isAllChecked;
            });

            var self = this;
            this.checkedContactsId = [];

            if (isAllChecked) {
                this.contacts.forEach(function (c) {
                    self.checkedContactsId.push(c.id);
                });
            }
        },
        checkItem: function (item) {
            item.isChecked = !item.isChecked;
            if (item.isChecked) {
                this.checkedContactsId.push(item.id);
            } else {
                this.checkedContactsId = this.checkedContactsId.filter(function (c) {
                    return c.id !== item.id;
                });
            }
        }
    }
});

new Vue({
    el: "#app"
});
