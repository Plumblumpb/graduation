var vue = new Vue({
    el: '#sysRole',
    data: {
        query: {
            roleName: null
        },
        showList: true,
        sysRoles: null,
        currentPage: 1,
        pageSize: 20,
        total: 0,
        multipleSelection: [],
        title: null,
        roleForm: {
            roleName: null,
            deptId: null,
            deptName: null,
            remark: null
        },
        rules: {
            roleName: [
                {required: true, message: '请输入角色名称', trigger: 'blur'},
                {max: 50, message: '长度最长为50个字符', trigger: 'blur'}
            ],
            deptName: [
                {required: true, message: '请选择所属部门', trigger: 'change'}
            ],
            remark: [
                {max: 100, message: '长度最长为100个字符', trigger: 'blur'}
            ]
        },
        defaultProps: {
            children: 'children',
            label: 'name'
        },
        menuTree: null,
        deptTree: null,
        showDept: false,
        defaultProps4Dept: {
            children: 'children',
            label: 'name'
        }
    },
    methods: {
        clearCondition: function () {
            vue.query.roleName = null;
        },
        searchSysRoles: function () {
            axios.get('../../sys/role/list', {
                params: {currentPage: 1, pageSize: 20, roleName: vue.query.roleName}
            }).then(function (response) {
                if (response.data.code == 0) {
                    vue.sysRoles = response.data.pageInfo.list;
                    vue.total = response.data.pageInfo.total;
                } else {
                    vue.$message({
                        message: '加载系统角色数据失败',
                        type: 'error'
                    });
                }
            });
        },
        handleSelectionChange: function (val) {
            vue.multipleSelection = val;
        },
        addRole: function () {
            vue.title = '新增角色';
            vue.roleForm = {
                roleName: null,
                deptId: null,
                deptName: null,
                remark: null
            }
            vue.$refs['roleForm'].resetFields();
            // 加载功能权限
            axios.get('../../sys/menu/list').then(function (response) {
                var menuTree = treeify(response.data, 'menuId', 'parentId', 'children');
                vue.menuTree = menuTree;
            });
            vue.showList = false;
        },
        showDeptTree: function (event) {
            axios.get('../../sys/dept/list').then(function (response) {
                var deptTree = treeify(response.data, 'deptId', 'parentId', 'children');
                vue.deptTree = deptTree;
            });
            vue.showDept = true;
        },
        handleDeptNodeClick: function (nodeObject, node, nodeComponent) {
            vue.roleForm.deptId = nodeObject.deptId;
            vue.roleForm.deptName = nodeObject.name;
            vue.showDept = false;
        },
        cancel: function () {
            vue.showList = true;
        },
        saveRole: function () {
            vue.$refs['roleForm'].validate(function (valid) {
                // 获取选择的功能权限
                if (valid) {
                    // 校验通过
                    var menuIdList = vue.$refs.menuTree.getCheckedKeys();
                    vue.roleForm.menuIdList = menuIdList;
                    vue.roleForm.deptIdList = [vue.roleForm.deptId];
                    var url;
                    if (vue.roleForm.roleId == null || vue.roleForm.roleId == '') {
                        url = '../../sys/role/save';
                    } else {
                        url = '../../sys/role/update';
                    }
                    axios.post(url, vue.roleForm).then(function (response) {
                        if (response.data.code == 0) {
                            // 保存成功，隐藏表单，更新列表数据
                            vue.$message({
                                message: '成功保存系统角色',
                                type: 'success'
                            });
                            vue.showList = true;
                            vue.searchSysRoles();
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
        updateRole: function (row) {
            vue.title = '编辑角色';
            // 根据角色ID获取功能权限
            axios.get('../../sys/role/info/' + row.roleId).then(function (response) {
                if (response.data.code == 0) {
                    vue.roleForm = response.data.role;
                    vue.roleForm.deptName = row.deptName;
                    axios.get('../../sys/dept/list').then(function (response) {
                        var deptTree = treeify(response.data, 'deptId', 'parentId', 'children');
                        vue.deptTree = deptTree;
                    });
                    axios.get('../../sys/menu/list').then(function (response) {
                        var menuTree = treeify(response.data, 'menuId', 'parentId', 'children');
                        vue.menuTree = menuTree;
                        vue.$refs.menuTree.setCheckedKeys(vue.roleForm.menuIdList);
                    });
                } else {
                    vue.$message({
                        message: '加载角色数据失败',
                        type: 'error'
                    });
                }
            });
            vue.showList = false;
        },
        deleteRole: function () {
            // 判断是否有选中记录
            if (vue.multipleSelection.length == 0) {
                vue.$message({
                    message: '请先选择需要删除的角色',
                    type: 'warning'
                });
                return;
            } else {
                var roleIds = new Array();
                var roleNames = '';
                for (var i = 0; i < vue.multipleSelection.length; i++) {
                    roleIds.push(vue.multipleSelection[i].roleId);
                    roleNames += vue.multipleSelection[i].roleName + ',';
                }
                roleNames = roleNames.substring(0, roleNames.length - 1);
                vue.$confirm('此操作将删除' + roleNames + '角色，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    callback: function (action, instance) {
                        if (action == 'cancel') {
                            return;
                        } else {
                            axios.post('../../sys/role/delete', roleIds).then(function (response) {
                                if (response.data.code == 0) {
                                    // 保存成功，隐藏表单，更新列表数据
                                    vue.$message({
                                        message: '成功删除系统角色',
                                        type: 'success'
                                    });
                                    vue.multipleSelection = [];
                                    vue.searchSysRoles();
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
        deleteRoleInRow: function (row) {
            vue.$confirm('此操作将删除' + row.roleName + '角色，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                callback: function (action, instance) {
                    if (action == 'cancel') {
                        return;
                    } else {
                        axios.post('../../sys/role/delete', [row.roleId]).then(function (response) {
                            if (response.data.code == 0) {
                                // 保存成功，隐藏表单，更新列表数据
                                vue.$message({
                                    message: '成功删除系统角色',
                                    type: 'success'
                                });
                                vue.searchSysRoles();
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
        handleSizeChange: function (val) {
            vue.pageSize = val;
            vue.searchSysRoles();
        },
        handleCurrentChange: function (val) {
            vue.currentPage = val;
            vue.searchSysRoles();
        }
    },
    created: function () {
        axios.get('../../sys/role/list', {
            params: {currentPage: 1, pageSize: 20}
        }).then(function (response) {
            if (response.data.code == 0) {
                vue.sysRoles = response.data.pageInfo.list;
                vue.total = response.data.pageInfo.total;
            } else {
                vue.$message({
                    message: '加载系统角色数据失败',
                    type: 'error'
                });
            }
        });
    }
});