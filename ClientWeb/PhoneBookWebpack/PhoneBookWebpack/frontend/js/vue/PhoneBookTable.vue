<template>
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th>
                    <div class="custom-control custom-checkbox">
                        <input @change="checkAll" type="checkbox" class="custom-control-input" id="customCheck">
                        <label class="custom-control-label" for="customCheck"></label>
                    </div>
                </th>
                <th>№</th>
                <th>Last Name</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th></th>
            </tr>
        </thead>

        <tbody>
            <contact v-for="(item, index) in contacts" @delete-contact="deleteContact" @check-contact="checkContact" :key="item.id" :index="index" :item="item"></contact>
        </tbody>
    </table>
</template>

<script>
    import Contact from "./Contact.vue";

    export default {
        props: {
            contacts: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                isAllChecked: false
            };
        },
        components: {
            'contact': Contact
        },
        methods: {
            deleteContact(item) {
                this.$emit("delete-item", item);
            },
            checkContact(item) {
                this.$emit("check-item", item);
            },
            checkAll() {
                this.isAllChecked = !this.isAllChecked;
                this.$emit("check-all", this.isAllChecked);
            }
        }
    }
</script>