let pokemonRepository=function(){let t=[],e=document.querySelector("#modal-container");function n(t){let e=document.querySelector("#modal-container .modal-title"),n=document.querySelector("#modal-container .modal-body");e.innerText="Pokemon name: "+t.name,n.innerHTML="Pokemon height: "+t.height+'<br><img src="'+t.imageUrl+'">',$("#modal-container").modal("show"),console.log("showModal ran")}function o(){e.classList.remove("is-visible")}function i(){return t}function r(e){return t.push(e)}function a(t){return fetch(t.detailsUrl).then(function(t){return t.json()}).then(function(e){t.imageUrl=e.sprites.front_default,t.height=e.height,t.types=e.types}).catch(function(t){console.error(t)})}function r(e){t.push(e)}return window.addEventListener("keydown",t=>{"Escape"===t.key&&e.classList.contains("is-visible")&&o()}),e.addEventListener("click",t=>{t.target===e&&o()}),{getAll:function(){return t},add:r,addListItem:function t(e){let o=document.querySelector(".pokemonList"),i=document.createElement("li"),r=document.createElement("button");r.innerText=e.name,i.classList.add("list-group-item"),r.setAttribute("data-toggle","modal"),r.setAttribute("data-target","#exampleModal"),r.classList.add("btn","btn-primary"),i.append(r),o.append(i),r.addEventListener("click",function(){(function t(e){a(e).then(function(){n(e),console.log(e)})})(e),console.log("addListItem is running")})},loadList:function t(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(t){return t.json()}).then(function(t){t.results.forEach(function(t){r({name:t.name,detailsUrl:t.url})})}).catch(function(t){console.error(t)})},loadDetails:a,showModal:n}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});