Vue.component('chart', VueECharts)

var vue = new Vue({
    el: '#generalSituation',
    data: function () {
        return {
            query: {
                moduleName: "yh",
                module: "1"
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
            module: [{
                value: '1',
                label: '一周内'
            }, {
                value: '2',
                label: '一个月内'
            }, {
                value: '3',
                label: '三个月内'
            }, {
                value: '4',
                label: '一年内'
            }, {
                value: '5',
                label: '全部'
            }],
            queryData: {
                androidDay: null,
                iosDay: null,
                androidWeek: null,
                iosWeek: null,
                androidMonth: null,
                iosMonth: null,
                android3Month: null,
                ios3Month: null,
                androidYear: null,
                iosYear: null,
                androidTotal: null,
                iosTotal: null,
                statisticsDateTime: null

            },
            selfDefine: false,
            pickerOptions: {
                disabledDate: function (time) {
                    return time.getTime() > Date.now();
                }
            },
            moduleList: [{
                value: '',
                label: ''
            }],
            moduleAnalysis: null,// 默认情况查询所有的设备
            dayData: null,
            weekData: null,
            thirtyData: null,
            selfDefinitionData: null,
            optionsModuleAnalysisChart: {
                title: {
                    text: '模块统计趋势图'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['安卓', 'IOS', '合计'],
                    width: '100%'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: {readOnly: false},
                        magicType: {type: ['line', 'bar']},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: []
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '安卓',
                        type: 'line',
                        stack: '安卓总量',
                        data: null
                    },
                    {
                        name: 'IOS',
                        type: 'line',
                        stack: 'IOS总量',
                        data: null
                    },
                    {
                        name: '合计',
                        type: 'line',
                        stack: '总量',
                        data: null
                    }
                ]
            },

        }
    },
    methods: {

        handleSelfDefinition: function () {
            vue.selfDefine = true;
        },
        handleModuleClick: function () {

        },
        searchModuleAnalysis: function () {
            var params = {
                moduleName: vue.query.moduleName,
                module: vue.query.module
            }
            axios.get('../../moduleAnalysis/moduleTendency', {params}).then(function (response) {
                if (response.data.code === 0) {
                    var moduleTendency = response.data.moduleTendency;
                    var length = moduleTendency.length;
                    var index = length / 2;
                    var android = new Array();
                    var ios = new Array();
                    var total = new Array();
                    var xAxis = new Array();
                    var tmp;
                    for (var i = 0; i < index; i++) {
                        android.push(moduleTendency[i].accesscount);
                        ios.push(moduleTendency[index + i].accesscount);
                        total.push(moduleTendency[i].accesscount + moduleTendency[index + i].accesscount);
                        xAxis.push(moduleTendency[i].statDay.substr(0, 10));
                    }

                    vue.optionsModuleAnalysisChart.series[0].data = android;
                    vue.optionsModuleAnalysisChart.series[1].data = ios;
                    vue.optionsModuleAnalysisChart.series[2].data = total;
                    vue.optionsModuleAnalysisChart.xAxis.data = xAxis;
                } else {
                    vue.$message({
                        message: '加载今日概况数据失败',
                        type: 'error'
                    });
                }
            });
        }
    },
    created: function () {
        // 加载今日概况数据
        axios.post('../../moduleAnalysis/moduleTimeAllList').then(function (response) {
            if (response.data.code === 0) {
                vue.moduleAnalysis = response.data.moduleAnalysis;
                for (var i = 0; i < vue.moduleAnalysis.length; i++) {
                    if (vue.moduleAnalysis[i].dayType == 1 && vue.moduleAnalysis[i].devType == 0) {
                        vue.queryData.androidDay = vue.moduleAnalysis[i].accessCount
                        if (vue.moduleAnalysis[i].accessCount == null || vue.moduleAnalysis[i].accessCount == '') {
                            vue.queryData.androidDay = 0;
                        }
                    }
                    if (vue.moduleAnalysis[i].dayType == 1 && vue.moduleAnalysis[i].devType == 1) {
                        vue.queryData.iosDay = vue.moduleAnalysis[i].accessCount;
                        if (vue.moduleAnalysis[i].accessCount == null || vue.moduleAnalysis[i].accessCount == '') {
                            vue.queryData.iosDay = 0;
                        }
                    }
                    if (vue.moduleAnalysis[i].dayType == 2 && vue.moduleAnalysis[i].devType == 0) {
                        vue.queryData.androidWeek = vue.moduleAnalysis[i].accessCount;
                        if (vue.moduleAnalysis[i].accessCount == null || vue.moduleAnalysis[i].accessCount == '') {
                            vue.queryData.androidWeek = 0;
                        }
                    }

                    if (vue.moduleAnalysis[i].dayType == 2 && vue.moduleAnalysis[i].devType == 1) {
                        vue.queryData.iosWeek = vue.moduleAnalysis[i].accessCount;
                        if (vue.moduleAnalysis[i].accessCount == null || vue.moduleAnalysis[i].accessCount == '') {
                            vue.queryData.iosWeek = 0;
                        }
                    }
                    if (vue.moduleAnalysis[i].dayType == 3 && vue.moduleAnalysis[i].devType == 0) {
                        vue.queryData.androidMonth = vue.moduleAnalysis[i].accessCount
                    }
                    if (vue.moduleAnalysis[i].dayType == 3 && vue.moduleAnalysis[i].devType == 1) {
                        vue.queryData.iosMonth = vue.moduleAnalysis[i].accessCount
                    }
                    if (vue.moduleAnalysis[i].dayType == 4 && vue.moduleAnalysis[i].devType == 0) {
                        vue.queryData.android3Month = vue.moduleAnalysis[i].accessCount
                    }
                    if (vue.moduleAnalysis[i].dayType == 4 && vue.moduleAnalysis[i].devType == 1) {
                        vue.queryData.ios3Month = vue.moduleAnalysis[i].accessCount
                    }
                    if (vue.moduleAnalysis[i].dayType == 5 && vue.moduleAnalysis[i].devType == 0) {
                        vue.queryData.androidYear = vue.moduleAnalysis[i].accessCount
                    }
                    if (vue.moduleAnalysis[i].dayType == 5 && vue.moduleAnalysis[i].devType == 1) {
                        vue.queryData.iosYear = vue.moduleAnalysis[i].accessCount
                    }
                    if (vue.moduleAnalysis[i].dayType == 6 && vue.moduleAnalysis[i].devType == 0) {
                        vue.queryData.androidTotal = vue.moduleAnalysis[i].accessCount
                    }
                    if (vue.moduleAnalysis[i].dayType == 6 && vue.moduleAnalysis[i].devType == 1) {
                        vue.queryData.iosTotal = vue.moduleAnalysis[i].accessCount
                    }

                }
                vue.queryData.statisticsDateTime = vue.moduleAnalysis[1].statisticsDay.substr(0, 10)
            } else {
                vue.$message({
                    message: '加载今日概况数据失败',
                    type: 'error'
                });
            }
        }),
            axios.get('../../moduleAnalysis/moduleTendency', {
                params: {module: "1", moduleName: "yh"}
            }).then(function (response) {
                if (response.data.code === 0) {
                    var moduleTendency = response.data.moduleTendency;
                    var length = moduleTendency.length;
                    var index = length / 2;
                    var android = new Array();
                    var ios = new Array();
                    var total = new Array();
                    var xAxis = new Array();
                    for (var i = 0; i < index; i++) {
                        android.push(moduleTendency[i].accesscount);
                        ios.push(moduleTendency[index + i].accesscount);
                        total.push(moduleTendency[i].accesscount + moduleTendency[index + i].accesscount);
                        xAxis.push(moduleTendency[i].statDay.substr(0, 10));
                    }
                    vue.optionsModuleAnalysisChart.series[0].data = android;
                    vue.optionsModuleAnalysisChart.series[1].data = ios;
                    vue.optionsModuleAnalysisChart.series[2].data = total;
                    vue.optionsModuleAnalysisChart.xAxis.data = xAxis;
                } else {
                    vue.$message({
                        message: '加载模块趋势数据失败',
                        type: 'error'
                    });
                }
            });
    }
});