const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/SpotRatesComponent-CtrCf7La.js","assets/spot-CHNuy6Lv.js","assets/index-CYDiPe7w.js","assets/index-BjoBKk9p.css","assets/SpotRatesComponent-CGOQO0rG.css","assets/SpinnerComponent-BGIxn0xi.js","assets/SpinnerComponent-ZaL62qN0.css"])))=>i.map(i=>d[i]);
import{_ as E,i as b,j as D,c as V,a as i,b as e,t as s,u as n,d as p,m as A,r as B,f as d,g as v,p as I,h as f}from"./index-CYDiPe7w.js";import{s as M,u as P}from"./spot-CHNuy6Lv.js";import{m as x}from"./modal-agNnoVfP.js";import{t as L}from"./toast-CC9Xnp7y.js";const N={key:0},O={class:"container-photo"},T=["src"],j={class:"container-data"},G={class:"name"},U={class:"location"},$={class:"footer"},q={__name:"SpotDetailView",setup(z){const k=v(()=>f(()=>import("./SpotRatesComponent-CtrCf7La.js"),__vite__mapDeps([0,1,2,3,4]))),S=v(()=>f(()=>import("./SpinnerComponent-BGIxn0xi.js"),__vite__mapDeps([5,2,3,6]))),t=M(),_=P(),l=x(),g=A(),h=I(),m=L(),o=b(null);D(()=>{u(),l.onRateAddCallback=u,l.onRateEditCallback=u});async function R(){l.openModal("AddRate",o.value)}async function y(){l.openModal("EditRate",o.value)}function w(){for(let r of o.value.rates)if(r.user_id===_.user.id)return!1;return!0}async function u(){o.value=await t.getSpotById(g.params.id)}async function C(){await t.deleteSpot(o.value.id)?(await t.getGroupSpots(_.user.group_id),m.show("lugar eliminado","success"),h.go(-1)):m.show("error al eliminar el lugar","error")}return(r,c)=>{const a=B("icon");return o.value?(d(),V("section",N,[i(a,{class:"back-icon",name:"io-chevron-back-outline",onClick:c[0]||(c[0]=()=>r.$router.go(-1)),scale:"1.3"}),i(a,{class:"delete-icon",name:"md-bookmarkadded-round",onClick:C,scale:"1.3"}),e("div",O,[e("img",{src:o.value.photo?o.value.photo:"/images/placeholder-photo.png",alt:"foto del lugar"},null,8,T)]),e("article",null,[e("div",j,[e("header",null,[e("p",G,s(o.value.name),1),e("span",null,s(n(t).getSpotRateMedia(o.value)),1)]),e("div",U,[i(a,{name:"md-locationon-sharp",scale:"1.3"}),e("span",null,s(o.value.address),1)]),e("div",$,[e("footer",null,[e("div",null,[e("span",null,s(n(t).getUserSpotRate(o.value)),1),w()?(d(),p(a,{key:0,name:"io-add-circle",onClick:R})):(d(),p(a,{key:1,name:"md-edit-round",onClick:y}))]),e("p",null,s(n(t).convertDate(o.value.created_at)),1)]),c[1]||(c[1]=e("div",{class:"separator"},null,-1))])]),i(n(k),{spot:o.value},null,8,["spot"])])])):(d(),p(n(S),{key:1}))}}},Q=E(q,[["__scopeId","data-v-26de7124"]]);export{Q as default};