<template>
    <div class="file-input">
        <input
            type="file"
            :id="fileId"
            class="file-input"
            aria-describedby="inputFile"
            @change="handleFileSelected"
        />
        <label :for="fileId">
            <div class="file-input-placeholder">
                {{ placeholder || 'Choose template file to upload' }}
            </div>
            <div class="file-input-icon">
                <img src="../../assets/folder_search.png" width="30px" height="30px" />
            </div>
        </label>
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
            type: String,
            required: false,
            default() {
                return new Date().getTime();
            }
        },
        browseIcon: {
            type: String,
            require: false,
            default: '../../assets/folder_search.png'
        }
    },
    data() {
        return {
            placeholder: ''
        };
    },
    methods: {
        handleFileSelected(e) {
            const fileSelected = e.target.files[0];
            this.placeholder = fileSelected.name;
            if (!this.hasFileSelectedListener) {
                console.warn('FileInput: Missing listener `fileSelected`');
            }
            this.$emit('fileSelected', {
                fileId: this.fileId,
                file: fileSelected
            });
        }
    },
    computed: {
        hasFileSelectedListener() {
            return this.$listeners && this.$listeners.fileSelected;
        }
    }
};
</script>

<style scoped>
.file-input-placeholder {
    border: 1px solid #e0e0e0;
    padding: 0.375em;
    width: 85%;
    float: left;
    border-top-left-radius: 0.25em;
    border-bottom-left-radius: 0.25em;
}

.file-input input {
    display: none;
}

.file-input label {
    display: flex;
}

.file-input-icon {
    float: right;
    width: 15%;
    border: 1px solid #e0e0e0;
    border-top-right-radius: 0.25em;
    border-bottom-right-radius: 0.25em;
    transition: 0.3s;
}

.file-input-icon:hover {
    background-color: #e0e0e077;
    transition: 0.3s;
}
</style>
