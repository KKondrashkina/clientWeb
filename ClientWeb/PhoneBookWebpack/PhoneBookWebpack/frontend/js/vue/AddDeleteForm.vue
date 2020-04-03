<template>
    <div>
        <div>
            <div class="d-flex bd-highlight">
                <button @click="deleteContacts" type="button" class="btn btn-outline-danger btn-sm mt-3 ml-auto">Delete selected</button>
            </div>
        </div>
        <form>
            <div class="form-row">
                <div class="col-md-12 mb-2 mt-3">
                    <label for="validationCustom01">Last name</label>
                    <input v-model="lastName" type="text" :class="{'is-valid': isValidLastName, 'is-invalid': isInvalidLastName}" class="form-control" id="validationCustom01" placeholder="Last name" />
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                    <div class="invalid-feedback">
                        Enter your last name!
                    </div>
                </div>
            </div>

            <div class="form-row">
                <div class="col-md-12 mb-2">
                    <label for="validationCustom02">Name</label>
                    <input v-model="name" type="text" :class="{'is-valid': isValidName, 'is-invalid': isInvalidName}" class="form-control" id="validationCustom02" placeholder="Name" />
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                    <div class="invalid-feedback">
                        Enter your name!
                    </div>
                </div>
            </div>

            <div class="form-row mb-3">
                <div class="col-md-12">
                    <label for="validationCustom03">Phone number</label>
                    <input v-model="phoneNumber" type="text" :class="{'is-valid': isValidPhoneNumber, 'is-invalid': isInvalidPhoneNumber}" class="form-control" id="validationCustom03" placeholder="Phone number" />
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                    <div class="invalid-feedback">
                        Enter your phone number! <br>
                        Only digits allowed.
                    </div>
                </div>
            </div>

            <button class="btn btn-primary mb-3" type="button" @click="addContact">Add contact</button>
        </form>
    </div>
</template>

<script>
    export default {
        props: {
            isExist: {
                type: Boolean,
                required: true
            }
        },
        data() {
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
        watch: {
            isExist() {
                if (this.isExist === false) {
                    this.clearFields();
                }
            }
        },
        methods: {
            addContact() {
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
            deleteContacts() {
                this.$emit("delete-contacts");
            },
            clearFields() {
                this.lastName = "";
                this.name = "";
                this.phoneNumber = "";
                this.isExist = true;
            }
        }
    }
</script>