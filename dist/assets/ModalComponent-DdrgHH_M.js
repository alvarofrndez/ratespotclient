import{m as d}from"./modal-lycaoGKn.js";import{_ as l,f as n,c as p,b as i,d as f,s as _,u}from"./index-nH_0FPl2.js";const C={class:"container-modal"},k={__name:"ModalComponent",emits:["groupCreated","rateAdded","actionPerformed"],setup(w,{emit:a}){const e=d(),r=a;function s(t){const o=document.querySelector(".wrapper-modal");t.target==o&&(e.showing=!1,e.component="")}function c(){r("actionPerformed")}return(t,o)=>(n(),p("section",{class:"wrapper-modal",onClick:o[0]||(o[0]=m=>s(m))},[i("div",C,[(n(),f(_(u(e).component),{onActionPerformed:c},null,32))])]))}},g=l(k,[["__scopeId","data-v-798ec7bf"]]);export{g as default};
