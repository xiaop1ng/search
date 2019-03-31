<template>
    <el-main style="min-height: 600px;">
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            label="日期"
            width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
            prop="title"
            label="标题"
            width="120">
            </el-table-column>
            <el-table-column
            prop="desc"
            label="描述"
            show-overflow-tooltip>
            </el-table-column>
        </el-table>
    </el-main>
</template>

<style>
  
</style>

<script>

  export default {
    data() {
      return {
        tableData: []
      }
    },
    computed: {
      
    },
    mounted() {
        console.debug("mounted")
    },
    methods: {
      handleSelectionChange: function(res) {
          console.debug('seleChange: ', res);
      }
    }
  };
</script>
