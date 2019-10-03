<template>
    <div class="selectList">
        <div :id="listId" class="list-wrapper" style="overflow:hidden">
            <div class="list-item">
                <div class="item-row item-row-header" v-if="showFilterBar">
                    <input type="text" class="search-bar" v-model="insideFilterValue" />
                </div>
                <div class="list-box">
                    <div
                        v-for="item in filteredList"
                        :key="item.id"
                        class="item-row"
                        :class="{ 'selected-item': focusing == item[textShowField] }"
                    >
                        <div
                            class="left-row"
                            @click="itemClick(item)"
                            :style="{ width: `calc(100% - ${showDeleteButton ? 1 : 0}em )` }"
                        >
                            <div class="pre-left" v-if="showId">{{ item.id }}</div>
                            <div
                                class="content-left"
                                :title="item.text"
                                :class="{ 'wrap-text': wrapText, [textAlign + '-align']: true }"
                                :style="{}"
                            >
                                {{ item[textShowField] }}
                            </div>
                        </div>
                        <div
                            v-if="showDeleteButton && item[textShowField]"
                            class="right-row"
                            @click="itemDelete(item)"
                        >
                            X
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'sentenceList',
    props: {
        /**
         * List item parse to show list
         */
        list: {
            type: Array,
            required: false,
            default() {
                console.error('SentenceList: Missing list. Generated default');
                console.warn('SentenceList: Should have `filterValue`, `focusing`');
                console.warn(
                    'SentenceList: Set `showFilterBar`, `showDeleteButton`, `showId` if neccessary'
                );
                return [
                    {
                        id: 1,
                        text: 'Thank you for the message.',
                        textShow: 'Thank you for the message.',
                        lang: 'en',
                        icon: '231',
                        type: 'hotelSentence',
                        tag: 'hello'
                    },
                    {
                        id: 2,
                        text: 'Please wait for a moment.',
                        textShow: 'Please wait for a moment.',
                        lang: 'en',
                        icon: '231',
                        type: 'hotelSentence',
                        tag: 'hello'
                    },
                    {
                        id: 3,
                        text: 'We are preparing now.',
                        textShow: 'We are preparing now.',
                        lang: 'en',
                        icon: '231',
                        type: 'hotelSentence',
                        tag: 'hello'
                    },
                    {
                        id: 4,
                        text: 'I will respond as soon as possible',
                        textShow: 'I will respond as soon as possible',
                        lang: 'en',
                        icon: '231',
                        type: 'hotelSentence',
                        tag: 'hello'
                    },
                    {
                        id: 1,
                        text: 'メッセージありがとうございます。',
                        textShow: 'メッセージありがとうございます。',
                        lang: 'ja',
                        icon: '231',
                        type: 'hotelSentence',
                        tag: 'hello'
                    },
                    {
                        id: 2,
                        text: '少々お待ちください。',
                        textShow: '少々お待ちください。',
                        lang: 'ja',
                        icon: '231',
                        type: 'hotelSentence',
                        tag: 'hello'
                    },
                    {
                        id: 3,
                        text: '現在準備中です。',
                        textShow: '現在準備中です。',
                        lang: 'ja',
                        icon: '231',
                        type: 'hotelSentence',
                        tag: 'hello'
                    },
                    {
                        id: 4,
                        text: 'すぐに返信します。',
                        textShow: 'すぐに返信します。',
                        lang: 'ja',
                        icon: '231',
                        type: 'hotelSentence',
                        tag: 'hello'
                    },
                    {
                        id: 1,
                        text: '谢谢您的讯息',
                        textShow: '谢谢您的讯息',
                        lang: 'zh',
                        icon: '231',
                        type: 'hotelSentence',
                        tag: 'hello'
                    },
                    {
                        id: 2,
                        text: '请稍等',
                        textShow: '请稍等',
                        lang: 'zh',
                        icon: '231',
                        type: 'hotelSentence',
                        tag: 'hello'
                    },
                    {
                        id: 3,
                        text: '我们正在为您准备',
                        textShow: '我们正在为您准备',
                        lang: 'zh',
                        icon: '231',
                        type: 'hotelSentence',
                        tag: 'hello'
                    },
                    {
                        id: 4,
                        text: '我会尽快的回覆您',
                        textShow: '我会尽快的回覆您',
                        lang: 'zh',
                        icon: '231',
                        type: 'hotelSentence',
                        tag: 'hello'
                    },
                    {
                        id: 1,
                        text: '메시지를 보내 주셔서 감사합니다.',
                        textShow: '메시지를 보내 주셔서 감사합니다.',
                        lang: 'ko',
                        icon: '231',
                        type: 'hotelSentence',
                        tag: 'hello'
                    },
                    {
                        id: 2,
                        text: '잠시 기다려주십시오.',
                        textShow: '잠시 기다려주십시오.',
                        lang: 'ko',
                        icon: '231',
                        type: 'hotelSentence',
                        tag: 'hello'
                    },
                    {
                        id: 3,
                        text: '우리는 지금 준비 중입니다.',
                        textShow: '우리는 지금 준비 중입니다.',
                        lang: 'ko',
                        icon: '231',
                        type: 'hotelSentence',
                        tag: 'hello'
                    },
                    {
                        id: 4,
                        text: '가능한 한 빨리 응답하겠습니다.',
                        textShow: '가능한 한 빨리 응답하겠습니다.',
                        lang: 'ko',
                        icon: '231',
                        type: 'hotelSentence',
                        tag: 'hello'
                    }
                ];
            }
        },
        /**
         * List item id. Need for separating multiple SentenceList in a page
         */
        listId: {
            type: String,
            required: false,
            default() {
                return `${new Date().getTime()}`;
            }
        },
        /**
         * The property in object list for showing. Default is 'textShow'
         */
        textShowField: {
            type: String,
            required: false,
            default: 'textShow'
        },
        /**
         * Option for show filter bar at the begining or not
         */
        showFilterBar: {
            type: Boolean,
            required: false,
            default: false
        },
        /**
         * Option for show delete button at the end of the line of not
         */
        showDeleteButton: {
            type: Boolean,
            required: false,
            default: false
        },
        /**
         * Option for show id at the first of the line or not
         */
        showId: {
            type: Boolean,
            required: false,
            default: false
        },
        wrapText: {
            type: Boolean,
            required: false,
            default: false
        },
        /**
         * Filter Value if you want to filter the list
         */
        filterValue: {
            type: String,
            required: false,
            default: ''
        },
        textAlign: {
            type: String,
            require: false,
            validator(val) {
                if (['center', 'left', 'right'].indexOf(val) > -1) {
                    return true;
                }
                console.error("SentenceList: textAlign can only be: 'center','left' or 'right'");
                return false;
            },
            default: 'center'
        },
        focusing: {
            type: String,
            required: false,
            default: ''
        }
    },

    components: {},
    mounted() {
        this.validateList();
    },
    data() {
        return {
            insideFilterValue: ''
        };
    },
    computed: {
        filteredList() {
            return this.list
                .filter(item => item[this.textShowField].indexOf(this.filterValue) > -1)
                .filter(item => item[this.textShowField].indexOf(this.insideFilterValue) > -1);
        }
    },
    methods: {
        validateList() {
            if (this.list.length > 0) {
                if (this.list[0][this.textShowField] === undefined) {
                    console.warn(
                        `SentenceList: item in list need '${this.textShowField}' as [{${this.textShowField}: ''},...]. \n` +
                            `Define other field to show in case your list have [{other${this.textShowField}: ''},...] by using <object property>: \n` +
                            `\t<sentence-list :textShowField='"other${this.textShowField}"' />`
                    );
                }
            }
        },
        itemClick(item) {
            if (!this.$listeners.clickItem) {
                console.warn('SentenceList: Missing listener `clickItem(item)`');
            }
            this.$emit('clickItem', item);
        },
        itemDelete(item) {
            if (!this.$listeners.clickDelete) {
                console.warn('SentenceList: Missing listener `clickDelete(item)`');
            }
            this.$emit('clickDelete', item);
        }
    }
};
</script>
<style scoped>
.wrap-text {
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.item-row-header {
    background-color: #efefef;
    /* position: fixed; */
    width: auto;
}

.item-row-header-space {
    height: 50px;
}

.item-row > .search-bar {
    margin: 0.5em;
    border-radius: 0.5em;
    border: 0px solid #ffffff;
    background-color: #ffffff;
    width: 100%;
    outline: none;
}

.item-row:hover {
    background-color: #a9e8e8;
    color: #ffffff;
    cursor: pointer;
}

.selected-item {
    background-color: #8bb9b9;
    color: #ffffff;
}

.item-row {
    border-bottom: 1px solid #88888822;
}
.list-box {
    overflow-x: hidden;
    overflow-y: scroll;
    max-width: 250px;
    max-height: 250px;
}
.list-wrapper {
    overflow: hidden;
    position: fixed;
    /* top: 10em; */
    left: 10em;
    background-color: #ffffff;
    max-height: 400px;
    max-width: 400px;
    min-width: 100px;
    /* min-height: 100px; */
    overflow-y: scroll;
    text-align: left;
    color: #2c3e50;
    border-radius: 0.2em;
    border: #88888822 solid 1px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    z-index: 10;
}

.item-row {
    display: flex;
    justify-content: space-between;
}

.item-row > * {
    padding: 0.5em;
}

.pre-left {
    float: left;
}

.item-row > .left-row {
    padding: 0px;
    width: calc(100% - 50px);
}

.item-row > .left-row > * {
    padding: 0.5em;
    word-break: break-all;
}

.item-row .right-align {
    display: 'block';
    width: 100%;
}
.item-row .right-align > * {
    float: right;
}

.item-row .left-align {
    display: flex;
}

.item-row .center-align {
    text-align: center;
}

.item-row > .right-row {
    background-color: #f56d6d;
    color: #ffffff;
    font-weight: bold;
    float: right;
    width: 1em;
}
@media screen and (max-width: 600px) {
    .list-wrapper {
        box-shadow: 2px 2px 5px 1px #888888;
    }
    .list-box {
        margin-right: -0.4em;
    }
    #languageList,
    #preTypedSentence {
        bottom: 125px;
    }
}
</style>
