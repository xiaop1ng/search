<template>
    <el-main style="min-height: 600px;">
        <!-- 添加、修改、查看 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogAddFormVisible">
          <el-form :model="addForm">
            <el-form-item label="标题">
              <el-input v-model="addForm.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="内容">
              <el-input v-model="addForm.body"  type="textarea" :autosize="{ minRows: 10, maxRows: 40}" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogAddFormVisible = false">取 消</el-button>
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
            label="时间戳"
            width="200">
            <template slot-scope="scope">{{ scope.row._source.date }}</template>
            </el-table-column>
            <el-table-column
            prop="_source.title"
            label="标题"
            width="300">
            </el-table-column>
            <el-table-column
            prop="_source.body"
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
        addForm: {},
        pageNo: 1,
        pageSize: 20,
        dialogTitle: '',
        op: 1, // 1 添加； 2 修改； 3 查看
      }
    },
    computed: {
      
    },
    mounted() {
      console.debug("mounted")
      this.pageInit()
    },
    methods: {
      pageInit: function() {
        var _this = this
        const loading = this.$loading({
          lock: true,
          // text: 'Loading',
          // spinner: 'el-icon-loading',
          // background: 'rgba(0, 0, 0, 0.7)'
        })
        setTimeout( async () => {
          loading.close();
          var res = await cognitionService.list(this.pageNo, this.pageSize)
          _this.tableData = res.data.hits.hits
        }, 980)
        
      },
      handleSelectionChange: function(res) {
          console.debug('seleChange: ', res)
      },
      getDialogTitle: function() {
        if(this.op == 1) {
          return '添加文档'
        } else if(this.op == 2) {
          return '修改文档'
        } else if (this.op == 3) {
          return '查看文档'
        } else {
          return '文档'
        }
      },
      handCreate: function() {
        // 弹窗
        this.addForm = {}
        this.op = 1
        this.dialogTitle = this.getDialogTitle()
        this.dialogAddFormVisible = true
      },
      handleEdit: function(idx, row) {
        this.addForm = row._source
        this.addForm.id = row._id
        this.op = 2
        this.dialogTitle = this.getDialogTitle()
        this.dialogAddFormVisible = true
      },
      handleDelete: async function(idx, row) {
        var res = await cognitionService.del(row._id)
        if(res && res.data.result == "deleted") {
          
          this.$message({
            message: 'success',
            type: 'success'
          });
          this.pageInit()
          // var _this = this
          // window.setTimeout(function() {
          //   _this.pageInit()
          // }, 1000)
        }
      },
      submitAddForm: async function() {
        this.dialogAddFormVisible = false
        this.addForm.date = new Date().getTime()
        var res = await cognitionService.upsert(this.addForm)
        if(res && res.data._id) {
          this.$message({
            message: 'success',
            type: 'success'
          });
          this.pageInit()
        }
      }
    }
  };
</script>
