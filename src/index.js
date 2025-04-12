import {validatIp} from './helpers';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');
const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

function getData() {
    //провверка данных
    if (validatIp(ipInput.value)) {
        fetch (`https://ipgeolocation.abstractapi.com/v1/?api_key=d9dca39ed7cb4d8f9936716ac0ee4d19&ip_address=${ipInput.value}`)
        .then(response => response.json())
        .then(setInfo)//data => setInfo(data)
    }
} 

function handleKey(event) {
    if(event.key === "Enter") {
        getData();
    }
}


function setInfo(mapData) {
    const {latitude, longitude} = mapData;

    ipInfo.innerText = mapData.ip_address;
    console.log(mapData);
    if(mapData.region == null) {locationInfo.innerText = mapData.country} else {
        locationInfo.innerText = mapData.region + ' ' +  mapData.country;   
    }
    timezoneInfo.innerText = mapData.timezone.current_time;
    ispInfo.innerText = mapData.connection.autonomous_system_organization;

    yandexMap.setCenter([latitude, longitude]);
    let myPlacemark = new ymaps.Placemark([latitude, longitude], {}, {
        preset: 'islands#redIcon'
    });

    yandexMap.geoObjects.add(myPlacemark);
}


let yandexMap;

ymaps.ready(createMap);

function createMap() {
    yandexMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 10
    });
}
