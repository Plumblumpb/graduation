var vue = new Vue({
    el: "#bsLabel",
    data: {
        query: {
            type: null,
            state: null,
            labelCode: null,
            dateButton: null,
            createBtn: null,
            setUpBtn: null,
            updateBtn: null
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
            label: '安装',
        }, {
            value: '2',
            label: '注销'
        }],
        user: null,
        pickerOptions: {
            disabledDate: function (time) {
                return time.getTime() > Date.now();
            }
        },
        showList: true,
        bsLabel: null,
        currentPage: 1,
        pageSize: 20,
        total: 0,
        multipleSelection: [],
        title: null,
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
            ]

        },
        labelForm: {
            labelCode: null,
            type: '1',
            relationID: null,
            state: null,
            creater: null,
            setUpter: null,
            setupTime: null
        },
        checkedLabel: [],
    },

    methods: {
        clearCondition: function () {
            vue.query.state = null;
            vue.query.type = null;
            vue.query.labelCode = null;
        },
        searchBsLabel: function () {

            var params = {
                currentPage: vue.currentPage,
                pageSize: vue.pageSize,
                state: vue.query.state,
                type: vue.query.type,
                labelCode: vue.query.labelCode,
                createBtn: vue.query.createBtn,
                setUpBtn: vue.query.setUpBtn,
                updateBtn: vue.query.updateBtn
            }
            axios.get('../../label/bsLabel/list', {params}).then(function (response) {
                if (response.data.code == 0) {
                    vue.bsLabel = response.data.pageInfo.list;
                    vue.total = response.data.pageInfo.total;
                    console.log(vue.bsLabel);
                } else {
                    vue.$message({
                        message: '加载标签数据失败',
                        type: 'error'
                    });
                }
            });
        },
        addBsLabel: function () {
            vue.labelForm = {
                title: vue.title = '新增标签',
                labelCode: null,
                type: '1',
                relationID: null,
                state: null,
                creater: null,
                setUpter: null,
                setupTime: null
            }
            vue.$refs['labelForm'].resetFields();
            vue.showList = false
        },
        saveLabel: function () {
            vue.$refs['labelForm'].validate(function (valid) {
                // 获取选择的功能权限
                if (valid) {
                    // 校验通过
                    vue.labelForm.labelIdList = vue.checkedLabel;
                    if (vue.labelForm.labelID == null || vue.labelForm.labelID == '') {
                        url = '../../label/bsLabel/save';
                    } else {
                        url = '../../label/bsLabel/update';
                    }
                    axios.get('../../label/bsLabel/list', {params: {labelCode: vue.labelForm.labelCode}}).then(function (response) {
                        if (response.data.pageInfo.list.length > 0 && vue.labelForm.labelID == null || vue.labelForm.labelID == '') {

                            // 保存成功，隐藏表单，更新列表数据
                            vue.$message({
                                message: '该标签重复，请修改',
                                type: 'error'
                            });
                            vue.labelForm.creater = ''
                            return;
                        } else {
                            vue.labelForm.creater = vue.user.username;
                            axios.post(url, vue.labelForm).then(function (response) {
                                if (response.data.code == 0) {
                                    // 保存成功，隐藏表单，更新列表数据
                                    vue.$message({
                                        message: '成功保存标签信息',
                                        type: 'success'
                                    });
                                    vue.showList = true;
                                    vue.searchBsLabel();
                                } else {
                                    vue.$message({
                                        message: response.data.msg,
                                        type: 'error'
                                    });
                                }
                            });
                        }
                    })
                }
            });

        },
        updateBsLabel: function (row) {
            vue.title = '编辑标签';
            axios.get('../../label/bsLabel/info/' + row.labelID).then(function (response) {
                if (response.data.code == 0) {
                    vue.labelForm = response.data.bsLabel;
                } else {
                    vue.$message({
                        message: '加载标签数据失败',
                        type: 'error'
                    });
                }
            })
            vue.showList = false;
        },
        cancel: function () {
            vue.showList = true;
        },
        deleteBsLabel: function () {
            // 判断是否有选中记录
            if (vue.multipleSelection.length == 0) {
                vue.$message({
                    message: '请先选择需要删除的标签',
                    type: 'warning'
                });
                return;
            } else {
                var ids = new Array();
                var labelNames = '';
                for (var i = 0; i < vue.multipleSelection.length; i++) {
                    ids.push(vue.multipleSelection[i].labelID);
                    labelNames += vue.multipleSelection[i].labelCode + ',';
                }

                labelNames = labelNames.substring(0, labelNames.length - 1);

                vue.$confirm('此操作将删除' + labelNames + '标签信息，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    callback: function (action, instance) {
                        if (action == 'cancel') {
                            return;
                        } else {
                            axios.post('../../label/bsLabel/delete', ids).then(function (response) {
                                if (response.data.code == 0) {
                                    // 保存成功，隐藏表单，更新列表数据
                                    vue.$message({
                                        message: '成功删除标签信息',
                                        type: 'success'
                                    });
                                    vue.multipleSelection = [];
                                    vue.searchBsLabel();
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
        deleteBsLabelInRow: function (row) {
            vue.$confirm('此操作将删除' + row.labelCode + '标签信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                callback: function (action, instance) {
                    if (action == 'cancel') {
                        return;
                    } else {
                        var labelId = new Array();
                        labelId.push(row.labelID);
                        axios.post('../../label/bsLabel/delete', labelId).then(function (response) {
                            if (response.data.code == 0) {
                                // 保存成功，隐藏表单，更新列表数据
                                vue.$message({
                                    message: '成功删除标签信息',
                                    type: 'success'
                                });
                                vue.multipleSelection = [];
                                vue.searchBsLabel();
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
        orderByDate: function (Date) {
            if (Date.prop == 'createTime') {
                if (Date.order == "ascending") {
                    vue.query.createBtn = 1
                } else if (Date.order == "descending") {
                    vue.query.createBtn = 0
                } else {
                    vue.query.createBtn = null;
                }
                vue.query.updateBtn = null;
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
                vue.query.createBtn = null;
                vue.query.setUpBtn = null;
            }
            vue.searchBsLabel();
        },
        handleSelectionChange: function (val) {
            vue.multipleSelection = val;
        },
        /*
         formatLabelType: function (row, column, cellValue) {

                 if (cellValue === "0"){
                     return '公交车';
                 }
                 if (cellValue === "1"){
                     return '公交站台';
                 }else{
                     return '其他';
                 }
         },
         formatLabelState: function (row, column, cellValue) {
                 if(cellValue === "0"){
                     return '登记';
                 }
                 if(cellValue === "1"){
                     return '安装';
                 }
                 if(cellValue === "2"){
                     return '注销';
                 }
         },
         */
        handleSizeChange: function (val) {
            vue.pageSize = val;
            vue.searchBsLabel();
        },
        handleCurrentChange: function (val) {
            vue.currentPage = val;
            vue.searchBsLabel();
        }
    },
    created: function () {
        axios.get('../../label/bsLabel/list', {
            params: {currentPage: 1, pageSize: 20}
        }).then(function (response) {
            if (response.data.code == 0) {
                vue.bsLabel = response.data.pageInfo.list;
                vue.total = response.data.pageInfo.total;
            } else {
                vue.$message({
                    message: '加载标签数据失败',
                    type: 'error'
                });
            }
        });
        $.getJSON("../../sys/user/info?_" + $.now(), function (r) {
            vue.user = r.user;
        });
    }

})