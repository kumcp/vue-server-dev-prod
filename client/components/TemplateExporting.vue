<template>
    <div class="template-exporting">
        <card-layout>
            <template v-slot:card-header>
                <div class="card-title">{{ title }}</div>
                <div class="card-header-button">
                    <color-button
                        v-if="downloadButtonText"
                        type="button"
                        class="btn btn-outline-primary"
                        @click="onDownloadClicked"
                    >
                        {{ downloadButtonText }}
                    </color-button>

                    <color-button
                        v-if="uploadButtonText"
                        type="button"
                        class="btn btn-outline-primary"
                        @click="onUploadClicked"
                    >
                        {{ uploadButtonText }}
                    </color-button>
                </div>
            </template>

            <template v-slot:card-body>
                <file-input :fileId="templateId" @fileSelected="onFileSelected"></file-input>
            </template>
        </card-layout>
    </div>
</template>

<script>
import FileInput from './Input/FileInput.vue';
import ColorButton from './Input/ColorButton.vue';
import CardLayout from './ComponentLayout/CardLayout.vue';

export default {
    name: 'templateExporting',
    components: {
        FileInput,
        ColorButton,
        CardLayout
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

<style scoped>
.template-exporting {
    padding: 6px;
}

.template-exporting .card-title {
    display: block;
    float: left;
    padding: 0.3rem;
    font-size: 1.5rem;
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
