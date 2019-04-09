<template>
  <div class="search-box">
    <!-- 搜索框 -->
    <el-input v-model="keyword" class="input-with-select" @keyup.enter.native="search" :clearable="true" :autofocus="true">
      <el-select v-model="select" slot="prepend" >
        <el-option label="求索" value="0"></el-option>
        <el-option label="Google" value="1"></el-option>
        <el-option label="Baidu" value="2"></el-option>
        <el-option label="Bing" value="3"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>

    <!-- 搜索联想 -->
    <!-- 历史搜索 -->

    <!-- TODO: 搜索结果页，结果详情页 -->
  </div>
</template>

<style>
  .search-box {
    margin-top: 80px;
    padding-left: 200px;
    padding-right: 200px;
  }
  .el-select .el-input {
    width: 100px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>

<script>

  export default {
    data() {
      return {
        keyword: '',
        select: '0',
      }
    },
    computed: {

    },
    methods: {
      search: function() {
        if(this.keyword.trim().length == 0) {
          return;
        }
        console.debug(this.select )
        switch(this.select) {
          case '0': 
            this.$router.push({
              path: '/search',
              query: {
                q: this.keyword
              }
            }); //向url中传递参数
            break;
          case '1': // Google
            window.open("https://www.google.com/search?q=" + this.keyword, '_blank')
            break;
          case '2': // Baidu
            window.open("https://www.baidu.com/s?ie=UTF-8&wd=" + this.keyword, '_blank')
            break;
          case '3': // Bing
            window.open("https://cn.bing.com/search?q=" + this.keyword, '_blank')
            break;
        }

      },
    }
  };
</script>