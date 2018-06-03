var vue = new Vue({
    el: "#billboards",
    data: {
        query: {
            title: null,
            valid: null,
            startTime: '',
            endTime: '',
            startBtn: null,
            endBtn: null,
            createBtn: null,
            updateBtn: null
        },
        billboardsValid: [{
            value: '0',
            label: '无效'
        }, {
            value: '1',
            label: '有效'
        }],
        pickerOptions: {
            disabledDate: function (time) {
                return time.getTime() > Date.now();
            }
        },
        showList: true,
        billboards: null,
        currentPage: 1,
        pageSize: 20,
        total: 0,
        multipleSelection: [],
        titleTmp: null,
        billboardsForm: {
            title: null,
            pic: null,
            url: null,
            valid: '0',
            startTime: '',
            endTime: ''
        },
        rules: {
            title: [
                {required: true, message: '请输入宣传栏名称', trigger: 'blur'},
                {min: 0, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
            ],
            pic: [
                {required: true, message: '请输入图片链接', trigger: 'blur'},
                {min: 0, max: 120, message: '长度在 1 到 120 个字符', trigger: 'blur'}
            ],
            url: [
                {required: true, message: '请输入跳转链接', trigger: 'blur'},
                {min: 0, max: 120, message: '长度在 1 到 120 个字符', trigger: 'blur'}
            ],

            timeRange: [
                {
                    validator: function (rule, value, callback) {
                        if (!vue.billboardsForm.startTime) {
                            return callback(new Error('开始时间不能为空'));
                        }
                        if (!vue.billboardsForm.endTime) {
                            return callback(new Error('结束时间不能为空'));
                        }
                        if (vue.billboardsForm.startTime > vue.billboardsForm.endTime) {
                            return callback(new Error('开始时间不能大于结束时间'));
                        }
                        callback();
                    }, trigger: 'change'
                }
            ]
        },
        checkedBillboards: [],

    },
    methods: {
        clearCondition: function () {
            vue.query.title = null;
            vue.query.valid = null;
            vue.query.startTime = null;
            vue.query.endTime = null;
        },

        searchBillboards: function () {
            var params = {
                currentPage: vue.currentPage,
                pageSize: vue.pageSize,
                title: vue.query.title,
                valid: vue.query.valid,
                startBtn: vue.query.startBtn,
                endBtn: vue.query.endBtn,
                createBtn: vue.query.createBtn,
                updateBtn: vue.query.updateBtn
            }
            if (vue.query.startTime) {
                params.sTime = vue.query.startTime.format('yyyy-MM-dd hh:mm:ss');

            }
            if (vue.query.endTime) {
                params.eTime = vue.query.endTime.format('yyyy-MM-dd hh:mm:ss');
            }
            if (params.sTime > params.eTime) {
                vue.$message({
                    message: '开始时间不能大于结束时间',
                    type: 'warning'
                });
                return;
            }
            axios.get('../../activity/billboards/list', {params}).then(function (response) {
                if (response.data.code == 0) {
                    vue.billboards = response.data.pageInfo.list;
                    vue.total = response.data.pageInfo.total;
                } else {
                    vue.$message({
                        message: '加载宣传栏数据失败',
                        type: 'error'
                    });
                }
            });
        },
        addBillboards: function () {
            vue.billboardsForm = {
                titleTmp: vue.title = '新增宣传栏',
                title: null,
                pic: null,
                url: null,
                valid: '0',
                startTime: '',
                endTime: ''

            }
            vue.$refs['billboardsForm'].resetFields();
            vue.showList = false
        },
        saveBillboards: function (billboardsForm) {
            vue.$refs['billboardsForm'].validate(function (valid) {
                // 获取选择的功能权限
                if (valid) {
                    // 校验通过
                    vue.billboardsForm.billboardsIdList = vue.checkedBillboards;
                    if (vue.billboardsForm.id == null || vue.billboardsForm.id == '') {
                        url = '../../activity/billboards/save';
                    } else {
                        url = '../../activity/billboards/update';
                    }
                    if (vue.billboardsForm.startTime > vue.billboardsForm.endTime) {
                        vue.$message({
                            message: '开始时间不能大于结束时间',
                            type: 'warning'
                        });
                        return;
                    }
                    axios.post(url, vue.billboardsForm).then(function (response) {
                        if (response.data.code == 0) {
                            // 保存成功，隐藏表单，更新列表数据
                            vue.$message({
                                message: '成功保存宣传栏信息',
                                type: 'success'
                            });
                            vue.showList = true;
                            vue.clearCondition();
                            vue.searchBillboards();
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
        updateBillboards: function (row) {
            vue.titleTmp = '编辑宣传栏';
            axios.get('../../activity/billboards/info/' + row.id).then(function (response) {
                if (response.data.code == 0) {
                    vue.billboardsForm = response.data.billboards;
                    vue.billboardsForm.valid = vue.billboardsForm.valid + '';
                } else {
                    vue.$message({
                        message: '加载宣传栏数据失败',
                        type: 'error'
                    });
                }
            })
            vue.showList = false;
        },
        cancel: function () {
            vue.showList = true;
        },
        deleteBillboards: function () {
            // 判断是否有选中记录
            if (vue.multipleSelection.length == 0) {
                vue.$message({
                    message: '请先选择需要删除的宣传栏',
                    type: 'warning'
                });
                return;
            } else {
                var ids = new Array();
                var billboardsNames = '';
                for (var i = 0; i < vue.multipleSelection.length; i++) {
                    ids.push(vue.multipleSelection[i].id);
                    billboardsNames += vue.multipleSelection[i].title + ',';
                }

                billboardsNames = billboardsNames.substring(0, billboardsNames.length - 1);

                vue.$confirm('此操作将删除' + billboardsNames + '宣传栏信息，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    callback: function (action, instance) {
                        if (action == 'cancel') {
                            return;
                        } else {
                            axios.post('../../activity/billboards/delete', ids).then(function (response) {
                                if (response.data.code == 0) {
                                    // 保存成功，隐藏表单，更新列表数据
                                    vue.$message({
                                        message: '成功删除宣传栏信息',
                                        type: 'success'
                                    });
                                    vue.multipleSelection = [];
                                    vue.searchBillboards();
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
        deleteBillboardsInRow: function (row) {
            vue.$confirm('此操作将删除' + row.reserved + '宣传栏信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                callback: function (action, instance) {
                    if (action == 'cancel') {
                        return;
                    } else {
                        var billboardsId = new Array();
                        billboardsId.push(row.id);
                        axios.post('../../activity/billboards/delete', billboardsId).then(function (response) {
                            if (response.data.code == 0) {
                                // 保存成功，隐藏表单，更新列表数据
                                vue.$message({
                                    message: '成功删除宣传栏信息',
                                    type: 'success'
                                });
                                vue.multipleSelection = [];
                                vue.searchBillboards();
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
        formatBillboardsValid: function (row, column, cellValue) {
            if (cellValue === 0) {
                return '无效';
            }
            if (cellValue === 1) {
                return '有效';
            }
        },
        formatNumber: function (row, column, cellValue) {
            if (cellValue === null) {
                return '0';
            } else {
                return cellValue
            }
        },
        orderByDate: function (Date) {
            if (Date.prop == 'startTime') {
                if (Date.order == "ascending") {
                    vue.query.startBtn = 1
                } else if (Date.order == "descending") {
                    vue.query.startBtn = 0
                } else {
                    vue.query.startBtn = null;
                }
                vue.query.endBtn = null;
                vue.query.createBtn = null;
                vue.query.updateBtn = null;
            }
            if (Date.prop == 'endTime') {
                if (Date.order == "ascending") {
                    vue.query.endBtn = 1
                } else if (Date.order == "descending") {
                    vue.query.endBtn = 0
                } else {
                    vue.query.endBtn = null;
                }
                vue.query.startBtn = null;
                vue.query.createBtn = null;
                vue.query.updateBtn = null;
            }
            if (Date.prop == 'createTime') {
                if (Date.order == "ascending") {
                    vue.query.createBtn = 1
                } else if (Date.order == "descending") {
                    vue.query.createBtn = 0
                } else {
                    vue.query.createBtn = null;
                }
                vue.query.startBtn = null;
                vue.query.endBtn = null;
                vue.query.updateBtn = null;
            }
            if (Date.prop == 'updateTime') {
                if (Date.order == "ascending") {
                    vue.query.updateBtn = 1
                } else if (Date.order == "descending") {
                    vue.query.updateBtn = 0
                } else {
                    vue.query.updateBtn = null;
                }
                vue.query.startBtn = null;
                vue.query.endBtn = null;
                vue.query.createBtn = null;
            }
            vue.searchBillboards();
        },
        handleSizeChange: function (val) {
            vue.pageSize = val;
            vue.searchBillboards();
        },
        handleCurrentChange: function (val) {
            vue.currentPage = val;
            vue.searchBillboards();
        }
    },
    created: function () {
        axios.get('../../activity/billboards/list', {
            params: {currentPage: 1, pageSize: 20}
        }).then(function (response) {
            if (response.data.code == 0) {
                vue.billboards = response.data.pageInfo.list;
                vue.total = response.data.pageInfo.total;
            } else {
                vue.$message({
                    message: '加载宣传栏数据失败',
                    type: 'error'
                });
            }
        });
    }

})