import{q as v,i as t}from"./index-BxKUM9BA.js";const p=v("map",()=>{const r=t(null),c=t(null),i=t(null),a=t(null);async function l(){return new Promise((e,n)=>{navigator.geolocation.getCurrentPosition(o=>{e({lat:o.coords.latitude,lng:o.coords.longitude})},o=>{console.error("Error al obtener la ubicación:",o),n("No se pudo obtener tu ubicación.")})})}function s(){c.value=new google.maps.places.PlacesService(r.value)}function u(){a.value=navigator.geolocation.watchPosition(e=>{const{latitude:n,longitude:o}=e.coords,m={lat:n,lng:o};i.value.setPosition(m)},e=>{console.error("Error al rastrear la ubicación:",e)},{enableHighAccuracy:!0,maximumAge:0,timeout:5e3})}function g(){navigator.geolocation.clearWatch(a.value)}return{map:r,place_service:c,user_marker:i,watch_id:a,getUserLocation:l,initPlaceService:s,startTracking:u,stopTracking:g}});export{p as m};