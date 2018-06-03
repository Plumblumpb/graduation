var vue = new Vue({
    el: "#bsRoadsideOnline",
    data: {
        query: {
            roadsideCode: null,
            roadsideName: null,
            organName: null,
            installDate: null,
            createDate: null,
            startTime: null,
            endTime: null,
            installBtn: null,
            createBtn: null,
            organId: null,

        },
        pickerOptions: {
            disabledDate: function (time) {
                return time.getTime() > Date.now();
            }
        },
        showList: true,
        bsRoadsideOnlines: null,
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
        setStartTime: function (val) {
            vue.query.startTime = val;
        },
        setEndTime: function (val) {
            vue.query.endTime = val;
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
        searchBsRoadsideOnline: function () {
            if (vue.query.startTime > vue.query.endTime) {
                vue.$message({
                    message: '开始时间不能大于结束时间',
                    type: 'warning'
                });
                return;
            }
            // 加载路线
            axios.get('../../roadside/bsRoadsideOnline/listOnline', {
                    params: {
                        organId: vue.query.organId,
                        roadsideName: vue.query.roadsideName,
                        startTime: vue.query.startTime,
                        endTime: vue.query.endTime,
                        installBtn: vue.query.installBtn,
                        createBtn: vue.query.createBtn,
                    }
                }
            ).then(function (response) {

                if (response.data.code == 0) {
                    vue.bsRoadsideOnlines = response.data.pageInfo.list;
                    vue.total = response.data.pageInfo.total;
                } else {
                    vue.$message({
                        message: '加载路侧上线统计数据失败',
                        type: 'error'
                    });
                }
            })

        },
        searchBsRoadsideOnlines: function () {
            // 加载路测上线统计
            axios.get('../../roadside/bsRoadsideOnline/list', {
                    params: {currentPage: vue.currentPage, pageSize: vue.pageSize}
                }
            ).then(function (response) {

                if (response.data.code == 0) {
                    vue.bsRoadsideOnlines = response.data.pageInfo.list;
                    vue.total = response.data.pageInfo.total;
                } else {
                    vue.$message({
                        message: '加载路侧上线统计数据失败',
                        type: 'error'
                    });
                }
            });
        },
        handleSizeChange: function (val) {
            vue.pageSize = val;
            vue.searchBsRoadsideOnlines();
        },
        handleCurrentChange: function (val) {
            vue.currentPage = val;
            vue.searchBsRoadsideOnlines();
        },
        clearCondition: function () {
            vue.query.organId = null;
            vue.query.organName = null;
            vue.query.roadsideName = null;
            vue.query.startTime = null;
            vue.query.endTime = null
        },


        orderByDate: function (Date) {
            if (Date.prop == 'installDate') {
                if (Date.order == "ascending") {
                    vue.query.installBtn = 1;

                } else if (Date.order == "descending") {
                    vue.query.installBtn = 0;

                } else {
                    vue.query.installBtn = null;
                }
                vue.query.createBtn = null;
            }
            if (Date.prop == 'createDate') {
                if (Date.order == "ascending") {
                    vue.query.createBtn = 1;

                } else if (Date.order == "descending") {
                    vue.query.createBtn = 0;

                } else {
                    vue.query.createBtn = null;
                }
                vue.query.installBtn = null;
            }
            vue.searchBsRoadsideOnline();
        },
    },
    created: function () {
        // 加载路测上线统计
        axios.get('../../roadside/bsRoadsideOnline/list', {
                params: {currentPage: 1, pageSize: 20}
            }
        ).then(function (response) {

            if (response.data.code == 0) {
                vue.bsRoadsideOnlines = response.data.pageInfo.list;
                vue.total = response.data.pageInfo.total;
                vue.organes = response.data.organ;
            } else {
                vue.$message({
                    message: '加载路侧上线统计数据失败',
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