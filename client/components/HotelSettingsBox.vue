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
                        <color-button
                            type="button"
                            class="btn btn-outline-secondary"
                            @click="backPreviousPage"
                        >
                            {{ 'Cancel' }}
                        </color-button>
                        <color-button
                            type="button"
                            class="btn btn-outline-primary"
                            @click="onApplyClicked"
                        >
                            {{ 'Apply' }}
                        </color-button>
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
import ColorButton from './Input/ColorButton.vue';

export default {
    name: 'hotelSettingsBox',
    props: {
        title: {
            type: [String],
            required: true,
            validator() {
                return true;
            },
            default: () => {
                console.error('HotelSettingBox: Missing title. Generated default');
                return 'Create item';
            }
        },
        hotelList: {
            type: [Array],
            required: false,
            validator(val) {
                if (val[0]) {
                    return val[0].id && val[0].name;
                }
                return false;
            },
            default: () => {
                // Default value for test
                console.error('HotelSettingsBox: Missing hotelList. Generated default');

                return [
                    { id: 1, name: 'hotel1' },
                    { id: 2, name: 'xaa' },
                    { id: 3, name: 'hotel3' },
                    { id: 4, name: 'bbb' },
                    { id: 5, name: 'hotel5' },
                    { id: 6, name: 'aaaa' },
                    { id: 7, name: 'hotel7' },
                    { id: 8, name: 'bb55' },
                    { id: 9, name: 'hotel9' },
                    { id: 10, name: 'fujutakanko' },
                    { id: 11, name: 'fujitakankotest' },
                    { id: 12, name: 'hotel12' }
                ];
            }
        },
        destinationHotel: {
            type: [Object],
            required: true,
            validator(val) {
                return val.name;
            },
            default: () => {
                console.error('HotelSettingsBox: Missing destinationHotel. Generated default');

                return { name: 'destinationhotel' };
            }
        }
    },
    components: {
        FileInput,
        HotelSearchBar,
        CheckBox,
        ColorButton
    },
    created() {},
    data() {
        return {
            settingSource: {
                type: 'hotel' // Setting source type default
            },
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
            console.log('HotelSettingsBox: Added settings source file: ', this.settingSource);
        },
        updateSettingSourceHotel(hotelObject) {
            this.settingSource.hotel = hotelObject;
            console.log('HotelSettingsBox: Added settings source hotel: ', this.settingSource);
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
