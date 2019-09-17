<template>
    <div class="template-exporting">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title">{{ title }}</h5>
                <div class="card-header-button">
                    <button
                        type="button"
                        class="btn btn-outline-primary"
                        @click="onDownloadClicked"
                    >
                        {{ downloadButtonText }}
                    </button>
                    <button type="button" class="btn btn-outline-primary" @click="onUploadClicked">
                        {{ uploadButtonText }}
                    </button>
                </div>
            </div>

            <div class="card-body">
                <div class="file-input">
                    <div class="input-group mb-3">
                        <div class="custom-file">
                            <input
                                type="file"
                                class="custom-file-input"
                                id="inputFile"
                                aria-describedby="inputFile"
                            />
                            <label class="custom-file-label" for="inputGroupFile01">{{
                                placeholder
                            }}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
    data() {
        return {
            title: 'Featured',
            placeholder: 'Choose template file to upload',
            downloadButtonText: 'Download',
            uploadButtonText: 'Upload'
        };
    },
    methods: {
        onUploadClicked() {
            console.log('Clicked on Upload');
        },
        onDownloadClicked() {
            console.log('Clicked on Download');
        }
    }
};
</script>

<style>
.template-exporting {
    padding: 6px;
}

.template-exporting .card-title {
    display: block;
    float: left;
    margin-bottom: 0px;
}

.card-header-button {
    float: right;
}

.card-header-button button {
    margin-left: 6px;
}

.template-exporting .content {
    display: block;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border: 1px solid #000;
    padding: 6px;
}
</style>
