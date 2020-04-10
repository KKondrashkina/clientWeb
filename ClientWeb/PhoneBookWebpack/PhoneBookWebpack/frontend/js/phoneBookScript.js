import "bootstrap/dist/css/bootstrap.css";
import "../css/style.scss";

import "bootstrap";
import Vue from "vue";

import PhoneBook from "./vue/PhoneBook.vue"

new Vue({
    el: "#app",
    components: {
        'phone-book': PhoneBook
    }
});