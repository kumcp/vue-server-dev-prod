<template>
    <div class="checkbox-inline">
        <input style="display: none;" :value="value" type="checkbox" :id="name" @click="update" />
        <label :for="name">
            <span> {{ label }} </span>
            <div class="checkmark">
                <img v-if="value" width="30px" height="30px" src="../../assets/check_box_on.png" />
                <img v-else width="30px" height="30px" src="../../assets/check_box_off.png" />
            </div>
        </label>
    </div>
</template>

<script>
export default {
    name: 'checkbox',
    props: ['label', 'value', 'name'],
    data() {
        return {
            idCheckbox: new Date().toTimeString()
        };
    },
    methods: {
        update() {
            this.$emit('input', !this.value);
        }
    },
    computed: {
        valueSelf() {
            return this.value;
        }
    }
};
</script>

<style scoped>
.checkbox-inline > * {
    float: right;
}
.checkmark {
    margin: -0.4em 0px;
    display: inline-block;
}
</style>
