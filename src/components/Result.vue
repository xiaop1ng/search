<template>
  <div class="result-box">
    <!-- 
      搜索框 
      el-input监听不了回车事件，原因应该是element-ui自身封装了一层input标签之后，把原来的事件隐藏了 
      解决方法需要在事件后面加上.native
    -->
    <el-input v-model="keyword" class="input-with-select"  @keyup.enter.native="search" :clearable="true" :autofocus="true">
      <el-select v-model="select" slot="prepend" >
        <el-option label="求索" value="0"></el-option>
        <el-option label="Google" value="1"></el-option>
        <el-option label="Baidu" value="2"></el-option>
        <el-option label="Bing" value="3"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search"  @click="search"></el-button>
    </el-input>

    <!-- 搜索联想 -->
    <!-- 历史搜索 -->

    <!-- 
      搜索结果页，结果详情页，`:key` 表示索引需要使用数字或者字符串 
      不要使用对象或数组之类的非原始类型值作为 v-for 的 key。用字符串或数类型的值取而代之。  
    -->
    <el-card class="box-card" shadow="hover" v-for="item in resultData" :key="item._id">
      <div slot="header" class="clearfix">
        <el-button type="text" @click="lookDocument(item._id)">{{ item._source.title }}</el-button>
      </div>
      <div v-if="item.highlight && item.highlight.body" class="text item" v-html="item.highlight.body.join()">
      </div>
      <div v-else class="text item">
        {{item._source.body}}
      </div>
    </el-card>

    <el-button class="loading-btn" @click="loadingMore" round :loading="loadingMoreFlag" :disabled="loadingDisable">{{loadingText}}</el-button>
  </div>
</template>

<style>
  .loading-btn {
    width: 100%;
    margin-top: 5px;
  }
  .result-box {
    margin-top: 20px;
    padding-left: 200px;
    padding-right: 200px;
  }
  .el-select .el-input {
    width: 100px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
    word-break: break-word;
  }
  .item em{
    color: red;
    font-style: normal;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    margin-top: 5px;
  }
  .el-card__header {
    padding: 5px 20px;
  }
</style>

<script>
  import cognitionService from '../service/cognitionService.js'

  export default {
    data() {
      return {
        keyword: '',
        select: '0',
        pageSize: 50,
        pageNo: 1,
        total: 0,
        resultData: [],
        loadingMoreFlag: false,
        loadingText: '加载更多',
        loadingDisable: false
      }
    },
    mounted: function() {
      this.keyword = this.$route.query.q //获取url参数
      if(this.keyword.trim().length == 0) {
        this.$router.push('/')
        return
      }

      this.getData()

    },
    methods: {
      loadingMore: function() {
        this.pageNo++
        this.loadingMoreFlag = true
        this.getData()

      },
      lookDocument: function(id) {
        console.debug(id)
        this.$router.push({
          name: 'document',
          params: {
            id:id
          }
        })
      },
      getData: async function() {
        // 开始搜索
        const loading = this.$loading({
          lock: true
        })
        var res = await cognitionService.search(this.keyword, this.pageNo, this.pageSize)
        loading.close()
        this.resultData = this.resultData.concat(res.data.hits.hits)
        this.total = res.data.hits.total
        if(this.total == 0) {
          // 没有搜索到数据
          this.loadingText = '没有数据 :('
          this.loadingDisable = true

        } else if (this.total > this.resultData.length) {
          // 还有数据
          this.loadingText = '加载更多'
          this.loadingDisable = false
        } else {
          // 已经到底了
          this.loadingText = '没有更多啦~'
          this.loadingDisable = true
        }
        this.loadingMoreFlag = false
      },
      search: function() {

        if(this.keyword.trim().length == 0) {
          return;
        }
        console.debug(this.select )
        switch(this.select) {
          case '0': 
            this.$router.replace({
              path: '/search',
              query: {
                q: this.keyword
              }
            }); //向url中传递参数
            // 重置搜索结果
            this.resultData = []
            this.pageNo = 1
            this.getData()
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