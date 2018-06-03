Vue.component('chart', VueECharts)

var vue = new Vue({
    el: "#rycxRoute",

    data: {
        query: {
            startTime: null,
            devtype: null,
            routeid: null,
            routename: null,
        },

        queryStation: {
            startTime: null,
            devtype: null,
            stationnameid: null,
            stationname: null,
        },

        queryComment: {
            company: null,
            platenumber: null,
            driver: null,
            startTime: null,
        },

        pickerOptions: {
            disabledDate: function (time) {
                return time.getTime() > Date.now();
            }
        },
        showList: true,
        rycxRoutes: null,
        currentPage: 1,
        pageSize: 20,
        code: null,
        devTypes: [{
            value: '0',
            label: 'Android'
        }, {
            value: '1',
            label: 'iPhone'
        }],
        optionEchart: {
            title: {
                text: '线路查询top10'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function (params) {
                    var res = '';
                    var markPre = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'
                    var markSuf = '"></span>'
                    for (var i = 0; i < params.length; i++) {
                        res += markPre + params[i].color + markSuf + params[i].seriesName + ' : ' + Math.abs(params[i].value) + '次' + '</br>';
                    }
                    return res;

                }
            },
            legend: {
                data: ['Android', 'iOS']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: function (data) {
                            return (Math.abs(data));
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: 'category',
                    axisTick: {show: false},
                    data: []
                },
                {
                    type: 'category',
                    axisTick: {show: false},
                    data: []
                }
            ],
            series: [
                {
                    name: 'iOS',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    data: null,


                },
                {
                    name: 'Android',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'left',
                            formatter: function (value) {
                                return (Math.abs(value.data));
                            }
                        }
                    },
                    data: null,

                }
            ]
        },
        tabIndex: 0,

        Andriod: [],
        IOS: [],

        rycxStations: null,
        AndriodStations: [],
        IOSStations: [],
        optionEchartStation: {
            title: {
                text: '站台查询top10'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function (params) {
                    var res = '';
                    var markPre = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'
                    var markSuf = '"></span>'
                    for (var i = 0; i < params.length; i++) {
                        res += markPre + params[i].color + markSuf + params[i].seriesName + ' : ' + Math.abs(params[i].value) + '次' + '</br>';
                    }
                    return res;

                }

            },
            legend: {
                data: ['Android', 'iOS']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: function (data) {
                            return (Math.abs(data));
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: 'category',
                    axisTick: {show: false},
                    data: []
                },
                {
                    type: 'category',
                    axisTick: {show: false},
                    data: []
                }
            ],
            series: [
                {
                    name: 'iOS',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    data: null,
                },
                {
                    name: 'Android',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'left',
                            formatter: function (value) {
                                return (Math.abs(value.data));
                            }
                        }
                    },
                    data: null,
                }
            ]
        },


        optionEchartComment: {
            title: {
                text: '司机点评top10'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['Android', 'iOS']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'value'
                }
            ],
            yAxis: [
                {
                    type: 'category',
                    axisTick: {show: false},
                    data: ['第十', '第九', '第八', '第七', '第六', '第五', '第四', '第三', '第二', '第一']
                }
            ],
            series: [
                {
                    name: '司机排行',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    data: null,
                },
            ]
        },
        rycxComments: null,
        echartComment: null,


    },
    methods: {
        searchByWeekRoute: function () {
            vue.clearCondition();
            axios.post('../../statistics/rycxRouteWeek/list').then(function (response) {
                if (response.data.code === 0) {
                    vue.rycxRoutes = response.data.routes;
                    vue.Andriod = response.data.routeAndroid;
                    vue.IOS = response.data.routeIOS;
                    vue.handleControlRouteCount();
                } else {
                    vue.$message({
                        message: '加载今日概况数据失败',
                        type: 'error'
                    });
                }
            });

        },
        searchByMouthRoute: function () {
            vue.clearCondition();
            axios.post('../../statistics/rycxRouteMonth/list').then(function (response) {
                if (response.data.code === 0) {
                    vue.rycxRoutes = response.data.routes;
                    vue.Andriod = response.data.routeAndroid;
                    vue.IOS = response.data.routeIOS;
                    vue.handleControlRouteCount();
                } else {
                    vue.$message({
                        message: '加载今日概况数据失败',
                        type: 'error'
                    });
                }
            });
        },
        setTime: function (val) {
            vue.query.startTime = val;
            vue.queryStation.startTime = val;
            vue.queryComment.startTime = val;
        },
        searchRoute: function () {
            axios.get('../../statistics/rycxRoute/listRouteAll', {
                    params: {
                        devtype: vue.query.devtype,
                        routeid: vue.query.routeid,
                        routename: vue.query.routename,
                        startTime: vue.query.startTime,
                    }
                }
            ).then(function (response) {
                if (response.data.code == 0) {
                    vue.rycxRoutes = response.data.routes;
                    vue.Andriod = response.data.routeAndroid;
                    vue.IOS = response.data.routeIOS;
                    vue.handleControlRouteCount();


                } else {
                    vue.$message({
                        message: '加载系统管理员数据失败',
                        type: 'error'
                    });
                }
            })
        },
        clearCondition: function () {

            vue.query.routeid = null;
            vue.query.routename = null;
            vue.query.devtype = null;
            vue.query.startTime = null;

            vue.queryStation.stationnameid = null;
            vue.queryStation.stationname = null;
            vue.queryStation.devtype = null;
            vue.queryStation.startTime = null;

            vue.queryComment.company = null;
            vue.queryComment.platenumber = null;
            vue.queryComment.driver = null;
            vue.queryComment.startTime = null;

        },
        formatdevType: function (row, column, cellValue) {
            if (cellValue === 0) {
                return 'Android';
            } else if (cellValue === 1) {
                return 'Iphone';
            } else return;
        },
        formatDate: function (row, column, cellValue) {
            return cellValue.substr(0, 10);
        },

        handleTabClick: function (tab) {
            vue.tabIndex = tab.index;

        },
        handleControlRouteCount: function () {


            var android = new Array();
            var ios = new Array();
            var yaixsAnd = new Array();
            var yaixsIOS = new Array();
            for (var i = 9; i >= 0; i--) {
                android.push(vue.Andriod[i].num * (-1));
                yaixsAnd.push(vue.Andriod[i].routename);
            }
            for (var i = 9; i >= 0; i--) {
                ios.push(vue.IOS[i].num);
                yaixsIOS.push(vue.IOS[i].routename);
            }
            vue.optionEchart.series[1].data = android;
            vue.optionEchart.series[0].data = ios;
            vue.optionEchart.yAxis[0].data = yaixsAnd;
            vue.optionEchart.yAxis[1].data = yaixsIOS;

        },


        searchByWeekStation: function () {
            vue.clearCondition();
            axios.post('../../statistics/rycxStation/listWeek').then(function (response) {
                if (response.data.code === 0) {
                    vue.rycxStations = response.data.stations;
                    vue.AndriodStations = response.data.andriodStations;
                    vue.IOSStations = response.data.iOSStations;
                    vue.handleControlStationCount();
                } else {
                    vue.$message({
                        message: '加载今日概况数据失败',
                        type: 'error'
                    });
                }
            });
        },
        searchByMouthStation: function () {
            vue.clearCondition();
            axios.post('../../statistics/rycxStation/listMonth').then(function (response) {
                if (response.data.code === 0) {
                    vue.rycxStations = response.data.stations;
                    vue.AndriodStations = response.data.andriodStations;
                    vue.IOSStations = response.data.iOSStations;
                    vue.handleControlStationCount();
                } else {
                    vue.$message({
                        message: '加载今日概况数据失败',
                        type: 'error'
                    });
                }
            });
        },
        searchStation: function () {

            axios.get('../../statistics/rycxStation/listAll', {
                    params: {
                        devtype: vue.queryStation.devtype,
                        stationnameid: vue.queryStation.stationnameid,
                        stationname: vue.queryStation.stationname,
                        startTime: vue.queryStation.startTime
                    }
                }
            ).then(function (response) {
                if (response.data.code == 0) {
                    vue.rycxStations = response.data.stations;
                    vue.AndriodStations = response.data.andriodStations;
                    vue.IOSStations = response.data.iOSStations;
                    vue.handleControlStationCount();


                } else {
                    vue.$message({
                        message: '加载系统管理员数据失败',
                        type: 'error'
                    });
                }
            })

        },
        handleControlStationCount: function () {


            var android = new Array();
            var ios = new Array();
            var yaixsAnd = new Array();
            var yaixsIOS = new Array();
            for (var i = 9; i >= 0; i--) {
                android.push(vue.AndriodStations[i].totalnum * (-1));
                yaixsAnd.push(vue.AndriodStations[i].stationname);
            }
            for (var i = 9; i >= 0; i--) {
                ios.push(vue.IOSStations[i].totalnum);
                yaixsIOS.push(vue.IOSStations[i].stationname);
            }
            vue.optionEchartStation.series[0].data = ios;
            vue.optionEchartStation.series[1].data = android;
            vue.optionEchartStation.yAxis[0].data = yaixsAnd;
            vue.optionEchartStation.yAxis[1].data = yaixsIOS;

        },

        handleControlCommentCount: function () {
            var comment = new Array();
            for (var i = 9; i >= 0; i--) {
                comment.push(this.echartComment[i].star)
            }
            vue.optionEchartComment.series[0].data = comment;
        },
        searchByWeekComment: function () {
            axios.post('../../statistics/rycxComment/listWeek').then(function (response) {
                if (response.data.code === 0) {
                    vue.rycxComments = response.data.driverComments;
                    vue.echartComment = response.data.echartComments;
                    //  vue.handleControlCommentCount();
                } else {
                    vue.$message({
                        message: '加载今日概况数据失败',
                        type: 'error'
                    });
                }
            });
        },
        searchByMouthComment: function () {
            axios.post('../../statistics/rycxComment/listMouth').then(function (response) {
                if (response.data.code === 0) {
                    vue.clearCondition();
                    vue.rycxComments = response.data.driverComments;
                    vue.echartComment = response.data.echartComments;
                    // vue.handleControlCommentCount();
                } else {
                    vue.$message({
                        message: '加载今日概况数据失败',
                        type: 'error'
                    });
                }
            });
        },
        searchComment: function () {
            axios.get('../../statistics/rycxComment/listComment', {
                    params: {
                        company: vue.queryComment.company,
                        platenumber: vue.queryComment.platenumber,
                        driver: vue.queryComment.driver,
                        startTime: vue.queryComment.startTime,
                    }
                }
            ).then(function (response) {
                if (response.data.code == 0) {
                    vue.rycxComments = response.data.driverComments;


                } else {
                    vue.$message({
                        message: '加载系统管理员数据失败',
                        type: 'error'
                    });
                }
            })

        }


    },


    created: function () {
        // 加载线路数据
        axios.post('../../statistics/rycxRoute/list').then(function (response) {
            if (response.data.code === 0) {
                vue.rycxRoutes = response.data.routes;
                vue.Andriod = response.data.routeAndroid;
                vue.IOS = response.data.routeIOS;
                vue.handleControlRouteCount();
            } else {
                vue.$message({
                    message: '加载今日概况数据失败',
                    type: 'error'
                });
            }
        });
        // 加载站台数据
        axios.post('../../statistics/rycxStation/list').then(function (response) {
            if (response.data.code === 0) {
                vue.rycxStations = response.data.stations;
                vue.AndriodStations = response.data.andriodStations;
                vue.IOSStations = response.data.iOSStations;
                vue.handleControlStationCount();
            } else {
                vue.$message({
                    message: '加载今日概况数据失败',
                    type: 'error'
                });
            }
        });

        axios.post('../../statistics/rycxComment/list').then(function (response) {
            if (response.data.code === 0) {
                vue.rycxComments = response.data.driverComments;
                vue.echartComment = response.data.echartComments;
                vue.handleControlCommentCount();
            } else {
                vue.$message({
                    message: '加载今日概况数据失败',
                    type: 'error'
                });
            }
        });

    }


});