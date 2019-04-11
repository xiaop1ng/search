<template>
    <el-main style="min-height: 600px;">
        <!-- 添加、修改、查看 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogAddFormVisible" :close-on-click-modal="false" width="80%" >
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

        <!-- 导入 -->
        <el-dialog title="导入" :visible.sync="dialogImportFormVisible">
          <el-upload
            class="upload-demo"
            drag
            ref="upload"
            action="/"
            :auto-upload="false"
            accept=".md"
            :on-change="readFiles"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">请上传 md 文件</div>
          </el-upload>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogImportFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitImportForm">确 定</el-button>
          </div>
        </el-dialog>

        <div align="right" style="padding-right: 12px">
          
          <el-button
          size="mini" 
          @click="pageInit">Refresh</el-button>
          <el-button
          size="mini" 
          @click="handImport">Import</el-button>
          <el-button
          size="mini" 
          @click="handCreate">New</el-button>
          <el-button
          size="mini"
          type="danger"
          @click="handCreateBatch">DeleteBatch</el-button>
        </div>
        
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            @row-dblclick="handleDbClick">
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
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handlePreview(scope.$index, scope.row)">Preview</el-button>
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
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          @current-change="pageChange"
          :total="total">
        </el-pagination>
    </el-main>
</template>

<style>
  
</style>

<script>
  import cognitionService from '../../service/cognitionService.js'
  var clone = require('clone')

  export default {
    data() {
      return {
        tableData: [],
        dialogAddFormVisible: false,
        addForm: {},
        pageNo: 1,
        pageSize: 20,
        total: 0,
        dialogTitle: '',
        op: 1, // 1 添加； 2 修改； 3 查看
        batchOpArr: [], // 批量操作数组,
        dialogImportFormVisible: false,
        importFiles: []
      }
    },
    computed: {
      
    },
    mounted() {
      console.debug("mounted")
      this.pageInit()
    },
    methods: {
      pageInit: async function() {
        // loading 框
        const loading = this.$loading({
          lock: true
        })
        console.debug(this.pageSize)
        var res = await cognitionService.list(this.pageNo, this.pageSize)
        loading.close()
        this.tableData = res.data.hits.hits
        this.total = res.data.hits.total

        
      },
      pageChange: function(pageNo) {
        this.pageNo = pageNo
        this.pageInit()
      },
      handleSelectionChange: function(res) {
          this.batchOpArr = res
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
      handCreateBatch: function() { // 批量删除
        var size = this.batchOpArr.length
        if(size == 0) {
          return
        }
        this.$confirm('此操作将永久删除选中文档，共计 ' + size + ' 条，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
          var res = await cognitionService.delBatch(this.batchOpArr)
          this.batchOpArr.forEach( T => {
            this.tableData.forEach( (K,idx) => {
              if(K._id == T._id) {
                this.tableData.splice(idx, 1)
              }
            })
          })
          this.batchOpArr = []
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handImport: function() {
        // 导入
        this.dialogImportFormVisible = true
      },
      readFiles: function(file, fileList) {
        this.importFiles = fileList
      },
      submitImportForm: function() {
        var importSize = this.importFiles.length;
        if( importSize == 0) {
          return
        }
        // 导入文档到 es
        // loading 框
        const loading = this.$loading({
          lock: true
        })
        var importDocs = [];
        this.importFiles.forEach( T => {
          console.log(T.name)
          var reader = new FileReader();
          reader.onload = async() => {
            importDocs.push({
              title: T.name,
              body:  reader.result,
              date: new Date().getTime()
            })

            if(importDocs.length == importSize) {
              // 读文件操作完成
              var res = await cognitionService.addBatch(importDocs)
              loading.close()
              this.dialogImportFormVisible = false
              this.$message({
                type: 'success',
                message: '导入完成，请刷新列表!'
              });
              this.$refs.upload.clearFiles()
            }
          };
          reader.readAsText(T.raw);
        })

        // loading...

        // 判断 importDocs.length == importFiles.length 批量添加到 es
      },
      handCreate: function() {
        // 弹窗
        this.addForm = {}
        this.op = 1
        this.dialogTitle = this.getDialogTitle()
        this.dialogAddFormVisible = true
      },
      handleDbClick: function(row, column) {
        this.handleEdit(null, row)
      },
      handleEdit: function(idx, row) {
        this.addForm = clone(row._source)
        this.addForm.id = row._id
        this.op = 2
        this.dialogTitle = this.getDialogTitle()
        this.dialogAddFormVisible = true
      },
      handlePreview: function (idx, row) {
        window.open('/document/' + row._id, '_blank')
      },
      handleDelete:  function(idx, row) {
        this.$confirm('此操作将永久删除该文档，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
          var res = await cognitionService.del(row._id)
          if(res && res.data.result == "deleted") {
            
            this.$message({
              message: 'success',
              type: 'success'
            });
            // 删除
            this.tableData.forEach( (T, idx) => {
              if(T._id == row._id) {
                this.tableData.splice(idx, 1)
              }
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

        
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
          if( this.op == 2 ) {
            // 修改
            this.tableData.forEach(T => {
              if(res.data._id == T._id) {
                T._source = clone(this.addForm)
              }
            })
            
          } else if( this.op == 1 ) {
            // 添加
            console.debug(this.addForm)
            this.tableData.unshift({
              _id: res.data._id,
              _source: clone(this.addForm)
            })
          }
          
        }
      }
    }
  };
</script>
