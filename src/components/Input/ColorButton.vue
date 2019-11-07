<template>
    <button v-bind="$props" v-on="$listeners">
        <slot></slot>
    </button>
</template>

<script>
/**
 * A wrapper content for normal button.
 * Provide some default options and some types of content for reusing
 */
export default {};
</script>

<style>
button {
    padding: 0.375em;
    display: inline-block;
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    -webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
        -webkit-box-shadow 0.15s ease-in-out;
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

.btn-outline-primary {
    color: #007bff;
    border-color: #007bff;
}
.btn-outline-primary:hover {
    color: #ffffff;
    border-color: #007bff;
    background-color: #007bff;
}

.btn-outline-secondary {
    color: #6c757d;
    border-color: #6c757d;
}
.btn-outline-secondary:hover {
    color: #ffffff;
    border-color: #6c757d;
    background-color: #6c757d;
}
</style>
