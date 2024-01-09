<template>
    <div class="card" :style="{ backgroundImage: `url(${background})` }">
        <div class="title">{{ param.name }}</div>
    </div>
</template>
    
<script>
import { mapGetters } from 'vuex';
import { rulesT } from 'tqr';
export default {
    name: 'GoodsBrowse',
    props: {
        param: rulesT.Object
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters(['sidebar']),
        background() {
            const b = this.param?.imageUrl?.split(',')[0]
            return b
        }
    },
    mounted() {

    },
    methods: {

    }
}
</script>
    
<style lang="scss" scoped>
.card {
    position: relative;
    margin: 10px;
    width: 180px;
    height: 120px;
    background-size: cover;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, .3);
    border-radius: 4px;
    user-select: none;
    overflow: hidden;
    cursor: pointer;
    transition-duration: 600ms;

    .title {
        position: absolute;
        pointer-events: none;
        left: 0;
        bottom: 0;
        width: 100%;
        font-family: "Playfair Display";
        font-size: 16px;
        color: #fff;
        font-weight: 700;
        text-align: center;
        text-shadow: rgba(black, 0.5) 0 4px 4px;
        background-color: rgba(0, 0, 0, .3);
        backdrop-filter: blur(4px);
        padding: 9px 6px;
    }

    &:hover {}
}
</style>