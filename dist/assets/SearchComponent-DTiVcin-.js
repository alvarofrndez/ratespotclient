import{_ as w,i as _,r as B,f as o,c as s,e as i,u as C,v as R,x as q,b as c,F as h,k as L,B as N,t as f,a as P}from"./index-Bq31n-Mt.js";import{m as V}from"./map-CnsWXG82.js";import{m as z}from"./modal-DwSi58_8.js";const D={key:1,class:"searcher-spots"},F={key:0,class:"places-container"},I=["onClick"],O={key:0},j={__name:"SearchComponent",emits:["placeSelected"],setup(E,{emit:y}){const d=V();z();const v=y,r=_(""),a=_([]),n=_(!0);function m(){n.value=!1,a.value=[],p()}function g(){if(n.value=!0,r.value.length>0){const e={query:r.value,fields:["name","formatted_address","rating","place_id","geometry","types","photos"]};d.place_service.textSearch(e,(l,u)=>{if(u===google.maps.places.PlacesServiceStatus.OK){const t=["bar","museum","university","restaurant","park","library","church","mosque","synagogue","hindu_temple","city_hall","courthouse","embassy","fire_station","local_government_office","police","post_office","train_station","transit_station","airport","bus_station","subway_station","taxi_stand","light_rail_station","parking","car_rental","car_repair","car_wash","gas_station","atm","bank","insurance_agency","accounting","lawyer","doctor","dentist","hospital","pharmacy","veterinary_care","beauty_salon","hair_care","laundry","shoe_store","clothing_store","jewelry_store","book_store","electronics_store","hardware_store","furniture_store","home_goods_store","liquor_store","pet_store","store","bicycle_store","car_dealer","car_rental","car_repair","car_wash","gas_station","movie_theater","stadium","amusement_park","aquarium","art_gallery","bowling_alley","casino","museum","zoo","campground","rv_park","park","natural_feature","point_of_interest","establishment"];a.value=l.filter(S=>S.types.some(x=>t.includes(x)))}else a.value=[{name:"No se encontraron resultados",not_clickable:!0}]})}else n.value=!1,a.value=[];p()}function b(e){e.not_clickable||(m(),v("placeSelected",e))}function k(e){e.stopPropagation(),e.target.classList.contains("background-actioner")&&m()}function p(){const e=document.querySelector(".searcher-spots input");e&&(n.value==!0?(e.style.borderBottomLeftRadius="0",e.style.borderBottomRightRadius="0",e.style.borderBottom="0px"):(e.style.borderBottomLeftRadius="10px",e.style.borderBottomRightRadius="10px"))}return(e,l)=>{const u=B("icon");return o(),s(h,null,[n.value&&r.value.length!=""?(o(),s("div",{key:0,class:"background-actioner",onClick:k})):i("",!0),C(d).place_service?(o(),s("section",D,[R(c("input",{type:"text","onUpdate:modelValue":l[0]||(l[0]=t=>r.value=t),onInput:g,placeholder:"Buscar lugares"},null,544),[[q,r.value]]),a.value.length>0&&n.value&&r.value.length!=""?(o(),s("div",F,[c("ul",null,[(o(!0),s(h,null,L(a.value,t=>(o(),s("li",{key:t.place_id,onClick:()=>b(t),style:N(a.value.indexOf(t)+1==a.value.length?"border: none !important;":"")},[c("p",null,f(t.name),1),t.formatted_address?(o(),s("div",O,[P(u,{name:"md-locationon-sharp",scale:".85"}),c("span",null,f(t.formatted_address),1)])):i("",!0)],12,I))),128))])])):i("",!0)])):i("",!0)],64)}}},U=w(j,[["__scopeId","data-v-603eb165"]]);export{U as default};