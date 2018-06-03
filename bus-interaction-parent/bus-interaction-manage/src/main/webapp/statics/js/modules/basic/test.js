Vue.component('chart', VueECharts)

var colorList = [
    '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
    '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0'
];
var itemStyle = {
    normal: {}
};
var idx = 1;
var vue = new Vue({
    el: "#statistic",
    data: {

        showList: true,
        channel: null,
        code: null,
        currentPage: 1,
        pageSize: 10,
        multipleSelection: [],
        total: 0,
        title: null,
        idx: 1,
        option: {
            title: {
                text: '路单数目统计',
                subtext: '采气一厂'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['用车数目', '拉运量']
            },
            toolbox: {
                show: true,
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '用车数目',
                    type: 'bar',
                    data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                },
                {
                    name: '拉运量',
                    type: 'bar',
                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                    markPoint: {
                        data: [
                            {name: '年最高', value: 182.2, xAxis: 7, yAxis: 183, symbolSize: 18},
                            {name: '年最低', value: 2.3, xAxis: 11, yAxis: 3}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                }
            ]
        },


        optiontwo: {
            timeline: {
                data: [
                    '2017-01-01', '2017-02-01', '2017-03-01', '2017-04-01', '2017-05-01',
                    {name: '2017-06-01', symbol: 'emptyStar6', symbolSize: 8},
                    '2017-07-01', '2017-08-01', '2017-09-01', '2017-10-01', '2017-11-01',
                    {name: '2017-12-01', symbol: 'star6', symbolSize: 8}
                ],
                label: {
                    formatter: function (s) {
                        var date = new Date(s);
                        var year = date.getFullYear();
                        var month = date.getMonth() + 1;
                        var day = date.getDate();
                        return month + '-' + day;
                    }
                }
            },
            options: [
                {
                    title: {
                        text: '用车类型占比变化',
                        subtext: '采气一厂'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        data: ['甲醇罐车', '货卡', '地层水罐车', '炮车', '吊车']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {
                                show: true,
                                type: ['pie', 'funnel'],
                                option: {
                                    funnel: {
                                        x: '25%',
                                        width: '50%',
                                        funnelAlign: 'left',
                                        max: 1700
                                    }
                                }
                            },
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    series: [
                        {
                            name: '用车数目类型占比',
                            type: 'pie',
                            center: ['50%', '45%'],
                            radius: '50%',
                            data: [
                                {value: idx * 128 + 80, name: '甲醇罐车'},
                                {value: idx * 64 + 160, name: '货卡'},
                                {value: idx * 32 + 320, name: '地层水罐车'},
                                {value: idx * 16 + 640, name: '炮车'},
                                {value: idx++ * 8 + 1280, name: '吊车'}
                            ]
                        }
                    ]
                },
                {
                    series: [
                        {
                            name: '用车数目类型占比',
                            type: 'pie',
                            data: [
                                {value: idx * 128 + 80, name: '甲醇罐车'},
                                {value: idx * 64 + 160, name: '货卡'},
                                {value: idx * 32 + 320, name: '地层水罐车'},
                                {value: idx * 16 + 640, name: '炮车'},
                                {value: idx++ * 8 + 1280, name: '吊车'}
                            ]
                        }
                    ]
                },
                {
                    series: [
                        {
                            name: '用车数目类型占比',
                            type: 'pie',
                            data: [
                                {value: idx * 128 + 80, name: '甲醇罐车'},
                                {value: idx * 64 + 160, name: '货卡'},
                                {value: idx * 32 + 320, name: '地层水罐车'},
                                {value: idx * 16 + 640, name: '炮车'},
                                {value: idx++ * 8 + 1280, name: '吊车'}
                            ]
                        }
                    ]
                },
                {
                    series: [
                        {
                            name: '用车数目类型占比',
                            type: 'pie',
                            data: [
                                {value: idx * 128 + 80, name: '甲醇罐车'},
                                {value: idx * 64 + 160, name: '货卡'},
                                {value: idx * 32 + 320, name: '地层水罐车'},
                                {value: idx * 16 + 640, name: '炮车'},
                                {value: idx++ * 8 + 1280, name: '吊车'}
                            ]
                        }
                    ]
                },
                {
                    series: [
                        {
                            name: '用车数目类型占比',
                            type: 'pie',
                            data: [
                                {value: idx * 128 + 80, name: '甲醇罐车'},
                                {value: idx * 64 + 160, name: '货卡'},
                                {value: idx * 32 + 320, name: '地层水罐车'},
                                {value: idx * 16 + 640, name: '炮车'},
                                {value: idx++ * 8 + 1280, name: '吊车'}
                            ]
                        }
                    ]
                },
                {
                    series: [
                        {
                            name: '用车数目类型占比',
                            type: 'pie',
                            data: [
                                {value: idx * 128 + 80, name: '甲醇罐车'},
                                {value: idx * 64 + 160, name: '货卡'},
                                {value: idx * 32 + 320, name: '地层水罐车'},
                                {value: idx * 16 + 640, name: '炮车'},
                                {value: idx++ * 8 + 1280, name: '吊车'}
                            ]
                        }
                    ]
                },
                {
                    series: [
                        {
                            name: '用车数目类型占比',
                            type: 'pie',
                            data: [
                                {value: idx * 128 + 80, name: '甲醇罐车'},
                                {value: idx * 64 + 160, name: '货卡'},
                                {value: idx * 32 + 320, name: '地层水罐车'},
                                {value: idx * 16 + 640, name: '炮车'},
                                {value: idx++ * 8 + 1280, name: '吊车'}
                            ]
                        }
                    ]
                },
                {
                    series: [
                        {
                            name: '用车数目类型占比',
                            type: 'pie',
                            data: [
                                {value: idx * 128 + 80, name: '甲醇罐车'},
                                {value: idx * 64 + 160, name: '货卡'},
                                {value: idx * 32 + 320, name: '地层水罐车'},
                                {value: idx * 16 + 640, name: '炮车'},
                                {value: idx++ * 8 + 1280, name: '吊车'}
                            ]
                        }
                    ]
                },
                {
                    series: [
                        {
                            name: '用车数目类型占比',
                            type: 'pie',
                            data: [
                                {value: idx * 128 + 80, name: '甲醇罐车'},
                                {value: idx * 64 + 160, name: '货卡'},
                                {value: idx * 32 + 320, name: '地层水罐车'},
                                {value: idx * 16 + 640, name: '炮车'},
                                {value: idx++ * 8 + 1280, name: '吊车'}
                            ]
                        }
                    ]
                },
                {
                    series: [
                        {
                            name: '用车数目类型占比',
                            type: 'pie',
                            data: [
                                {value: idx * 128 + 80, name: '甲醇罐车'},
                                {value: idx * 64 + 160, name: '货卡'},
                                {value: idx * 32 + 320, name: '地层水罐车'},
                                {value: idx * 16 + 640, name: '炮车'},
                                {value: idx++ * 8 + 1280, name: '吊车'}
                            ]
                        }
                    ]
                },
                {
                    series: [
                        {
                            name: '用车数目类型占比',
                            type: 'pie',
                            data: [
                                {value: idx * 128 + 80, name: '甲醇罐车'},
                                {value: idx * 64 + 160, name: '货卡'},
                                {value: idx * 32 + 320, name: '地层水罐车'},
                                {value: idx * 16 + 640, name: '炮车'},
                                {value: idx++ * 8 + 1280, name: '吊车'}
                            ]
                        }
                    ]
                },
                {
                    series: [
                        {
                            name: '用车数目类型占比',
                            type: 'pie',
                            data: [
                                {value: idx * 128 + 80, name: '甲醇罐车'},
                                {value: idx * 64 + 160, name: '货卡'},
                                {value: idx * 32 + 320, name: '地层水罐车'},
                                {value: idx * 16 + 640, name: '炮车'},
                                {value: idx++ * 8 + 1280, name: '吊车'}
                            ]
                        }
                    ]
                }
            ]
        },
        optionthree: {
            title: {
                text: '2014-2017年路单金额构成',
                subtext: '',
                sublink: 'http://data.stats.gov.cn/search/keywordlist2?keyword=%E5%9F%8E%E9%95%87%E5%B1%85%E6%B0%91%E6%B6%88%E8%B4%B9'
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(255,255,255,0.7)',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function (params) {
                    // for text color
                    var color = colorList[params[0].dataIndex];
                    var res = '<div style="color:' + color + '">';
                    res += '<strong>' + params[0].name + '金额（元）</strong>'
                    for (var i = 0, l = params.length; i < l; i++) {
                        res += '<br/>' + params[i].seriesName + ' : ' + params[i].value
                    }
                    res += '</div>';
                    return res;
                }
            },
            legend: {
                x: 'right',
                data: ['2014', '2015', '2016', '2017']
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                y: 'center',
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            calculable: true,
            grid: {
                y: 80,
                y2: 40,
                x2: 40
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['总用车', '甲醇罐车', '货卡', '地层水罐车', '炮车', '吊车']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '2014',
                    type: 'bar',
                    itemStyle: itemStyle,
                    data: [39300, 15000, 3000, 13500, 4800, 3000]
                },
                {
                    name: '2015',
                    type: 'bar',
                    itemStyle: itemStyle,
                    data: [48900, 18000, 4500, 16500, 5400, 4500]
                },
                {
                    name: '2016',
                    type: 'bar',
                    itemStyle: itemStyle,
                    data: [54900, 19500, 5400, 18000, 6000, 6000]
                },
                {
                    name: '2017',
                    type: 'bar',
                    itemStyle: itemStyle,
                    data: [64500, 21000, 5400, 2100, 6600, 10500]
                }
            ]
        },
        checkedBsBus: [],
    },
    methods: {},

    created: function () {

        vue.option.series[0].date;
        vue.option.series[1].date;

    }

});
