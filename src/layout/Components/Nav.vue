<template>
  <div id="nav_wrap">
    <div style="height:80px;"></div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="rgb(234,237,244)"
      unique-opened="true"
      router="true"
    >
      <el-submenu index="1">
        <template slot="title">
          &nbsp;&nbsp;&nbsp;&nbsp;
          <i class="el-icon-picture-outline"></i>
          <span slot="title">首页大图</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="HomePicture">
            <i class="el-icon-caret-right"></i>
            首页大图
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          &nbsp;&nbsp;&nbsp;&nbsp;
          <i class="el-icon-bell"></i>
          <span slot="title">新闻动态</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="News">
            <i class="el-icon-caret-right"></i>
            新闻动态
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          &nbsp;&nbsp;&nbsp;&nbsp;
          <i class="el-icon-folder-opened"></i>
          <span slot="title">项目展示</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="ProjectDisplay">
            <i class="el-icon-caret-right"></i>
            项目展示
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          &nbsp;&nbsp;&nbsp;&nbsp;
          <i class="el-icon-trophy"></i>
          <span slot="title">科研成果</span>
        </template>
        <el-menu-item-group>
        <el-menu-item index="ScientificResults">
          <i class="el-icon-caret-right"></i>
          科研成果
        </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          &nbsp;&nbsp;&nbsp;&nbsp;
          <i class="el-icon-user"></i>
          <span slot="title">团队成员</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="TeamMember">
            <i class="el-icon-caret-right"></i>
            团队成员
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
#nav_wrap {
  position: absolute;
  top:0px;
  left: 0px;
  width: 260px;
  height: 100vh;
  background-color: rgb(234, 237, 244);
}

.el-menu-vertical-demo {
  top: 0px;
}
</style>
