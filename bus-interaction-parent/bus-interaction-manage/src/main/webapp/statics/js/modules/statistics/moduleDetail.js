var vue = new Vue({
    el: '#moduleDetail',
    data: {
        query: {
            moduleName: null
        },
        moduleName: [{
            value: 'yct',
            label: '羊城通'
        }, {
            value: 'yh',
            label: '摇号'
        }, {
            value: 'ryxBus',
            label: '如约行巴士'
        }, {
            value: 'advertise',
            label: '宣传'
        }, {
            value: 'subway',
            label: '地铁'
        }, {
            value: 'search',
            label: '搜索'
        }, {
            value: 'flight',
            label: '机票'
        }, {
            value: 'user',
            label: '个人中心'
        }],
        moduleDetail: null,
        showList: true,
        currentPage: 1,
        pageSize: 20,
        total: 0,
        multipleSelection: [],
        title: null

    },

    methods: {
        clearCondition: function () {
            vue.query.moduleName = null;
        },
        searchModuleDetail: function () {
            var params = {
                currentPage: vue.currentPage,
                pageSize: vue.pageSize,
                moduleName: vue.query.moduleName,
            }
            axios.get('../../moduleAnalysis/list', {params}).then(function (response) {
                if (response.data.code == 0) {
                    vue.moduleDetail = response.data.pageInfo.list;
                    vue.total = response.data.pageInfo.total;
                } else {
                    vue.$message({
                        message: '加载模块数据失败',
                        type: 'error'
                    });
                }
            });
        },
        formatDay: function (row, column, cellValue) {
            return cellValue.substr(0, 10);
        },
        formatModuleName: function (row, column, cellValue) {
            if (cellValue === "yct") {
                return '羊城通';
            }
            if (cellValue === "yh") {
                return '摇号';
            }
            if (cellValue === "ryxBus") {
                return '如约行巴士';
            }
            if (cellValue === "advertise") {
                return '宣传';
            }
            if (cellValue === "subway") {
                return '地铁';
            }
            if (cellValue === "search") {
                return '搜索';
            }
            if (cellValue === "flight") {
                return '机票';
            }
            if (cellValue === "user") {
                return '个人中心';
            }
        },
        formatDevType: function (row, column, cellValue) {
            if (cellValue === 0) {
                return 'Android';
            }
            if (cellValue === 1) {
                return 'IOS';
            }
        },
        handleSelectionChange: function (val) {
            vue.multipleSelection = val;
        },
        handleSizeChange: function (val) {
            vue.pageSize = val;
            vue.searchModuleDetail();
        },
        handleCurrentChange: function (val) {
            vue.currentPage = val;
            vue.searchModuleDetail();
        }
    },
    created: function () {
        axios.get('../../moduleAnalysis/list', {
            params: {currentPage: 1, pageSize: 20}
        }).then(function (response) {
            if (response.data.code == 0) {
                vue.moduleDetail = response.data.pageInfo.list;
                vue.total = response.data.pageInfo.total;
            } else {
                vue.$message({
                    message: '加载模块数据失败',
                    type: 'error'
                });
            }
        });
    }
});