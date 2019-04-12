
const API_KEY="5a83fe8234fc03d79b5d319320864273"
const COORDS='coords';

function getWeather(lat,lon){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
  console.log(position)
  const latitude=position.coords.latitude;
  const longitude= position.coords.longitude;
  const coordsObj={
    latitude,
    longitude,
  }
  saveCoords(coordsObj);
  getWeather(latitude,longitude);
  
}

function handleGeoError(){
  console.log("cant access geo location")
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}

function loadCoords(){
  const loadedCoords=localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askForCoords();

  } else {
    //getWeather
    const parseCoords=JSON.parse(loadCoords);
    console.log(parseCoords)
  }
}

function init(){
  loadCoords()
}

init();