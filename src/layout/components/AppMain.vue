<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.app-main {
  /* 50= navbar  50  */
  height: calc(100vh - 50px);
  position: relative;
  overflow: auto;
  padding: 12px;
  background-color: $background;

  &>div {
    // background-color: rgba(248, 239, 230, 1);
    // background-color: rgba(250, 239, 220, .5);
    height: 100%;
    border-radius: 4px;
    padding: 12px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .2);
  }
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    min-height: 100vh;
    padding-top: 96px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
