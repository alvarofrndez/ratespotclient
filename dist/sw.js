if(!self.define){let s,e={};const n=(n,o)=>(n=new URL(n+".js",o).href,e[n]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=n,s.onload=e,document.head.appendChild(s)}else s=n,importScripts(n),e()})).then((()=>{let s=e[n];if(!s)throw new Error(`Module ${n} didn’t register its module`);return s})));self.define=(o,l)=>{const i=s||("document"in self?document.currentScript.src:"")||location.href;if(e[i])return;let r={};const t=s=>n(s,i),u={module:{uri:i},exports:r,require:t};e[i]=Promise.all(o.map((s=>u[s]||t(s)))).then((s=>(l(...s),r)))}}define(["./workbox-5ffe50d4"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/AddRateComponent-CRjerkI-.js",revision:null},{url:"assets/AddRateComponent-PGj2qbaN.js",revision:null},{url:"assets/AddRateComponent-ZMMRmGJ-.css",revision:null},{url:"assets/ChooseGroupComponent-B13Ki37D.css",revision:null},{url:"assets/ChooseGroupComponent-C2gS7kT6.css",revision:null},{url:"assets/ChooseGroupComponent-DJOG_lkt.js",revision:null},{url:"assets/ChooseGroupComponent-NzW5a3Hf.js",revision:null},{url:"assets/EditRateComponent--GXw2ZK7.js",revision:null},{url:"assets/EditRateComponent-BBwC8CFf.css",revision:null},{url:"assets/EditRateComponent-D4wYnl2M.js",revision:null},{url:"assets/GroupSelectComponent-0wV6xndj.js",revision:null},{url:"assets/GroupSelectComponent-BehVp0LK.css",revision:null},{url:"assets/GroupSelectComponent-DPC47ucX.js",revision:null},{url:"assets/HeaderComponent-3qa2BH-r.css",revision:null},{url:"assets/HeaderComponent-B2ZVy3Ql.js",revision:null},{url:"assets/HeaderComponent-B6IqgidO.js",revision:null},{url:"assets/HeaderComponent-CtMHW-73.css",revision:null},{url:"assets/HomeView-BFMLukoV.js",revision:null},{url:"assets/HomeView-By-aTYsZ.css",revision:null},{url:"assets/HomeView-DR6W2Pzu.js",revision:null},{url:"assets/index-BjoBKk9p.css",revision:null},{url:"assets/index-BxKUM9BA.js",revision:null},{url:"assets/index-C1sxwVN5.js",revision:null},{url:"assets/JoinGroupComponent-1wY-fbod.css",revision:null},{url:"assets/JoinGroupComponent-CS8QiobJ.js",revision:null},{url:"assets/JoinGroupComponent-CUisOlrq.css",revision:null},{url:"assets/JoinGroupComponent-wUfBnwBX.js",revision:null},{url:"assets/main--EuJW7xx.js",revision:null},{url:"assets/main-CCXfkYjF.css",revision:null},{url:"assets/main-CFRl0bBa.js",revision:null},{url:"assets/main-Dzm9jxkl.css",revision:null},{url:"assets/map-BSwS6MZx.js",revision:null},{url:"assets/map-jPJngeLW.js",revision:null},{url:"assets/MapComponent-BgIGeSb5.js",revision:null},{url:"assets/MapComponent-BKqxqAq1.css",revision:null},{url:"assets/MapComponent-D9pk9p0F.css",revision:null},{url:"assets/MapComponent-Dq7TL-sU.js",revision:null},{url:"assets/modal-Bt6is9Iy.js",revision:null},{url:"assets/modal-CoLmY9SE.js",revision:null},{url:"assets/ModalComponent-Bb8SynhJ.css",revision:null},{url:"assets/ModalComponent-CVdsBI4Y.css",revision:null},{url:"assets/ModalComponent-DWKGRZBE.js",revision:null},{url:"assets/ModalComponent-FZiIZcLK.js",revision:null},{url:"assets/NewGroupComponent-Bfd6Z5b5.css",revision:null},{url:"assets/NewGroupComponent-Bg4QhsvF.js",revision:null},{url:"assets/NewGroupComponent-CJDeQ2K3.css",revision:null},{url:"assets/NewGroupComponent-DZLR1lUs.js",revision:null},{url:"assets/NewSpotComponent-BANUbrcU.js",revision:null},{url:"assets/NewSpotComponent-DLFChP9N.js",revision:null},{url:"assets/NewSpotComponent-DOk9GeqU.css",revision:null},{url:"assets/NewSpotComponent-sLQpJO_c.css",revision:null},{url:"assets/ProfileView-D66Edfbu.css",revision:null},{url:"assets/ProfileView-Dn6N8ftv.js",revision:null},{url:"assets/SearchComponent-BOZKqNsr.css",revision:null},{url:"assets/SearchComponent-DpPE1XCt.js",revision:null},{url:"assets/SearchComponent-Drjvl913.js",revision:null},{url:"assets/SeparatorComponent-2ERjcJr1.js",revision:null},{url:"assets/SeparatorComponent-DL-kCkcG.css",revision:null},{url:"assets/SeparatorComponent-mdjoLo7y.js",revision:null},{url:"assets/SpinnerComponent-6dtZ-Acc.js",revision:null},{url:"assets/SpinnerComponent-UL7zW2k6.js",revision:null},{url:"assets/SpinnerComponent-ZaL62qN0.css",revision:null},{url:"assets/spot-4GoCOM8x.js",revision:null},{url:"assets/spot-DbiCX8Eu.js",revision:null},{url:"assets/SpotDetailView-BhCtFzmb.js",revision:null},{url:"assets/SpotDetailView-DCIU_9jE.css",revision:null},{url:"assets/SpotDetailView-DYZkk4UU.js",revision:null},{url:"assets/SpotDetailView-qQZ1KDPO.css",revision:null},{url:"assets/SpotRatesComponent-Bz_s70Pv.js",revision:null},{url:"assets/SpotRatesComponent-CGOQO0rG.css",revision:null},{url:"assets/SpotRatesComponent-DsSEDBqY.js",revision:null},{url:"assets/SpotsListComponent-BlGtVEop.js",revision:null},{url:"assets/SpotsListComponent-BvdVN5xw.js",revision:null},{url:"assets/SpotsListComponent-C4cOv1XO.css",revision:null},{url:"assets/SpotsListComponent-CBQ-dh__.css",revision:null},{url:"assets/SpotsView-4noO61Pm.js",revision:null},{url:"assets/SpotsView-BP33XN7E.css",revision:null},{url:"assets/SpotsView-BUIXQGUP.css",revision:null},{url:"assets/SpotsView-BvKC5vev.js",revision:null},{url:"assets/toast-BSxLi3XN.js",revision:null},{url:"assets/ToastComponent-8xTTd-Pe.css",revision:null},{url:"assets/ToastComponent-B-8TjJ-k.js",revision:null},{url:"assets/user-WJktJhRJ.js",revision:null},{url:"index.html",revision:"e5d7a0ae8ff010f3778621d1d6663c7a"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"images/ratespot-logo.png",revision:"2e2a031a26d35fa85d4cc82b0cbb9780"},{url:"manifest.webmanifest",revision:"e2be8778c21ef531a441dc2fb0e8af9c"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
