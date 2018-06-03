Vue.component('chart', VueECharts)

var vue = new Vue({
    el: '#generalSituation',
    data: function () {
        return {
            query: {
                equipment: '',
                startTime: null,
                endTime: null
            },
            queryIOS: {
                total4Two: null,
                total4Nine: null,
                total4Nineteen: null,
                total4Hundred: null,
                total4TwoHundred: null,
                total4FourHundred: null,
                total4Thousand: null,
                aboveThousand: null,
                accesscount: null
            },
            queryAndroid: {
                total4Two: null,
                total4Nine: null,
                total4Nineteen: null,
                total4Hundred: null,
                total4TwoHundred: null,
                total4FourHundred: null,
                total4Thousand: null,
                aboveThousand: null,
                accesscount: null
            },
            statisticsDateTime: null,
            selfDefine: false,
            pickerOptions: {
                disabledDate: function (time) {
                    return time.getTime() > Date.now();
                }
            },
            dayGeneralSituations: null,// 默认情况查询所有的设备
            dayData: null,
            weekData: null,
            thirtyData: null,
            selfDefinitionData: null,
            options4UserVisitsAnalysisChart: {
                title: {
                    text: '模块使用频率趋势图'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },

                },
                legend: {
                    data: ['1~2', '3~9', '10~19', '20~99', '100~199', '200~499', '500~999', '1000以上'],
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: []

                },

                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'android',
                        type: 'bar',
                        stack: 'android',
                        data: null
                    },
                    {
                        name: '1~2',
                        type: 'bar',
                        stack: 'android',
                        data: null
                    },
                    {
                        name: '3~9',
                        type: 'bar',
                        stack: 'android',
                        data: null
                    },
                    {
                        name: '10~19',
                        type: 'bar',
                        stack: 'android',
                        data: null
                    },
                    {
                        name: '20~99',
                        type: 'bar',
                        stack: 'android',
                        data: null
                    },

                    {
                        name: '100~199',
                        type: 'bar',
                        stack: 'android',
                        data: null
                    },
                    {
                        name: '200~499',
                        type: 'bar',
                        stack: 'android',
                        data: null
                    },
                    {
                        name: '500~999',
                        type: 'bar',
                        stack: 'android',
                        data: null
                    },
                    {
                        name: '1000以上',
                        type: 'bar',
                        stack: 'android',
                        data: null
                    },
                    {
                        name: 'IOS',
                        type: 'bar',
                        stack: 'IOS',
                        data: null
                    },
                    {
                        name: '1~2',
                        type: 'bar',
                        stack: 'IOS',
                        data: null
                    },
                    {
                        name: '3~9',
                        type: 'bar',
                        stack: 'IOS',
                        data: null
                    },
                    {
                        name: '10~19',
                        type: 'bar',
                        stack: 'IOS',
                        data: null
                    },
                    {
                        name: '20~99',
                        type: 'bar',
                        stack: 'IOS',
                        data: null
                    },

                    {
                        name: '100~199',
                        type: 'bar',
                        stack: 'IOS',
                        data: null
                    },
                    {
                        name: '200~499',
                        type: 'bar',
                        stack: 'IOS',
                        data: null
                    },
                    {
                        name: '500~999',
                        type: 'bar',
                        stack: 'IOS',
                        data: null
                    },
                    {
                        name: '1000以上',
                        type: 'bar',
                        stack: 'IOS',
                        data: null
                    }
                ]
            }
        }
    },
    methods: {
        handleConstantStatistics: function (val) {
            axios.get('../../userVisitsAnalysis/visitsTendency', {
                params: {module: val}
            }).then(function (response) {
                if (response.data.code === 0) {
                    var visitsTendency = response.data.visitsTendency;
                    var length = visitsTendency.length;
                    var index = length / 2;
                    var total4TwoAndr = new Array();
                    var total4NineAndr = new Array();
                    var total4NineteenAndr = new Array();
                    var total4HundredAndr = new Array();
                    var total4TwoHundredAndr = new Array();
                    var total4FourHundredAndr = new Array();
                    var total4ThousandAndr = new Array();
                    var aboveThousandAndr = new Array();
                    var total4TwoIOS = new Array();
                    var total4NineIOS = new Array();
                    var total4NineteenIOS = new Array();
                    var total4HundredIOS = new Array();
                    var total4TwoHundredIOS = new Array();
                    var total4FourHundredIOS = new Array();
                    var total4ThousandIOS = new Array();
                    var aboveThousandIOS = new Array();
                    var xAxis = new Array();
                    var emp = new Array();
                    for (var i = 0; i < index; i++) {
                        total4TwoAndr.push(visitsTendency[i].total4Two);
                        total4NineAndr.push(visitsTendency[i].total4Nine);
                        total4NineteenAndr.push(visitsTendency[i].total4Nineteen);
                        total4HundredAndr.push(visitsTendency[i].total4Hundred);
                        total4TwoHundredAndr.push(visitsTendency[i].total4TwoHundred);
                        total4FourHundredAndr.push(visitsTendency[i].total4FourHundred);
                        total4ThousandAndr.push(visitsTendency[i].total4Thousand);
                        aboveThousandAndr.push(visitsTendency[i].aboveThousand);
                        xAxis.push(visitsTendency[i].startDate.substr(0, 10));

                        total4TwoIOS.push(visitsTendency[index + i].total4Two);
                        total4NineIOS.push(visitsTendency[index + i].total4Nine);
                        total4NineteenIOS.push(visitsTendency[index + i].total4Nineteen);
                        total4HundredIOS.push(visitsTendency[index + i].total4Hundred);
                        total4TwoHundredIOS.push(visitsTendency[index + i].total4TwoHundred);
                        total4FourHundredIOS.push(visitsTendency[index + i].total4FourHundred);
                        total4ThousandIOS.push(visitsTendency[index + i].total4Thousand);
                        aboveThousandIOS.push(visitsTendency[index + i].aboveThousand);
                        emp.push('');
                    }

                    for (var j = 0; j < length; j++) {
                        emp.push(' ');
                    }

                    vue.options4UserVisitsAnalysisChart.series[0].data = emp;

                    vue.options4UserVisitsAnalysisChart.series[1].data = total4TwoAndr;
                    vue.options4UserVisitsAnalysisChart.series[2].data = total4NineAndr;
                    vue.options4UserVisitsAnalysisChart.series[3].data = total4NineteenAndr;
                    vue.options4UserVisitsAnalysisChart.series[4].data = total4HundredAndr;
                    vue.options4UserVisitsAnalysisChart.series[5].data = total4TwoHundredAndr;
                    vue.options4UserVisitsAnalysisChart.series[6].data = total4FourHundredAndr;
                    vue.options4UserVisitsAnalysisChart.series[7].data = total4ThousandAndr;
                    vue.options4UserVisitsAnalysisChart.series[8].data = aboveThousandAndr;

                    vue.options4UserVisitsAnalysisChart.series[9].data = emp;

                    vue.options4UserVisitsAnalysisChart.series[10].data = total4TwoIOS;
                    vue.options4UserVisitsAnalysisChart.series[11].data = total4NineIOS;
                    vue.options4UserVisitsAnalysisChart.series[12].data = total4NineteenIOS;
                    vue.options4UserVisitsAnalysisChart.series[13].data = total4HundredIOS;
                    vue.options4UserVisitsAnalysisChart.series[14].data = total4TwoHundredIOS;
                    vue.options4UserVisitsAnalysisChart.series[15].data = total4FourHundredIOS;
                    vue.options4UserVisitsAnalysisChart.series[16].data = total4ThousandIOS;
                    vue.options4UserVisitsAnalysisChart.series[17].data = aboveThousandIOS;

                    vue.options4UserVisitsAnalysisChart.xAxis.data = xAxis;
                } else {
                    vue.$message({
                        message: '加载模块趋势数据失败',
                        type: 'error'
                    });
                }
            });


        },
        handleYesterday: function () {
            vue.handleConstantStatistics(0);
        },
        handleWeek: function () {
            vue.handleConstantStatistics(1);
        },
        handleThirty: function () {
            vue.handleConstantStatistics(2);
        },
        handleSelfDefinition: function () {
            // 自定义查询
            vue.selfDefine = true;
        },
        searchBySelf: function () {
            // 判断选择的查询时间
            var startTime = vue.query.startTime;
            var endTime = vue.query.endTime;
            if (startTime == null || startTime == '') {
                vue.$message({
                    message: '开始时间不能为空',
                    type: 'warning'
                });
                return;
            }
            if (endTime == null || endTime == '') {
                vue.$message({
                    message: '结束时间不能为空',
                    type: 'warning'
                });
                return;
            }
            if (startTime > endTime) {
                vue.$message({
                    message: '开始时间不能大于结束时间',
                    type: 'warning'
                });
                return;
            }
            var params = {
                startTime: startTime.format('yyyy-MM-dd'),
                endTime: endTime.format('yyyy-MM-dd')
            }
            // 加载新增用户趋势数据
            axios.get('../../userVisitsAnalysis/visitsTendency', {params}).then(function (response) {
                if (response.data.code === 0) {
                    var visitsTendency = response.data.visitsTendency;
                    var length = visitsTendency.length;
                    var index = length / 2;
                    var total4TwoAndr = new Array();
                    var total4NineAndr = new Array();
                    var total4NineteenAndr = new Array();
                    var total4HundredAndr = new Array();
                    var total4TwoHundredAndr = new Array();
                    var total4FourHundredAndr = new Array();
                    var total4ThousandAndr = new Array();
                    var aboveThousandAndr = new Array();
                    var total4TwoIOS = new Array();
                    var total4NineIOS = new Array();
                    var total4NineteenIOS = new Array();
                    var total4HundredIOS = new Array();
                    var total4TwoHundredIOS = new Array();
                    var total4FourHundredIOS = new Array();
                    var total4ThousandIOS = new Array();
                    var aboveThousandIOS = new Array();
                    var xAxis = new Array();
                    var emp = new Array();
                    for (var i = 0; i < index; i++) {
                        total4TwoAndr.push(visitsTendency[i].total4Two);
                        total4NineAndr.push(visitsTendency[i].total4Nine);
                        total4NineteenAndr.push(visitsTendency[i].total4Nineteen);
                        total4HundredAndr.push(visitsTendency[i].total4Hundred);
                        total4TwoHundredAndr.push(visitsTendency[i].total4TwoHundred);
                        total4FourHundredAndr.push(visitsTendency[i].total4FourHundred);
                        total4ThousandAndr.push(visitsTendency[i].total4Thousand);
                        aboveThousandAndr.push(visitsTendency[i].aboveThousand);
                        xAxis.push(visitsTendency[i].startDate.substr(0, 10));

                        total4TwoIOS.push(visitsTendency[index + i].total4Two);
                        total4NineIOS.push(visitsTendency[index + i].total4Nine);
                        total4NineteenIOS.push(visitsTendency[index + i].total4Nineteen);
                        total4HundredIOS.push(visitsTendency[index + i].total4Hundred);
                        total4TwoHundredIOS.push(visitsTendency[index + i].total4TwoHundred);
                        total4FourHundredIOS.push(visitsTendency[index + i].total4FourHundred);
                        total4ThousandIOS.push(visitsTendency[index + i].total4Thousand);
                        aboveThousandIOS.push(visitsTendency[index + i].aboveThousand);
                        emp.push('');
                    }

                    for (var j = 0; j < length; j++) {
                        emp.push(' ');
                    }

                    vue.options4UserVisitsAnalysisChart.series[0].data = emp;

                    vue.options4UserVisitsAnalysisChart.series[1].data = total4TwoAndr;
                    vue.options4UserVisitsAnalysisChart.series[2].data = total4NineAndr;
                    vue.options4UserVisitsAnalysisChart.series[3].data = total4NineteenAndr;
                    vue.options4UserVisitsAnalysisChart.series[4].data = total4HundredAndr;
                    vue.options4UserVisitsAnalysisChart.series[5].data = total4TwoHundredAndr;
                    vue.options4UserVisitsAnalysisChart.series[6].data = total4FourHundredAndr;
                    vue.options4UserVisitsAnalysisChart.series[7].data = total4ThousandAndr;
                    vue.options4UserVisitsAnalysisChart.series[8].data = aboveThousandAndr;

                    vue.options4UserVisitsAnalysisChart.series[9].data = emp;

                    vue.options4UserVisitsAnalysisChart.series[10].data = total4TwoIOS;
                    vue.options4UserVisitsAnalysisChart.series[11].data = total4NineIOS;
                    vue.options4UserVisitsAnalysisChart.series[12].data = total4NineteenIOS;
                    vue.options4UserVisitsAnalysisChart.series[13].data = total4HundredIOS;
                    vue.options4UserVisitsAnalysisChart.series[14].data = total4TwoHundredIOS;
                    vue.options4UserVisitsAnalysisChart.series[15].data = total4FourHundredIOS;
                    vue.options4UserVisitsAnalysisChart.series[16].data = total4ThousandIOS;
                    vue.options4UserVisitsAnalysisChart.series[17].data = aboveThousandIOS;

                    vue.options4UserVisitsAnalysisChart.xAxis.data = xAxis;
                } else {
                    vue.$message({
                        message: '加载模块趋势数据失败',
                        type: 'error'
                    });
                }
            });

            // 加载活跃终端趋势数据

        }
    },
    created: function () {
        // 加载今日概况数据
        var params = {dayType: 2}
        axios.get('../../userVisitsAnalysis/visitsList', {params}).then(function (response) {
            if (response.data.code === 0) {
                var visitsList = response.data.visitsList;
                var index = visitsList.length;
                for (var i = 0; i < index; i++) {
                    if (visitsList[i].devType == 0) {
                        vue.queryAndroid = visitsList[i];
                    } else {
                        vue.queryIOS = visitsList[i];
                    }
                }
                vue.statisticsDateTime = visitsList[0].startDate.substr(0, 10) + "~" + visitsList[0].endDate.substr(0, 10);
            } else {
                vue.$message({
                    message: '加载今日概况数据失败',
                    type: 'error'
                });
            }
        });
        axios.get('../../userVisitsAnalysis/visitsTendency', {
            params: {module: 1}
        }).then(function (response) {
            if (response.data.code === 0) {
                var visitsTendency = response.data.visitsTendency;
                var length = visitsTendency.length;
                var index = length / 2;
                var total4TwoAndr = new Array();
                var total4NineAndr = new Array();
                var total4NineteenAndr = new Array();
                var total4HundredAndr = new Array();
                var total4TwoHundredAndr = new Array();
                var total4FourHundredAndr = new Array();
                var total4ThousandAndr = new Array();
                var aboveThousandAndr = new Array();
                var total4TwoIOS = new Array();
                var total4NineIOS = new Array();
                var total4NineteenIOS = new Array();
                var total4HundredIOS = new Array();
                var total4TwoHundredIOS = new Array();
                var total4FourHundredIOS = new Array();
                var total4ThousandIOS = new Array();
                var aboveThousandIOS = new Array();
                var xAxis = new Array();
                var emp = new Array();
                for (var i = 0; i < index; i++) {
                    total4TwoAndr.push(visitsTendency[i].total4Two);
                    total4NineAndr.push(visitsTendency[i].total4Nine);
                    total4NineteenAndr.push(visitsTendency[i].total4Nineteen);
                    total4HundredAndr.push(visitsTendency[i].total4Hundred);
                    total4TwoHundredAndr.push(visitsTendency[i].total4TwoHundred);
                    total4FourHundredAndr.push(visitsTendency[i].total4FourHundred);
                    total4ThousandAndr.push(visitsTendency[i].total4Thousand);
                    aboveThousandAndr.push(visitsTendency[i].aboveThousand);
                    xAxis.push(visitsTendency[i].startDate.substr(0, 10));

                    total4TwoIOS.push(visitsTendency[index + i].total4Two);
                    total4NineIOS.push(visitsTendency[index + i].total4Nine);
                    total4NineteenIOS.push(visitsTendency[index + i].total4Nineteen);
                    total4HundredIOS.push(visitsTendency[index + i].total4Hundred);
                    total4TwoHundredIOS.push(visitsTendency[index + i].total4TwoHundred);
                    total4FourHundredIOS.push(visitsTendency[index + i].total4FourHundred);
                    total4ThousandIOS.push(visitsTendency[index + i].total4Thousand);
                    aboveThousandIOS.push(visitsTendency[index + i].aboveThousand);
                    emp.push('');
                }

                for (var j = 0; j < length; j++) {
                    emp.push(' ');
                }

                vue.options4UserVisitsAnalysisChart.series[0].data = emp;

                vue.options4UserVisitsAnalysisChart.series[1].data = total4TwoAndr;
                vue.options4UserVisitsAnalysisChart.series[2].data = total4NineAndr;
                vue.options4UserVisitsAnalysisChart.series[3].data = total4NineteenAndr;
                vue.options4UserVisitsAnalysisChart.series[4].data = total4HundredAndr;
                vue.options4UserVisitsAnalysisChart.series[5].data = total4TwoHundredAndr;
                vue.options4UserVisitsAnalysisChart.series[6].data = total4FourHundredAndr;
                vue.options4UserVisitsAnalysisChart.series[7].data = total4ThousandAndr;
                vue.options4UserVisitsAnalysisChart.series[8].data = aboveThousandAndr;

                vue.options4UserVisitsAnalysisChart.series[9].data = emp;

                vue.options4UserVisitsAnalysisChart.series[10].data = total4TwoIOS;
                vue.options4UserVisitsAnalysisChart.series[11].data = total4NineIOS;
                vue.options4UserVisitsAnalysisChart.series[12].data = total4NineteenIOS;
                vue.options4UserVisitsAnalysisChart.series[13].data = total4HundredIOS;
                vue.options4UserVisitsAnalysisChart.series[14].data = total4TwoHundredIOS;
                vue.options4UserVisitsAnalysisChart.series[15].data = total4FourHundredIOS;
                vue.options4UserVisitsAnalysisChart.series[16].data = total4ThousandIOS;
                vue.options4UserVisitsAnalysisChart.series[17].data = aboveThousandIOS;

                vue.options4UserVisitsAnalysisChart.xAxis.data = xAxis;
            } else {
                vue.$message({
                    message: '加载模块趋势数据失败',
                    type: 'error'
                });
            }
        });

    }
});