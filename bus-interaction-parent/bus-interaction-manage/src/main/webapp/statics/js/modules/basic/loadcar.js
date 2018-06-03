var updateOrBack;
var vue = new Vue({
    el: "#loadcar",
    data: {
        query: {
            originId: null,
            destinationId: null,
            usernamePlan: null,
        },
        showList: true,
        loadcar: null,
        code: null,
        currentPage: 1,
        pageSize: 5,
        multipleSelection: [],
        total: 0,
        title: null,
        loadcarForm: {
            ontime: null,
            noteid: null,
            originId: null,
            destinationId: null,
            status: null,
            timePlan: null,
            timeReal: null,
            transportPlan: null,
            transportReal: null,
            type: null,
            usernamePlan: null,
            usernameReal: null,

            carNumber: null,
            carId: null,
            begintime: null,

        },
        ontimeoptions: [{
            value: '提前到达',
            label: '提前到达'
        }, {
            value: '按时到达',
            label: '按时到达'
        }, {
            value: '延时到达',
            label: '延时到达'
        }],
        caroptions: [{
            value: '1',
            label: '靖边气田'
        }, {
            value: '2',
            label: '苏东南气田'
        }, {
            value: '3',
            label: '玉门气田'
        }, {
            value: '4',
            label: '延长气田'
        }, {
            value: '5',
            label: '四川气田'
        }, {
            value: '6',
            label: '泸州气田'
        }],


        checkedBsBus: [],


        organes: null,
        organNameTree: null,
        showOrganName: null,
        defaultPropsOrgan: {
            children: 'children',
            label: 'organName'
        },
    },
    methods: {
        searchloadcar: function () {
            console.log(vue.query);
            axios.get('../../basic/loadcar/listloadcar', {
                    params: {
                        currentPage: vue.currentPage,
                        pageSize: vue.pageSize,
                        originId: vue.query.originId,
                        destinationId: vue.query.destinationId,
                        usernamePlan: vue.query.usernamePlan,
                    }
                }
            ).then(function (response) {
                if (response.data.code == 0) {
                    vue.loadcar = response.data.pageInfo.list;
                    vue.total = response.data.pageInfo.total;
                } else {
                    vue.$message({
                        message: '加载用车计划数据失败',
                        type: 'error'
                    });
                }
            });

        },

        saveOntime: function () {
            var url = '../../basic/loadcar/insertOntime';
            // console.log(vue.companyId)；
            axios.post(url, vue.loadcarForm).then(function (response) {
                if (response.data.code == 0) {
                    // 保存成功，隐藏表单，更新列表数据
                    vue.$message({
                        message: '成功完成路单',
                        type: 'success'
                    });
                    vue.showList = true;
                    vue.searchloadcar();
                } else {
                    vue.$message({
                        message: response.data.msg,
                        type: 'error'
                    });
                }
            });
        },
        addloadcar: function () {
            vue.loadcarForm = {
                noteid: null,
                originId: null,
                status: null,
                timePlan: null,
                timeReal: null,
                transportPlan: null,
                transportReal: null,
                type: null,
                usernamePlan: null,
                usernameReal: null,
                destinationId: null,
                carNumber: null,
                carId: null,
                begintime: null,
                remark: null,
            }
            vue.checkedRole = [];
            vue.$refs['loadcarForm'].resetFields();
            vue.title = '新增路单';
            vue.showList = false;
        },
        saveloadcar: function () {
            var url;
            if (updateOrBack != 1) {

                url = '../../basic/loadcar/updateReturn';
            } else {
                url = '../../basic/loadcar/insertOntime';
            }
            console.log(updateOrBack);
            vue.loadcarForm.carId = vue.loadcarForm.type;
            axios.post(url, vue.loadcarForm).then(function (response) {
                if (response.data.code == 0) {
                    // 保存成功，隐藏表单，更新列表数据
                    vue.$message({
                        message: '成功保存路单计划',
                        type: 'success'
                    });
                    vue.showList = true;
                    vue.searchloadcar();
                } else {
                    vue.$message({
                        message: response.data.msg,
                        type: 'error'
                    });
                }
            });
        },


        updateloadcarInRow: function (row) {
            vue.title = '退回路单用车计划';
            updateOrBack = 0;
            var noteId = row.noteid;
            console.log(updateOrBack);

            axios.get('../../basic/loadcar/selectOne', {
                    params: {noteId: noteId}
                }
            ).then(function (response) {
                if (response.data.code == 0) {
                    //console.log(response.data.loadcar);
                    vue.loadcarForm = response.data.carplan;
                    //console.log(response.data.loadcar);
                } else {
                    vue.$message({
                        message: response.data.msg,
                        type: 'error'
                    });
                }
            });
            vue.showList = false;
        },
        updateAll: function () {
            var noteId = new Array();

            for (var i = 0; i < vue.multipleSelection.length; i++) {
                noteId.push(vue.multipleSelection[i].noteid);
            }
            console.log(noteId);
            if (vue.multipleSelection.length == 0) {
                vue.$message({
                    message: '请先选择需要提交的用车计划',
                    type: 'warning'
                });
                return;
            } else {
                var busIds = new Array();
                vue.$confirm('此操作将提交所选路单，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    callback: function (action, instance) {
                        if (action == 'cancel') {
                            return;
                        } else {
                            axios.post('../../basic/loadcar/updateAll', noteId).then(function (response) {
                                if (response.data.code == 0) {
                                    // 保存成功，隐藏表单，更新列表数据
                                    vue.$message({
                                        message: '成功提交路单',
                                        type: 'success'
                                    });
                                    vue.multipleSelection = [];
                                    vue.searchloadcar();
                                } else {
                                    vue.$message({
                                        message: response.data.msg,
                                        type: 'error'
                                    });
                                }
                            });
                        }
                    }
                });

            }

        },

        deleteAll: function () {
            var noteId = new Array();
            for (var i = 0; i < vue.multipleSelection.length; i++) {
                noteId.push(vue.multipleSelection[i].noteid);
            }
            console.log(noteId);
            if (vue.multipleSelection.length == 0) {
                vue.$message({
                    message: '请先选择需要删除的用车计划',
                    type: 'warning'
                });
                return;
            } else {
                var busIds = new Array();
                vue.$confirm('此操作将删除所选路单，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    callback: function (action, instance) {
                        if (action == 'cancel') {
                            return;
                        } else {
                            axios.post('../../basic/loadcar/delete', noteId).then(function (response) {
                                if (response.data.code == 0) {
                                    // 保存成功，隐藏表单，更新列表数据
                                    vue.$message({
                                        message: '成功删除车辆',
                                        type: 'success'
                                    });
                                    vue.multipleSelection = [];
                                    vue.searchloadcar();
                                } else {
                                    vue.$message({
                                        message: response.data.msg,
                                        type: 'error'
                                    });
                                }
                            });
                        }
                    }
                });

            }

        },
        deleteBusInRow: function (row) {
            vue.$confirm('此操作将删除用车计划，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                callback: function (action, instance) {
                    if (action == 'cancel') {
                        return;
                    } else {
                        var noteIds = new Array();
                        noteIds.push(row.noteid);
                        axios.post('../../basic/loadcar/delete', noteIds).then(function (response) {
                            if (response.data.code == 0) {
                                // 保存成功，隐藏表单，更新列表数据
                                vue.$message({
                                    message: '成功删除用车计划',
                                    type: 'success'
                                });
                                vue.multipleSelection = [];
                                vue.searchloadcar();
                            } else {
                                vue.$message({
                                    message: response.data.msg,
                                    type: 'error'
                                });
                            }
                        });
                    }
                }
            });

        },
        finishloadcarInRow: function (row) {
            vue.title = '运输公司到达状态';
            var noteId = row.noteid;
            updateOrBack = 1;
            console.log(updateOrBack);

            axios.get('../../basic/arrangecar/selectOne', {
                    params: {noteId: noteId}
                }
            ).then(function (response) {
                if (response.data.code == 0) {
                    //console.log(response.data.arrangecar);
                    vue.loadcarForm = response.data.carplan;

                    //console.log(vue.arrangecarForm.companyId);
                } else {
                    vue.$message({
                        message: response.data.msg,
                        type: 'error'
                    });
                }
            });
            vue.showList = false;

        },
        returnloadcarInRow: function (row) {
            vue.$confirm('此操作将退回用车计划，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                callback: function (action, instance) {
                    if (action == 'cancel') {
                        return;
                    } else {
                        var noteIds = new Array();
                        noteIds.push(row.noteid);
                        axios.post('../../basic/loadcar/updateReturn', noteIds).then(function (response) {
                            if (response.data.code == 0) {
                                // 保存成功，隐藏表单，更新列表数据
                                vue.$message({
                                    message: '成功退回用车计划',
                                    type: 'success'
                                });
                                vue.multipleSelection = [];
                                vue.searchloadcar();
                            } else {
                                vue.$message({
                                    message: response.data.msg,
                                    type: 'error'
                                });
                            }
                        });
                    }
                }
            });

        },

        handleSizeChange: function (val) {
            vue.pageSize = val;
            vue.searchloadcar();
        },
        handleCurrentChange: function (val) {
            vue.currentPage = val;
            vue.searchloadcar();
        },
        handleSelectionChange: function (val) {
            vue.multipleSelection = val;

        },
        formatStatus: function (row, column, cellValue) {
            if (cellValue === "50") {
                return '未装卸货路单';
            } else if (cellValue === "51") {
                return '';
            }
            else {
                return 'null';
            }

        },
        formatCompany: function (row, column, cellValue) {
            if (cellValue === 1) {
                return '庆丰运输公司';
            } else if (cellValue === 2) {
                return '靖边运输公司';
            }
            else if (cellValue === 3) {
                return '锦林运输公司';
            }
            else if (cellValue === 4) {
                return '采气一厂';
            }
            else {
                return 'null';
            }

        },

        formatOriginId: function (row, column, cellValue) {
            if (cellValue === "1") {
                return '靖边气田';
            } else if (cellValue === "2") {
                return '苏东南气田';
            }
            else if (cellValue === "3") {
                return '玉门气田';
            }
            else if (cellValue === "4") {
                return '延长气田';
            }
            else if (cellValue === "5") {
                return '四川气田';
            }
            else if (cellValue === "6") {
                return '泸州气田';
            }
            else {
                return 'null';
            }

        },

        cancel: function () {
            vue.showList = true;
        },
        clearCondition: function () {
            vue.query.originId = null;
            vue.query.destinationId = null;
            vue.query.usernamePlan = null;
        },


    },

    created: function () {
        // 加载车辆
        axios.get('../../basic/loadcar/list', {
            params: {currentPage: 1, pageSize: 5}
            }
        ).then(function (response) {
            if (response.data.code == 0) {
                vue.loadcar = response.data.pageInfo.list;
                vue.total = response.data.pageInfo.total;
            } else {
                vue.$message({
                    message: '加载车辆数据失败',
                    type: 'error'
                });
            }
        });


    }

});
