<template>
    <el-main style="min-height: 600px;">
      <!-- 添加 -->
      <el-dialog title="添加文档" :visible.sync="dialogAddFormVisible">
        <el-form :model="addForm">
          <el-form-item label="标题" :label-width="formLabelWidth">
            <el-input v-model="addForm.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="内容" :label-width="formLabelWidth">
            <el-input v-model="addForm.body"  type="textarea" :autosize="{ minRows: 10, maxRows: 40}" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitAddForm">确 定</el-button>
        </div>
      </el-dialog>

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
            width="200">
            <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
            prop="title"
            label="标题"
            width="300">
            </el-table-column>
            <el-table-column
            prop="desc"
            label="内容"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              align="right">
              <template slot="header" slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handCreate">New</el-button>
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
              </template>
            </el-table-column>
        </el-table>
    </el-main>
</template>

<style>
  
</style>

<script>
  import cognitionService from '../../service/cognitionService.js'

  export default {
    data() {
      return {
        tableData: [],
        dialogAddFormVisible: false,
        addForm: {}
      }
    },
    computed: {
      
    },
    mounted() {
      console.debug("mounted")
      var res = cognitionService.list()
      console.log(res)
      if(res.hits) {
        // 存在数据
      }
    },
    methods: {
      handleSelectionChange: function(res) {
          console.debug('seleChange: ', res)
      },
      handCreate: function() {
        // 弹窗
        this.dialogAddFormVisible = true
      },
      handleEdit: function(idx, row) {

      },
      handleDelete: function(idx, row) {

      },
      submitAddForm: function() {
        console.log(this.addForm)
        this.dialogAddFormVisible = false
        var res = cognitionService.upsert(this.addForm)
        if(res && res._id) {
          this.$message({
            message: 'success',
            type: 'success'
          });
        }
      }
    }
  };
</script>
