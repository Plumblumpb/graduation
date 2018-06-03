var vue = new Vue({
    el: '#sysUser',
    data: {
        query: {
            username: null
        },
        showList: true,
        sysUsers: null,
        formatUserStatus: function (row, column, cellValue) {
            if (cellValue === 0) {
                return '禁用';
            } else if (cellValue === 1) {
                return '正常';
            }
        },
        multipleSelection: [],
        currentPage: 1,
        pageSize: 20,
        total: 0,
        title: null,
        userForm: {
            userId: null,
            username: null,
            password: null,
            email: null,
            mobile: null,
            status: '1',
            roleIdList: null,
            deptId: null,
            deptName: null
        },
        rules: {
            username: [
                {required: true, message: '请输入用户名', trigger: 'blur'}
            ],
            deptName: [
                {required: true, message: '请选择所属部门', trigger: 'blur'}
            ],
            password: [
                {required: true, message: '请输入密码', trigger: 'blur'}
            ],
            email: [
                {required: true, message: '请输入邮箱', trigger: 'blur'},
                {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
            ],
            mobile: [
                {required: true, message: '请输入手机号', trigger: 'blur'}
            ]
        },
        showDept: false,
        deptTree: null,
        defaultProps4Dept: {
            children: 'children',
            label: 'name'
        },
        checkedRole: [],
        roleList: []
    },
    methods: {
        clearCondition: function () {
            vue.query.username = null;
        },
        searchSysUsers: function () {
            axios.get('../../sys/user/list', {
                params: {currentPage: 1, pageSize: 20, username: vue.query.username}
            }).then(function (response) {
                if (response.data.code == 0) {
                    vue.sysUsers = response.data.pageInfo.list;
                    vue.total = response.data.pageInfo.total;
                } else {
                    vue.$message({
                        message: '加载系统管理员数据失败',
                        type: 'error'
                    });
                }
            });
        },
        addUser: function () {
            vue.userForm = {
                userId: null,
                username: null,
                password: null,
                email: null,
                mobile: null,
                status: '1',
                roleIdList: null,
                deptId: null,
                deptName: null
            }
            vue.checkedRole = [];
            vue.$refs['userForm'].resetFields();
            axios.get("../../sys/role/select").then(function (response) {
                vue.roleList = response.data.list;
            });
            vue.title = '新增系统管理员';
            vue.showList = false;
        },
        deleteUser: function () {
            // 判断是否选中待删除的用户
            if (vue.multipleSelection.length == 0) {
                vue.$message({
                    message: '请先选择需要删除的管理员',
                    type: 'warning'
                });
                return;
            } else {
                var userIds = new Array();
                var usernames = '';
                for (var i = 0; i < vue.multipleSelection.length; i++) {
                    userIds.push(vue.multipleSelection[i].userId);
                    usernames += vue.multipleSelection[i].username + ',';
                }
                usernames = usernames.substring(0, usernames.length - 1);
                vue.$confirm('此操作将删除' + usernames + '用户，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    callback: function (action, instance) {
                        if (action == 'cancel') {
                            return;
                        } else {
                            axios.post('../../sys/user/delete', userIds).then(function (response) {
                                if (response.data.code == 0) {
                                    // 保存成功，隐藏表单，更新列表数据
                                    vue.$message({
                                        message: '成功删除系统管理员',
                                        type: 'success'
                                    });
                                    vue.multipleSelection = [];
                                    vue.searchSysUsers();
                                } else {
                                    vue.$message({
                                        message: response.data.msg,
                                        type: 'error'
                                    });
                                }
                            });
                        }
                    }
                });
            }
        },
        handleSelectionChange: function (val) {
            vue.multipleSelection = val;
        },
        updateUser: function (row) {
            vue.title = '编辑系统管理员';
            axios.get('../../sys/user/info/' + row.userId).then(function (response) {
                if (response.data.code == 0) {
                    vue.userForm = response.data.user;
                    vue.userForm.deptName = row.deptName;
                    vue.userForm.status = vue.userForm.status + '';
                    axios.get("../../sys/role/select").then(function (response) {
                        vue.roleList = response.data.list;
                        vue.checkedRole = vue.userForm.roleIdList;
                    });
                } else {
                    vue.$message({
                        message: response.data.msg,
                        type: 'error'
                    });
                }
            });
            vue.showList = false;
        },
        deleteUserInRow: function (row) {
            vue.$confirm('此操作将删除' + row.username + '用户，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                callback: function (action, instance) {
                    if (action == 'cancel') {
                        return;
                    } else {
                        var userIds = new Array();
                        userIds.push(row.userId);
                        axios.post('../../sys/user/delete', userIds).then(function (response) {
                            if (response.data.code == 0) {
                                // 保存成功，隐藏表单，更新列表数据
                                vue.$message({
                                    message: '成功删除系统管理员',
                                    type: 'success'
                                });
                                vue.multipleSelection = [];
                                vue.searchSysUsers();
                            } else {
                                vue.$message({
                                    message: response.data.msg,
                                    type: 'error'
                                });
                            }
                        });
                    }
                }
            });
        },
        cancel: function () {
            vue.showList = true;
        },
        handleDeptNodeClick: function (nodeObject, node, nodeComponent) {
            vue.userForm.deptId = nodeObject.deptId;
            vue.userForm.deptName = nodeObject.name;
            vue.showDept = false;
        },
        saveUser: function () {
            vue.$refs['userForm'].validate(function (valid) {
                // 获取选择的功能权限
                if (valid) {
                    // 校验通过
                    vue.userForm.roleIdList = vue.checkedRole;
                    var url;
                    if (vue.userForm.userId == null || vue.userForm.userId == '') {
                        url = '../../sys/user/save';
                    } else {
                        url = '../../sys/user/update';
                    }
                    axios.post(url, vue.userForm).then(function (response) {
                        if (response.data.code == 0) {
                            // 保存成功，隐藏表单，更新列表数据
                            vue.$message({
                                message: '成功保存系统管理员',
                                type: 'success'
                            });
                            vue.showList = true;
                            vue.searchSysUsers();
                        } else {
                            vue.$message({
                                message: response.data.msg,
                                type: 'error'
                            });
                        }
                    });
                }
            });
        },
        showDeptTree: function (event) {
            axios.get('../../sys/dept/list').then(function (response) {
                var deptTree = treeify(response.data, 'deptId', 'parentId', 'children');
                vue.deptTree = deptTree;
            });
            vue.showDept = true;
        },
        handleSizeChange: function (val) {
            vue.pageSize = val;
            vue.searchSysUsers();
        },
        handleCurrentChange: function (val) {
            vue.currentPage = val;
            vue.searchSysUsers();
        }
    },
    created: function () {
        // 加载系统管理员
        axios.get('../../sys/user/list', {
            params: {currentPage: 1, pageSize: 20}
        }).then(function (response) {
            if (response.data.code == 0) {
                vue.sysUsers = response.data.pageInfo.list;
                vue.total = response.data.pageInfo.total;
            } else {
                vue.$message({
                    message: '加载系统管理员数据失败',
                    type: 'error'
                });
            }
        });
    }
});