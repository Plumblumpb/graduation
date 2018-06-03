var vue = new Vue({
    el: "#sysConfig",
    data: {
        query: {
            reserved: null,
            status: null,
            serviceType: null
        },
        configStatus: [{
            value: '0',
            label: '不可用'
        }, {
            value: '1',
            label: '可用'
        }],
        configServiceType: [{
            value: '0',
            label: '行讯通后台'
        }, {
            value: '1',
            label: '认证服务'
        }, {
            value: '2',
            label: '短信'
        }, {
            value: '3',
            label: '行讯通APP'
        }],
        showList: true,
        sysConfig: null,
        currentPage: 1,
        pageSize: 20,
        total: 0,
        multipleSelection: [],
        title: null,
        configForm: {
            id: null,
            reserved: null,
            paramValue: null,
            serviceType: null,
            status: '0',
            serviceType: '0',
            configIdList: null
        },
        rules: {
            paramName: [
                {required: true, message: '请输入配置参数名', trigger: 'blur'},
                {min: 0, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
            ],
            paramValue: [
                {required: true, message: '请输入配置链接', trigger: 'blur'},
                {min: 0, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
            ],
            reserved: [
                {min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur'}
            ]

        },
        checkedConfig: [],

    },
    methods: {
        clearCondition: function () {
            vue.query.reserved = null;
            vue.query.status = null;
            vue.query.serviceType = null;
        },
        searchSysConfigs: function () {
            axios.get('../../sys/config/list', {
                params: {
                    currentPage: vue.currentPage,
                    pageSize: vue.pageSize,
                    reserved: vue.query.reserved,
                    status: vue.query.status,
                    serviceType: vue.query.serviceType
                }
            }).then(function (response) {
                if (response.data.code == 0) {
                    vue.sysConfig = response.data.pageInfo.list;
                    vue.total = response.data.pageInfo.total;
                } else {
                    vue.$message({
                        message: '加载配置数据失败',
                        type: 'error'
                    });
                }
            });
        },
        addConfig: function () {
            vue.configForm = {
                title: vue.title = '新增配置',
                paramName: null,
                reserved: null,
                paramValue: null,
                status: '0',
                serviceType: '0',
                configIdList: null
            }
            vue.$refs['configForm'].resetFields();
            vue.showList = false
        },
        saveConfig: function () {
            vue.$refs['configForm'].validate(function (valid) {
                // 获取选择的功能权限
                if (valid) {
                    // 校验通过
                    vue.configForm.configIdList = vue.checkedConfig;
                    if (vue.configForm.id == null || vue.configForm.id == '') {
                        url = '../../sys/config/save';
                    } else {
                        url = '../../sys/config/update';
                    }
                    axios.post(url, vue.configForm).then(function (response) {
                        if (response.data.code == 0) {
                            vue.query.status = '';
                            vue.query.serviceType = '';
                            // 保存成功，隐藏表单，更新列表数据
                            vue.$message({
                                message: '成功保存配置信息',
                                type: 'success'
                            });
                            vue.showList = true;
                            vue.clearCondition();
                            vue.searchSysConfigs();
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
        updateConfig: function (row) {
            vue.title = '编辑配置';
            axios.get('../../sys/config/info/' + row.id).then(function (response) {
                if (response.data.code == 0) {
                    vue.configForm = response.data.config;
                    vue.configForm.status = vue.configForm.status + '';
                    vue.query.serviceType = vue.configForm.serviceType + '';
                } else {
                    vue.$message({
                        message: '加载配置数据失败',
                        type: 'error'
                    });
                }
            })
            vue.configForm.serviceType = null;
            vue.showList = false;
        },
        cancel: function () {
            vue.query.serviceType = null;
            vue.showList = true;
        },
        deleteConfig: function () {
            // 判断是否有选中记录
            if (vue.multipleSelection.length == 0) {
                vue.$message({
                    message: '请先选择需要删除的配置',
                    type: 'warning'
                });
                return;
            } else {
                var ids = new Array();
                var configNames = '';
                for (var i = 0; i < vue.multipleSelection.length; i++) {
                    ids.push(vue.multipleSelection[i].id);
                    configNames += vue.multipleSelection[i].reserved + ',';
                }

                configNames = configNames.substring(0, configNames.length - 1);

                vue.$confirm('此操作将删除' + configNames + '配置信息，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    callback: function (action, instance) {
                        if (action == 'cancel') {
                            return;
                        } else {
                            axios.post('../../sys/config/delete', ids).then(function (response) {
                                if (response.data.code == 0) {
                                    // 保存成功，隐藏表单，更新列表数据
                                    vue.$message({
                                        message: '成功删除配置信息',
                                        type: 'success'
                                    });
                                    vue.multipleSelection = [];
                                    vue.searchSysConfigs();
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
        deleteConfigInRow: function (row) {
            vue.$confirm('此操作将删除' + row.reserved + '配置信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                callback: function (action, instance) {
                    if (action == 'cancel') {
                        return;
                    } else {
                        var configId = new Array();
                        configId.push(row.id);
                        axios.post('../../sys/config/delete', configId).then(function (response) {
                            if (response.data.code == 0) {
                                // 保存成功，隐藏表单，更新列表数据
                                vue.$message({
                                    message: '成功删除配置信息',
                                    type: 'success'
                                });
                                vue.multipleSelection = [];
                                vue.searchSysConfigs();
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
        handleSelectionChange: function (val) {
            vue.multipleSelection = val;
        },
        formatConfigServiceType: function (row, column, cellValue) {
            if (cellValue === 0) {
                return '行讯通后台';
            }
            if (cellValue === 1) {
                return '认证服务';
            }
            if (cellValue === 2) {
                return '短信';
            }
            if (cellValue === 3) {
                return '行讯通app';
            }
        },
        formatConfigStatus: function (row, column, cellValue) {
            if (cellValue === 0) {
                return '不可用';
            }
            if (cellValue === 1) {
                return '可用';
            }
        },
        handleSizeChange: function (val) {
            vue.pageSize = val;
            vue.searchSysConfigs();
        },
        handleCurrentChange: function (val) {
            vue.currentPage = val;
            vue.searchSysConfigs();
        }
    },
    created: function () {
        axios.get('../../sys/config/list', {
            params: {currentPage: 1, pageSize: 20}
        }).then(function (response) {
            if (response.data.code == 0) {
                vue.sysConfig = response.data.pageInfo.list;
                vue.total = response.data.pageInfo.total;
            } else {
                vue.$message({
                    message: '加载配置数据失败',
                    type: 'error'
                });
            }
        });
    }

})