const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/SpinnerComponent-CgfOPpfJ.js","assets/index-nH_0FPl2.js","assets/index-BjoBKk9p.css","assets/SpinnerComponent-ZaL62qN0.css"])))=>i.map(i=>d[i]);
import{_ as f,p as k,j as S,z as v,r as y,u as a,f as n,c,F as C,k as w,b as o,t as p,a as B,d as L,g as A,h as D}from"./index-nH_0FPl2.js";import{s as E,u as G}from"./spot-h7yg39wx.js";import{t as P}from"./toast-Bjez__r0.js";const R={key:0,class:"wrapped-spots"},V={key:0,class:"container-spots"},x=["onClick"],F={class:"container-photo"},I=["src"],M={class:"container-info"},N={class:"name"},T={class:"location"},b={class:"created-at"},j={key:1,class:"no-spots"},z={__name:"SpotsListComponent",setup(O){const l=A(()=>D(()=>import("./SpinnerComponent-CgfOPpfJ.js"),__vite__mapDeps([0,1,2,3]))),s=E(),r=G(),_=k(),u=P();S(async()=>{await s.getGroupSpots(r.user.group_id)});function m(i,e){_.push("/spots/"+e)}async function g(i,e){i.stopPropagation(),await s.deleteSpot(e)&&(u.show("lugar eliminado","success"),await s.getGroupSpots(r.user.group_id))}return v(()=>r.user,async()=>{r.user.id&&await s.getGroupSpots(r.user.group_id)}),(i,e)=>{const d=y("icon");return a(s).spots?(n(),c("section",R,[a(s).spots.length>0?(n(),c("div",V,[(n(!0),c(C,null,w(a(s).spots,t=>(n(),c("article",{key:t.id,onClick:()=>m(i.e,t.id)},[o("div",F,[o("img",{src:t.photo?t.photo:"/images/placeholder-photo.png",alt:"foto del lugar"},null,8,I)]),o("div",M,[o("p",N,p(t.name),1),o("p",T,p(t.address),1),o("div",null,[o("p",null,p(a(s).getSpotRateMedia(t)),1),o("p",b,p(a(s).convertDate(t.created_at)),1)])]),B(d,{class:"delete-spot",name:"md-delete",onClick:h=>g(h,t.id)},null,8,["onClick"])],8,x))),128))])):(n(),c("div",j,e[0]||(e[0]=[o("p",null,"Aún sin lugares guardados",-1)])))])):(n(),L(a(l),{key:1}))}}},K=f(z,[["__scopeId","data-v-8aa8de27"]]);export{K as default};
