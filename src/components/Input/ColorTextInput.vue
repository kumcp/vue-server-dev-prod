<template>
    <input type="text" :value="value" v-bind="$attrs" @input="inputText" v-on="listenersNoInput" />
</template>

<script>
/**
 * A wrapper content for normal input.
 * Provide some default options and some types of content for reusing
 */
export default {
    props: {
        value: {
            required: false
        }
    },
    methods: {
        inputText(event) {
            this.$emit('input', event.target.value);
        }
    },
    computed: {
        listenersNoInput() {
            const listeners = Object.assign({}, this.$listeners);
            delete listeners.input;
            return listeners;
        }
    }
};
</script>

<style>
input {
    padding: 0.375rem 0.75rem;
    border: 1px solid #88888888;
}
</style>

<style scoped>
*:hover {
    transition: 0.3s;
    cursor: pointer;
}

*:focus {
    transition: 0.3s;
    outline: none;
    border-color: #88888888;
    box-shadow: 0 0 10px #88888888;
}
</style>
