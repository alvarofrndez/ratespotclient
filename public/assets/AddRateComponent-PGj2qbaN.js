import{i,f as u,c as d,b as e,q as m,v as p,s as f}from"./index-C1sxwVN5.js";import{s as c}from"./spot-4GoCOM8x.js";import{u as v}from"./user-WJktJhRJ.js";import{m as b}from"./modal-Bt6is9Iy.js";const x={__name:"AddRateComponent",setup(R){const r=c();v();const o=b(),a=i("");async function s(){await r.addRate(o.data.id,a.value)&&(o.triggerOnRateAddCallback(),o.closeModal())}return(n,t)=>(u(),d("section",null,[t[2]||(t[2]=e("h2",null,"Rate",-1)),e("form",{onSubmit:f(s,["prevent"])},[m(e("input",{type:"number","onUpdate:modelValue":t[0]||(t[0]=l=>a.value=l),placeholder:"rate",required:""},null,512),[[p,a.value]]),t[1]||(t[1]=e("button",{type:"submit"},"Añadir puntiacion",-1))],32)]))}};export{x as default};
