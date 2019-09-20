<template>
    <div class="component-box">
        <card-layout>
            <template v-slot:card-header>
                <div class="card-title">{{ title }}</div>
            </template>

            <template v-slot:card-body>
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
            </template>
        </card-layout>
    </div>
</template>

<script>
import HotelSettingsBox from './HotelSettingsBox.vue';
import ColorButton from './Input/ColorButton.vue';
import CardLayout from './ComponentLayout/CardLayout.vue';

export default {
    components: {
        HotelSettingsBox,
        ColorButton,
        CardLayout
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
        },
        title: {
            type: String,
            require: false,
            default: () => {
                console.error('HotelSettingsBoxButton: Missing title. Generated default');
                return 'Title';
            }
        },
        buttonText: {
            type: String,
            require: false,
            default: () => {
                console.error('HotelSettingsBoxButton: Missing buttonText. Generated default');
                return 'Show Hotel Settings';
            }
        }
    },

    data() {
        return {
            showHotelSettingBox: false
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
