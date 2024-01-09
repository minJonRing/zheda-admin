<template>
  <div class="box">
    <div class="btns">
      <router-link to="add">
        <el-button type="primary">添加处室</el-button>
      </router-link>
    </div>
    <div class="list">
      <transition-group tag="div" class="container">
        <card :param="i" v-for="i in list" :key="i.name" class="item" draggable="true"
          @dragstart="handleDragStart($event, i)" @dragover.prevent="handleDragOver($event, i)"
          @dragenter="handleDragEnter($event, i)" @dragend="handleDragEnd($event, i)"></card>
      </transition-group>

    </div>
  </div>
</template>

<script>
import { ajax } from '@/api/ajax';
import Card from './card.vue'
import Info from './info.vue'
export default {
  name: "List",
  components: {
    Card,
    Info
  },
  data() {
    return {
      list: [{ name: '123123' }, { name: '2312333' }, { name: '3333' }],
      // dragging
      ending: null,
      dragging: null,
    };
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.$global.loading = true;
      ajax({
        url: '/department'
      }).then(({ data }) => {
        console.log(data)
      }).finally(() => {
        this.$global.loading = false;
      })
    },
    // 拖拽
    handleDragStart(e, item) {
      this.dragging = item
    },
    handleDragEnd(e, item) {
      if (this.ending.name === this.dragging.name) {
        return
      }

      let newItems = [...this.list]
      const src = newItems.indexOf(this.dragging)
      const dst = newItems.indexOf(this.ending)
      console.log(src, dst)
      newItems.splice(src, 1, ...newItems.splice(dst, 1, newItems[src]))

      this.list = newItems
      this.$nextTick(() => {
        this.dragging = null
        this.ending = null
      })
    },
    handleDragOver(e) {
      // 首先把div变成可以放置的元素，即重写dragenter/dragover
      e.dataTransfer.dropEffect = 'move'// e.dataTransfer.dropEffect="move";//在dragenter中针对放置目标来设置!
    },
    handleDragEnter(e, item) {
      e.dataTransfer.effectAllowed = 'move'// 为需要移动的元素设置dragstart事件
      this.ending = item
    }
  },
};
</script>

<style lang="scss" scoped>
.box {
  .btns {
    padding: 0 0 10px 10px;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
