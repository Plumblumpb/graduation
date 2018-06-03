var vue = new Vue({
    el: "#channel",
    data: {
        query: {
            originId: null,
            destinationId: null,
            usernamePlan: null,
            startTime: null,
            endTime: null,
            status: null,

        },
        pickerOptions: {
            disabledDate: function (time) {
                return time.getTime() > Date.now();
            }
        },
        showList: true,
        channel: null,
        code: null,
        currentPage: 1,
        pageSize: 10,
        multipleSelection: [],
        total: 0,
        title: null,
        channelForm: {
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
            startTime: null,
            endTime: null,
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
        statusoptions: [{
            value: '10',
            label: '未提交计划'
        }, {
            value: '11',
            label: '提交后回退'
        }, {
            value: '20',
            label: '未合并路单计划'
        }, {
            value: '21',
            label: '合并后回退'
        }, {
            value: '30',
            label: '未审核计划'
        }, {
            value: '31',
            label: '审核后回退'
        }, {
            value: '40',
            label: '未安排车辆'
        }, {
            value: '41',
            label: '安排车俩后回退'
        }, {
            value: '50',
            label: '未装卸货路单'
        }, {
            value: '51',
            label: '完成路单'
        }, {
            value: '52',
            label: '领导确认路单'
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
        setStartTime: function (val) {
            vue.query.startTime = val;
        },
        setEndTime: function (val) {
            vue.query.endTime = val;
        },
        searchchannel: function () {
            console.log(vue.query);
            axios.get('../../basic/channel/listchannel', {
                    params: {
                        currentPage: vue.currentPage,
                        pageSize: vue.pageSize,
                        originId: vue.query.originId,
                        destinationId: vue.query.destinationId,
                        usernamePlan: vue.query.usernamePlan,
                        startTime: vue.query.startTime,
                        endTime: vue.query.endTime,
                        status: vue.query.status
                    }
                }
            ).then(function (response) {
                if (response.data.code == 0) {
                    vue.channel = response.data.pageInfo.list;
                    vue.total = response.data.pageInfo.total;
                } else {
                    vue.$message({
                        message: '加载用车计划数据失败',
                        type: 'error'
                    });
                }
            });

        },


        addchannel: function () {
            vue.channelForm = {
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
            vue.$refs['channelForm'].resetFields();
            vue.title = '新增路单';
            vue.showList = false;
        },
        savechannel: function () {
            var url;
            if (vue.channelForm.noteid != null) {

                url = '../../basic/channel/update';
            } else {
                url = '../../basic/channel/save';
            }
            console.log(vue.channelForm.carId);
            axios.post(url, vue.channelForm).then(function (response) {
                if (response.data.code == 0) {
                    // 保存成功，隐藏表单，更新列表数据
                    vue.$message({
                        message: '成功保存路单计划',
                        type: 'success'
                    });
                    vue.showList = true;
                    vue.searchchannel();
                } else {
                    vue.$message({
                        message: response.data.msg,
                        type: 'error'
                    });
                }
            });
        },
        updatechannelInRow: function (row) {
            var noteId = new Array();
            for (var i = 0; i < vue.multipleSelection.length; i++) {
                noteId.push(vue.multipleSelection[i].noteid);
            }
            //console.log(noteId);
            console.log(row.status);
            console.log(noteId);
            if (row.status != 51) {
                vue.$message({
                    message: '请先选择已完成的路单',
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
                            axios.post('../../basic/channel/updateAll', noteId).then(function (response) {
                                if (response.data.code == 0) {
                                    // 保存成功，隐藏表单，更新列表数据
                                    vue.$message({
                                        message: '成功提交路单',
                                        type: 'success'
                                    });
                                    vue.multipleSelection = [];
                                    vue.searchchannel();
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
                            axios.post('../../basic/channel/updateAll', noteId).then(function (response) {
                                if (response.data.code == 0) {
                                    // 保存成功，隐藏表单，更新列表数据
                                    vue.$message({
                                        message: '成功提交路单',
                                        type: 'success'
                                    });
                                    vue.multipleSelection = [];
                                    vue.searchchannel();
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
                            axios.post('../../basic/channel/delete', noteId).then(function (response) {
                                if (response.data.code == 0) {
                                    // 保存成功，隐藏表单，更新列表数据
                                    vue.$message({
                                        message: '成功删除车辆',
                                        type: 'success'
                                    });
                                    vue.multipleSelection = [];
                                    vue.searchchannel();
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
                        axios.post('../../basic/channel/delete', noteIds).then(function (response) {
                            if (response.data.code == 0) {
                                // 保存成功，隐藏表单，更新列表数据
                                vue.$message({
                                    message: '成功删除用车计划',
                                    type: 'success'
                                });
                                vue.multipleSelection = [];
                                vue.searchchannel();
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
            vue.searchchannel();
        },
        handleCurrentChange: function (val) {
            vue.currentPage = val;
            vue.searchchannel();
        },
        handleSelectionChange: function (val) {
            vue.multipleSelection = val;

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
        formatStatus: function (row, column, cellValue) {
            if (cellValue === "10") {
                return '未提交计划';
            } else if (cellValue === "11") {
                return '提交后回退';
            } else if (cellValue === "20") {
                return '未合并路单计划';
            } else if (cellValue === "21") {
                return '合并后回退';
            } else if (cellValue === "30") {
                return '未审核计划';
            } else if (cellValue === "31") {
                return '审核后回退';
            } else if (cellValue === "40") {
                return '未安排车辆';
            } else if (cellValue === "41") {
                return '安排车俩后回退';
            } else if (cellValue === "50") {
                return '未装卸货路单';
            } else if (cellValue === "51") {
                return '完成路单';
            } else if (cellValue === "52") {
                return '领导确认路单';
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
            vue.query.status = null;
            vue.query.startTime = null;
            vue.query.endTime = null;

        },


    },

    created: function () {
        // 加载车辆
        axios.get('../../basic/channel/list', {
                params: {currentPage: 1, pageSize: 10}
            }
        ).then(function (response) {
            if (response.data.code == 0) {
                vue.channel = response.data.pageInfo.list;
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
