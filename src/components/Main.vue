<template>
<div>
  <el-row class="nav-row">
    <el-col :span="24"><span style="float: left;padding: 20px">求索</span></el-col>
  </el-row>
  <el-container style="height: 100%; border: 1px solid #eee">

    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-menu"></i>认知管理</template>
          <el-menu-item-group>
            <el-menu-item index="1-1" @click="noteManage"><i class="el-icon-document"></i>笔记管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    
    <el-container>
      <component
        v-bind:is="currentTabComponent"
      ></component>
    </el-container>
  </el-container>
</div>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }

  .nav-row {
    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  }
</style>

<script>
  import home from '../page/home/Index.vue'
  import cognition from '../page/cognition/Index.vue'

  export default {
    data() {
      return {
        tableData: [],
        currentComponent: home
      }
    },
    computed: {
      currentTabComponent: function() {
        return this.currentComponent;
      }
    },
    methods: {
      noteManage: function() {
        // 切换
        this.currentComponent = cognition;
      }
    }
  };
</script>