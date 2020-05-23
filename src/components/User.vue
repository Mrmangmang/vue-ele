<template>
    <div>
<!--        面包屑导航-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>管理</el-breadcrumb-item>
            <el-breadcrumb-item>列表</el-breadcrumb-item>
        </el-breadcrumb>
<!--        卡片视图区域-->
        <el-card>
<!--            搜索与添加区域-->
            <el-row :gutter="20">
                <el-col :span="7">
                    <el-input clearable placeholder="请输入内容" @clear="getUserList" v-model="queryInfo.query" >
                        <el-button  @click="getUserList" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary"@click="addDiaVisible=true" >添加用户</el-button>
                </el-col>
            </el-row>
<!--            用户列表区域-->
<!--            也就是说axios发送的请求到了userlist，然后用userlist渲染到页面上，-->
              <el-table :data="userlist" border stripe>
                  <el-table-column  type="index"></el-table-column>
                  <el-table-column label="姓名" prop="username"></el-table-column>
                  <el-table-column label="邮箱" prop="email"></el-table-column>
                  <el-table-column label="电话" prop="mobile"></el-table-column>
                  <el-table-column label="角色" prop="role_name"></el-table-column>
                  <el-table-column label="状态" prop="mg_state">
                      <template v-slot="scope" >
<!--                          把数据传到这个函数中-->
<!--                          事件触发就会执行这个函数-->
<!--                          因为switch绑定的是个布尔值，如果不给他参数，则switch-->
<!--                          触发的时候，还是回调参数还是个布尔值，-->
                          <el-switch
                                  v-model="scope.row.mg_state"
                                  @change="userStateChanged(scope.row)"
                          >
                          </el-switch>
                      </template>

                  </el-table-column>
                  <el-table-column label="操作" width="180px">
                      <template v-slot="scope" >
<!--                          修改-->
                          <el-tooltip class="item" effect="dark" content="修改"  placement="top-start">
                          <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog()"></el-button>
                          </el-tooltip>
<!--                          删除-->
                          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                          <el-button type="danger" icon="el-icon-delete"  size="mini"></el-button>
                          </el-tooltip>
<!--                          分配角色-->
                              <el-tooltip class="item" effect="dark" content="设置" placement="top-start" :enterable="false"	>
                          <el-button type="danger" icon="el-icon-setting"  size="mini" ></el-button>
                              </el-tooltip>
                      </template>
                  </el-table-column>
              </el-table>
<!--            分页区域-->
<!--            点击它便会调用这个事件，这个事件有个方法，-->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pagenum"
                    :page-sizes="[1, 3, 5, 10]"
                    :page-size="queryInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-card>
<!--添加用户对话框-->
        <el-dialog
                title="提示"
                :visible.sync="addDiaVisible"
                width="50%"
                closed="addDialogClosed"
                >
<!--            内容主体区-->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="addForm.mobile"></el-input>
                </el-form-item>
            </el-form>
<!--            底部区域-->
            <span slot="footer" class="dialog-footer">
      <el-button @click="addDiaVisible = false">取 消</el-button>
      <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
        </el-dialog>

<!--        修改用户对话框-->
        <el-dialog
                title="修改用户"
                :visible.sync="editDialogVisible"
                width="50%"
               >
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
      data(){
        return {
            //验证邮箱的校验规则,赶进度，晚点写
            // 获取用户列表的参数对象
            //这个想象成一个模块，通过改变他的值发送不同的axios请求
            queryInfo:{
                query:'',
                //当前的页数
                pagenum:1,
                //当前每页显示多少条数据
                pagesize:2
            },
            userlist:[],
            total:0,
            //控制添加用户对话框的显示与隐藏
            addDiaVisible:false,
            // 添加用户的表单数据
            addForm:{
                username:'',
                email:'',
                mobile:'',
                password:''
            },
            // 添加表单的验证规则
            addFormRules:{
                username:[
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
               password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                email:[
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                mobile:[
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
            },
            //控制修改用户对话框的显示与隐藏
            editDialogVisible:false,
        }
      },
        created() {
          this.getUserList()
        },
        methods:{
          //1.这是个axios请求，参数是querinfo{}，之后又把值传入到data，使其渲染出来
            async getUserList(){
           const {data:res} = await   this.$http.get('users',{params:this.queryInfo})
                { if(res.meta.status!==200) return this.$message.error('获取用户列表失败')}
                //之后把数据丢到了userlist中，
                this.userlist = res.data.users
                this.total = res.data.total
                console.log(res)
            },
            //2.之后通过改变querinfo的值，来改变请求参数，从而在发送一次页面需要的axios请求，
            //把它想象成模块，因为他的值改变就可以使axios请求改变，然后请求的数据给了data，data在渲染到页面
            //他的值通过分页绑定的事件改变，
            // 监听pagesize改变的事件,每页显示多少条数据
            //事件：sizechange 说明：pagesize改变时触发 回调参数 每页条数
            //只要你也换菜单，就会触发sizechange事件，事件写了个方法，方法就执行，
            //执行的参数就是每页条数，形参中可以拿到每页条数
            handleSizeChange(newSize){
               // console.log(newSize)
                this.queryInfo.pagesize =newSize
                this.getUserList()
            },
            //监听页码改变事件，当前的页数
            //只要你页码值发生切换，就会触发事件，这个事件绑定个函数，可以打印出当前页，
            handleCurrentChange(newPage){
                // console.log(newPage)
                this.queryInfo.pagenum = newPage
                this.getUserList()
            },
            //监听switch开关状态的改变
        async    userStateChanged(userInfo){
                console.log(userInfo)
            // 请求路径：users/:uId/state/:type type为布尔值
             const {data:res} = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
            if(res.meta.status!==200){
                userInfo.mg_state=!userInfo.mg_state
                return this.$message.error('更新用户状态失败')
            }
            this.$message.success('更新用户状态成功')
            },
            //监听添加用户对话框的关闭事件,
            //定义一个closed事件处理函数
    //         要获取整个数值的值，必须ref=’forname‘,从而可以对这个数据表单
    // 进行操作，通过this.$refs.forname=forname进行操作
            //为什么不能直接写呢？
            addDialogClosed(){
               this.$refs.addFormRef.resetFields()
               //  就是这个意思，html有个forname
                //  在js写必须dom.get它那种操作，vue提供的是$refs
                //  说这是虚拟dom，this.$refs.forname =
                //  forname把她理解一样了，其实是不一样的
            },
            // 点击按钮，添加新用户
            addUser(){
               this.$refs.addFormRef.validate(async valid=>{
                   // console.log(valid)
                   if(!valid) return
                   //可以发起添加用户的网络请求
       const {data:res}  = await this.$http.post('users',this.addForm)
              if(res.meta.status !== 201) {
                  this.$message.error('添加失败')
              }
              this.$message.success('添加用户成功')
                   //隐藏添加用户的对话框
                   this.addDiaVisible=false
                   //重新获取用户列表数据,并没有刷新列表数据
                   //这个还没有完整理解
                   // this.getUserList()
               })
            },
            //展示编辑用户对话框
            showEditDialog(){
                this.editDialogVisible = true
            }
        }
    }
</script>

<style scoped>

</style>
<!--分页效果的实现步骤，分页绑定了个事件，事件改变了axios发送请求的参数，从而res值-->
<!--变化，影响了data数据，data在渲染到页面-->
<!--相当于data存储了两个数据，一个是可以改变axios请求参数的值，从而axios可以发送不同的请求，-->
<!--一个是存储axios请求来的数据的值，从而在将其渲染到页面。-->
<!--有很多组件写着说明，比如事件名称，之后这个事件名称会有说明，以及这个事件会带来的-->
<!--影响，然后就可以使事件触发绑定一个方法，这个方法就能按他说明，来执行操作这个事件-->
