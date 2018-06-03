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
            options4UserTendencyChart: {
                title: {
                    text: '新增用户趋势图'
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
                    data: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
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
            options4EquipmentTendencyChart: {
                title: {
                    text: '新增终端趋势图'
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
                    data: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
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
            options4ActiveUserTendencyChart: {
                title: {
                    text: '活跃用户趋势图'
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
                    data: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
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
            options4ActiveEquipmentTendencyChart: {
                title: {
                    text: '活跃终端趋势图'
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
                    data: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
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
            }
        }
    },
    computed: {
        statisticsDateTime: function () {
            if (this.dayGeneralSituations != null && this.dayGeneralSituations.length != 0) {
                return this.dayGeneralSituations[0].statisticsDay + ' ' + this.dayGeneralSituations[0].newestHour + ':00:00'
            }
        },
        newUser: function () {
            if (this.dayGeneralSituations != null && this.dayGeneralSituations.length != 0) {
                if (this.dayGeneralSituations.length === 2) {
                    // 有根据值查询
                    return this.dayGeneralSituations[0].newUser + '/' + this.dayGeneralSituations[1].newUser;
                } else {
                    return (this.dayGeneralSituations[0].newUser + this.dayGeneralSituations[1].newUser) + '/' + (this.dayGeneralSituations[2].newUser + this.dayGeneralSituations[3].newUser);
                }
            }
        },
        totalUser: function () {
            if (this.dayGeneralSituations != null && this.dayGeneralSituations.length != 0) {
                if (this.dayGeneralSituations.length === 2) {
                    // 有根据值查询
                    return this.dayGeneralSituations[0].totalUser + '/' + this.dayGeneralSituations[1].totalUser;
                } else {
                    return (this.dayGeneralSituations[0].totalUser + this.dayGeneralSituations[1].totalUser) + '/' + (this.dayGeneralSituations[2].totalUser + this.dayGeneralSituations[3].totalUser);
                }
            }
        },
        newEquipment: function () {
            if (this.dayGeneralSituations != null && this.dayGeneralSituations.length != 0) {
                if (this.dayGeneralSituations.length === 2) {
                    // 有根据值查询
                    return this.dayGeneralSituations[0].newEquipment + '/' + this.dayGeneralSituations[1].newEquipment;
                } else {
                    return (this.dayGeneralSituations[0].newEquipment + this.dayGeneralSituations[1].newEquipment) + '/' + (this.dayGeneralSituations[2].newEquipment + this.dayGeneralSituations[3].newEquipment);
                }
            }
        },
        totalEquipment: function () {
            if (this.dayGeneralSituations != null && this.dayGeneralSituations.length != 0) {
                if (this.dayGeneralSituations.length === 2) {
                    // 有根据值查询
                    return this.dayGeneralSituations[0].totalEquipment + '/' + this.dayGeneralSituations[1].totalEquipment;
                } else {
                    return (this.dayGeneralSituations[0].totalEquipment + this.dayGeneralSituations[1].totalEquipment) + '/' + (this.dayGeneralSituations[2].totalEquipment + this.dayGeneralSituations[3].totalEquipment);
                }
            }
        },
        activeUser: function () {
            if (this.dayGeneralSituations != null && this.dayGeneralSituations.length != 0) {
                if (this.dayGeneralSituations.length === 2) {
                    // 有根据值查询
                    return this.dayGeneralSituations[0].activeUser + '/' + this.dayGeneralSituations[1].activeUser;
                } else {
                    return (this.dayGeneralSituations[0].activeUser + this.dayGeneralSituations[1].activeUser) + '/' + (this.dayGeneralSituations[2].activeUser + this.dayGeneralSituations[3].activeUser);
                }
            }
        },
        activeEquipment: function () {
            if (this.dayGeneralSituations != null && this.dayGeneralSituations.length != 0) {
                if (this.dayGeneralSituations.length === 2) {
                    // 有根据值查询
                    return this.dayGeneralSituations[0].activeEquipment + '/' + this.dayGeneralSituations[1].activeEquipment;
                } else {
                    return (this.dayGeneralSituations[0].activeEquipment + this.dayGeneralSituations[1].activeEquipment) + '/' + (this.dayGeneralSituations[2].activeEquipment + this.dayGeneralSituations[3].activeEquipment);
                }
            }
        },
        totalAccess: function () {
            if (this.dayGeneralSituations != null && this.dayGeneralSituations.length != 0) {
                if (this.dayGeneralSituations.length === 2) {
                    // 有根据值查询
                    return this.dayGeneralSituations[0].totalAccess + '/' + this.dayGeneralSituations[1].totalAccess;
                } else {
                    return (this.dayGeneralSituations[0].totalAccess + this.dayGeneralSituations[1].totalAccess) + '/' + (this.dayGeneralSituations[2].totalAccess + this.dayGeneralSituations[3].totalAccess);
                }
            }
        },
        usingTime: function () {
            if (this.dayGeneralSituations != null && this.dayGeneralSituations.length != 0) {
                if (this.dayGeneralSituations.length === 2) {
                    // 有根据值查询
                    return this.dayGeneralSituations[0].usingTime + '/' + this.dayGeneralSituations[1].usingTime;
                } else {
                    return (this.dayGeneralSituations[0].usingTime + this.dayGeneralSituations[1].usingTime) + '/' + (this.dayGeneralSituations[2].usingTime + this.dayGeneralSituations[3].usingTime);
                }
            }
        }
    },
    methods: {
        handleEquipmentChange: function (val) {
            this.dayGeneralSituations = null;
            var params = {devType: val, timeCondition: 1}
            axios.post('../../userGeneralSituation/dayGeneralSituation', params).then(function (response) {
                if (response.data.code === 0) {
                    vue.dayGeneralSituations = response.data.dayGeneralSituations;
                } else {
                    vue.$message({
                        message: '加载数据失败',
                        type: 'error'
                    });
                }
            });
        },
        handleUserTendencyClick: function (params) {
        },
        handleConstantStatistics: function (val) {
            // 隐藏自定义查询条件
            vue.selfDefine = false;
            vue.query.startTime = null;
            vue.query.endTime = null;
            var urlUser = '../../userGeneralSituation/userTendency/' + val;
            var urlEquipment = '../../userGeneralSituation/equipmentTendency/' + val;
            var urlActiveUser = '../../userGeneralSituation/activeUserTendency/' + val;
            var urlActiveEquipment = '../../userGeneralSituation/activeEquipmentTendency/' + val;
            // 加载新增用户趋势数据
            axios.get(urlUser).then(function (response) {
                if (response.data.code === 0) {
                    var userTendency = response.data.userTendency;
                    var length = userTendency.length;
                    var index = length / 2;
                    var android = new Array();
                    var ios = new Array();
                    var total = new Array();
                    var xAxis = new Array();
                    for (var i = 0; i < index; i++) {
                        android.push(userTendency[i].quantity);
                        ios.push(userTendency[index + i].quantity);
                        total.push(userTendency[i].quantity + userTendency[index + i].quantity);
                        xAxis.push(userTendency[i].statisticsDay);
                    }
                    vue.options4UserTendencyChart.series[0].data = android;
                    vue.options4UserTendencyChart.series[1].data = ios;
                    vue.options4UserTendencyChart.series[2].data = total;
                    if (val !== 1) {
                        vue.options4UserTendencyChart.xAxis.data = xAxis;
                    }
                } else {
                    vue.$message({
                        message: '加载新增用户趋势数据失败',
                        type: 'error'
                    });
                }
            });
            // 加载新增终端趋势数据
            axios.get(urlEquipment).then(function (response) {
                if (response.data.code === 0) {
                    var equipmentTendency = response.data.equipmentTendency;
                    var length = equipmentTendency.length;
                    var index = length / 2;
                    var android = new Array();
                    var ios = new Array();
                    var total = new Array();
                    var xAxis = new Array();
                    for (var i = 0; i < index; i++) {
                        android.push(equipmentTendency[i].quantity);
                        ios.push(equipmentTendency[index + i].quantity);
                        total.push(equipmentTendency[i].quantity + equipmentTendency[index + i].quantity);
                        xAxis.push(equipmentTendency[i].statisticsDay);
                    }
                    vue.options4EquipmentTendencyChart.series[0].data = android;
                    vue.options4EquipmentTendencyChart.series[1].data = ios;
                    vue.options4EquipmentTendencyChart.series[2].data = total;
                    if (val !== 1) {
                        vue.options4EquipmentTendencyChart.xAxis.data = xAxis;
                    }
                } else {
                    vue.$message({
                        message: '加载新增终端趋势数据失败',
                        type: 'error'
                    });
                }
            });
            // 加载活跃用户趋势数据
            axios.get(urlActiveUser).then(function (response) {
                if (response.data.code === 0) {
                    var activeUserTendency = response.data.activeUserTendency;
                    var length = activeUserTendency.length;
                    var index = length / 2;
                    var android = new Array();
                    var ios = new Array();
                    var total = new Array();
                    var xAxis = new Array();
                    for (var i = 0; i < index; i++) {
                        android.push(activeUserTendency[i].quantity);
                        ios.push(activeUserTendency[index + i].quantity);
                        total.push(activeUserTendency[i].quantity + activeUserTendency[index + i].quantity);
                        xAxis.push(activeUserTendency[i].statisticsDay);
                    }
                    vue.options4ActiveUserTendencyChart.series[0].data = android;
                    vue.options4ActiveUserTendencyChart.series[1].data = ios;
                    vue.options4ActiveUserTendencyChart.series[2].data = total;
                    if (val !== 1) {
                        vue.options4ActiveUserTendencyChart.xAxis.data = xAxis;
                    }
                } else {
                    vue.$message({
                        message: '加载活跃用户趋势数据失败',
                        type: 'error'
                    });
                }
            });
            // 加载活跃终端趋势数据
            axios.get(urlActiveEquipment).then(function (response) {
                if (response.data.code === 0) {
                    var activeEquipmentTendency = response.data.activeEquipmentTendency;
                    var length = activeEquipmentTendency.length;
                    var index = length / 2;
                    var android = new Array();
                    var ios = new Array();
                    var total = new Array();
                    var xAxis = new Array();
                    for (var i = 0; i < index; i++) {
                        android.push(activeEquipmentTendency[i].quantity);
                        ios.push(activeEquipmentTendency[index + i].quantity);
                        total.push(activeEquipmentTendency[i].quantity + activeEquipmentTendency[index + i].quantity);
                        xAxis.push(activeEquipmentTendency[i].statisticsDay);
                    }
                    vue.options4ActiveEquipmentTendencyChart.series[0].data = android;
                    vue.options4ActiveEquipmentTendencyChart.series[1].data = ios;
                    vue.options4ActiveEquipmentTendencyChart.series[2].data = total;
                    if (val !== 1) {
                        vue.options4ActiveEquipmentTendencyChart.xAxis.data = xAxis;
                    }
                } else {
                    vue.$message({
                        message: '加载活跃终端趋势数据失败',
                        type: 'error'
                    });
                }
            });
            if (val === 1) {
                // 统计今日
                var xAxis = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
                vue.options4UserTendencyChart.xAxis.data = xAxis;
                vue.options4EquipmentTendencyChart.xAxis.data = xAxis;
                vue.options4ActiveUserTendencyChart.xAxis.data = xAxis;
                vue.options4ActiveEquipmentTendencyChart.xAxis.data = xAxis;
            }
        },
        handleToday: function () {
            vue.handleConstantStatistics(1);
        },
        handleWeek: function () {
            vue.handleConstantStatistics(2);
        },
        handleThirty: function () {
            vue.handleConstantStatistics(3);
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
            axios.post('../../userGeneralSituation/userTendency4Self', params).then(function (response) {
                if (response.data.code === 0) {
                    var userTendency = response.data.userTendency;
                    var length = userTendency.length;
                    var index = length / 2;
                    var android = new Array();
                    var ios = new Array();
                    var total = new Array();
                    var xAxis = new Array();
                    for (var i = 0; i < index; i++) {
                        android.push(userTendency[i].quantity);
                        ios.push(userTendency[index + i].quantity);
                        total.push(userTendency[i].quantity + userTendency[index + i].quantity);
                        xAxis.push(userTendency[i].statisticsDay);
                    }
                    vue.options4UserTendencyChart.series[0].data = android;
                    vue.options4UserTendencyChart.series[1].data = ios;
                    vue.options4UserTendencyChart.series[2].data = total;
                    vue.options4UserTendencyChart.xAxis.data = xAxis;
                } else {
                    vue.$message({
                        message: '加载今日概况数据失败',
                        type: 'error'
                    });
                }
            });
            // 加载新增终端趋势数据
            axios.post('../../userGeneralSituation/equipmentTendency4Self', params).then(function (response) {
                if (response.data.code === 0) {
                    var equipmentTendency = response.data.equipmentTendency;
                    var length = equipmentTendency.length;
                    var index = length / 2;
                    var android = new Array();
                    var ios = new Array();
                    var total = new Array();
                    var xAxis = new Array();
                    for (var i = 0; i < index; i++) {
                        android.push(equipmentTendency[i].quantity);
                        ios.push(equipmentTendency[index + i].quantity);
                        total.push(equipmentTendency[i].quantity + equipmentTendency[index + i].quantity);
                        xAxis.push(equipmentTendency[i].statisticsDay);
                    }
                    vue.options4EquipmentTendencyChart.series[0].data = android;
                    vue.options4EquipmentTendencyChart.series[1].data = ios;
                    vue.options4EquipmentTendencyChart.series[2].data = total;
                    vue.options4EquipmentTendencyChart.xAxis.data = xAxis;
                } else {
                    vue.$message({
                        message: '加载新增终端趋势数据失败',
                        type: 'error'
                    });
                }
            });
            // 加载活跃用户趋势数据
            axios.post('../../userGeneralSituation/activeUserTendency4Self', params).then(function (response) {
                if (response.data.code === 0) {
                    var activeUserTendency = response.data.activeUserTendency;
                    var length = activeUserTendency.length;
                    var index = length / 2;
                    var android = new Array();
                    var ios = new Array();
                    var total = new Array();
                    var xAxis = new Array();
                    for (var i = 0; i < index; i++) {
                        android.push(activeUserTendency[i].quantity);
                        ios.push(activeUserTendency[index + i].quantity);
                        total.push(activeUserTendency[i].quantity + activeUserTendency[index + i].quantity);
                        xAxis.push(activeUserTendency[i].statisticsDay);
                    }
                    vue.options4ActiveUserTendencyChart.series[0].data = android;
                    vue.options4ActiveUserTendencyChart.series[1].data = ios;
                    vue.options4ActiveUserTendencyChart.series[2].data = total;
                    vue.options4ActiveUserTendencyChart.xAxis.data = xAxis;
                } else {
                    vue.$message({
                        message: '加载活跃用户趋势数据失败',
                        type: 'error'
                    });
                }
            });
            // 加载活跃终端趋势数据
            axios.post('../../userGeneralSituation/activeEquipmentTendency4Self', params).then(function (response) {
                if (response.data.code === 0) {
                    var activeEquipmentTendency = response.data.activeEquipmentTendency;
                    var length = activeEquipmentTendency.length;
                    var index = length / 2;
                    var android = new Array();
                    var ios = new Array();
                    var total = new Array();
                    var xAxis = new Array();
                    for (var i = 0; i < index; i++) {
                        android.push(activeEquipmentTendency[i].quantity);
                        ios.push(activeEquipmentTendency[index + i].quantity);
                        total.push(activeEquipmentTendency[i].quantity + activeEquipmentTendency[index + i].quantity);
                        xAxis.push(activeEquipmentTendency[i].statisticsDay);
                    }
                    vue.options4ActiveEquipmentTendencyChart.series[0].data = android;
                    vue.options4ActiveEquipmentTendencyChart.series[1].data = ios;
                    vue.options4ActiveEquipmentTendencyChart.series[2].data = total;
                    vue.options4ActiveEquipmentTendencyChart.xAxis.data = xAxis;
                } else {
                    vue.$message({
                        message: '加载活跃终端趋势数据失败',
                        type: 'error'
                    });
                }
            });
        }
    },
    created: function () {
        // 加载今日概况数据
        var params = {devType: null, timeCondition: 1}
        axios.post('../../userGeneralSituation/dayGeneralSituation', params).then(function (response) {
            if (response.data.code === 0) {
                vue.dayGeneralSituations = response.data.dayGeneralSituations;
            } else {
                vue.$message({
                    message: '加载今日概况数据失败',
                    type: 'error'
                });
            }
        });
        // 加载新增用户趋势数据
        axios.get('../../userGeneralSituation/userTendency/1').then(function (response) {
            if (response.data.code === 0) {
                var userTendency = response.data.userTendency;
                var length = userTendency.length;
                var index = length / 2;
                var android = new Array();
                var ios = new Array();
                var total = new Array();
                for (var i = 0; i < index; i++) {
                    android.push(userTendency[i].quantity);
                    ios.push(userTendency[index + i].quantity);
                    total.push(userTendency[i].quantity + userTendency[index + i].quantity);
                }
                vue.options4UserTendencyChart.series[0].data = android;
                vue.options4UserTendencyChart.series[1].data = ios;
                vue.options4UserTendencyChart.series[2].data = total;
            } else {
                vue.$message({
                    message: '加载新增用户趋势数据失败',
                    type: 'error'
                });
            }
        });
        // 加载新增终端趋势数据
        axios.get('../../userGeneralSituation/equipmentTendency/1').then(function (response) {
            if (response.data.code === 0) {
                var equipmentTendency = response.data.equipmentTendency;
                var length = equipmentTendency.length;
                var index = length / 2;
                var android = new Array();
                var ios = new Array();
                var total = new Array();
                for (var i = 0; i < index; i++) {
                    android.push(equipmentTendency[i].quantity);
                    ios.push(equipmentTendency[index + i].quantity);
                    total.push(equipmentTendency[i].quantity + equipmentTendency[index + i].quantity);
                }
                vue.options4EquipmentTendencyChart.series[0].data = android;
                vue.options4EquipmentTendencyChart.series[1].data = ios;
                vue.options4EquipmentTendencyChart.series[2].data = total;
            } else {
                vue.$message({
                    message: '加载新增终端趋势数据失败',
                    type: 'error'
                });
            }
        });
        // 加载活跃用户趋势数据
        axios.get('../../userGeneralSituation/activeUserTendency/1').then(function (response) {
            if (response.data.code === 0) {
                var activeUserTendency = response.data.activeUserTendency;
                var length = activeUserTendency.length;
                var index = length / 2;
                var android = new Array();
                var ios = new Array();
                var total = new Array();
                for (var i = 0; i < index; i++) {
                    android.push(activeUserTendency[i].quantity);
                    ios.push(activeUserTendency[index + i].quantity);
                    total.push(activeUserTendency[i].quantity + activeUserTendency[index + i].quantity);
                }
                vue.options4ActiveUserTendencyChart.series[0].data = android;
                vue.options4ActiveUserTendencyChart.series[1].data = ios;
                vue.options4ActiveUserTendencyChart.series[2].data = total;
            } else {
                vue.$message({
                    message: '加载活跃用户趋势数据失败',
                    type: 'error'
                });
            }
        });
        // 加载活跃终端趋势数据
        axios.get('../../userGeneralSituation/activeEquipmentTendency/1').then(function (response) {
            if (response.data.code === 0) {
                var activeEquipmentTendency = response.data.activeEquipmentTendency;
                var length = activeEquipmentTendency.length;
                var index = length / 2;
                var android = new Array();
                var ios = new Array();
                var total = new Array();
                for (var i = 0; i < index; i++) {
                    android.push(activeEquipmentTendency[i].quantity);
                    ios.push(activeEquipmentTendency[index + i].quantity);
                    total.push(activeEquipmentTendency[i].quantity + activeEquipmentTendency[index + i].quantity);
                }
                vue.options4ActiveEquipmentTendencyChart.series[0].data = android;
                vue.options4ActiveEquipmentTendencyChart.series[1].data = ios;
                vue.options4ActiveEquipmentTendencyChart.series[2].data = total;
            } else {
                vue.$message({
                    message: '加载活跃设备趋势数据失败',
                    type: 'error'
                });
            }
        });
    }
});