<template>
    <div>
        <navbar @search-contacts="getItems"></navbar>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-sm-6 col-lg-2">
                    <add-delete-form @add-contact="addItem" @delete-contacts="deleteItems" :is-exist="isExist"></add-delete-form>
                </div>

                <div class="col-lg-10">
                    <phone-book-table @delete-item="deleteItem" @check-item="checkItem" @check-all="checkItems" :contacts="contacts"></phone-book-table>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import Bootbox from "bootbox";
    import PhoneBookService from "../phoneBookService"

    import Navbar from "./Navbar.vue";
    import AddDeleteForm from "./AddDeleteForm.vue";
    import PhoneBookTable from "./PhoneBookTable.vue";

    export default {
        data() {
            return {
                contacts: [],
                isExist: true,
                checkedContactsIds: []
            };
        },
        components: {
            'navbar': Navbar,
            'add-delete-form': AddDeleteForm,
            'phone-book-table': PhoneBookTable
        },
        created() {
            this.getItems();
        },
        methods: {
            getItems(term) {
                PhoneBookService.getContacts(term || "").done(contacts => {
                    this.contacts = contacts.map(c => ({
                        name: c.name,
                        lastName: c.lastName,
                        phoneNumber: c.phoneNumber,
                        id: c.id,
                        isChecked: this.checkedContactsIds.indexOf(c.id) >= 0
                    }));
                });
            },
            addItem(item) {
                PhoneBookService.addContact({
                    name: item.name,
                    lastName: item.lastName,
                    phoneNumber: item.phoneNumber
                }).done(response => {
                    if (!response.success) {
                        Bootbox.alert(response.message);
                        return;
                    }

                    this.isExist = false;
                    this.getItems();
                });
            },
            remove(item) {
                PhoneBookService.deleteContact(item.id).done(response => {
                    if (!response.success) {
                        Bootbox.alert(response.message);
                        return;
                    }

                    this.getItems();
                });
            },
            deleteItem(item) {
                Bootbox.confirm("Are you sure you want to delete " + item.lastName + " " + item.name + "?", result => {
                    if (!result) {
                        return;
                    }

                    this.remove(item);
                });
            },
            deleteItems() {
                const checkedContacts = this.contacts.filter(e => e.isChecked, 0);

                const checkedContactsCount = checkedContacts.length;

                if (checkedContactsCount === 0) {
                    Bootbox.alert("No contacts selected.");
                    return;
                }

                Bootbox.confirm("Are you sure you want to delete " + checkedContactsCount + " contacts?", result => {
                    if (!result) {
                        return;
                    }

                    this.contacts.forEach(c => {
                        if (c.isChecked) {
                            this.remove(c);
                        }
                    });
                });
            },
            checkItems(isAllChecked) {
                this.contacts.forEach(c => {
                    c.isChecked = isAllChecked;
                });

                this.checkedContactsIds = [];

                if (isAllChecked) {
                    this.checkedContactsIds = this.contacts.map(c => c.id);
                }
            },
            checkItem(item) {
                item.isChecked = !item.isChecked;

                if (item.isChecked) {
                    this.checkedContactsIds.push(item.id);
                } else {
                    this.checkedContactsIds = this.checkedContactsIds.filter(c => c !== item.id);
                }
            }
        }
    }
</script>