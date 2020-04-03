import $ from "jquery";

export default {
    post(url, data) {
        return $.post({
            url,
            contentType: "application/json",
            data: JSON.stringify({ request: data })
        });
    },
    get(url, data) {
        return $.get(url, data);
    }
};