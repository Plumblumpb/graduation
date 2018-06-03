var vue = new Vue({
    el: "#userMessage",
    data: {
        query: {
            username: null,
            tel: null,
            age: null,
            sex: null,
            city: null,
            devtype: null,
            startTime: null,
            endTime: null,
            installBtn: null,
            createBtn: null,

        },
        pickerOptions: {
            disabledDate: function (time) {
                return time.getTime() > Date.now();
            }
        },
        showList: true,
        userMessages: null,
        currentPage: 1,
        pageSize: 20,
        total: 0,
        code: null,
        devTypes: [{
            value: '0',
            label: 'Android'
        }, {
            value: '1',
            label: 'iPhone'
        }, {
            value: '2',
            label: 'WeChat'
        }],
        sexTypes: [{
            value: '0',
            label: '女   '
        }, {
            value: '1',
            label: '男'
        }]


    },
    methods: {
        setStartTime: function (val) {
            vue.query.startTime = val;
        },
        setEndTime: function (val) {
            vue.query.endTime = val;
        },
        searchUserMessage: function () {
            if (vue.query.startTime > vue.query.endTime) {
                vue.$message({
                    message: '开始时间不能大于结束时间',
                    type: 'warning'
                });
                return;
            }
            axios.get('../../usermessage/userMessage/listUser', {
                    params: {
                        currentPage: vue.currentPage, pageSize: vue.pageSize,
                        username: vue.query.username,
                        tel: vue.query.tel,
                        age: vue.query.age,
                        sex: vue.query.sex,
                        city: vue.query.city,
                        devtype: vue.query.devtype,
                        startTime: vue.query.startTime,
                        endTime: vue.query.endTime,
                        installBtn: vue.query.installBtn,
                        createBtn: vue.query.createBtn,
                    }
                }
            ).then(function (response) {

                if (response.data.code == 0) {
                    vue.userMessages = response.data.pageInfo.list;
                    vue.total = response.data.pageInfo.total;
                } else {
                    vue.$message({
                        message: '加载系统管理员数据失败',
                        type: 'error'
                    });
                }
            });

        },
        searchUserMessages: function () {
            // 加载用户信息
            axios.get('../../usermessage/userMessage/list', {
                    params: {currentPage: vue.currentPage, pageSize: vue.pageSize}
                }
            ).then(function (response) {

                if (response.data.code == 0) {
                    vue.userMessages = response.data.pageInfo.list;
                    vue.total = response.data.pageInfo.total;
                } else {
                    vue.$message({
                        message: '加载系统管理员数据失败',
                        type: 'error'
                    });
                }
            });

        },

        handleSizeChange: function (val) {
            vue.pageSize = val;
            vue.searchUserMessages();
        },
        handleCurrentChange: function (val) {
            vue.currentPage = val;
            vue.searchUserMessages();
        },
        clearCondition: function () {
            vue.query.username = null;
            vue.query.tel = null;
            vue.query.sex = null;
            vue.query.city = null;
            vue.query.devtype = null;
            vue.query.age = null;
            vue.query.startTime = null;
            vue.query.endTime = null
        },
        formatSexType: function (row, column, cellValue) {

            if (cellValue === 0) {
                return '女';
            } else if (cellValue === 1) {
                return '男';
            } else {
                return;
            }
        },
        formatdevType: function (row, column, cellValue) {
            if (cellValue === 0) {
                return 'Android';
            } else if (cellValue === 1) {
                return 'Iphone';
            } else if (cellValue === 2) {
                return 'Wechat';
            } else return;
        },
        orderByDate: function (Date) {
            if (Date.prop == 'lastlogintime') {
                if (Date.order == "ascending") {
                    vue.query.installBtn = 1;

                } else if (Date.order == "descending") {
                    vue.query.installBtn = 0;

                } else {
                    vue.query.installBtn = null;
                }
                vue.query.createBtn = null;
            }
            if (Date.prop == 'inputtime') {
                if (Date.order == "ascending") {
                    vue.query.createBtn = 1;

                } else if (Date.order == "descending") {
                    vue.query.createBtn = 0;

                } else {
                    vue.query.createBtn = null;
                }
                vue.query.installBtn = null;
            }
            vue.searchUserMessage();
        },


    },
    created: function () {
        // 加载用户信息
        axios.get('../../usermessage/userMessage/list', {
                params: {currentPage: 1, pageSize: 20}
            }
        ).then(function (response) {

            if (response.data.code == 0) {
                vue.userMessages = response.data.pageInfo.list;
                vue.total = response.data.pageInfo.total;
            } else {
                vue.$message({
                    message: '加载系统管理员数据失败',
                    type: 'error'
                });
            }
        });
    }

});