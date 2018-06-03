var vue = new Vue({
    el: "#combine",
    data: {
        query: {
            originId: null,
            destinationId: null,
            usernamePlan: null,
        },
        showList: true,
        combine: null,
        code: null,
        currentPage: 1,
        pageSize: 5,
        multipleSelection: [],
        total: 0,
        title: null,
        combineForm: {
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
        searchcombine: function () {
            console.log(vue.query);
            axios.get('../../basic/combine/listcombine', {
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
                    vue.combine = response.data.pageInfo.list;
                    vue.total = response.data.pageInfo.total;
                } else {
                    vue.$message({
                        message: '加载用车计划数据失败',
                        type: 'error'
                    });
                }
            });

        },


        addcombine: function () {
            vue.combineForm = {
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
            vue.$refs['combineForm'].resetFields();
            vue.title = '新增路单';
            vue.showList = false;
        },
        savecombine: function () {
            var url;
            if (vue.combineForm.noteid != null) {

                url = '../../basic/combine/update';
            } else {
                url = '../../basic/combine/save';
            }
            vue.combineForm.carId = vue.combineForm.type;
            axios.post(url, vue.combineForm).then(function (response) {
                if (response.data.code == 0) {
                    // 保存成功，隐藏表单，更新列表数据
                    vue.$message({
                        message: '成功保存路单计划',
                        type: 'success'
                    });
                    vue.showList = true;
                    vue.searchcombine();
                } else {
                    vue.$message({
                        message: response.data.msg,
                        type: 'error'
                    });
                }
            });
        },


        updatecombineInRow: function (row) {
            vue.title = '编辑路单用车计划';
            var noteId = row.noteid;

            axios.get('../../basic/combine/selectOne', {
                    params: {noteId: noteId}
                }
            ).then(function (response) {
                if (response.data.code == 0) {
                    console.log(response.data.combine);
                    vue.combineForm = response.data.combine;
                    console.log(response.data.combine);
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
                            axios.post('../../basic/combine/updateAll', noteId).then(function (response) {
                                if (response.data.code == 0) {
                                    // 保存成功，隐藏表单，更新列表数据
                                    vue.$message({
                                        message: '成功提交路单',
                                        type: 'success'
                                    });
                                    vue.multipleSelection = [];
                                    vue.searchcombine();
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
        updateAllNote: function () {
            var noteId = new Array();
            if (vue.multipleSelection.length == 0 || vue.multipleSelection.length >= 3) {
                vue.$message({
                    message: '请先选择两个需要合并的用车计划',
                    type: 'warning'
                });
                return;
            }
            if (vue.multipleSelection[0].originId == vue.multipleSelection[1].originId
                && vue.multipleSelection[0].destinationId == vue.multipleSelection[1].destinationId
                && vue.multipleSelection[0].timePlan == vue.multipleSelection[1].timePlan
                && vue.multipleSelection[0].timeReal == vue.multipleSelection[1].timeReal
                && vue.multipleSelection[0].type == vue.multipleSelection[1].type
            ) {
                vue.combineForm.carNumber = vue.multipleSelection[0].carNumber + vue.multipleSelection[1].carNumber;
                vue.combineForm.transportPlan = vue.multipleSelection[0].transportPlan + vue.multipleSelection[1].transportPlan;
                console.log(vue.combineForm.carNumber + " " + vue.combineForm.transportPlan);
                if (vue.combineForm.transportPlan >= 40) {
                    vue.$message({
                        message: '不可以合并计划,因为拉运量超过40',
                        type: 'warning'
                    });
                    return;
                }
            } else {
                vue.$message({
                    message: '不可以合并计划,因为时间或地点或车辆类型不相同',
                    type: 'warning'
                });
                return;
            }

            //console.log(noteId);
            if (vue.multipleSelection.length == 0 || vue.multipleSelection.length >= 3) {
                vue.$message({
                    message: '请先选择两个需要合并的用车计划',
                    type: 'warning'
                });
                return;
            } else {
                var busIds = new Array();
                vue.$confirm('此操作将合并所选路单，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    callback: function (action, instance) {
                        if (action == 'cancel') {
                            return;
                        } else {
                            //console.log("falseend");
                            axios.get('../../basic/combine/updateAllNote', {
                                params: {
                                    noteid: vue.multipleSelection[0].noteid,
                                    carNumber: vue.combineForm.carNumber,
                                    transportPlan: vue.combineForm.transportPlan,
                                    noteidTwo: vue.multipleSelection[1].noteid,

                                }
                            }).then(function (response) {
                                if (response.data.code == 0) {
                                    // 保存成功，隐藏表单，更新列表数据
                                    vue.$message({
                                        message: '成功合并路单',
                                        type: 'success'
                                    });
                                    vue.multipleSelection = [];
                                    vue.searchcombine();
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
                            axios.post('../../basic/combine/delete', noteId).then(function (response) {
                                if (response.data.code == 0) {
                                    // 保存成功，隐藏表单，更新列表数据
                                    vue.$message({
                                        message: '成功删除车辆',
                                        type: 'success'
                                    });
                                    vue.multipleSelection = [];
                                    vue.searchcombine();
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
        deletecombineInRow: function (row) {
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
                        axios.post('../../basic/combine/delete', noteIds).then(function (response) {
                            if (response.data.code == 0) {
                                // 保存成功，隐藏表单，更新列表数据
                                vue.$message({
                                    message: '成功删除用车计划',
                                    type: 'success'
                                });
                                vue.multipleSelection = [];
                                vue.searchcombine();
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
            vue.searchcombine();
        },
        handleCurrentChange: function (val) {
            vue.currentPage = val;
            vue.searchcombine();
        },
        handleSelectionChange: function (val) {
            vue.multipleSelection = val;

        },
        formatStatus: function (row, column, cellValue) {
            if (cellValue === "20") {
                return '未提交路单计划';
            } else if (cellValue === "21") {
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
        axios.get('../../basic/combine/list', {
            params: {currentPage: 1, pageSize: 5}
            }
        ).then(function (response) {
            if (response.data.code == 0) {
                vue.combine = response.data.pageInfo.list;
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
