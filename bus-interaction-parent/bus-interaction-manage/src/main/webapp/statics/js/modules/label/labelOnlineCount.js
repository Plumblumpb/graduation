var vue = new Vue({
    el: "#labelOnlineCount",
    data: {
        query: {
            organName: null,
            organID: null,
            stationType: null,
            stationName: null,
            busType: null,
            routeName: null,
            timeInterval: null,
            timeBusInterval: null,
            startTime: null,
            endTime: null,
            startBusTime: null,
            endBusTime: null,
        },
        timeInterval: [{
            value: '21',
            label: '大于20天及没有检测',
        }, {
            value: '10',
            label: '小于10天',
        }, {
            value: '20',
            label: '小于20天'
        }],
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
        pickerOptions: {
            disabledDate: function (time) {
                return time.getTime() > Date.now();
            }
        },
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
        showList: true,
        labelSumList: null,
        multipleSelection: [],
        title: null,
        checkedVersion: [],
        dateButton: null
    },
    methods: {
        clearCondition: function () {
            if (vue.tabIndex == 0) {
                vue.query.stationType = null;
                vue.query.stationName = null;
                vue.query.timeInterval = null;
                vue.query.startTime = null;
                vue.query.endTime = null;
            } else if (vue.tabIndex == 1) {
                vue.query.routeName = null;
                vue.query.organName = null;
                vue.query.busType = null;
                vue.query.timeBusInterval = null;
                vue.query.startBusTime = null;
                vue.query.endBusTime = null;
            }
        },
        searchLabelOnline: function () {
            var params = {};
            if (vue.tabIndex == 0) {
                params.stationType = vue.query.stationType;
                params.stationName = vue.query.stationName;
                params.currentPage = vue.currentPageStation;
                params.pageSize = vue.pageSizeStation;
                params.setupType = vue.query.setupType;
                params.timeInterval = vue.query.timeInterval
                if (vue.query.startTime) {
                    params.startTime = vue.query.startTime.format('yyyy-MM-dd hh:mm:ss');
                }
                if (vue.query.endTime) {
                    params.endTime = vue.query.endTime.format('yyyy-MM-dd hh:mm:ss');
                }
                if (params.startTime > params.endTime) {
                    var tmp = params.startTime;
                    params.startTime = params.endTime;
                    params.endTime = tmp;
                }
                params.ModerType = "2";
            } else if (vue.tabIndex == 1) {
                params.routeName = vue.query.routeName;
                params.organName = vue.query.organName;
                params.busType = vue.query.busType;
                params.timeInterval = vue.query.timeBusInterval;
                if (vue.query.startBusTime) {
                    params.startTime = vue.query.startBusTime.format('yyyy-MM-dd hh:mm:ss');
                }
                if (vue.query.endBusTime) {
                    params.endTime = vue.query.endBusTime.format('yyyy-MM-dd hh:mm:ss');
                }
                if (params.startTime > params.endTime) {
                    var tmp = params.startTime;
                    params.startTime = params.endTime;
                    params.endTime = tmp;
                }
                params.currentPage = vue.currentPageBus;
                params.pageSize = vue.pageSizeBus;
                params.ModerType = "1";
            }

            axios.get('../../label/labelSumList/list', {params}).then(function (response) {
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
                        message: '加载标签上线统计数据失败',
                        type: 'error'
                    });
                }
            });
        },
        orderByDate: function (custom) {
            if (custom.order == "ascending") {
                vue.query.dateButton = 1
            } else {
                vue.query.dateButton = 0
            }
            vue.searchLabelOnline();
        },
        formatStationType: function (row, column, cellValue) {
            if (cellValue === 'N') {
                return '普通公交';
            }
            else if (cellValue === 'B') {
                return 'BRT公交';
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
                return '其他';
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
            }
            else if (cellValue === '1') {
                return '西行';
            }
            else if (cellValue === '2') {
                return '南行';
            }
            else if (cellValue === '3') {
                return '北行';
            }
            else if (cellValue === '4') {
                return '总站';
            }
            else {
                return '未定义';
            }
        },
        formatStationStateType: function (row, column, cellValue) {
            if (cellValue === 0) {
                return '登记';
            }
            else if (cellValue === 1) {
                return '在用';
            }
            else if (cellValue === 2) {
                return '注册';
            }
        },
        formatBusStateType: function (row, column, cellValue) {
            if (cellValue === '0') {
                return '登记';
            }
            else if (cellValue === '1') {
                return '在用';
            }
            else if (cellValue === '2') {
                return '注销';
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
        formatRate: function (row, column, cellValue) {
            var tmp = Math.floor(cellValue) / cellValue;
            if (tmp == 1) {
                return cellValue * 100 + "%";
            }
            if (cellValue == 0) {
                return cellValue + "%"
            } else {
                return (cellValue * 100).toFixed(2) + "%";
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
        handleTabClick: function (tab) {
            vue.tabIndex = tab.index;
            vue.searchLabelOnline();
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
            vue.searchLabelOnline();
        },
        handleCurrentChange: function (val) {
            if (vue.tabIndex == 0) {
                vue.currentPageStation = val;
            } else if (vue.tabIndex == 1) {
                vue.currentPageBus = val;
            }
            vue.searchLabelOnline();
        },
        showOrganTree: function () {
            vue.showOrganName = true;
        },
        cancel: function () {
            vue.showList = true;
        },
        handleOrganNodeClick: function (nodeObject, node, nodeComponent) {
            vue.query.organID = nodeObject.organID;
            vue.query.organName = nodeObject.organName;
            vue.showOrganName = false;
        }

    },

    created: function () {
        axios.get('../../label/labelSumList/list', {
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
                    message: '加载标签上线统计数据失败',
                    type: 'error'
                });
            }
        })

    }
})