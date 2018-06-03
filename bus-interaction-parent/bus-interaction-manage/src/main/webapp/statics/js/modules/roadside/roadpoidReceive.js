var vue = new Vue({
    el: "#roadpoidReceive",
    data: {
        query: {
            roadsideName: null,
            numberPlate: null,
            organName: null,
            organID: null,
            startTime: '',
            endTime: '',
            dateButton: null
        },
        pickerOptions: {
            disabledDate: function (time) {
                return time.getTime() > Date.now();
            }
        },
        showList: true,
        roadpoidReceive: null,
        currentPage: 1,
        pageSize: 20,
        total: 0,
        multipleSelection: [],
        title: null,
        checkedVersion: [],
        organNameTree: null,
        showOrganName: false,
        defaultPropsOrgan: {
            children: 'children',
            label: 'organName'
        }

    },

    methods: {
        clearCondition: function () {
            vue.query.organName = null;
            vue.query.organID = null;
            vue.query.numberPlate = null;
            vue.query.roadsideName = null;
            vue.query.startTime = null;
            vue.query.endTime = null
        },
        searchRoadpoidReceive: function () {
            var params = {
                currentPage: vue.currentPage,
                pageSize: vue.pageSize,
                numberPlate: vue.query.numberPlate,
                roadsideName: vue.query.roadsideName,
                organID: vue.query.organID,
                dateButton: vue.query.dateButton
            }
            if (vue.query.startTime) {
                params.startTime = vue.query.startTime.format('yyyy-MM-dd hh:mm:ss');
            }
            if (vue.query.endTime) {
                params.endTime = vue.query.endTime.format('yyyy-MM-dd hh:mm:ss');
            }
            if (params.startTime > params.endTime) {
                vue.$message({
                    message: '开始时间不能大于结束时间',
                    type: 'warning'
                });
                return;
            }

            axios.get('../../roadside/roadpoidReceive/list', {params}).then(function (response) {
                if (response.data.code == 0) {
                    vue.roadpoidReceive = response.data.pageInfo.list;
                    vue.total = response.data.pageInfo.total;
                } else {
                    vue.$message({
                        message: '加载路侧明细数据失败',
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
            vue.searchRoadpoidReceive();
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
        handleSizeChange: function (val) {
            vue.pageSize = val;
            vue.searchRoadpoidReceive();
        },
        handleCurrentChange: function (val) {
            vue.currentPage = val;
            vue.searchRoadpoidReceive();
        },
        formatElectricity: function (row, column, cellValue) {
            if (cellValue === "IN") {
                return '进站';
            } else if (cellValue === "OU") {
                return '出站';
            } else {
                return '未知';
            }
        },
        showOrganTree: function () {
            vue.showOrganName = true;
        },
        handleOrganNodeClick: function (nodeObject, node, nodeComponent) {
            vue.query.organID = nodeObject.organID;
            vue.query.organName = nodeObject.organName;
            vue.showOrganName = false;
        }
    },
    created: function () {
        axios.get('../../roadside/roadpoidReceive/list', {
            params: {currentPage: 1, pageSize: 20}
        }).then(function (response) {
            if (response.data.code == 0) {
                vue.roadpoidReceive = response.data.pageInfo.list;
                vue.total = response.data.pageInfo.total;
            } else {
                vue.$message({
                    message: '加载路侧明细数据失败',
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