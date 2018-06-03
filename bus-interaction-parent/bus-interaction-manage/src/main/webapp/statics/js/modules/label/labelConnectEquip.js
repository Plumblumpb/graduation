var vue = new Vue({
    el: "#labelConnectEquip",
    data: {
        query: {
            organName: null,
            organID: null,
            stationType: null,
            stationName: null,
            setupType: null,
            labelCode: null,
            busType: null,
            numberPlate: null,
            routeName: null,
            setupBusType: null,
            updateStationBtn: null,
            updateBusBtn: null
        },
        stationType: [{
            value: 'N',
            label: '普通公交'
        }, {
            value: 'B',
            label: 'BRT公交'
        }, {
            value: 'M',
            label: '地铁'
        }, {
            value: 'W',
            label: '水上巴士'
        }, {
            value: 'H',
            label: '港湾式停靠站'
        }, {
            value: 'T',
            label: '公交总站'
        }, {
            value: '3',
            label: '未知'
        }],
        setupType: [{
            value: '0',
            label: '未安装'
        }, {
            value: '1',
            label: '已安装'
        }],
        busStatus: [{
            value: '0',
            label: '正常'
        }, {
            value: '1',
            label: '维修'
        }, {
            value: '2',
            label: '报废'
        }],
        busType: [{
            value: '1',
            label: '大巴'
        }, {
            value: '2',
            label: '中巴'
        }, {
            value: '3',
            label: '小巴'
        }],
        direction: [{
            value: '0',
            label: '东行'
        }, {
            value: '1',
            label: '西行'
        }, {
            value: '2',
            label: '南行'
        }, {
            value: '3',
            label: '北行'
        }, {
            value: '4',
            label: '总站'
        }],
        tabIndex: 0,
        stationLabel: [], // 站台标签页
        busLabel: [], // 车辆标签页
        routeName: [],
        currentPageStation: 1,
        pageSizeStation: 20,
        totalStation: 0,
        currentPageBus: 1,
        pageSizeBus: 20,
        totalBus: 0,
        showOrganName: false,
        organNameTree: null,
        defaultPropsOrgan: {
            children: 'children',
            label: 'organName'
        },
        rules: {
            labelCode: [
                {min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur'}
            ]
        },
        labelStationForm: {
            labelID: null,
            stationType: null,
            stationName: null,
            direction: null,
            stationCode: null,
            latitude: null,
            longitude: null,
            labelCode: null,
            stationAddress: null
        },
        labelBusForm: {
            labelID: null,
            busType: null,
            busName: null,
            busCode: null,
            numberPlate: null,
            organName: null,
            routeName: null,
            labelCode: null,
            busStatus: null,
            status: null
        },
        showBusList: true,
        showStationList: true,
        showBus: true,
        showStation: true,
        showAllList: true,
        labelConnectEquip: null,
        multipleSelection: [],
        StationTitle: null,
        BusTitle: null,
        checkedStation: [],
        checkedBus: [],
        labelConnectEquipForm: null,
        dateButton: null
    },
    methods: {
        clearCondition: function () {
            if (vue.tabIndex == 0) {
                vue.query.stationType = null;
                vue.query.stationName = null;
                vue.query.setupType = null;
                vue.query.labelCode = null;
            } else if (vue.tabIndex == 1) {
                vue.query.routeName = null;
                vue.query.organName = null;
                vue.query.busType = null;
                vue.query.setupBusType = null;
                vue.query.numberPlate = null;
            }
        },
        searchStation: function () {
            var params = {};
            if (vue.tabIndex == 0) {
                params.stationType = vue.query.stationType;
                params.stationName = vue.query.stationName;
                params.setupType = vue.query.setupType;
                params.labelCode = vue.query.labelCode;
                params.currentPage = vue.currentPageStation;
                params.pageSize = vue.pageSizeStation;
                params.updateStationBtn = vue.query.updateStationBtn;
                params.ModerType = "2";
            } else if (vue.tabIndex == 1) {
                params.routeName = vue.query.routeName;
                params.organName = vue.query.organName;
                params.busType = vue.query.busType;
                params.numberPlate = vue.query.numberPlate;
                params.currentPage = vue.currentPageBus;
                params.pageSize = vue.pageSizeBus;
                params.setupType = vue.query.setupBusType;
                params.updateBusBtn = vue.query.updateBusBtn;
                params.ModerType = "1";
            }
            axios.get('../../label/labelConnectEquip/list', {params}).then(function (response) {
                if (response.data.code == 0) {
                    if (vue.tabIndex == 0) {
                        vue.stationLabel = response.data.pageInfo.list;
                        vue.totalStation = response.data.pageInfo.total;
                    } else if (vue.tabIndex == 1) {
                        vue.busLabel = response.data.pageInfo.list;
                        vue.totalBus = response.data.pageInfo.total;
                    }
                } else {
                    vue.$message({
                        message: '加载标签关联设备数据失败',
                        type: 'error'
                    });
                }
            });
        },
        updateBsLabelStation: function (row) {
            vue.StationTitle = '编辑标签站台';
            params = {}
            if (row.stationID) {
                params.stationID = row.stationID;
            }
            if (row.labelID) {
                params.labelID = row.labelID;
                vue.labelStationForm.labelID = row.labelID;
            }
            axios.get('../../label/labelConnectEquip/infoStation', {params}).then(function (response) {
                if (response.data.code == 0) {
                    vue.labelStationForm = response.data.labelConnectEquip;
                    vue.labelStationForm.labelTmpCode = vue.labelStationForm.labelCode
                } else {
                    vue.$message({
                        message: '加载站台标签设备数据失败',
                        type: 'error'
                    });
                }
            })
            vue.showStationList = false;
        },

        updateBsLabelBus: function (row) {
            vue.BusTitle = '编辑标签公交';
            params = {}
            if (row.busID) {
                params.busID = row.busID;
            }
            if (row.labelID) {
                params.labelID = row.labelID;
                vue.labelBusForm.labelID = row.labelID;
            }

            axios.get('../../label/labelConnectEquip/infoBus', {params}).then(function (response) {
                if (response.data.code == 0) {
                    vue.labelBusForm = response.data.labelConnectEquip;
                } else {
                    vue.$message({
                        message: '加载公交标签设备数据失败',
                        type: 'error'
                    });
                }
            })
            vue.showBusList = false;
        },
        saveLabelStation: function (row) {
            if (vue.tabIndex == 0) {
                vue.form = 'labelStationForm';
            } else if (vue.tabIndex == 1) {
                vue.form = 'labelBusForm';
            }
            vue.$refs[vue.form].validate(function (valid) {
                // 获取选择的功能权限
                if (valid) {
                    // 校验通过
                    if (vue.tabIndex == 0) {
                        vue.labelStationForm.labelCheckIdList = vue.checkedStation;
                        vue.labelConnectEquipForm = vue.labelStationForm
                    } else if (vue.tabIndex == 1) {
                        vue.labelBusForm.labelCheckIdList = vue.checkedBus;
                        vue.labelConnectEquipForm = vue.labelBusForm
                    }
                    axios.post('../../label/labelConnectEquip/update', vue.labelConnectEquipForm).then(function (response) {
                        if (response.data.code == 0) {
                            // 保存成功，隐藏表单，更新列表数据
                            vue.$message({
                                message: '成功保存标签关联设备信息',
                                type: 'success'
                            });
                            if (vue.tabIndex == 0) {
                                vue.showStationList = true;
                            } else if (vue.tabIndex == 1) {
                                vue.showBusList = true;
                            }
                            vue.clearCondition();
                            vue.searchStation();
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
        orderByDate: function (Date) {
            if (vue.tabIndex == 0) {
                if (Date.prop == 'setupTime') {
                    if (Date.order == "ascending") {
                        vue.query.updateStationBtn = 1
                    } else if (Date.order == "descending") {
                        vue.query.updateStationBtn = 0
                    } else {
                        vue.query.updateStationBtn = null;
                    }
                }
            } else if (vue.tabIndex == 1) {
                if (Date.prop == 'setupTime') {
                    if (Date.order == "ascending") {
                        vue.query.updateBusBtn = 1
                    } else if (Date.order == "descending") {
                        vue.query.updateBusBtn = 0
                    } else {
                        vue.query.updateBusBtn = null;
                    }

                }
            }
            vue.searchStation();
        },
        formatStationType: function (row, column, cellValue) {
            if (cellValue === 'N') {
                return '普通公交';
            }
            else if (cellValue === 'B') {
                return 'BRT公交';
            }
            else if (cellValue === '3') {
                return '普通';
            }
            else if (cellValue === 'M') {
                return '地铁';
            }
            else if (cellValue === 'W') {
                return '水上巴士';
            }
            else if (cellValue === 'H') {
                return '港湾式停靠站';
            }
            else if (cellValue === 'T') {
                return '公交总站';
            }
            else {
                return '未定义';
            }
        },
        formatBusType: function (row, column, cellValue) {
            if (cellValue === '1') {
                return '大巴';
            }
            else if (cellValue === '2') {
                return '中巴';
            }
            else if (cellValue === '3') {
                return '小巴';
            } else {
                return '未定义'
            }

        },
        formatDirection: function (row, column, cellValue) {
            if (cellValue === '0') {
                return '东行';
            } else if (cellValue === '1') {
                return '西行';
            } else if (cellValue === '2') {
                return '南行';
            } else if (cellValue === '3') {
                return '北行';
            } else if (cellValue === '4') {
                return '总站';
            } else {
                return '未定义';
            }
        },
        formatStationStateType: function (row, column, cellValue) {
            if (cellValue === '0') {
                return '仅登记';
            }
            else if (cellValue === '1') {
                return '已安装';
            }
            else if (cellValue === '2') {
                return '已注销';
            } else {
                return '未定义';
            }
        },
        formatBusStateType: function (row, column, cellValue) {
            if (cellValue === '0') {
                return '仅登记';
            }
            else if (cellValue === '1') {
                return '已安装';
            }
            else if (cellValue === '2') {
                return '已注销';
            } else {
                return '未定义';
            }
        },
        formatBusStatus: function (row, column, cellValue) {
            if (cellValue === '0') {
                return '正常';
            }
            if (cellValue === '1') {
                return '维修';
            }
            if (cellValue === '2') {
                return '报废';
            }
        },
        handleTabClick: function (tab) {
            vue.tabIndex = tab.index;

            vue.searchStation();
        },
        handleSelectionChange: function (val) {
            vue.multipleSelection = val;
        },
        handleSizeChange: function (val) {
            if (vue.tabIndex == 0) {
                vue.pageSizeStation = val;
            } else if (vue.tabIndex == 1) {
                vue.pageSizeBus = val;
            }
            vue.searchStation();
        },
        handleCurrentChange: function (val) {
            if (vue.tabIndex == 0) {
                vue.currentPageStation = val;
            } else if (vue.tabIndex == 1) {
                vue.currentPageBus = val;
            }
            vue.searchStation();
        },
        showOrganTree: function () {
            vue.showOrganName = true;
        },
        cancel: function () {
            if (vue.tabIndex == 0) {
                vue.showStationList = !vue.showStationList;
            } else if (vue.tabIndex == 1) {
                vue.showBusList = !vue.showBusList;
            }
            vue.searchStation();
        },
        handleOrganNodeClick: function (nodeObject, node, nodeComponent) {
            vue.query.organID = nodeObject.organID;
            vue.query.organName = nodeObject.organName;
            vue.showOrganName = false;
        }

    },

    created: function () {
        axios.get('../../label/labelConnectEquip/list', {
            params: {currentPage: 1, pageSize: 20}
        }).then(function (response) {
            if (response.data.code == 0) {
                vue.stationLabel = response.data.pageInfo.list;
                vue.totalStation = response.data.pageInfo.total;
            } else {
                vue.$message({
                    message: '加载关联数据失败',
                    type: 'error'
                });
            }
        });
        axios.get('../../label/bsOrgan/list').then(function (response) {
            var organNameTree = treeify(response.data, 'organCode', 'parentOrganCode', 'children');
            vue.organNameTree = organNameTree;
        });
        axios.get('../../label/labelConnectEquip/routeName').then(function (response) {
            if (response.data.code == 0) {
                vue.routeName = response.data.routeName
            } else {
                vue.$message({
                    message: '加载标签关联设备数据失败',
                    type: 'error'
                });
            }
        });
    }
})