<template>
    <div class="component-test">
        <template-exporting
            title="Title"
            placeholder="Placeholder"
            downloadButtonText="Download"
            uploadButtonText="Upload"
            @downloadClicked="downloadClicked"
            @uploadClicked="uploadClicked"
        ></template-exporting>

        <hotel-settings-box-button></hotel-settings-box-button>
    </div>
</template>

<script>
import TemplateExporting from '@/components/TemplateExporting.vue';
import HotelSettingsBoxButton from '@/components/HotelSettingsBoxButton.vue';

export default {
    components: {
        TemplateExporting,
        HotelSettingsBoxButton
    },
    data() {
        return {};
    },
    methods: {
        downloadClicked() {
            console.log('Download clicked');
        },
        uploadClicked() {
            console.log('Upload clicked');
        }
    }
};
</script>
