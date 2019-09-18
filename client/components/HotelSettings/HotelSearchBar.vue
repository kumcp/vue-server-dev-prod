<template>
    <div class="input-group mb-3">
        <input
            class="form-control"
            type="text"
            v-model="selectedHotel.id"
            @change="selectHotelId(selectedHotel.id)"
            @blur="selectHotelId(selectedHotel.id)"
            placeholder="648"
        />
        <input
            type="text"
            v-model="selectedHotel.name"
            @blur="selectHotelName(selectedHotel.name)"
            @keypress="showSuggestList"
            class="form-control"
            placeholder="fujutakanko"
            aria-describedby="button-addon2"
        />
        <div class="input-group-append">
            <button
                class="btn btn-outline-secondary dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                <span class="sr-only">Dropdown</span>
            </button>
            <div class="dropdown-menu dropdown-menu-right dropdown-limit" id="hotel-list">
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

export default {
    name: 'hotelSearchBar',
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
                console.error(
                    'You are missing hotelList param for HotelSearchBar. Generated default'
                );

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
        }
    },
    data() {
        return {
            selectedHotel: {}
        };
    },
    methods: {
        selecteHotel(hotel) {
            this.selectedHotel = { ...hotel };
            document.getElementById('hotel-list').classList.remove('show');
            this.$emit('selectedHotel', this.selectedHotel);
        },
        selectHotelId(hotelId) {
            const hotelSelected = this.hotelList.find(hotel => hotel.id === hotelId);
            this.selecteHotel(hotelSelected);
        },
        selectHotelName(hotelName) {
            const hotelSelected = this.hotelList.filter(hotel => hotel.name === hotelName);

            if (hotelSelected.length === 1) {
                this.selecteHotel(hotelSelected);
            }
        },
        showSuggestList() {
            document.getElementById('hotel-list').classList.add('show');
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
