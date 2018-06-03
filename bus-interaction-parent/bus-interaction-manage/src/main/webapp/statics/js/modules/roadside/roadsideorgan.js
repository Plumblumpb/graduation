var vue = new Vue({
    el: "#bsRoadsideCount",
    data: {
        query: {
            organId: null,
            organName: null,
            roadsideName: null,
            numberPlate: null,
            startTime: null,
            endTime: null,
            dateButton: null,
            createBtn: null,

        },
        pickerOptions: {
            disabledDate: function (time) {
                return time.getTime() > Date.now();
            }
        },
        showList: true,
        bsRoadsideCounts: null,
        currentPage: 1,
        pageSize: 20,
        total: 0,
        code: null,


        organes: null,
        organNameTree: null,
        showOrganName: null,
        defaultPropsOrgan: {
            children: 'children',
            label: 'organName'
        },


    },
    methods: {
        searchBsRoadsideCount: function () {
            // 加载路线
            if (vue.query.startTime > vue.query.endTime) {
                vue.$message({
                    message: '开始时间不能大于结束时间',
                    type: 'warning'
                });
                return;
            }
            axios.get('../../roadside/bsRoadsideCount/listCount', {
                    params: {
                        organId: vue.query.organId,
                        organName: vue.query.organName,
                        roadsideName: vue.query.roadsideName,
                        numberPlate: vue.query.numberPlate,
                        startTime: vue.query.startTime,
                        endTime: vue.query.endTime,
                        createBtn: vue.query.createBtn
                    }
                }
            ).then(function (response) {

                if (response.data.code == 0) {
                    vue.bsRoadsideCounts = response.data.pageInfo.list;
                    vue.total = response.data.pageInfo.total;
                } else {
                    vue.$message({
                        message: '加载路侧统计数据失败',
                        type: 'error'
                    });
                }
            })
        },
        searchBsRoadsideCounts: function () {
            // 加载路线
            axios.get('../../roadside/bsRoadsideCount/list', {
                    params: {currentPage: vue.currentPage, pageSize: vue.pageSize}
                }
            ).then(function (response) {

                if (response.data.code == 0) {
                    vue.bsRoadsideCounts = response.data.pageInfo.list;
                    vue.total = response.data.pageInfo.total;
                } else {
                    vue.$message({
                        message: '加载路侧统计数据失败',
                        type: 'error'
                    });
                }
            });
        },
        handleSizeChange: function (val) {
            vue.pageSize = val;
            vue.searchBsRoadsideCounts();
        },
        handleCurrentChange: function (val) {
            vue.currentPage = val;
            vue.searchBsRoadsideCounts();
        },
        clearCondition: function () {
            vue.query.organId = null;
            vue.query.organName = null;
            vue.query.roadsideName = null;
            vue.query.numberPlate = null;
            vue.query.startTime = null;
            vue.query.endTime = null
        },
        orderByDate: function (Date) {
            if (Date.prop == 'createDate') {
                if (Date.order == "ascending") {
                    vue.query.createBtn = 1;

                } else if (Date.order == "descending") {
                    vue.query.createBtn = 0;

                } else {
                    vue.query.createBtn = null;
                }

            }
            vue.searchBsRoadsideCount();
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
        // 加载路线
        axios.get('../../roadside/bsRoadsideCount/list', {
                params: {currentPage: 1, pageSize: 20}
            }
        ).then(function (response) {

            if (response.data.code == 0) {
                vue.bsRoadsideCounts = response.data.pageInfo.list;
                vue.total = response.data.pageInfo.total;
                vue.organes = response.data.organ;
            } else {
                vue.$message({
                    message: '加载路侧统计数据失败',
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