let light
let soil
let temps
let hum

// api cuong do sang den - 15 minute per time
async function getLightIntensity() {
    const response = await fetch('https://api.thingspeak.com/channels/866214/fields/3',
        {
            method: 'GET',
        });
    let feeds = await response.json()
    let feedArr = feeds.feeds.filter(e => e.field3 !== null)
    light = feedArr[feedArr.length - 1].field3
    document.getElementById("lightValue").innerHTML = light
};

// api do am dat - 15 minute per time
async function getSoilIntensity() {
    const response = await fetch('https://api.thingspeak.com/channels/866214/fields/4',
        {
            method: 'GET',
        })
    let feeds = await response.json()
    let feedArr = feeds.feeds.filter(e => e.field4 !== null)
    soil = feedArr[feedArr.length - 1].field4
    document.getElementById("soilValue").innerHTML = soil
};

// api temperature
// return array of temperature - 12 elements
// call 1 time per 15 minutes
async function getTemperaturesIntensity() {
    const response = await fetch('https://api.thingspeak.com/channels/866214/fields/1',
        {
            method: 'GET',
        })
    let feeds = await response.json()
    let feedArr = feeds.feeds
    feedArr = feedArr.reverse().filter(e => e.field1 !== null).slice(0, 12);
    const minuteArr = feedArr.map(e => new Date(e.created_at).getHours() + ':'
        + (new Date(e.created_at).getMinutes() < 10 ? ('0' + new Date(e.created_at).getMinutes())
            : new Date(e.created_at).getMinutes()));
    console.log(minuteArr)
};

// api get humidity
// return array of humidity - 12 elements
// call 1 time per 15 minutes
async function getHumidityIntensity() {
    const response = await fetch('https://api.thingspeak.com/channels/866214/fields/2',
        {
            method: 'GET',
        })
    let feeds = await response.json()
    let feedArr = feeds.feeds
    feedArr = feedArr.reverse().filter(e => e.field2 !== null).slice(0, 12);
    const minuteArr = feedArr.map(e => new Date(e.created_at).getHours() + ':'
        + (new Date(e.created_at).getMinutes() < 10 ? ('0' + new Date(e.created_at).getMinutes())
            : new Date(e.created_at).getMinutes()));
    console.log(minuteArr)
};

// todo asking what is safe temperature
// todo asking what is safe humidity