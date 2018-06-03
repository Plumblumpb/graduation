var vue = new Vue({
    el: "#audit",
    data: {
        query: {
            originId: null,
            destinationId: null,
            usernamePlan: null,
        },
        showList: true,
        audit: null,
        code: null,
        currentPage: 1,
        pageSize: 5,
        multipleSelection: [],
        total: 0,
        title: null,
        auditForm: {
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
            remark: null,
            carNumber: null,
            carId: null,
            begintime: null,


        },

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
        searchaudit: function () {
            //console.log(vue.query);
            axios.get('../../basic/audit/listaudit', {
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
                    vue.audit = response.data.pageInfo.list;
                    vue.total = response.data.pageInfo.total;
                } else {
                    vue.$message({
                        message: '加载用车计划数据失败',
                        type: 'error'
                    });
                }
            });

        },


        addaudit: function () {
            vue.auditForm = {
                remark: null,
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
                begintime: null
            }
            vue.checkedRole = [];
            vue.$refs['auditForm'].resetFields();
            vue.title = '新增路单';
            vue.showList = false;
        },
        saveaudit: function () {
            var url;

            if (vue.auditForm.noteid != null) {

                url = '../../basic/audit/updateReturn';
            } else {
                url = '../../basic/audit/save';
            }
            console.log(vue.auditForm.noteid);
            //vue.auditForm.carId = vue.auditForm.type;
            axios.get(url, {
                params: {
                    noteid: vue.auditForm.noteid,
                    remark: vue.auditForm.remark,
                }
            }).then(function (response) {
                if (response.data.code == 0) {
                    // 保存成功，隐藏表单，更新列表数据
                    vue.$message({
                        message: '成功退回计划路单',
                        type: 'success'
                    });
                    vue.showList = true;
                    vue.searchaudit();
                } else {
                    vue.$message({
                        message: response.data.msg,
                        type: 'error'
                    });
                }
            });
        },


        updateauditInRow: function (row) {
            vue.title = '退回路单用车计划';
            var noteId = row.noteid;
            console.log(noteId);
            axios.get('../../basic/carplan/selectOne', {
                    params: {noteId: noteId}
                }
            ).then(function (response) {
                if (response.data.code == 0) {
                    //console.log(response.data.audit);
                    vue.auditForm = response.data.carplan;
                    console.log(vue.auditForm.remark);
                    //console.log(response.data.audit);
                } else {
                    vue.$message({
                        message: response.data.msg,
                        type: 'error'
                    });
                }
            });
            vue.showList = false;
        },
        updateReturn: function () {
            var noteId = new Array();
            for (var i = 0; i < vue.multipleSelection.length; i++) {
                noteId.push(vue.multipleSelection[i].noteid);
            }
            console.log(noteId);
            if (vue.multipleSelection.length == 0) {
                vue.$message({
                    message: '请先选择需要退回的用车计划',
                    type: 'warning'
                });
                return;
            } else {
                var busIds = new Array();
                vue.$confirm('此操作将退回所选路单，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    callback: function (action, instance) {
                        if (action == 'cancel') {
                            return;
                        } else {
                            axios.post('../../basic/audit/updateReturn', noteId).then(function (response) {
                                if (response.data.code == 0) {
                                    // 保存成功，隐藏表单，更新列表数据
                                    vue.$message({
                                        message: '成功提交路单',
                                        type: 'success'
                                    });
                                    vue.multipleSelection = [];
                                    vue.searchaudit();
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
                            axios.post('../../basic/audit/updateAll', noteId).then(function (response) {
                                if (response.data.code == 0) {
                                    // 保存成功，隐藏表单，更新列表数据
                                    vue.$message({
                                        message: '成功提交路单',
                                        type: 'success'
                                    });
                                    vue.multipleSelection = [];
                                    vue.searchaudit();
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
                            axios.post('../../basic/audit/delete', noteId).then(function (response) {
                                if (response.data.code == 0) {
                                    // 保存成功，隐藏表单，更新列表数据
                                    vue.$message({
                                        message: '成功删除车辆',
                                        type: 'success'
                                    });
                                    vue.multipleSelection = [];
                                    vue.searchaudit();
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
        deleteauditInRow: function (row) {
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
                        axios.post('../../basic/audit/delete', noteIds).then(function (response) {
                            if (response.data.code == 0) {
                                // 保存成功，隐藏表单，更新列表数据
                                vue.$message({
                                    message: '成功删除用车计划',
                                    type: 'success'
                                });
                                vue.multipleSelection = [];
                                vue.searchaudit();
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
                return '未安排运输公司';
            }

        },
        handleSizeChange: function (val) {
            vue.pageSize = val;
            vue.searchaudit();
        },
        handleCurrentChange: function (val) {
            vue.currentPage = val;
            vue.searchaudit();
        },
        handleSelectionChange: function (val) {
            vue.multipleSelection = val;

        },
        formatStatus: function (row, column, cellValue) {
            if (cellValue === "30") {
                return '未审核计划';
            } else if (cellValue === "31") {
                return '提交后回退';
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
        axios.get('../../basic/audit/list', {
            params: {currentPage: 1, pageSize: 5}
            }
        ).then(function (response) {
            if (response.data.code == 0) {
                vue.audit = response.data.pageInfo.list;
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
