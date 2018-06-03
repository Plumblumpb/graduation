var vue = new Vue({
    el: "#safeEvent",
    data: {
        query: {
            content: null,
            startTime: null,
            endTime: null,
            createBtn: null,
            updateBtn: null
        },
        pickerOptions: {
            disabledDate: function (time) {
                return time.getTime() > Date.now();
            }
        },
        showList: true,
        safeEvent: null,
        currentPage: 1,
        pageSize: 20,
        total: 0,
        multipleSelection: [],
        title: null,
        checkedConfig: [],

    },
    methods: {
        clearCondition: function () {
            vue.query.content = null;
            vue.query.startTime = null;
            vue.query.endTime = null;
        },
        searchSafeEvent: function () {
            var params = {
                currentPage: vue.currentPage,
                pageSize: vue.pageSize,
                content: vue.query.content,
                createBtn: vue.query.createBtn,
                updateBtn: vue.query.updateBtn
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
            axios.get('../../feedback/safeEvent/list', {params}).then(function (response) {
                if (response.data.code == 0) {
                    vue.safeEvent = response.data.pageInfo.list;
                    vue.total = response.data.pageInfo.total;
                } else {
                    vue.$message({
                        message: '加载安全事件数据失败',
                        type: 'error'
                    });
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
            }
            vue.searchSafeEvent();
        },
        handleSelectionChange: function (val) {
            vue.multipleSelection = val;
        },
        handleSizeChange: function (val) {
            vue.pageSize = val;
            vue.searchSysConfigs();
        },
        handleCurrentChange: function (val) {
            vue.currentPage = val;
            vue.searchSysConfigs();
        }
    },
    created: function () {
        axios.get('../../feedback/safeEvent/list', {
            params: {currentPage: 1, pageSize: 20}
        }).then(function (response) {
            if (response.data.code == 0) {
                vue.safeEvent = response.data.pageInfo.list;
                vue.total = response.data.pageInfo.total;
            } else {
                vue.$message({
                    message: '加载安全事件数据失败',
                    type: 'error'
                });
            }
        });
    }

})