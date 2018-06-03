var vue = new Vue({
    el: '#sysLog',
    data: {
        query: {
            key: null
        },
        sysLogs: null,
        currentPage: 1,
        pageSize: 20,
        total: 0
    },
    methods: {
        searchSysLogs: function () {
            axios.get('../../sys/log/list', {
                params: {currentPage: vue.currentPage, pageSize: vue.pageSize, key: vue.query.key}
            }).then(function (response) {
                if (response.data.code == 0) {
                    vue.sysLogs = response.data.pageInfo.list;
                    vue.total = response.data.pageInfo.total;
                } else {
                    vue.$message({
                        message: '加载操作日志数据失败',
                        type: 'error'
                    });
                }
            });
        },
        clearCondition: function () {
            vue.query.key = null;
        },
        handleSizeChange: function (val) {
            vue.pageSize = val;
            vue.searchSysLogs();
        },
        handleCurrentChange: function (val) {
            vue.currentPage = val;
            vue.searchSysLogs();
        }
    },
    created: function () {
        // 可选地，上面的请求可以这样做
        axios.get('../../sys/log/list', {
            params: {currentPage: 1, pageSize: 20}
        }).then(function (response) {
            if (response.data.code == 0) {
                vue.sysLogs = response.data.pageInfo.list;
                vue.total = response.data.pageInfo.total;
            } else {
                vue.$message({
                    message: '加载操作日志数据失败',
                    type: 'error'
                });
            }
        });
    }
});