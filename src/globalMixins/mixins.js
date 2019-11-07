export default {
    methods: {
        $emitWarning(...args) {
            const eventName = args[0];
            if (!this.$listeners[eventName]) {
                console.warn(`Missing listener "${eventName}"`);
            }
            return this.$emit(...args);
        }
    }
};
