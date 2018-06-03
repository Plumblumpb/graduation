var vue = new Vue({
    el: "#sysVersion",
    data: {
        query: {
            softName: null,
            devType: null,
            isMastUpdate: null,
            dateButton: null
        },
        isMastUpdate: [{
            value: '0',
            label: '否'
        }, {
            value: '1',
            label: '是'
        }],
        versionDevType: [{
            value: '0',
            label: 'android'
        }, {
            value: '1',
            label: 'ios',
        }, {
            value: '2',
            label: '微信'
        }],
        showList: true,
        sysVersion: null,
        currentPage: 1,
        pageSize: 20,
        total: 0,
        multipleSelection: [],
        title: null,
        versionForm: {
            softName: null,
            softUrl: null,
            isMastUpdate: '0',
            devType: '0',
            vName: null,
            vCode: null,
            updateInfo: null
        },
        rules: {
            softName: [
                {required: true, message: '请输入软件名称', trigger: 'blur'},
                {min: 0, max: 50, message: '长度在1到50个字符', trigger: 'blur'}
            ],
            vName: [
                {min: 0, max: 10, message: '长度在0到10个字符', trigger: 'blur'}
            ],
            softUrl: [
                {min: 0, max: 200, message: '长度在0到200个字符', trigger: 'blur'}
            ],
            updateInfo: [
                {min: 0, max: 2000, message: '长度在0到2000个字符', trigger: 'blur'}
            ],
            vCode: [
                {type: 'number', message: '版本号必须为数字值'}
            ]
        },
        checkedVersion: [],
    },

    methods: {
        clearCondition: function () {
            vue.query.softName = null;
            vue.query.isMastUpdate = null;
            vue.query.devType = null;
        },
        searchSysVersions: function () {
            axios.get('../../sys/version/list', {
                params: {
                    currentPage: vue.currentPage,
                    pageSize: vue.pageSize,
                    softName: vue.query.softName,
                    isMastUpdate: vue.query.isMastUpdate,
                    devType: vue.query.devType,
                    dateButton: vue.query.dateButton
                }
            }).then(function (response) {
                if (response.data.code == 0) {
                    vue.sysVersion = response.data.pageInfo.list;
                    vue.total = response.data.pageInfo.total;
                } else {
                    vue.$message({
                        message: '加载版本数据失败',
                        type: 'error'
                    });
                }
            });
        },
        addVersion: function () {
            vue.VersionForm = {
                title: vue.title = '新增版本',
                softName: null,
                softUrl: null,
                isMastUpdate: '0',
                devType: '0',
                vName: null,
                vCode: null,
                updateInfo: null
            }
            vue.$refs['versionForm'].resetFields();
            vue.showList = false
        },
        saveVersion: function () {
            vue.$refs['versionForm'].validate(function (valid) {
                // 获取选择的功能权限
                if (valid) {
                    // 校验通过
                    vue.versionForm.versionIdList = vue.checkedVersion;
                    if (vue.versionForm.id == null || vue.versionForm.id == '') {
                        url = '../../sys/version/save';
                    } else {
                        url = '../../sys/version/update';
                    }
                    axios.post(url, vue.versionForm).then(function (response) {
                        if (response.data.code == 0) {
                            vue.query.isMastUpdate = '';
                            vue.query.devType = '';
                            // 保存成功，隐藏表单，更新列表数据
                            vue.$message({
                                message: '成功保存版本信息',
                                type: 'success'
                            });
                            vue.showList = true;
                            vue.clearCondition();
                            vue.searchSysVersions();
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
        updateVersion: function (row) {
            vue.title = '编辑版本';
            axios.get('../../sys/version/info/' + row.id).then(function (response) {
                if (response.data.code == 0) {
                    vue.versionForm = response.data.version;
                    vue.versionForm.isMastUpdate = vue.versionForm.isMastUpdate + '';
                    vue.query.devType = vue.versionForm.devType + '';
                } else {
                    vue.$message({
                        message: '加载版本数据失败',
                        type: 'error'
                    });
                }
            })
            vue.versionForm.devType = null;
            vue.showList = false;
        },
        cancel: function () {
            vue.query.devType = null;
            vue.showList = true;
        },
        deleteVersion: function () {
            // 判断是否有选中记录
            if (vue.multipleSelection.length == 0) {
                vue.$message({
                    message: '请先选择需要删除的版本',
                    type: 'warning'
                });
                return;
            } else {
                var ids = new Array();
                var softNames = '';
                for (var i = 0; i < vue.multipleSelection.length; i++) {
                    ids.push(vue.multipleSelection[i].id);
                    softNames += vue.multipleSelection[i].softName + ',';
                }

                softNames = softNames.substring(0, softNames.length - 1);

                vue.$confirm('此操作将删除' + softNames + '版本信息，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    callback: function (action, instance) {
                        if (action == 'cancel') {
                            return;
                        } else {
                            axios.post('../../sys/version/delete', ids).then(function (response) {
                                if (response.data.code == 0) {
                                    // 保存成功，隐藏表单，更新列表数据
                                    vue.$message({
                                        message: '成功删除版本信息',
                                        type: 'success'
                                    });
                                    vue.multipleSelection = [];
                                    vue.searchSysversions();
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
        deleteVersionInRow: function (row) {
            vue.$confirm('此操作将删除' + row.softName + '版本信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                callback: function (action, instance) {
                    if (action == 'cancel') {
                        return;
                    } else {
                        var versionId = new Array();
                        versionId.push(row.id);
                        axios.post('../../sys/version/delete', versionId).then(function (response) {
                            if (response.data.code == 0) {
                                // 保存成功，隐藏表单，更新列表数据
                                vue.$message({
                                    message: '成功删除版本信息',
                                    type: 'success'
                                });
                                vue.multipleSelection = [];
                                vue.searchSysVersions();
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
        orderByDate: function (custom) {
            if (custom.order == "ascending") {
                vue.query.dateButton = 1
            } else {
                vue.query.dateButton = 0
            }
            vue.searchSysVersions();
        },
        handleSelectionChange: function (val) {
            vue.multipleSelection = val;
        },
        formatVersionDevType: function (row, column, cellValue) {
            if (cellValue === 0) {
                return 'android';
            }
            if (cellValue === 1) {
                return 'ios';
            }
            if (cellValue === 2) {
                return '微信';
            }
        },
        formatVersionIsUpdate: function (row, column, cellValue) {
            if (cellValue === 0) {
                return '否';
            }
            if (cellValue === 1) {
                return '是';
            }
        },
        handleSizeChange: function (val) {
            vue.pageSize = val;
            vue.searchSysVersions();
        },
        handleCurrentChange: function (val) {
            vue.currentPage = val;
            vue.searchSysVersions();
        }
    },
    created: function () {
        axios.get('../../sys/version/list', {
            params: {currentPage: 1, pageSize: 20}
        }).then(function (response) {
            if (response.data.code == 0) {
                vue.sysVersion = response.data.pageInfo.list;
                vue.total = response.data.pageInfo.total;
            } else {
                vue.$message({
                    message: '加载版本数据失败',
                    type: 'error'
                });
            }
        });
    }

})