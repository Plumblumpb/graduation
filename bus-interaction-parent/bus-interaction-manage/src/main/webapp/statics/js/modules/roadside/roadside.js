var vue = new Vue({
    el: "#bsRoadside",
    data: {
        query: {
            roadsideName: null,
            organName: null,
            organID: null,
            dateButton: null
        },
        showList: true,
        bsRoadside: null,
        currentPage: 1,
        pageSize: 20,
        total: 0,
        multipleSelection: [],
        title: null,
        checkedVersion: [],
        organNameTree: null,
        showOrganName: false,
        showSaveOrganName: false,
        defaultPropsOrgan: {
            children: 'children',
            label: 'organName'
        },
        pickerOptions: {
            disabledDate: function (time) {
                return time.getTime() > Date.now();
            }
        },
        rules: {
            roadsideCode: [
                {required: true, message: '请输入标识编码', trigger: 'blur'},
                {pattern: /^(\w){1,20}$/, message: '只能输入1-20个字母、数字、下划线'},
            ],

        },
        multipleSelection: [],
        checkedBsBus: [],
        organes: null,
        roadsideForm: {
            roadsideID: null,
            roadsideCode: null,
            roadsideName: null,
            organCode: null,
            longitude: null,
            latitude: null,
            address: null,
            installMan: null,
            installDate: null,
            state: null,
            createDate: null,
            organName: null,
            organID: null


        },

    },

    methods: {
        clearCondition: function () {
            vue.query.organName = null;
            vue.query.organID = null;
            vue.query.roadsideName = null;
        },
        searchBsRoadside: function () {

            axios.get('../../roadside/bsRoadside/list', {
                params: {
                    currentPage: vue.currentPage,
                    pageSize: vue.pageSize,
                    roadsideName: vue.query.roadsideName,
                    organID: vue.query.organID,
                    dateButton: vue.query.dateButton
                }
            }).then(function (response) {
                if (response.data.code == 0) {
                    vue.bsRoadside = response.data.pageInfo.list;
                    vue.total = response.data.pageInfo.total;
                } else {
                    vue.$message({
                        message: '加载路侧数据失败',
                        type: 'error'
                    });
                }
            });
        },
        addRoadside: function () {
            vue.roadsideForm = {
                roadsideID: null,
                roadsideCode: null,
                roadsideName: null,
                organCode: null,
                longitude: null,
                latitude: null,
                address: null,
                installMan: null,
                installDate: null,
                state: null,
                createDate: null,
                organName: null,
                organID: null
            }
            vue.$refs['roadsideForm'].resetFields();
            vue.title = '新增路测节点设备';
            vue.showList = false;
        },
        deleteRoadside: function () {
            if (vue.multipleSelection.length == 0) {
                vue.$message({
                    message: '请先选择需要删除的车辆',
                    type: 'warning'
                });
                return;
            } else {
                var roadsideIds = new Array();
                var roadsideNames = '';
                for (var i = 0; i < vue.multipleSelection.length; i++) {
                    roadsideIds.push(vue.multipleSelection[i].roadsideID);
                    roadsideNames += vue.multipleSelection[i].roadsideName + ',';
                }
                roadsideNames = roadsideNames.substring(0, roadsideNames.length - 1);
                vue.$confirm('此操作将删除' + roadsideNames + '用户，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    callback: function (action, instance) {
                        if (action == 'cancel') {
                            return;
                        } else {
                            axios.post('../../roadside/bsRoadside/delete', roadsideIds).then(function (response) {
                                if (response.data.code == 0) {
                                    // 保存成功，隐藏表单，更新列表数据
                                    vue.$message({
                                        message: '成功删除路测设备',
                                        type: 'success'
                                    });
                                    vue.multipleSelection = [];
                                    vue.searchBsRoadside();
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
        updateRoadsideInRow: function (row) {
            vue.title = '编辑路测设备';
            axios.get('../../roadside/bsRoadside/info/' + row.roadsideID
            ).then(function (response) {
                if (response.data.code == 0) {
                    vue.roadsideForm = response.data.roadside;
                } else {
                    vue.$message({
                        message: response.data.msg,
                        type: 'error'
                    });
                }
            });
            vue.showList = false;
        },
        deleteRoadsideInRow: function (row) {
            vue.$confirm('此操作将删除' + row.roadsideName + '设备，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning', callback: function (action, instance) {
                    if (action == 'cancel') {
                        return;
                    } else {
                        var roadsideIds = new Array();
                        roadsideIds.push(row.roadsideID);
                        axios.post('../../roadside/bsRoadside/delete', roadsideIds).then(function (response) {
                            if (response.data.code == 0) {
                                // 保存成功，隐藏表单，更新列表数据
                                vue.$message({
                                    message: '成功删除路测设备',
                                    type: 'success'
                                });
                                vue.multipleSelection = [];
                                vue.searchBsRoadside();
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
        saveRoadside: function () {
            var url;

            if (vue.roadsideForm.roadsideID == null || vue.roadsideForm.roadsideID == '') {
                url = '../../roadside/bsRoadside/save';

            } else {
                url = '../../roadside/bsRoadside/update';
            }
            if (vue.roadsideForm.roadsideCode === null) {
                vue.$message({
                    message: '设备编号不能为空',
                    type: 'warning'
                });
                return;
            }
            axios.post(url, vue.roadsideForm).then(function (response) {
                if (response.data.code == 0) {
                    // 保存成功，隐藏表单，更新列表数据
                    vue.$message({
                        message: '成功保存系统车辆',
                        type: 'success'
                    });
                    vue.showList = true;
                    vue.clearCondition();
                    vue.searchBsRoadside();
                } else {
                    vue.$message({
                        message: response.data.msg,
                        type: 'error'
                    });
                }
            });

        },
        cancel: function () {
            vue.showList = true;
        },
        handleSelectionChange: function (val) {
            vue.multipleSelection = val;
        },
        formatRoadsideState: function (row, column, cellValue) {
            if (cellValue === "0") {
                return '登记';
            }
            if (cellValue === "1") {
                return '在用';
            }
            if (cellValue === "2") {
                return '注销';
            }
        },
        orderByDate: function (custom) {
            if (custom.order == "ascending") {
                vue.query.dateButton = 1
            } else {
                vue.query.dateButton = 0
            }
            vue.searchBsRoadside();
        },
        handleSizeChange: function (val) {
            vue.pageSize = val;
            vue.searchBsRoadside();
        },
        handleCurrentChange: function (val) {
            vue.currentPage = val;
            vue.searchBsRoadside();
        },
        handleSelectionChange: function (val) {
            vue.multipleSelection = val;
        },
        showOrganTree: function () {
            vue.showOrganName = true;
        },
        showSaveOrganTree: function () {
            vue.showSaveOrganName = true;
        },
        handleOrganNodeClick: function (nodeObject, node, nodeComponent) {
            vue.query.organID = nodeObject.organID;
            vue.query.organName = nodeObject.organName;
            vue.showOrganName = false;
        },
        handleSaveOrganNodeClick: function (nodeObject, node, nodeComponent) {
            vue.roadsideForm.organName = nodeObject.organName;
            vue.roadsideForm.organID = nodeObject.organID;
            vue.roadsideForm.organCode = nodeObject.organCode;
            vue.showSaveOrganName = false;
        }
    },
    created: function () {
        axios.get('../../roadside/bsRoadside/list', {
            params: {currentPage: 1, pageSize: 20}
        }).then(function (response) {
            if (response.data.code == 0) {
                vue.bsRoadside = response.data.pageInfo.list;
                vue.total = response.data.pageInfo.total;
                vue.organes = response.data.organ;
            } else {
                vue.$message({
                    message: '加载路侧数据失败',
                    type: 'error'
                });
            }
        });
        axios.get('../../label/bsOrgan/list').then(function (response) {
            var organNameTree = treeify(response.data, 'organCode', 'parentOrganCode', 'children');
            vue.organNameTree = organNameTree;

        });
    }

})