var vue = new Vue({
    el: "#bsBus",
    data: {
        query: {
            busName: null,
            busType: null,
            busStatus: null,
            numberPlate: null,
            routeName: null,
            organName: null,
            organId: null,


        },
        busTypes: [{
            value: '1',
            label: '大巴'
        }, {
            value: '3',
            label: '小巴'
        }, {
            value: '2',
            label: '中巴'
        }],
        busStatuses: [{
            value: '1',
            label: '维修'
        }, {
            value: '0',
            label: '正常'
        }, {
            value: '2',
            label: '报废'
        }],
        showList: true,
        bsBuses: null,
        code: null,
        currentPage: 1,
        pageSize: 20,
        multipleSelection: [],
        total: 0,
        title: null,
        busForm: {
            busId: null,
            busType: 1,
            busCode: null,
            busName: null,
            numberPlate: null,
            organId: null,
            routeId: null,
            busStatus: null,
            isActive: null,
            organcode: null,
            routecode: null,
            busLabel: null,
            major: null,
            minor: null,
            version: null,
        },
        checkedBsBus: [],


        organes: null,
        organNameTree: null,
        showOrganName: null,
        defaultPropsOrgan: {
            children: 'children',
            label: 'organName'
        },
    },
    methods: {
        searchBsBus: function () {
            if (vue.query.busType == "大巴") {
                busType = 1;
            } else {
                busType = null;
            }

            axios.get('../../basic/bus/listBus', {
                    params: {
                        currentPage: vue.currentPage, pageSize: vue.pageSize,
                        busName: vue.query.busName,
                        organId: vue.query.organId,
                        busStatus: vue.query.busStatus,
                        busType: vue.query.busType,
                        numberPlate: vue.query.numberPlate,
                        routeName: vue.query.routeName,
                    }
                }
            ).then(function (response) {
                if (response.data.code == 0) {
                    vue.bsBuses = response.data.pageInfo.list;
                    vue.total = response.data.pageInfo.total;
                } else {
                    vue.$message({
                        message: '加载车辆数据失败',
                        type: 'error'
                    });
                }
            });

        },
        addBsBus: function () {
            vue.busForm = {
                busId: null,
                busType: null,
                busCode: null,
                busName: null,
                numberPlate: null,
                busStatus: null,
                organcode: null,
                routecode: null,
                busLabel: null,
                major: null,
            }
            vue.checkedRole = [];
            vue.$refs['busForm'].resetFields();
            vue.title = '新增系统车辆';
            vue.showList = false;
        },
        saveBsBus: function () {
            var url;
            if (vue.busForm.busId == null || vue.busForm.busId == '') {
                url = '../../basic/bus/save';
            } else {
                url = '../../basic/bus/update';
            }
            axios.post(url, vue.busForm).then(function (response) {
                if (response.data.code == 0) {
                    // 保存成功，隐藏表单，更新列表数据
                    vue.$message({
                        message: '成功保存系统车辆',
                        type: 'success'
                    });
                    vue.showList = true;
                    vue.searchBsBuses();
                } else {
                    vue.$message({
                        message: response.data.msg,
                        type: 'error'
                    });
                }
            });
        },
        deleteBus: function () {
            if (vue.multipleSelection.length == 0) {
                vue.$message({
                    message: '请先选择需要删除的车辆',
                    type: 'warning'
                });
                return;
            } else {
                var busIds = new Array();
                var numberPlates = '';
                for (var i = 0; i < vue.multipleSelection.length; i++) {
                    busIds.push(vue.multipleSelection[i].busId);
                    numberPlates += vue.multipleSelection[i].numberPlate + ',';
                }
                numberPlates = numberPlates.substring(0, numberPlates.length - 1);
                vue.$confirm('此操作将删除' + numberPlates + '用户，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    callback: function (action, instance) {
                        if (action == 'cancel') {
                            return;
                        } else {
                            axios.post('../../basic/bus/delete', busIds).then(function (response) {
                                if (response.data.code == 0) {
                                    // 保存成功，隐藏表单，更新列表数据
                                    vue.$message({
                                        message: '成功删除车辆',
                                        type: 'success'
                                    });
                                    vue.multipleSelection = [];
                                    vue.searchBsBuses();
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
        updateBusInRow: function (row) {
            vue.title = '编辑系统车辆';
            var busIds = row.busId;
            axios.get('../../basic/bus/info', {
                    params: {busId: busIds}
                }
            ).then(function (response) {
                if (response.data.code == 0) {
                    vue.busForm = response.data.bus;
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
            vue.$confirm('此操作将删除' + row.busName + '车辆，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                callback: function (action, instance) {
                    if (action == 'cancel') {
                        return;
                    } else {
                        var busIds = row.busId;
                        axios.post('../../basic/bus/delete', busIds).then(function (response) {
                            if (response.data.code == 0) {
                                // 保存成功，隐藏表单，更新列表数据
                                vue.$message({
                                    message: '成功删除系统车辆',
                                    type: 'success'
                                });
                                vue.multipleSelection = [];
                                vue.searchBsBuses();
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

        deleteBusInRow: function (row) {
            vue.$confirm('此操作将删除' + row.numberPlate + '车辆，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                callback: function (action, instance) {
                    if (action == 'cancel') {
                        return;
                    } else {
                        var busIds = new Array();
                        busIds.push(row.busId);
                        axios.post('../../basic/bus/delete', busIds).then(function (response) {
                            if (response.data.code == 0) {
                                // 保存成功，隐藏表单，更新列表数据
                                vue.$message({
                                    message: '成功删除车辆',
                                    type: 'success'
                                });
                                vue.multipleSelection = [];
                                vue.searchBsBuses();
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
        searchBsBuses: function () {
            axios.get('../../basic/bus/list', {
                params: {currentPage: vue.currentPage, pageSize: vue.pageSize}
            }).then(function (response) {
                if (response.data.code == 0) {
                    vue.bsBuses = response.data.pageInfo.list;
                    vue.total = response.data.pageInfo.total;
                } else {
                    vue.$message({
                        message: '加载车辆数据失败',
                        type: 'error'
                    });
                }
            })
        },
        handleSizeChange: function (val) {
            vue.pageSize = val;
            vue.searchBsBus();
        },
        handleCurrentChange: function (val) {
            vue.currentPage = val;
            vue.searchBsBus();
        },
        handleSelectionChange: function (val) {
            vue.multipleSelection = val;
        },
        formatBsBusTpye: function (row, column, cellValue) {
            if (cellValue === "1") {
                return '大巴';
            } else if (cellValue === "2") {
                return '中巴';
            }
            else if (cellValue === "3") {
                return '小巴';
            }
        },
        formatBsBusStatus: function (row, column, cellValue) {
            if (cellValue === "1") {
                return '维修';
            } else if (cellValue === "0") {
                return '正常';
            } else if (cellValue === "2") {
                return '报废';
            }
        },
        cancel: function () {
            vue.showList = true;
        },
        clearCondition: function () {
            vue.query.organId = null;
            vue.query.busName = null;
            vue.query.busType = null;
            vue.query.numberPlate = null;
            vue.query.routecode = null;
            vue.query.busStatus = null;
            vue.query.routeName = null;
            vue.query.organName = null;
        },


        handleOrganNodeClick: function (nodeObject, node, nodeComponent) {
            vue.query.organId = nodeObject.organID;
            vue.query.organName = nodeObject.organName;
            vue.showOrganName = false;
        },
        handleSaveOrganNodeClick: function (nodeObject, node, nodeComponent) {
            vue.roadsideForm.organName = nodeObject.organName;
            vue.roadsideForm.organId = nodeObject.organId;
            vue.roadsideForm.organCode = nodeObject.organCode;
            vue.showSaveOrganName = false;
        },
        showOrganTree: function () {
            vue.showOrganName = true;
        },


    },

    created: function () {
        // 加载车辆
        axios.get('../../basic/bus/list', {
                params: {currentPage: 1, pageSize: 20}
            }
        ).then(function (response) {
            if (response.data.code == 0) {
                vue.bsBuses = response.data.pageInfo.list;
                vue.organes = response.data.organ;
                vue.total = response.data.pageInfo.total;
            } else {
                vue.$message({
                    message: '加载车辆数据失败',
                    type: 'error'
                });
            }
        });

        axios.get('../../label/bsOrgan/list').then(function (response) {
            var organNameTree = treeify(response.data, 'organCode', 'parentOrganCode', 'children');
            vue.organNameTree = organNameTree;
        });
    }

});
