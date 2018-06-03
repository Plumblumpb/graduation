var vue = new Vue({
    el: "#routeFeedback",
    data: {
        query: {
            tel: '',
            startTime: '',
            endTime: '',
            feedbackType: '',
            feedbackStatus: '',
            dateButton: null
        },
        pickerOptions: {
            disabledDate: function (time) {
                return time.getTime() > Date.now();
            }
        },
        feedbackType: [],
        feedbackStatus: [{
            value: '0',
            label: '未处理'
        }, {
            value: '1',
            label: '已处理'
        }],
        tabIndex: 0,
        feedbackTabTitle: {
            total: 0,
            unfinish: 0,
            finished: 0
        },
        routeFeedbackDetail: [],
        totalFeedback: [], // 全部app反馈
        unfinishFeedback: [], // 未处理的反馈
        finishedFeedback: [], // 已处理的反馈
        currentPageTotal: 1,
        pageSizeTotal: 20,
        totalTotal: 0,
        currentPageUnfinish: 1,
        pageSizeUnfinish: 20,
        totalUnfinish: 0,
        currentPageFinished: 1,
        pageSizeFinished: 20,
        totalFinished: 0,
        showList: true,
        routeFeedback: null,
        currentPage: 1,
        pageSize: 20,
        total: 0,
        multipleSelection: [],
        title: null,
        checkedVersion: [],
        disabled: this.totalTotal == 0 ? true : false
    },
    methods: {
        clearCondition: function () {
            vue.query.tel = null;
            vue.query.startTime = null;
            vue.query.endTime = null;
            vue.query.feedbackType = null;
            vue.query.feedbackStatus = null;
        },
        searchRoutefeedback: function () {
            var params = {
                tel: vue.query.tel,
                typeID: vue.query.feedbackType,
                dateButton: vue.query.dateButton
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
            if (vue.tabIndex == 0) {
                params.currentPage = vue.currentPageTotal;
                params.pageSize = vue.pageSizeTotal;
            } else if (vue.tabIndex == 1) {
                params.currentPage = vue.currentPageUnfinish;
                params.pageSize = vue.pageSizeUnfinish;
                params.status = 0;
            } else if (vue.tabIndex == 2) {
                params.currentPage = vue.currentPageFinished;
                params.pageSize = vue.pageSizeFinished;
                params.status = 1;
            }
            axios.get('../../feedback/routeFeedback/list', {params}).then(function (response) {
                if (response.data.code == 0) {
                    if (vue.tabIndex == 0) {
                        vue.totalFeedback = response.data.pageInfo.list;
                        vue.totalTotal = response.data.pageInfo.total;
                        if (response.data.pageInfo.total == 0) {
                            vue.disabled = true
                        } else {
                            vue.disabled = false
                        }
                    } else if (vue.tabIndex == 1) {
                        vue.unfinishFeedback = response.data.pageInfo.list;
                        vue.totalUnfinish = response.data.pageInfo.total;
                    } else if (vue.tabIndex == 2) {
                        vue.finishedFeedback = response.data.pageInfo.list;
                        vue.totalFinished = response.data.pageInfo.total;
                    }
                    if (response.data.feedbackTabTitle != null) {
                        vue.feedbackTabTitle = response.data.feedbackTabTitle;
                    } else {
                        vue.feedbackTabTitle = {
                            total: 0,
                            unfinish: 0,
                            finished: 0
                        }
                    }
                } else {
                    vue.$message({
                        message: '加载路线反馈数据失败',
                        type: 'error'
                    });
                }
            });
        },
        updateStatus: function () {
            // 判断是否有选中记录
            if (vue.multipleSelection.length == 0) {
                vue.$message({
                    message: '请先选择需要标记为已处理的反馈信息',
                    type: 'warning'
                });
                return;
            } else {
                var ids = new Array();
                var routeFBID = '';
                for (var i = 0; i < vue.multipleSelection.length; i++) {
                    ids.push(vue.multipleSelection[i].routeFBID);
                    routeFBID += vue.multipleSelection[i].routeFBID + ',';
                }

                routeFBID = routeFBID.substring(0, routeFBID.length - 1);

                vue.$confirm('此操作将标记该反馈为已处理信息，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    callback: function (action, instance) {
                        if (action == 'cancel') {
                            return;
                        } else {
                            axios.post('../../feedback/routeFeedback/upDateStatus/' + ids).then(function (response) {
                                if (response.data.code == 0) {
                                    // 保存成功，隐藏表单，更新列表数据
                                    vue.$message({
                                        message: '成功更新反馈信息',
                                        type: 'success'
                                    });
                                    vue.multipleSelection = [];
                                    vue.searchRoutefeedback();
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


        updateStatusInRow: function (row) {
            vue.$confirm('此操作将标记该反馈为已处理信息，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    callback: function (action, instance) {
                        if (action == 'cancel') {
                            return;
                        } else {
                            axios.get('../../feedback/routeFeedback/upDateStatus/' + row.routeFBID).then(function (response) {
                                if (response.data.code == 0) {
                                    // 保存成功，隐藏表单，更新列表数据
                                    vue.$message({
                                        message: '成功更新反馈信息',
                                        type: 'success'
                                    });
                                    vue.multipleSelection = [];
                                    vue.searchRoutefeedback();
                                } else {
                                    vue.$message({
                                        message: response.data.msg,
                                        type: 'error'
                                    })
                                }
                            })
                        }
                    }
                }
            )
        },
        detailInRow: function (row) {
            axios.get('../../feedback/routeFeedback/routeFeedbackDetail/' + row.routeFBID).then(function (response) {

                vue.routeFeedbackDetail = response.data.routeFeedback
                if (vue.routeFeedbackDetail.status == 0) {
                    vue.routeFeedbackDetail.status = "未处理"
                }
                if (vue.routeFeedbackDetail.status == 1) {
                    vue.routeFeedbackDetail.status = "已处理"
                }
                if (vue.routeFeedbackDetail.devType == 0) {
                    vue.routeFeedbackDetail.devType = "android";
                }
                if (vue.routeFeedbackDetail.devType == 0) {
                    vue.routeFeedbackDetail.devType = "iphone";
                }
                if (vue.routeFeedbackDetail.devType == 0) {
                    vue.routeFeedbackDetail.devType = "Html";
                }
                if (vue.routeFeedbackDetail.devType == -1) {
                    vue.routeFeedbackDetail.devType = "其他";
                }
            })
            vue.showList = false
        },
        orderByDate: function (custom) {
            if (custom.order == "ascending") {
                vue.query.dateButton = 1
            } else {
                vue.query.dateButton = 0
            }
            vue.searchRoutefeedback();
        },
        exportRouteFeedback: function () {
            vue.disabled = true
            var params = {
                tel: vue.query.tel,
                typeID: vue.query.feedbackType
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
            var myform = $("<form></form>");
            myform.attr('method', 'get')
            myform.attr('action', "../../feedback/routeFeedback/exportRouteFeedback");

            var tel = $("<input type='hidden' name='tel' />")
            tel.attr('value', vue.query.tel);

            var typeID = $("<input type='hidden' name='typeID' />")
            typeID.attr('value', vue.query.feedbackType);

            myform.append(tel);
            myform.append(typeID);
            myform.appendTo('body').submit(); //must add this line for higher html spec

        },
        formatStatusType: function (row, column, cellValue) {
            if (cellValue === 0) {
                return '未处理';
            }
            if (cellValue === 1) {
                return '已处理';
            }
        },
        handleTabClick: function (tab) {
            vue.tabIndex = tab.index;
            vue.searchRoutefeedback();
        },
        handleSelectionChange: function (val) {
            vue.multipleSelection = val;
        },
        handleSizeChange: function (val) {
            if (vue.tabIndex == 0) {
                vue.pageSizeTotal = val;
            } else if (vue.tabIndex == 1) {
                vue.pageSizeUnfinish = val;
            } else if (vue.tabIndex == 2) {
                vue.pageSizeFinished = val;
            }
            vue.searchRoutefeedback();
        },
        handleCurrentChange: function (val) {
            if (vue.tabIndex == 0) {
                vue.currentPageTotal = val;
            } else if (vue.tabIndex == 1) {
                vue.currentPageUnfinish = val;
            } else if (vue.tabIndex == 2) {
                vue.currentPageFinished = val;
            }
            vue.searchRoutefeedback();
        },
        cancel: function () {
            vue.showList = true;
        }
    },

    created: function () {
        axios.get('../../feedback/routeFeedback/list', {
            params: {currentPage: 1, pageSize: 20}
        }).then(function (response) {
            if (response.data.code == 0) {
                vue.totalFeedback = response.data.pageInfo.list;
                vue.totalTotal = response.data.pageInfo.total;
                if (response.data.feedbackTabTitle != null) {
                    vue.feedbackTabTitle = response.data.feedbackTabTitle;
                }
            } else {
                vue.$message({
                    message: '加载路线反馈数据失败',
                    type: 'error'
                });
            }
        }),
            axios.get('../../feedback/feedbackType/list/' + 2).then(function (response) {
                if (response.data.code == 0) {
                    vue.feedbackType = response.data.feedbackType
                } else {
                    vue.$message({
                        message: '加载路线反馈数据失败',
                        type: 'error'
                    });
                }
            })
    }
})