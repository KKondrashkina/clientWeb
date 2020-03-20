Vue.component("contact", {
    props: ["item"],
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
    props: ["contacts"],
    data: function () {
        return {
            isAllChecked: false
        }
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
        }
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
            searchText: ""
        }
    },
    template: "#navbar-template",
    methods: {
        search: function () {
            this.isVisibleText = this.searchText !== "";
            this.$emit("search-contacts", this.searchText);
        },
        cancel: function () {
            this.isVisibleText = false;
            this.searchText = "";
            this.$emit("search-contacts", this.searchText);
        }
    }
});

Vue.component("phone-book", {
    data: function () {
        return {
            contacts: []
        }
    },
    template: "#phone-book-template",
    methods: {
        addItem: function (item) {
            var isExist = false;

            this.contacts.forEach(function (contact) {
                if (item.phoneNumber === contact.phoneNumber) {
                    if (confirm("Contact with this phone number already exists. Update the data?")) {
                        contact.lastName = item.lastName;
                        contact.name = item.name;
                    }

                    isExist = true;
                    return;
                }
            });

            if (isExist) {
                return;
            }

            this.contacts.push({
                id: this.contacts.length + 1,
                name: item.name,
                lastName: item.lastName,
                phoneNumber: item.phoneNumber,
                isChecked: false,
                isVisible: true
            });
        },
        deleteItem: function (item) {
            if (!confirm("Are you sure you want to delete " + item.lastName + " " + item.name + "?")) {
                return;
            }

            this.contacts = this.contacts.filter(function (e) {
                return e.id !== item.id;
            });

            this.contacts.forEach(function (contact, i) {
                if (i >= item.id - 1) {
                    contact.id = i + 1;
                }

                i++;
            });
        },
        deleteItems: function () {
            var checkedContactsCount = 0;

            this.contacts.forEach(function (contact) {
                if (contact.isChecked) {
                    checkedContactsCount++;
                }
            });

            if (!confirm("Are you sure you want to delete " + checkedContactsCount + " contacts?")) {
                return;
            }

            this.contacts = this.contacts.filter(function (e) {
                return !e.isChecked;
            });

            this.contacts.forEach(function (contact, i) {
                contact.id = i + 1;
                i++;
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
        },
        searchItems: function (text) {
            this.contacts.forEach(function (contact) {
                contact.isVisible = contact.lastName.indexOf(text) >= 0 || contact.name.indexOf(text) >= 0 || contact.phoneNumber.indexOf(text) >= 0;

                if (contact.isChecked && !contact.isVisible) {
                    contact.isChecked = false;
                }
            });
        }
    }
});

new Vue({
    el: "#app"
});
