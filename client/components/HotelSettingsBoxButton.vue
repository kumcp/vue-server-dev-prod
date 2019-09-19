<template>
    <div class="component-box">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title">{{ title || 'Title' }}</h5>
                <div class="card-header-button"></div>
            </div>

            <div class="card-body">
                <!-- Button to trigger box -->
                <color-button type="button" class="btn btn-outline-primary" @click="buttonClicked">
                    {{ buttonText || 'show Hotel Settings Box' }}
                </color-button>

                <!-- Settings box component -->
                <hotel-settings-box
                    v-show="showHotelSettingBox"
                    :title="'Create hotel with settings'"
                    :destinationHotel="destinationHotel"
                    :hotelList="hotelList"
                    @backPreviousPage="backClicked"
                    @applied="applyHotelSettings"
                ></hotel-settings-box>
            </div>
        </div>
    </div>
</template>

<script>
import HotelSettingsBox from './HotelSettingsBox.vue';
import ColorButton from './Input/ColorButton.vue';

export default {
    components: {
        HotelSettingsBox,
        ColorButton
    },
    props: {
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
                console.error('HotelSettingsBoxButton: Missing hotelList. Generated default');

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
                console.error(
                    'HotelSettingsBoxButton: Missing destinationHotel. Generated default'
                );

                return { name: 'destinationhotel' };
            }
        }
    },

    data() {
        return {
            showHotelSettingBox: false,
            buttonText: 'show Hotel Settings',
            title: 'title'
        };
    },
    methods: {
        buttonClicked() {
            this.showHotelSettingBox = true;
        },
        backClicked() {
            this.showHotelSettingBox = false;
        },
        applyHotelSettings(objectApplied) {
            console.log('HotelSettingsBoxButton: emited appliedChangeSetting', objectApplied);
            this.$emit('appliedChangeSetting', objectApplied);
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
