$(function() {
    // 监控区域
    $(".monitor .tabs").on("click", "a", function() {
            $(this).addClass("active").siblings("a").removeClass("active");
            $(".monitor .content").eq($(this).index()).show().siblings(".content").hide();
        })
        // 滚动动画效果
        // 克隆列表，追加在后面 再搭配css动画
    $(".marquee-view .marquee").each(function() {
        let rows = $(this)
            .children()
            .clone();
        $(this).append(rows);
    });
    // point区域
    {
        let myChart = echarts.init(document.querySelector(".pie"))
        let option = {
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },

            series: [{

                name: "面积模式",

                type: 'pie',

                radius: ["10%", "70%"],
                // 注意颜色写的位置
                color: [
                    "#006cff",
                    "#60cda0",
                    "#ed8884",
                    "#ff9f7f",
                    "#0096ff",
                    "#9fe6b8",
                    "#32c5e9",
                    "#1d9dff"
                ],
                center: ['50%', '50%'],

                roseType: 'radius',

                data: [
                    { value: 20, name: '云南' },
                    { value: 26, name: '北京' },
                    { value: 24, name: '山东' },
                    { value: 25, name: '河北' },
                    { value: 20, name: '江苏' },
                    { value: 25, name: '浙江' },
                    { value: 30, name: '四川' },
                    { value: 42, name: '湖北' }
                ],
                label: {
                    fontSize: 10
                },
                // 修饰引导线样式
                labelLine: {
                    // 连接到图形的线长度
                    length: 6,
                    // 连接到文字的线长度
                    length2: 8
                }
            }]
        }
        myChart.setOption(option)
        window.addEventListener('resize', function() {
            myChart.resize()
        })
    }
    // user区域
    {
        let myChart = echarts.init(document.querySelector(".bar"));
        let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            // 图表边界控制
            grid: {
                top: '3%',
                right: '3%',
                bottom: '3%',
                left: '0%',
                //  图表位置紧贴画布边缘是否显示刻度以及label文字 防止坐标轴标签溢出跟grid 区域有关系
                containLabel: true,
                // 是否显示直角坐标系网格
                show: true,
                //grid 四条边框的颜色
                borderColor: 'rgba(0, 240, 255, 0.3)'
            },
            // 控制x轴
            xAxis: [{
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: false,
                    // 不显示刻度
                    show: false
                },

            }],
            // 控制y轴
            yAxis: [{
                // 使用类目，必须有data属性
                type: 'category',
                // 使用 data 中的数据设为刻度文字
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                // 刻度设置
                axisTick: {
                    // 不显示刻度
                    show: false
                },
                // y坐标轴文字标签样式设置
                axisLabel: {
                    color: '#4c9bfd'
                },
                // y坐标轴颜色设置
                axisLine: {
                    lineStyle: {
                        color: 'rgba(0, 240, 255, 0.3)',
                    }
                },
                // y轴 分割线的样式 
                splitLine: {
                    lineStyle: {
                        color: 'rgba(0, 240, 255, 0.3)'
                    }
                }
            }],
            series: [{
                name: '用户统计',
                type: 'bar',
                barWidth: '60%',
                data: [10, 52, 200, 334, 390, 330, 220]
            }],
            color: new echarts.graphic.LinearGradient(
                // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                0, 0, 0, 1, [
                    { offset: 0, color: '#00fffb' }, // 0 起始颜色
                    { offset: 1, color: '#0061ce' } // 1 结束颜色
                ]
            ),
        };

        myChart.setOption(option);
        window.addEventListener('resize', function() {
            myChart.resize()
        })

    }
    // 订单tabs
    {
        let data = {
            day365: { orders: '20,301,987', amount: '99834' },
            day90: { orders: '301,987', amount: '9834' },
            day30: { orders: '1,987', amount: '3834' },
            day1: { orders: '987', amount: '834' }
        }
        $(".order").on("click", "a", function() {
            index = $(this).index()
            $(this).addClass("active").siblings().removeClass("active");
            let currentdata = data[this.dataset.key]
            let order = $(".order .data h4").eq(0)
            let amount = $(".order .data h4").eq(1)
            $(".order .data h4")[0].innerHTML = data[this.dataset.key].orders
            $(".order .data h4")[1].innerHTML = data[this.dataset.key].amount
        })
        let index = 0
        let order = setInterval(function() {
            index++
            if (index >= 4) { index = 0 }
            $(".order a").eq(index).click()
        }, 1500)
        $(".order").hover(function() {
            clearInterval(order)
        }, function() {
            clearInterval(order)
            order = setInterval(function() {
                index++
                if (index >= 4) { index = 0 }
                $(".order a").eq(index).click()
            }, 1500)
        })
    }

    // 销售统计模块
    {
        let data = {
            year: [
                [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
            ],
            quarter: [
                [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
                [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
            ],
            month: [
                [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
                [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
            ],
            week: [
                [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
                [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
            ]
        }
        let myChart = echarts.init(document.querySelector(".line"));
        let option = {
            tooltip: {
                trigger: "axis"
            },
            legend: {
                textStyle: {
                    color: '#4c9bfd' // 图例文字颜色
                },
                right: '10%' // 距离右边10%
            },
            grid: {
                top: '20%',
                left: '3%',
                right: '4%',
                bottom: '3%',
                show: true, // 显示边框
                borderColor: '#012f4a', // 边框颜色
                containLabel: true // 包含刻度文字在内
            },

            xAxis: {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                axisTick: {
                    show: false // 去除刻度线
                },
                axisLabel: {
                    color: '#4c9bfd' // 文本颜色
                },
                axisLine: {
                    show: false // 去除轴线
                },
                boundaryGap: false // 去除轴内间距
            },
            yAxis: {
                type: 'value',
                axisTick: {
                    show: false // 去除刻度
                },
                axisLabel: {
                    color: '#4c9bfd' // 文字颜色
                },
                splitLine: {
                    lineStyle: {
                        color: '#012f4a' // 分割线颜色
                    }
                }
            },
            color: ['#00f2f1', '#ed3f35'],
            series: [{
                name: '预期销售额',
                data: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                type: 'line',
                // 折线修饰为圆滑
                smooth: true,
            }, {
                name: '实际销售额',
                data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
                type: 'line',
                smooth: true,
            }]
        };
        myChart.setOption(option);
        window.addEventListener('resize', function() {
                myChart.resize()
            })
            //tab

        $(".sales").on("click", "a", function() {
            index = $(this).index() - 1
            $(this).addClass("active").siblings().removeClass("active");
            option.series[0].data = data[this.dataset.type][0]
            option.series[1].data = data[this.dataset.type][1]
            myChart.setOption(option);
        })

        let as = $(".sales a")
        let index = 0
        let sales = setInterval(function() {
            index++
            if (index >= 4) { index = 0 }
            as.eq(index).click()
        }, 1500)
        $(".sales").hover(function() {
            clearInterval(sales)
        }, function() {
            clearInterval(sales)
            sales = setInterval(function() {
                index++
                if (index >= 4) { index = 0 }
                as.eq(index).click()
            }, 1500)
        })


    }
    //渠道雷达图
    {

        let myChart = echarts.init(document.querySelector(".radar"));
        let option = {
            tooltip: {
                show: true,
                // 控制提示框组件的显示位置
                position: ["60%", "10%"]
            },
            radar: {
                indicator: [
                    { name: "机场", max: 100 },
                    { name: "商场", max: 100 },
                    { name: "火车站", max: 100 },
                    { name: "汽车站", max: 100 },
                    { name: "地铁", max: 100 }
                ],
                // 修改雷达图的大小
                radius: "65%",
                shape: "circle",
                // 分割的圆圈个数
                splitNumber: 4,
                name: {
                    // 修饰雷达图文字的颜色
                    textStyle: {
                        color: "#4c9bfd"
                    }
                },
                // 分割的圆圈线条的样式
                splitLine: {
                    lineStyle: {
                        color: "rgba(255,255,255, 0.5)"
                    }
                },
                splitArea: {
                    show: false
                },
                // 坐标轴的线修改为白色半透明
                axisLine: {
                    lineStyle: {
                        color: "rgba(255, 255, 255, 0.5)"
                    }
                }
            },
            series: [{
                name: "北京",
                type: "radar",
                // 填充区域的线条颜色
                lineStyle: {
                    normal: {
                        color: "#fff",
                        width: 1,
                        opacity: 0.5
                    }
                },
                data: [
                    [90, 19, 56, 11, 34]
                ],
                // 设置图形标记 （拐点）
                symbol: "circle",
                // 这个是设置小圆点大小
                symbolSize: 5,
                // 设置小圆点颜色
                itemStyle: {
                    color: "#fff"
                },
                // 让小圆点显示数据
                label: {
                    show: true,
                    fontSize: 10
                },
                // 修饰我们区域填充的背景颜色
                areaStyle: {
                    color: "rgba(238, 197, 102, 0.6)"
                }
            }]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function() {
            myChart.resize();
        });
    }
    // 销售饼图
    {
        let myChart = echarts.init(document.querySelector(".gauge"));
        let option = {
            series: [{
                name: "销售进度",
                type: "pie",
                radius: ['130%', '150%'],
                center: ['48%', '80%'],
                label: {
                    normal: {
                        show: false
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                startAngle: 180,
                hoverOffset: 0,
                data: [
                    { value: 100 },
                    { value: 100, },
                    { value: 200, itemStyle: { color: 'transparent' } } // 透明隐藏第三块区域
                ]
            }]
        };
        myChart.setOption(option);
        window.addEventListener('resize', function() {
            myChart.resize()
        })
    }
    // 排行榜
    let hotData = [{
                city: '北京', // 城市
                sales: '25, 179', // 销售额
                flag: true, //  上升还是下降
                brands: [ //  品牌种类数据
                    { name: '可爱多', num: '9,086', flag: true },
                    { name: '娃哈哈', num: '8,341', flag: true },
                    { name: '喜之郎', num: '7,407', flag: false },
                    { name: '八喜', num: '6,080', flag: false },
                    { name: '小洋人', num: '6,724', flag: false },
                    { name: '好多鱼', num: '2,170', flag: true },
                ]
            },
            {
                city: '河北',
                sales: '23,252',
                flag: false,
                brands: [
                    { name: '可爱多', num: '3,457', flag: false },
                    { name: '娃哈哈', num: '2,124', flag: true },
                    { name: '喜之郎', num: '8,907', flag: false },
                    { name: '八喜', num: '6,080', flag: true },
                    { name: '小洋人', num: '1,724', flag: false },
                    { name: '好多鱼', num: '1,170', flag: false },
                ]
            },
            {
                city: '上海',
                sales: '20,760',
                flag: true,
                brands: [
                    { name: '可爱多', num: '2,345', flag: true },
                    { name: '娃哈哈', num: '7,109', flag: true },
                    { name: '喜之郎', num: '3,701', flag: false },
                    { name: '八喜', num: '6,080', flag: false },
                    { name: '小洋人', num: '2,724', flag: false },
                    { name: '好多鱼', num: '2,998', flag: true },
                ]
            },
            {
                city: '江苏',
                sales: '23,252',
                flag: false,
                brands: [
                    { name: '可爱多', num: '2,156', flag: false },
                    { name: '娃哈哈', num: '2,456', flag: true },
                    { name: '喜之郎', num: '9,737', flag: true },
                    { name: '八喜', num: '2,080', flag: true },
                    { name: '小洋人', num: '8,724', flag: true },
                    { name: '好多鱼', num: '1,770', flag: false },
                ]
            },
            {
                city: '山东',
                sales: '20,760',
                flag: true,
                brands: [
                    { name: '可爱多', num: '9,567', flag: true },
                    { name: '娃哈哈', num: '2,345', flag: false },
                    { name: '喜之郎', num: '9,037', flag: false },
                    { name: '八喜', num: '1,080', flag: true },
                    { name: '小洋人', num: '4,724', flag: false },
                    { name: '好多鱼', num: '9,999', flag: true },
                ]
            }
        ]
        // 渲染sup
    $.each(hotData, function(index, item) {
            $('.province ul')[0].innerHTML += `<li>
        <span>${item.city}</span>
        <span>${item.sales}<s class=${ item.flag ? "icon-up" : "icon-down" }></s></span>
    </li>`
        })
        // 渲染sub
    let index = 0
    $('.province .sup').on('mouseenter', 'li', function() {
        index = $(this).index()
        $(this).addClass("active").siblings().removeClass()
        let brands = hotData[$(this).index()].brands
        subHTML = ""
        $.each(brands, function(index, item) {
            subHTML += `<li><span>${item.name}</span><span> ${item.num}<s class=${item.flag ? "icon-up" : "icon-down"}></s></span></li>`
            $('.sub').html(subHTML)
        })
    })

    $('.sup li').eq(0).mouseenter()

    let timer = setInterval(function() {
        index++
        if (index >= 5) index = 0
        $('.province .sup li').eq(index).addClass("active").siblings().removeClass()
        let brands = hotData[index].brands
        subHTML = ""
        $.each(brands, function(index, item) {
            subHTML += `<li><span>${item.name}</span><span> ${item.num}<s class=${item.flag ? "icon-up" : "icon-down"}></s></span></li>`
            $('.sub').html(subHTML)
        })
    }, 2000)
    $('.province .sup').on({
        mouseenter: function() {
            clearInterval(timer)
        },
        mouseleave: function() {
            clearInterval(timer)

            timer = setInterval(function() {
                index++
                if (index >= 5) index = 0
                $('.province .sup li').eq(index).addClass("active").siblings().removeClass()
                let brands = hotData[index].brands
                subHTML = ""
                $.each(brands, function(index, item) {
                    subHTML += `<li><span>${item.name}</span><span> ${item.num}<s class=${item.flag ? "icon-up" : "icon-down"}></s></span></li>`
                    $('.sub').html(subHTML)
                })
            }, 2000)
        }
    })

})