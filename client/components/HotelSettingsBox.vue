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
                                :hotelList="hotelList"
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

                    <hr />
                    <div class="destination-info input-group">
                        <span class="form-control">Settings will be copied to: </span>
                        <input
                            class="form-control"
                            type="disabled"
                            :value="destinationHotel.name"
                        />
                    </div>

                    <div class="check-list-copy">
                        <check-box
                            v-for="(item, index) in copyCheckList"
                            :class="{
                                left: index % 2 === 0,
                                right: index % 2 !== 0,
                                cell: true
                            }"
                            :label="item.label"
                            :name="item.name"
                            :key="item.name"
                            v-model="item.value"
                        ></check-box>
                    </div>

                    <hr />
                    <div class="button-group">
                        <button
                            type="button"
                            class="btn btn-outline-secondary"
                            @click="backPreviousPage"
                        >
                            {{ 'Cancel' }}
                        </button>
                        <button
                            type="button"
                            class="btn btn-outline-primary"
                            @click="onApplyClicked"
                        >
                            {{ 'Apply' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FileInput from './Input/FileInput.vue';
import HotelSearchBar from './HotelSettings/HotelSearchBar.vue';
import CheckBox from './Input/CheckBox.vue';

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
        HotelSearchBar,
        CheckBox
    },
    created() {},
    data() {
        return {
            title: 'Create item',
            settingSource: {
                type: 'hotel' // Setting source type default
            },
            destinationHotel: {},
            hotelList: [
                { id: 1, name: 'hotel1' },
                { id: 2, name: 'hotel2' },
                { id: 3, name: 'hotel3' }
            ],
            copyCheckList: [
                { label: 'Tag list', name: 'taglist', value: true },
                { label: 'Service', name: 'service', value: true },
                { label: 'FAQ', name: 'faw', value: true },
                { label: 'Crawling', name: 'crawling', value: true },
                { label: 'Place', name: 'place', value: true },
                { label: 'Welcome messages', name: 'guide', value: true },
                { label: 'Category', name: 'category', value: true },
                { label: 'Custom sentences', name: 'sentence', value: true }
            ]
        };
    },
    methods: {
        updateSettingSourceFile(fileObject) {
            this.settingSource.file = fileObject;
            console.log('HotelSettingsBox: Added settings source file');
        },
        updateSettingSourceHotel(hotelObject) {
            this.settingSource.hotel = hotelObject;
        },
        backPreviousPage() {
            this.$emit('backPreviousPage');
        },
        onApplyClicked() {
            this.$emit('applied', {
                settingSource: this.settingSource,
                destinationHotel: this.destinationHotel,
                copyCheckList: this.copyCheckListSelected
            });
        }
    },
    computed: {
        copyCheckListSelected() {
            return this.copyCheckList.filter(item => item.value).map(item => item.name);
        }
    }
};
</script>

<style scoped>
.btn {
    margin: 0.5em;
}

hr {
    clear: both;
}

.cell {
    width: 50%;
    display: block;
    padding: 0.5em 0;
}

.left {
    float: left;
}

.right {
    float: right;
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
    .box-wrapper {
        left: calc((100vw - 795px) / 2);
        /* display: block; */
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) !important;
    }
}
@media only screen and (max-width: 300px) {
    .box-wrapper {
        width: 100%;
    }
}
</style>
