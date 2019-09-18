<template>
    <div class="component-wrapper">
        <div class="gray-background">
            <div class="gray-background-cover" @click.self="backPreviousPage"></div>
            <div class="box-wrapper">
                <div class="title">
                    {{ title }}
                </div>

                <div class="setting-source">
                    <div class="setting-source-type">
                        <input type="radio" v-model="settingSource.type" value="hotel" id="hotel" />
                        <label for="hotel">Choose from hotel</label>

                        <input type="radio" v-model="settingSource.type" value="file" id="file" />
                        <label for="file">Choose from file</label>
                    </div>

                    <div class="setting-source-info">
                        <div v-if="settingSource.type === 'hotel'">
                            <hotel-search-bar
                                @selectedHotel="updateSettingSourceHotel"
                            ></hotel-search-bar>
                        </div>

                        <div v-else-if="settingSource.type === 'file'">
                            <file-input
                                fileId="settingSourceFile"
                                @fileSelected="updateSettingSourceFile"
                            ></file-input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FileInput from './Input/FileInput.vue';
import HotelSearchBar from './HotelSettings/HotelSearchBar.vue';

export default {
    name: 'hotelSettingsBox',
    props: {
        // title: {
        //     type: [String],
        //     required: true,
        //     validator() {
        //         return true;
        //     }
        // }
    },
    components: {
        FileInput,
        HotelSearchBar
    },
    created() {},
    data() {
        return {
            title: 'Create item',
            settingSource: {
                type: 'hotel' // Setting source type default
            },
            hotelList: [
                { id: 1, name: 'hotel1' },
                { id: 2, name: 'hotel2' },
                { id: 3, name: 'hotel3' }
            ]
        };
    },
    methods: {
        updateSettingSourceFile(fileObject) {
            this.settingSource.file = fileObject;
        },
        updateSettingSourceHotel(hotelObject) {
            this.settingSource.hotel = hotelObject;
        },
        backPreviousPage() {
            this.$emit('backPreviousPage');
        }
    }
};
</script>

<style scoped>
*:focus {
    outline: none;
}

.passed {
    background-color: #d7d7d7;
}

.passed .history-button {
    border-color: #aaaaaa;
    background-color: #aaaaaa;
}

.error {
    border: 4px solid #f27871 !important;
}

.message {
    padding: 0.5em;
    margin: 0.5em 0;
}

.success-message {
    color: #498e8f;
    background-color: #8fb8b9;
}

.error-message {
    color: #942718;
    background-color: #e9796a;
}

.neutral-message {
    color: #fff498;
    background-color: #ffc107;
}

.title {
    font-size: 25px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #459090;
}

button:hover,
button:focus {
    background-color: #459090;
    border: 4px solid #459090;
}

.gray-background,
.gray-background-cover {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 99;
}

.reminder-text-box,
.reminder-time-set-box {
    width: 100%;
}

.reminder-text-box {
    padding: 0.5em 0;
}

.box-wrapper {
    top: 10vh;
    position: fixed;
    background-color: #ffffff;
    padding: 0.5em;
    z-index: 100;
    max-width: 795px;
    min-width: 300px;
    border-radius: 10px;
}

.reminder-text {
    padding: 0.5em;
    width: 100%;
    height: 6em;
    border-radius: 8px;
    background-color: #ffffff;
    resize: none;
    border: solid 5px #8bb9b9;
}

.reminder-text:focus {
    border: 4px solid #45908f;
}

.reminder-set-box {
    margin: 0.5em 0;
}

.reminder-set-box button {
    width: 100%;
    height: 2.5em;
    border-radius: 5px;
    background-color: #459090;
    color: white;
    border: 4px solid #459090;
}

.history-area {
    margin-top: 1em;
    overflow: hidden;
}

.history-table-box {
    font-size: 14px;
    height: 15em;
    overflow-y: scroll;
    margin-right: -1.5em;
    padding-right: 1em;
}

.history-row .history-time-box {
    width: 30%;
}

.history-row .history-text-box {
    width: 50%;
}

.history-text {
    color: #888888;
}

.history-button-box {
    padding: auto;
}

.history-button {
    font-size: 16px;
    width: 100%;
    height: 2.5em;
    border-radius: 8px;
    background-color: #459090;
    color: white;
    border: solid 5px #459090;
}

.history-label {
    font-size: 20px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #4a4a4a;
}

@media only screen and (max-width: 600px) {
    .title {
        font-size: 18px;
    }
    .box-wrapper {
        width: 90%;
        transform: translate(-50%, 0);
        left: 50%;
        top: 15vh;
        max-height: 430px;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    .history-label {
        font-size: 18px;
    }
}
@media only screen and (min-width: 795px) {
    .setting-area {
        display: flex;
    }

    .box-wrapper {
        left: calc((100vw - 795px) / 2);
        /* display: block; */
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) !important;
    }

    .reminder-text-box,
    .reminder-time-set-box {
        width: 50%;
    }
    git git .reminder-text,
    .reminder-time-set-box,
    .reminder-time-label {
        padding: 0.2em;
        padding-left: 0.5em;
        color: #000000;
    }
    .reminder-time-label {
        padding-left: 0;
    }
}
@media only screen and (max-width: 300px) {
    .box-wrapper {
        width: 100%;
    }
}
</style>

<style>
/* CSS for component, put it outside of scope */
.reminder-time > input {
    padding: 0.5em;
    width: 100%;
    border-radius: 5px;
    resize: none;
    border: 4px solid #8fb8b9;
}
</style>
