<template>
    <tr :class="{'table-primary': item.isChecked}">
        <td>
            <div class="custom-control custom-checkbox">
                <input @change="check" :checked="item.isChecked" type="checkbox" class="custom-control-input" :id="item.id">
                <label class="custom-control-label" :for="item.id"></label>
            </div>
        </td>
        <td v-text="index + 1" class="contact-id"></td>
        <td v-text="item.lastName"></td>
        <td v-text="item.name"></td>
        <td v-text="item.phoneNumber"></td>
        <td>
            <button @click="remove" type="button" title="Remove contact" class="btn btn-outline-danger btn-sm">╳</button>
        </td>
    </tr>
</template>

<script>
    export default {
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
        methods: {
            remove() {
                this.$emit("delete-contact", this.item);
            },
            check() {
                this.$emit("check-contact", this.item);
            }
        }
    }
</script>