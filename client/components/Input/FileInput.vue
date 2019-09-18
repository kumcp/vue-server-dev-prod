<template>
    <div class="file-input">
        <div class="input-group mb-3">
            <div class="custom-file">
                <input
                    type="file"
                    class="custom-file-input"
                    aria-describedby="inputFile"
                    @change="handleFileSelected"
                />
                <label class="custom-file-label" for="inputGroupFile01">{{
                    placeholder || 'Choose template file to upload'
                }}</label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        // placeholder: {
        //     type: [String],
        //     required: true,
        //     validator() {
        //         return true;
        //     }
        // },
        fileId: {
            type: [String],
            required: true
        }
    },
    data() {
        return {
            placeholder: ''
        };
    },
    methods: {
        handleFileSelected(e) {
            console.log('FileInput: emit fileSelected', e.target.files[0]);
            this.$emit('fileSelected', {
                fileId: this.fileId,
                file: e.target.files[0]
            });
        }
    }
};
</script>

<style scoped></style>
