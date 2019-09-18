<template>
    <div class="template-exporting">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title">{{ title || 'Title' }}</h5>
                <div class="card-header-button">
                    <button
                        type="button"
                        class="btn btn-outline-primary"
                        @click="onDownloadClicked"
                    >
                        {{ downloadButtonText || 'Download' }}
                    </button>
                    <button type="button" class="btn btn-outline-primary" @click="onUploadClicked">
                        {{ uploadButtonText || 'Upload' }}
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
                                placeholder || 'Choose template file to upload'
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
    name: 'templateExporting',
    props: {
        title: {
            type: [String],
            required: true,
            validator() {
                return true;
            }
        },
        placeholder: {
            type: [String],
            required: true,
            validator() {
                return true;
            }
        },
        downloadButtonText: {
            type: [String],
            required: true,
            validator() {
                return true;
            }
        },
        uploadButtonText: {
            type: [String],
            required: true,
            validator() {
                return true;
            }
        }
    },
    data() {
        return {};
    },
    methods: {
        onUploadClicked() {
            console.log('Emitted uploadClicked');
            return this.$emit('uploadClicked');
        },
        onDownloadClicked() {
            console.log('Emitted downloadClicked');
            return this.$emit('downloadClicked');
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
