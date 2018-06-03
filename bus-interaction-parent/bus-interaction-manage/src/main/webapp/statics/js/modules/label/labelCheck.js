var vue = new Vue({
    el: "#bsLabel",
    data: {
        query: {
            type: null,
            state: null,
            labelCode: null,
            createBtn: null,
            setUpBtn: null
        },
        type: [{
            value: '1',
            label: '公交车'
        }, {
            value: '2',
            label: '公交站台'
        }],
        state: [{
            value: '0',
            label: '登记'
        }, {
            value: '1',
            label: '在用',
        }, {
            value: '2',
            label: '注销'
        }],
        pickerOptions: {
            disabledDate: function (time) {
                return time.getTime() > Date.now();
            }
        },
        showList: true,
        user: null,
        bsLabel: null,
        currentPage: 1,
        pageSize: 20,
        total: 0,
        multipleSelection: [],
        title: null,
        checkedVersion: [],
        rules: {
            labelCode: [
                {required: true, message: '请输入标识编码', trigger: 'blur'},
                {min: 0, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
            ],
            relationID: [
                {type: 'number', message: '标识编码必须为数字'}
            ],
            creater: [
                {min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur'}
            ],
            setUpter: [
                {min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur'}
            ],
            major: [
                {min: 0, max: 10, message: '长度在 0 到10个字符', trigger: 'blur'}
            ],
            minor: [
                {min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur'}
            ]

        },
        labelCheckForm: {
            labelCode: null,
            type: '1',
            relationID: null,
            state: null,
            creater: null,
            setUpter: null,
            setupTime: null,
            major: null,
            minor: null,
            lableType: null,
            relationType: null
        },
        checkedLabelCheck: []
    },

    methods: {
        clearCondition: function () {
            vue.query.state = null;
            vue.query.type = null;
            vue.query.labelCode = null;
        },
        searchBsLabelCheck: function () {
            axios.get('../../label/bsLabelCheck/list', {
                params: {
                    currentPage: vue.currentPage,
                    pageSize: vue.pageSize,
                    state: vue.query.state,
                    type: vue.query.type,
                    labelCode: vue.query.labelCode,
                    setUpBtn: vue.query.setUpBtn,
                    createBtn: vue.query.createBtn
                }
            }).then(function (response) {
                if (response.data.code == 0) {
                    vue.bsLabel = response.data.pageInfo.list;
                    vue.total = response.data.pageInfo.total;
                } else {
                    vue.$message({
                        message: '加载标签发行审核数据失败',
                        type: 'error'
                    });
                }
            });
        },
        addBsLabelCheck: function () {
            vue.labelCheckForm = {
                title: vue.title = '新增标签审核',
                labelCode: null,
                type: '1',
                relationID: null,
                state: null,
                creater: null,
                setUpter: null,
                setupTime: null,
                major: null,
                minor: null,
                lableType: '0',
                relationType: '0'
            }
            vue.$refs['labelCheckForm'].resetFields();
            vue.showList = false
        },
        saveLabelCheck: function () {
            vue.$refs['labelCheckForm'].validate(function (valid) {
                // 获取选择的功能权限
                if (valid) {
                    // 校验通过
                    vue.labelCheckForm.labelCheckIdList = vue.checkedLabelCheck;
                    if (vue.labelCheckForm.labelID == null || vue.labelCheckForm.labelID == '') {
                        url = '../../label/bsLabelCheck/save';
                    } else {
                        url = '../../label/bsLabelCheck/update';
                    }
                    axios.post(url, vue.labelCheckForm).then(function (response) {
                        if (response.data.code == 0) {
                            // 保存成功，隐藏表单，更新列表数据
                            vue.$message({
                                message: '成功保存标签审核信息',
                                type: 'success'
                            });
                            vue.showList = true;
                            vue.clearCondition();
                            vue.searchBsLabelCheck();
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
        updateBsLabelCheck: function (row) {
            vue.title = '编辑标签审核';
            axios.get('../../label/bsLabelCheck/info/' + row.labelID).then(function (response) {
                if (response.data.code == 0) {
                    vue.labelCheckForm = response.data.bsLabelCheck;
                } else {
                    vue.$message({
                        message: '加载标签审核数据失败',
                        type: 'error'
                    });
                }
            })
            vue.showList = false;
        },
        cancel: function () {
            vue.showList = true;
        },
        deleteBsLabelCheck: function () {
            // 判断是否有选中记录
            if (vue.multipleSelection.length == 0) {
                vue.$message({
                    message: '请先选择需要删除的标签审核',
                    type: 'warning'
                });
                return;
            } else {
                var ids = new Array();
                var labelCheckNames = '';
                for (var i = 0; i < vue.multipleSelection.length; i++) {
                    ids.push(vue.multipleSelection[i].labelID);
                    labelCheckNames += vue.multipleSelection[i].labelCode + ',';
                }

                labelCheckNames = labelCheckNames.substring(0, labelCheckNames.length - 1);

                vue.$confirm('此操作将删除' + labelCheckNames + '标签审核信息，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    callback: function (action, instance) {
                        if (action == 'cancel') {
                            return;
                        } else {
                            axios.post('../../label/bsLabelCheck/delete', ids).then(function (response) {
                                if (response.data.code == 0) {
                                    // 保存成功，隐藏表单，更新列表数据
                                    vue.$message({
                                        message: '成功删除标签审核信息',
                                        type: 'success'
                                    });
                                    vue.multipleSelection = [];
                                    vue.searchBsLabelCheck();
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
        markCheck: function () {
            vue.markState(1);
        },
        markCancle: function () {
            vue.markState(2);
        },
        markState: function (num) {
            if (vue.multipleSelection.length == 0) {
                vue.$message({
                    message: '请先选择需要标记为已处理的审核信息',
                    type: 'warning'
                });
                return;
            } else {
                var ids = new Array();
                var labelCode = new Array();
                var relationId = new Array();
                var type = new Array();
                var labelCheckNames = '';
                var content;
                var url;
                for (var i = 0; i < vue.multipleSelection.length; i++) {
                    ids.push(vue.multipleSelection[i].labelID);
                    labelCode.push(vue.multipleSelection[i].labelCode);
                    relationId.push(vue.multipleSelection[i].relationID);
                    type.push(vue.multipleSelection[i].type);
                    labelCheckNames += vue.multipleSelection[i].labelCode + ',';
                }
                labelCheckNames = labelCheckNames.substring(0, labelCheckNames.length - 1);
                if (num == 1) {
                    content = '此操作将修改' + labelCheckNames + '标签审核信息为审核状态，是否继续?';
                    url = '../../label/bsLabelCheck/updateCheck/'
                } else if (num == 2) {
                    content = '此操作将修改' + labelCheckNames + '标签审核信息为注销状态，是否继续?';
                    url = '../../label/bsLabelCheck/updateCancel/'
                }
                vue.$confirm(content, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    callback: function (action, instance) {
                        if (action == 'cancel') {
                            return;
                        } else {
                            var params = {
                                id: ids,
                                setupter: vue.user.username,
                                labelCode: labelCode,
                                relationID: relationId,
                                type: type
                            }
                            console.log(params);
                            axios.post(url, params).then(function (response) {
                                if (response.data.code == 0) {
                                    // 保存成功，隐藏表单，更新列表数据
                                    vue.$message({
                                        message: '成功更新标签审核信息',
                                        type: 'success'
                                    });
                                    vue.multipleSelection = [];
                                    vue.searchBsLabelCheck();
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
        deleteBsLabelCheckInRow: function (row) {
            vue.$confirm('此操作将删除' + row.labelCode + '标签审核信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                callback: function (action, instance) {
                    if (action == 'cancel') {
                        return;
                    } else {
                        var labelCheckId = new Array();
                        labelCheckId.push(row.labelID);
                        axios.post('../../label/bsLabelCheck/delete', labelCheckId).then(function (response) {
                            if (response.data.code == 0) {
                                // 保存成功，隐藏表单，更新列表数据
                                vue.$message({
                                    message: '成功删除标签审核信息',
                                    type: 'success'
                                });
                                vue.multipleSelection = [];
                                vue.searchBsLabelCheck();
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
        orderByDate: function (Date) {
            if (Date.prop == 'createTime') {
                if (Date.order == "ascending") {
                    vue.query.createBtn = 1
                } else if (Date.order == "descending") {
                    vue.query.createBtn = 0
                } else {
                    vue.query.createBtn = null;
                }
                vue.query.setUpBtn = null;
            }
            if (Date.prop == 'setUpTime') {
                if (Date.order == "ascending") {
                    vue.query.setUpBtn = 1
                } else if (Date.order == "descending") {
                    vue.query.setUpBtn = 0
                } else {
                    vue.query.setUpBtn = null;
                }
                vue.query.createBtn = null;
            }
            vue.searchBsLabelCheck();
        },
        formatLabelType: function (row, column, cellValue) {
            if (cellValue == "1") {
                return '公交车';
            } else {
                return '公交站台';
            }
        },
        formatLabelState: function (row, column, cellValue) {
            if (cellValue == "0") {
                return '待审核';
            }
            else if (cellValue == "1") {
                return '已审核';
            }
            else if (cellValue == "2") {
                return '已注销';
            } else {
                return '未定义';
            }
        },
        formatReleaseType: function (row, column, cellValue) {
            if (cellValue === "0") {
                return '未发行';
            }
            if (cellValue === "1") {
                return '已发行';
            }
        },
        selectableByState: function (row, index) {
            if (row.state == "2") {
                return false;
            } else {
                return true;
            }

        },
        handleSizeChange: function (val) {
            vue.pageSize = val;
            vue.searchBsLabelCheck();
        },
        handleCurrentChange: function (val) {
            vue.currentPage = val;
            vue.searchBsLabelCheck();
        }
    },
    created: function () {
        axios.get('../../label/bsLabelCheck/list', {
            params: {currentPage: 1, pageSize: 20}
        }).then(function (response) {
            if (response.data.code == 0) {
                vue.bsLabel = response.data.pageInfo.list;
                vue.total = response.data.pageInfo.total;
            } else {
                vue.$message({
                    message: '加载标签发行审核数据失败',
                    type: 'error'
                });
            }
        });
        $.getJSON("../../sys/user/info?_" + $.now(), function (r) {
            vue.user = r.user;
        });
    }

})