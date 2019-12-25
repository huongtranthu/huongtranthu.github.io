let water
let soil
let light
// api chat luong nuoc - 15 minute per time
async function getWaterQuality() {
    const response = await fetch('https://api.thingspeak.com/channels/866214/fields/3',
        {
            method: 'GET',
        });
    let feeds = await response.json()
    let feedArr = feeds.feeds.filter(e => e.field3 !== null &&  e.field3 !== undefined)
    water = feedArr[feedArr.length - 1].field3
    document.getElementById("waterValue").innerHTML = water
}

// api do am dat - 15 minute per time
async function getSoilIntensity() {
    const response = await fetch('https://api.thingspeak.com/channels/866214/fields/4',
        {
            method: 'GET',
        })
    let feeds = await response.json()
    let feedArr = feeds.feeds.filter(e => e.field4 !== null &&  e.field4 !== undefined)
    soil = feedArr[feedArr.length - 1].field4
    document.getElementById("soilValue").innerHTML = soil
}

// api cuong do sang - 15 minute per time
async function getLightIntensity() {
    const response = await fetch('https://api.thingspeak.com/channels/928735/fields/4',
        {
            method: 'GET',
        })
    let feeds = await response.json()
    let feedArr = feeds.feeds.filter(e => e.field4 !== null &&  e.field4 !== undefined)
    light = feedArr.length !== 0 ? feedArr[feedArr.length - 1].field4 : 0
    document.getElementById("lightValue").innerHTML = light
}

// api temperature
// return array of temperature - 12 elements
// call 1 time per 15 minutes
async function getTemperaturesIntensity() {
    // get temp upper safe level
    let upperArr = [];
    let upperData = await fetch('https://api.thingspeak.com/channels/866214/fields/5',
        {
            method: 'GET',
        })
    upperData = await upperData.json();
    let upperFeed = upperData.feeds.reverse().filter(e => e.field5 !== null &&  e.field5 !== undefined )
    let upper
    if(upperFeed.length === 0) upper = 50
    else upper = Number.parseInt(upperFeed[0].field5)
    for (let i = 0; i < 12; i++) upperArr.push(upper)
    // get temp below safe level
    let belowArr = [];
    let belowData = await fetch('https://api.thingspeak.com/channels/866214/fields/6',
        {
            method: 'GET',
        })
    belowData = await belowData.json()
    let belowFeed = belowData.feeds.reverse().filter(e => e.field6 !== null &&  e.field6 !== undefined)
    let below
    if(belowFeed.length === 0) below = 10
    else below = Number.parseInt(belowFeed[0].field6)
    for (let i = 0; i < 12; i++) belowArr.push(below)
    const response = await fetch('https://api.thingspeak.com/channels/866214/fields/1',
        {
            method: 'GET',
        })
    let feeds = await response.json()
    let feedArr = feeds.feeds.reverse()
    feedArr = feedArr.filter(e => e.field1 !== null &&  e.field1 !== undefined).slice(0, 12);
    const minuteArr = feedArr.map(e => new Date(e.created_at).getHours() + 'h '
        + (new Date(e.created_at).getMinutes() < 10 ? ('0' + new Date(e.created_at).getMinutes())
            : new Date(e.created_at).getMinutes()));
    const tempsArr = feedArr.map(e => Number.parseFloat(e.field1));
    const lastDate = new Date(feedArr[0].created_at)
    const dateStr = lastDate.getDate() + "/" + (lastDate.getMonth() + 1) + "/" + lastDate.getFullYear()
    Highcharts.chart('tempChart', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'My smart garden Temperature'
        },
        subtitle: {
            text: 'Date: ' + dateStr
        },
        xAxis: {
            categories: minuteArr.reverse()
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'Nhiệt độ',
            color: "#F08F00",
            data: tempsArr.reverse()
        }, {
            name: 'Ngưỡng an toàn trên',
            color: "#E94340",
            data: upperArr
        },
            {
                name: 'Ngưỡng an toàn dưới',
                color: "#51AD55",
                data: belowArr
            }
        ]
    });
}

// api get humidity
// return array of humidity - 12 elements
// call 1 time per 15 minutes
async function getHumidityIntensity() {
    // get hum upper safe level
    let upperArr = [];
    let upperData = await fetch('https://api.thingspeak.com/channels/866214/fields/7',
        {
            method: 'GET',
        })
    upperData = await upperData.json();
    let upperFeed = upperData.feeds.reverse().filter(e => e.field7 !== null &&  e.field7 !== undefined)
    let upper
    if(upperFeed.length === 0) upper = 100
    else upper = Number.parseInt(upperFeed[0].field7)
    for (let i = 0; i < 12; i++) upperArr.push(upper)
    // get hum below safe level
    let belowArr = [];
    let belowData = await fetch('https://api.thingspeak.com/channels/866214/fields/8',
        {
            method: 'GET',
        })
    belowData = await belowData.json()
    let belowFeed = belowData.feeds.reverse().filter(e => e.field8 !== null &&  e.field8 !== undefined)
    let below
    if(belowFeed.length === 0) below = 50
    else below = Number.parseInt(belowFeed[0].field8)
    for (let i = 0; i < 12; i++) belowArr.push(below)
    const response = await fetch('https://api.thingspeak.com/channels/866214/fields/2',
        {
            method: 'GET',
        })
    let feeds = await response.json()
    let feedArr = feeds.feeds.reverse()
    feedArr = feedArr.filter(e => e.field2 !== null &&  e.field2 !== undefined).slice(0, 12);
    const minuteArr = feedArr.map(e => new Date(e.created_at).getHours() + ':'
        + (new Date(e.created_at).getMinutes() < 10 ? ('0' + new Date(e.created_at).getMinutes())
            : new Date(e.created_at).getMinutes()));
    const humsArr = feedArr.map(e => Number.parseFloat(e.field2))
    const lastDate = new Date(feedArr[0].created_at)
    const dateStr = lastDate.getDate() + "/" + (lastDate.getMonth() + 1) + "/" + lastDate.getFullYear()
    Highcharts.chart('humChart', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'My smart garden Humidity'
        },
        subtitle: {
            text: 'Date: ' + dateStr
        },
        xAxis: {
            categories: minuteArr.reverse()
        },
        yAxis: {
            title: {
                text: 'Humidity'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'Độ ẩm',
            color: "#09B2C7",
            data: humsArr.reverse()
        }, {
            name: 'Ngưỡng an toàn trên',
            color: "#E94340",
            data: upperArr
        },
            {
                name: 'Ngưỡng an toàn dưới',
                color: "#51AD55",
                data: belowArr
            }
        ]
    });
}

let lightStatus;
async function getControlLightStatus() {
    // get on/off status
    const response = await fetch('https://api.thingspeak.com/channels/928735/fields/1',
        {
            method: 'GET',
        })
    let feeds = await response.json()
    let feedArr = feeds.feeds
    lightStatus = Number.parseInt(feedArr.reverse().filter(e => e.field1 !== null &&  e.field1 !== undefined)[0].field1) || 0;
    if (lightStatus === 1) $('#controlLight').addClass("btn-warning")
    else $('#controlLight').removeClass("btn-warning")
}

let pumpStatus;
async function getControlPumpStatus() {
    // get on/off status
    const response = await fetch('https://api.thingspeak.com/channels/928735/fields/2',
        {
            method: 'GET',
        })
    let feeds = await response.json()
    let feedArr = feeds.feeds
    pumpStatus = Number.parseInt(feedArr.reverse().filter(e => e.field2 !== null &&  e.field2 !== undefined)[0].field2) || 0;
    if (pumpStatus === 1) $('#controlPump').addClass("btn-twitter")
    else $('#controlPump').removeClass("btn-twitter")
}

let panStatus;
async function getControlPanStatus() {
    // get on/off status
    const response = await fetch('https://api.thingspeak.com/channels/928735/fields/3',
        {
            method: 'GET',
        })
    let feeds = await response.json()
    let feedArr = feeds.feeds
    panStatus = Number.parseInt(feedArr.reverse().filter(e => e.field3 !== null &&  e.field3 !== undefined)[0].field3) || 0;
    if (panStatus === 1) $('#controlPan').addClass("btn-success")
    else $('#controlPan').removeClass("btn-success")
}

async function submitTempForm() {
    let upper = $('#upperTemp').val();
    let below = $('#belowTemp').val();
    try {
        if (upper.length !== 0 && below.length !==0 && upper <= 100 && below <= 100 && upper > -1 && below > -1) {
            await fetch('https://api.thingspeak.com/update?api_key=6QFHSB8F3K2AEMXL&field5=' + upper + '&field6=' + below,
                {
                    method: 'GET',
                }).then(function (res) {
                alert("Cài vùng an toàn trên dưới của nhiệt độ thành công")
                $('#upperTemp').val("")
                $('#belowTemp').val("")
            });
        } else {
            alert("Xin hãy điền lại giá trị trên dưới của nhiệt độ.")
        }
    } catch (e) {
        alert("Failed when setting temperature range")
    }
}

async function submitHumForm() {
    let upper = $('#upperHum').val();
    let below = $('#belowHum').val();
    try {
        if (upper.length !== 0 && below.length !==0 && upper > -1 && below > -1) {
            await fetch('https://api.thingspeak.com/update?api_key=6QFHSB8F3K2AEMXL&field7=' + upper + '&field8=' + below,
                {
                    method: 'GET',
                }).then(function (res) {
                alert("Cài vùng an toàn trên dưới của độ ẩm thành công")
                $('#upperHum').val("")
                $('#belowHum').val("")
            });
        } else {
            alert("Xin hãy điền lại giá trị trên dưới của độ ẩm")
        }
    } catch (e) {
        alert("Failed when setting humidity range")
    }
}

async function controlLight() {
    let status = lightStatus === 1 ? 0 : 1
    lightStatus = status
    try {
        await fetch('https://api.thingspeak.com/update?api_key=1V86WZVKZZYTCHLW&field1=' +status,
            {
                method: 'GET',
            }).then(function (res) {
            alert("Turn on/off water successfully")
            if(status === 1) $('#controlLight').addClass("btn-warning")
            else $('#controlLight').removeClass("btn-warning")
        });
    } catch (e) {
        alert("Failed when turn on/off lights")
    }
}

async function controlPump() {
    let status = pumpStatus === 1 ? 0 : 1
    pumpStatus = status
    try {
        await fetch('https://api.thingspeak.com/update?api_key=1V86WZVKZZYTCHLW&field2=' +status,
            {
                method: 'GET',
            }).then(function (res) {
            alert("Turn on/off pump successfully")
            if (status === 1) $('#controlPump').addClass("btn-twitter")
            else $('#controlPump').removeClass("btn-twitter")
        });
    } catch (e) {
        alert("Failed when turn on/off pump")
    }
}

async function controlPan() {
    let status = panStatus === 1 ? 0 : 1
    panStatus = status
    try {
        await fetch('https://api.thingspeak.com/update?api_key=1V86WZVKZZYTCHLW&field3=' +status,
            {
                method: 'GET',
            }).then(function (res) {
            alert("Turn on/off pan successfully")
            if (status === 1) $('#controlPan').addClass("btn-success")
            else $('#controlPan').removeClass("btn-success")
        });
    } catch (e) {
        alert("Failed when turn on/off pump")
    }
}
