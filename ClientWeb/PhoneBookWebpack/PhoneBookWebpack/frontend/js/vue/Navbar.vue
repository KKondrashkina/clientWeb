<template>
    <nav class="navbar navbar-dark sticky-top bg-dark">
        <a class="navbar-brand">Phone-book</a>
        <form class="form-inline">
            <input @keyup="search" v-model="term" class="form-control mr-sm-2 mr-1" placeholder="Search">
            <button @click="cancel" class="btn btn-outline-secondary my-2 my-sm-0" title="Cancel" type="button">Cancel</button>
        </form>
    </nav>
</template>

<script>
    export default {
        data() {
            return {
                isVisibleText: false,
                term: ""
            };
        },
        template: "#navbar-template",
        methods: {
            search() {
                this.isVisibleText = this.searchText !== "";
                this.$emit("search-contacts", this.term);
            },
            cancel() {
                this.isVisibleText = false;
                this.term = "";
                this.$emit("search-contacts", this.searchText);
            }
        }
    }
</script>