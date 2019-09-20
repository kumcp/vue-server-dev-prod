<template>
    <div class="input-group mb-3">
        <input
            class="form-control"
            type="text"
            v-model="selectedHotel.id"
            @change="selectHotelId(selectedHotel.id)"
            @blur="selectHotelId(selectedHotel.id)"
            placeholder="1"
        />
        <input
            type="text"
            v-model="selectedHotel.name"
            @blur="selectHotelName(selectedHotel.name)"
            @keydown="showSuggestList"
            class="form-control"
            placeholder="hotelname"
            aria-describedby="button-addon2"
        />
        <div class="input-group-append">
            <color-button
                class="btn btn-outline-secondary dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                <span class="sr-only">Dropdown</span>
            </color-button>
            <div
                class="dropdown-menu dropdown-menu-right dropdown-limit"
                :class="{ show: showHotelList }"
                id="hotel-list"
            >
                <a
                    class="dropdown-item"
                    v-for="hotel in hotelListFiltered"
                    :key="hotel.id"
                    @click="selecteHotel(hotel)"
                    >{{ hotel.name }}</a
                >
            </div>
        </div>
    </div>
</template>

<script>
import 'bootstrap/dist/js/bootstrap.bundle';

import ColorButton from '../Input/ColorButton.vue';

export default {
    name: 'hotelSearchBar',
    components: {
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
                console.error('HotelSearchBar: Missing hotelList. Generated default');

                return [
                    { id: 1, name: 'hotel1' },
                    { id: 2, name: 'hotel2' },
                    { id: 3, name: 'hotel3' },
                    { id: 4, name: 'hote4' },
                    { id: 5, name: 'hotel5' },
                    { id: 6, name: 'hotel1' },
                    { id: 7, name: 'hotel7' },
                    { id: 8, name: 'bb55' },
                    { id: 9, name: 'hotel9' },
                    { id: 10, name: 'hotel10' },
                    { id: 11, name: 'hotel12test' },
                    { id: 12, name: 'hotel12' }
                ];
            }
        }
    },
    data() {
        return {
            selectedHotel: {},
            showHotelList: false
        };
    },
    methods: {
        selecteHotel(hotel) {
            this.selectedHotel = { id: hotel.id, name: hotel.name };
            this.showHotelList = false;
            this.$emit('selectedHotel', this.selectedHotel);
        },
        selectHotelId(hotelId) {
            const hotelSelected = this.hotelList.find(hotel => hotel.id === parseInt(hotelId, 10));
            this.selecteHotel(hotelSelected);
        },
        selectHotelName(hotelName) {
            const hotelSelected = this.hotelList.filter(hotel => hotel.name === hotelName);
            this.showHotelList = false;
            if (hotelSelected.length === 1) {
                this.selecteHotel(hotelSelected[0]);
            }
        },
        showSuggestList() {
            this.showHotelList = true;
        }
    },
    computed: {
        hotelListFiltered() {
            if (this.selectedHotel.name) {
                return this.hotelList.filter(
                    hotel => hotel.name.indexOf(this.selectedHotel.name) > -1
                );
            }
            return this.hotelList;
        }
    }
};
</script>

<style scoped>
.dropdown-limit {
    max-height: 10em;
    overflow: auto;
}
</style>
