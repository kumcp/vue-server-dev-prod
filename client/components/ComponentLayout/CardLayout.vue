<template>
    <div class="card">
        <div class="card-header">
            <slot name="card-header"></slot>
        </div>

        <div class="card-body">
            <slot name="card-body"></slot>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.card {
    position: relative;
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-direction: column;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
}
.card-header {
    padding: 0.75rem 1.25rem;
    margin-bottom: 0;
    background-color: rgba(0, 0, 0, 0.03);
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}
.card-body {
    -webkit-box-flex: 1;
    flex: 1 1 auto;
    padding: 1.25rem;
}
</style>
