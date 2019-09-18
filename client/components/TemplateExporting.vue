<template>
    <div class="template-exporting">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title">{{ title || 'Title' }}</h5>
                <div class="card-header-button">
                    <button
                        v-if="downloadButtonText"
                        type="button"
                        class="btn btn-outline-primary"
                        @click="onDownloadClicked"
                    >
                        {{ downloadButtonText }}
                    </button>
                    <button
                        v-if="uploadButtonText"
                        type="button"
                        class="btn btn-outline-primary"
                        @click="onUploadClicked"
                    >
                        {{ uploadButtonText }}
                    </button>
                </div>
            </div>

            <div class="card-body">
                <file-input :fileId="templateId" @fileSelected="onFileSelected"></file-input>
            </div>
        </div>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import FileInput from './Input/FileInput.vue';

export default {
    name: 'templateExporting',
    components: {
        FileInput
    },
    props: {
        title: {
            type: [String],
            required: true,
            default: () => {
                console.error('TemplateExporting: Missing title. Generated default');
                return 'Title';
            }
        },
        templateId: {
            type: String,
            require: true,
            default() {
                console.error('TemplateExporting: Missing templateId. Generated default');
                return 'exampleTemplateId';
            }
        },
        placeholder: {
            type: String,
            required: false,
            default() {
                console.warn('TemplateExporting: Using default placeholder');
                return 'Choose file';
            }
        },
        downloadButtonText: {
            type: String,
            default() {
                return 'Download';
            }
        },
        uploadButtonText: {
            type: String,
            default() {
                return 'Upload';
            }
        }
    },
    data() {
        return {
            file: {}
        };
    },
    methods: {
        onFileSelected(fileObject) {
            this.file = fileObject;
            if (!this.hasFileSelectedListener) {
                console.warn('TemplateExporting: Missing listener fileSelected:', fileObject);
            }
            return this.$emit('fileSelected', fileObject);
        },
        onUploadClicked() {
            if (!this.hasUploadListener) {
                console.warn('TemplateExporting: Missing listener uploadClicked', this.file);
            }
            return this.$emit('uploadClicked');
        },
        onDownloadClicked() {
            if (!this.hasDownloadListener) {
                console.warn('TemplateExporting: Missing listener downloadClicked');
            }
            return this.$emit('downloadClicked');
        }
    },
    computed: {
        hasDownloadListener() {
            return this.$listeners && this.$listeners.downloadClicked;
        },
        hasUploadListener() {
            return this.$listeners && this.$listeners.uploadClicked;
        },
        hasFileSelectedListener() {
            return this.$listeners && this.$listeners.fileSelected;
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
