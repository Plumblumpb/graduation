var vue = new Vue({
    el: "#bsLabelMajor",
    data: {
        showList: true,
        bsLabelMajorUtils: null,
        total: 0,
        currentPage: 1,
        pageSize: 20,
        code: null,
    },
    methods: {},
    created: function () {
        // 加载站点
        axios.get('../../label/bsLabelMajor/listCount'
        ).then(function (response) {
            if (response.data.code == 0) {
                vue.bsLabelMajorUtils = response.data.list;
                vue.total = response.data.totales;
            } else {
                vue.$message({
                    message: '加载标签发行统计数据失败',
                    type: 'error'
                });
            }
        });
    }


});