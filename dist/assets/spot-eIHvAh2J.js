import{q as G,i as y}from"./index-Bq31n-Mt.js";const T=G("global",()=>({API_URL:"http://localhost:3000",USER_LOCALSTORAGE_KEY:"albondiga_frita",GROUP_LOCALSTORAGE_KEY:"salamance_alpinero",GROUP_LOCALSTORAGE_SALT:"647280043212"})),u=T(),U=G("group",()=>{const s=y({});async function i(n,o,t){const e=await fetch(u.API_URL+"/groups/create",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:n,code:o,username:t})});return e.ok?await e.json():!1}async function d(){const n=await fetch(u.API_URL+"/groups/generateCode");return n.ok?await n.json():!1}function p(n,o){n.value=n;const t=JSON.parse(localStorage.getItem(u.GROUP_LOCALSTORAGE_KEY))||[];t.push(u.GROUP_LOCALSTORAGE_SALT+""+n.id+"-"+n.code+"-"+o.id),localStorage.setItem(u.GROUP_LOCALSTORAGE_KEY,JSON.stringify(t))}async function _(){let n=localStorage.getItem(u.GROUP_LOCALSTORAGE_KEY),o=n?JSON.parse(n):[],t=[];for(let e of o){let a=e.split("-"),f=a[0].slice(u.GROUP_LOCALSTORAGE_SALT.length);const h=await g(f,a[2]);t.push(h)}return t}async function L(n){const o=await fetch(u.API_URL+"/groups/"+n);return o.ok?await o.json():!1}async function g(n,o){const t=await fetch(u.API_URL+"/groups/"+n+"/"+o);return t.ok?await t.json():!1}function S(n){n.value=n}function r(){const o=JSON.parse(localStorage.getItem(u.GROUP_LOCALSTORAGE_KEY)).filter(t=>t.split("-")[0]!==u.GROUP_LOCALSTORAGE_SALT+""+s.value.id);localStorage.setItem(u.GROUP_LOCALSTORAGE_KEY,JSON.stringify(o)),s.value={}}async function c(n){const o=await fetch(u.API_URL+"/group/"+n);return o.ok?await o.json():!1}async function l(n){const o=await fetch(u.API_URL+"/group/"+n,{method:"DELETE"});if(!o.ok)return!1;const t=await o.json();return r(),s.value={},t}return{group:s,createGroup:i,generateCode:d,setNewGroup:p,getGroupsOfLocalStorage:_,getGroupById:L,getGroupByIdWithUser:g,setActiveGroup:S,leaveGroup:r,getGroupByCode:c,deleteGroup:l}}),O=T(),E=U(),P=G("user",()=>{const s=y({}),i=y(null);async function d(){let r=localStorage.getItem(O.USER_LOCALSTORAGE_KEY);return r&&await p(r)?(i.value=!0,!0):(i.value=!1,!1)}async function p(r){const c=await fetch(`${O.API_URL}/users/${r}`);if(!c.ok)return!1;const l=await c.json();return s.value=l.user,E.group=l.group,!0}function _(r){s.value=r,i.value=!0,localStorage.setItem(O.USER_LOCALSTORAGE_KEY,r.id)}async function L(){return(await fetch(`${O.API_URL}/groups/leave`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_id:s.value.id})})).ok?(S(),E.leaveGroup(),!0):!1}async function g(r,c){const l=await fetch(`${O.API_URL}/users/join`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:r,group_id:c.id})});if(!l.ok)return!1;const n=await l.json();return _(n.user),E.setNewGroup(c,n.user),!0}function S(){s.value={},i.value=!1,localStorage.removeItem(O.USER_LOCALSTORAGE_KEY)}return{user:s,user_active:i,check:d,getUserWithGroup:p,setActiveUser:_,leaveGroup:L,joinToGroup:g,logout:S}}),R=P(),A=T(),C=G("spot",()=>{const s=y(null);async function i(t,e,a,f,h){const w=await fetch(A.API_URL+"/spots/new",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:t,name:e,lat:a,lng:f,address:h,user:R.user})});return w.ok?await w.json():!1}async function d(t){const e=await fetch(A.API_URL+"/spots/"+t);if(!e.ok)return!1;const a=await e.json();return s.value=a,a}async function p(t){const e=await fetch(A.API_URL+"/spot/"+t);return e.ok?await e.json():!1}async function _(t,e){const a=await fetch(A.API_URL+"/spot-rate/new",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({spot_id:t,rate:e,user_id:R.user.id})});return a.ok?await a.json():!1}async function L(t,e){const a=await fetch(A.API_URL+"/spot-rate/edit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({spot_id:t,rate:e,user_id:R.user.id})});return a.ok?await a.json():!1}async function g(t){return!!(await fetch(A.API_URL+"/spot/"+t,{method:"DELETE",headers:{"Content-Type":"application/json"}})).ok}function S(t){const e=["restaurant","bar","cafe","food","lodging","point_of_interest","establishment"];if(t.some(a=>e.includes(a))){const a=t.filter(f=>e.includes(f));return r(a)}return!1}function r(t){const e={restaurant:"Restaurante",bar:"Bar",cafe:"Café",food:"Comida",lodging:"Alojamiento",point_of_interest:"Punto de interés",establishment:"Establecimiento"};return t.map(a=>e[a])}function c(t){return s.value.some(e=>e.id===t)}function l(t){let e=0,a=0;for(let f of t.rates)e+=parseFloat(f.rate);return a=e/t.rates.length,isNaN(a)?"0/0":a+"/10"}function n(t){const e=new Date(t);return`${e.getDate()}-${e.getMonth()+1}-${e.getFullYear()}`}function o(t){const e=t.rates.find(a=>a.user_id===R.user.id);return e?Number.isInteger(parseFloat(e.rate))?parseInt(e.rate)+"/10":e.rate+"/10":"0"}return{spots:s,newSpot:i,getGroupSpots:d,getSpotById:p,addRate:_,editRate:L,deleteSpot:g,filterSpotTypes:S,isAlreadySaved:c,getSpotRateMedia:l,convertDate:n,getUserSpotRate:o}});export{U as g,C as s,P as u};
