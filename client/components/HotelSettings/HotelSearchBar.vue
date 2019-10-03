<template>
    <div class="input-group mb-3">
        <color-text-input
            class="form-control"
            type="text"
            v-model="selectedHotel.id"
            @change="selectHotelId(selectedHotel.id)"
            @blur="selectHotelId(selectedHotel.id)"
            placeholder="1"
        />
        <color-text-input
            type="text"
            v-model="selectedHotel.name"
            @blur="selectHotelName(selectedHotel.name)"
            @keydown="showHotelList = true"
            class="form-control"
            placeholder="hotelname"
        />
        <color-button
            class="btn-outline-secondary hotel-list-button"
            type="button"
            @click="toggleSuggestList"
        >
            <span class="sr-only">V</span>
        </color-button>
        <div
            class="dropdown-menu dropdown-menu-right dropdown-limit"
            :class="{ show: showHotelList }"
            id="hotel-list"
        >
            <sentence-list
                v-show="showHotelList"
                :list="hotelListFiltered"
                :textShowField="'name'"
                :focusing="selectedHotel.name"
                @clickItem="selectHotel"
            ></sentence-list>
            <!-- <a
                    class="dropdown-item"
                    v-for="hotel in hotelListFiltered"
                    :key="hotel.id"
                    @click="selectHotel(hotel)"
                    >{{ hotel.name }}</a
                > -->
        </div>
    </div>
</template>

<script>
import ColorButton from '../Input/ColorButton.vue';
import ColorTextInput from '../Input/ColorTextInput.vue';
import SentenceList from '../Input/SentenceList.vue';

export default {
    name: 'hotelSearchBar',
    components: {
        ColorButton,
        ColorTextInput,
        SentenceList
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
        selectHotel(hotel) {
            if (!hotel) {
                this.$emit('selectedHotel', this.selectedHotel);
                return;
            }
            this.selectedHotel = { id: hotel.id, name: hotel.name };
            this.showHotelList = false;
            this.$emit('selectedHotel', this.selectedHotel);
        },
        selectHotelId(hotelId) {
            const hotelSelected = this.hotelList.find(hotel => hotel.id === parseInt(hotelId, 10));
            this.selectHotel(hotelSelected);
        },
        selectHotelName(hotelName) {
            const hotelSelected = this.hotelList.filter(hotel => hotel.name === hotelName);
            this.showHotelList = false;
            if (hotelSelected.length === 1) {
                this.selectHotel(hotelSelected[0]);
            }
        },
        toggleSuggestList() {
            this.showHotelList = !this.showHotelList;
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
.hotel-list-button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.dropdown-limit {
    max-height: 10em;
    overflow: auto;
}

.input-group > *:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}

.input-group > *:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}
</style>
