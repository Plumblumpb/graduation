var vue = new Vue({
    el: "#busActivity",
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
        busActivityValid: [{
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
        busActivity: null,
        currentPage: 1,
        pageSize: 20,
        total: 0,
        multipleSelection: [],
        titleTmp: null,
        busActivityForm: {
            title: null,
            pic: null,
            url: null,
            valid: '0',
            startTime: '',
            endTime: ''
        },
        rules: {
            title: [
                {required: true, message: '请输入活动名称', trigger: 'blur'},
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
                        if (!vue.busActivityForm.startTime) {
                            return callback(new Error('开始时间不能为空'));
                        }
                        if (!vue.busActivityForm.endTime) {
                            return callback(new Error('结束时间不能为空'));
                        }
                        if (vue.busActivityForm.startTime > vue.busActivityForm.endTime) {
                            return callback(new Error('开始时间不能大于结束时间'));
                        }
                        callback();
                    }, trigger: 'change'
                }]
        },
        checkedBusActivity: [],

    },
    methods: {
        clearCondition: function () {
            vue.query.title = null;
            vue.query.valid = null;
            vue.query.startTime = null;
            vue.query.endTime = null;
        },
        searchBusActivity: function () {
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
            axios.get('../../activity/busActivity/list', {params}).then(function (response) {
                if (response.data.code == 0) {
                    vue.busActivity = response.data.pageInfo.list;
                    vue.total = response.data.pageInfo.total;
                } else {
                    vue.$message({
                        message: '加载活动数据失败',
                        type: 'error'
                    });
                }
            });
        },
        addBusActivity: function () {
            vue.busActivityForm = {
                titleTmp: vue.title = '新增活动',
                title: null,
                pic: null,
                url: null,
                valid: '0',
                startTime: '',
                endTime: ''

            }
            vue.$refs['busActivityForm'].resetFields();
            vue.showList = false
        },
        saveBusActivity: function () {
            vue.$refs['busActivityForm'].validate(function (valid) {
                // 获取选择的功能权限
                if (valid) {
                    // 校验通过
                    vue.busActivityForm.busActivityIdList = vue.checkedBusActivity;
                    if (vue.busActivityForm.id == null || vue.busActivityForm.id == '') {
                        url = '../../activity/busActivity/save';
                    } else {
                        url = '../../activity/busActivity/update';
                    }
                    if (vue.busActivityForm.startTime > vue.busActivityForm.endTime) {
                        vue.$message({
                            message: '开始时间不能大于结束时间',
                            type: 'warning'
                        });
                        return;
                    }
                    axios.post(url, vue.busActivityForm).then(function (response) {
                        if (response.data.code == 0) {
                            // 保存成功，隐藏表单，更新列表数据
                            vue.$message({
                                message: '成功保存活动信息',
                                type: 'success'
                            });
                            vue.showList = true;
                            vue.clearCondition();
                            vue.searchBusActivity();
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
        updateBusActivity: function (row) {
            vue.titleTmp = '编辑活动';
            axios.get('../../activity/busActivity/info/' + row.id).then(function (response) {
                if (response.data.code == 0) {
                    vue.busActivityForm = response.data.busActivity;
                    vue.busActivityForm.valid = vue.busActivityForm.valid + '';
                } else {
                    vue.$message({
                        message: '加载活动数据失败',
                        type: 'error'
                    });
                }
            })
            vue.showList = false;
        },
        cancel: function () {
            vue.showList = true;
        },
        deleteBusActivity: function () {
            // 判断是否有选中记录
            if (vue.multipleSelection.length == 0) {
                vue.$message({
                    message: '请先选择需要删除的活动',
                    type: 'warning'
                });
                return;
            } else {
                var ids = new Array();
                var busActivityNames = '';
                for (var i = 0; i < vue.multipleSelection.length; i++) {
                    ids.push(vue.multipleSelection[i].id);
                    busActivityNames += vue.multipleSelection[i].title + ',';
                }

                busActivityNames = busActivityNames.substring(0, busActivityNames.length - 1);

                vue.$confirm('此操作将删除' + busActivityNames + '活动信息，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    callback: function (action, instance) {
                        if (action == 'cancel') {
                            return;
                        } else {
                            axios.post('../../activity/busActivity/delete', ids).then(function (response) {
                                if (response.data.code == 0) {
                                    // 保存成功，隐藏表单，更新列表数据
                                    vue.$message({
                                        message: '成功删除活动信息',
                                        type: 'success'
                                    });
                                    vue.multipleSelection = [];
                                    vue.searchBusActivity();
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
        deleteBusActivityInRow: function (row) {
            vue.$confirm('此操作将删除' + row.reserved + '活动信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                callback: function (action, instance) {
                    if (action == 'cancel') {
                        return;
                    } else {
                        var busActivityId = new Array();
                        busActivityId.push(row.id);
                        axios.post('../../activity/busActivity/delete', busActivityId).then(function (response) {
                            if (response.data.code == 0) {
                                // 保存成功，隐藏表单，更新列表数据
                                vue.$message({
                                    message: '成功删除活动信息',
                                    type: 'success'
                                });
                                vue.multipleSelection = [];
                                vue.searchBusActivity();
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
        formatBusActivityValid: function (row, column, cellValue) {
            if (cellValue === 0) {
                return '无效';
            }
            if (cellValue === 1) {
                return '有效';
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
            vue.searchBusActivity();
        },
        formatNumber: function (row, column, cellValue) {
            if (cellValue === null) {
                return '0';
            } else {
                return cellValue
            }
        },
        handleSizeChange: function (val) {
            vue.pageSize = val;
            vue.searchBusActivity();
        },
        handleCurrentChange: function (val) {
            vue.currentPage = val;
            vue.searchBusActivity();
        }
    },
    created: function () {
        axios.get('../../activity/busActivity/list', {
            params: {currentPage: 1, pageSize: 20}
        }).then(function (response) {
            if (response.data.code == 0) {
                vue.busActivity = response.data.pageInfo.list;
                vue.total = response.data.pageInfo.total;
            } else {
                vue.$message({
                    message: '加载活动数据失败',
                    type: 'error'
                });
            }
        });
    }

})