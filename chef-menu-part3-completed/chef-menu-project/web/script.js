'use strict';
const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const STORAGE_KEY = 'chefMenuItems';
const starterItems = [
 {id:'sample-1',name:'Roasted Butternut Soup',course:'Starter',description:'Silky roasted butternut with toasted seeds, cream and warm artisan bread.',price:78,featured:true,image:''},
 {id:'sample-2',name:'Herb-Crusted Chicken',course:'Main Course',description:'Tender chicken breast, garden herbs, seasonal vegetables and a rich pan jus.',price:165,featured:true,image:''},
 {id:'sample-3',name:'Chocolate Fondant',course:'Dessert',description:'Warm dark chocolate centre served with vanilla bean ice cream.',price:92,featured:false,image:''}
];
let menuItems = loadItems();
let activeTab = 'all';
function loadItems(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)) || starterItems.map(x=>({...x}));}catch{return starterItems.map(x=>({...x}));}}
function saveItems(){localStorage.setItem(STORAGE_KEY,JSON.stringify(menuItems));}
function safeText(value=''){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function money(value){return new Intl.NumberFormat('en-ZA',{style:'currency',currency:'ZAR'}).format(Number(value)||0);}
function renderMenu(){
 const query=$('#searchInput').value.trim().toLowerCase(), course=$('#courseFilter').value, sort=$('#sortMenu').value;
 let items=menuItems.filter(item=>(course==='all'||item.course===course)&&(`${item.name} ${item.description} ${item.course}`).toLowerCase().includes(query));
 if(activeTab==='featured') items=items.filter(item=>item.featured);
 if(sort==='name') items.sort((a,b)=>a.name.localeCompare(b.name));
 if(sort==='price-low') items.sort((a,b)=>a.price-b.price);
 if(sort==='price-high') items.sort((a,b)=>b.price-a.price);
 if(sort==='newest') items.reverse();
 $('#menuCount').textContent=menuItems.length;
 $('#emptyState').hidden=items.length>0;
 $('#menuList').innerHTML=items.map(item=>`<article class="menu-card">
   <div class="dish-image ${item.image?'has-image':''}" ${item.image?`style="background-image:url('${safeText(item.image)}')"`:''} aria-hidden="true"><span>${item.course==='Dessert'?'✧':item.course==='Drinks'?'◌':'✳'}</span></div>
   <div class="card-meta"><span class="course-tag">${safeText(item.course)}</span><span class="price">${money(item.price)}</span></div>
   <h3>${safeText(item.name)}</h3><p>${safeText(item.description)}</p>
   ${activeTab==='manage'?`<div class="card-actions"><button class="small-button" data-edit="${safeText(item.id)}">Edit</button><button class="small-button danger" data-delete="${safeText(item.id)}">Delete</button><button class="small-button" data-feature="${safeText(item.id)}">${item.featured?'Unfeature':'Feature'}</button></div>`:''}
 </article>`).join('');
}
$('#menuForm').addEventListener('submit',event=>{
 event.preventDefault(); const form=event.currentTarget, message=$('#formMessage');
 if(!form.checkValidity()){message.textContent='Please complete all required fields correctly.';form.reportValidity();return;}
 const item={id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),name:$('#dishName').value.trim(),course:$('#course').value,description:$('#description').value.trim(),price:Number($('#price').value),image:$('#imageUrl').value.trim(),featured:false};
 if(item.name.length<2||item.description.length<10||!Number.isFinite(item.price)||item.price<=0){message.textContent='Check the dish name, description and price.';return;}
 menuItems.push(item);saveItems();form.reset();message.textContent=`${item.name} was added successfully.`;renderMenu();$('#menu').scrollIntoView({behavior:'smooth'});
});
$('#menuList').addEventListener('click',event=>{
 const edit=event.target.closest('[data-edit]'), del=event.target.closest('[data-delete]'), feature=event.target.closest('[data-feature]');
 if(del){menuItems=menuItems.filter(x=>x.id!==del.dataset.delete);saveItems();renderMenu();}
 if(feature){const item=menuItems.find(x=>x.id===feature.dataset.feature);if(item){item.featured=!item.featured;saveItems();renderMenu();}}
 if(edit){const item=menuItems.find(x=>x.id===edit.dataset.edit);if(!item)return;$('#editId').value=item.id;$('#editName').value=item.name;$('#editCourse').value=item.course;$('#editPrice').value=item.price;$('#editDescription').value=item.description;$('#editDialog').showModal();}
});
$('#editForm').addEventListener('submit',event=>{event.preventDefault();const item=menuItems.find(x=>x.id===$('#editId').value);if(!item)return;if(!event.currentTarget.reportValidity())return;Object.assign(item,{name:$('#editName').value.trim(),course:$('#editCourse').value,price:Number($('#editPrice').value),description:$('#editDescription').value.trim()});saveItems();$('#editDialog').close();renderMenu();});
$('#closeEdit').addEventListener('click',()=>$('#editDialog').close());
['#searchInput','#courseFilter','#sortMenu'].forEach(sel=>$(sel).addEventListener(sel==='#searchInput'?'input':'change',renderMenu));
$$('.tab').forEach(tab=>tab.addEventListener('click',()=>{activeTab=tab.dataset.tab;$$('.tab').forEach(t=>{const active=t===tab;t.classList.toggle('active',active);t.setAttribute('aria-selected',String(active));});renderMenu();}));
$$('.accordion-trigger').forEach(trigger=>trigger.addEventListener('click',()=>{const panel=$(`#${trigger.getAttribute('aria-controls')}`),open=trigger.getAttribute('aria-expanded')==='true';trigger.setAttribute('aria-expanded',String(!open));panel.hidden=open;trigger.querySelector('span').textContent=open?'＋':'−';}));
const toggle=$('#menuToggle'), nav=$('#primaryNav');toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);toggle.textContent=open?'×':'☰';});$$('#primaryNav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰';}));
const lightbox=$('#lightbox');$$('.gallery-item').forEach(button=>button.addEventListener('click',()=>{$('#lightboxImage').src=button.dataset.image;$('#lightboxImage').alt=button.querySelector('img').alt;$('#lightboxCaption').textContent=button.dataset.caption;lightbox.showModal();}));$('.lightbox-close').addEventListener('click',()=>lightbox.close());lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close();});
// Set this to your own form API endpoint (for example, a Formspree endpoint) before production use.
const CONTACT_ENDPOINT = '';
$('#contactForm').addEventListener('submit',async event=>{event.preventDefault();const form=event.currentTarget,status=$('#contactStatus');if(!form.checkValidity()){form.reportValidity();status.textContent='Please correct the highlighted fields.';return;}const message={...Object.fromEntries(new FormData(form).entries()),submittedAt:new Date().toISOString()};try{if(CONTACT_ENDPOINT){const response=await fetch(CONTACT_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(message)});if(!response.ok)throw new Error('The form service returned an error.');status.textContent='Thank you. Your enquiry has been sent.';}else{const saved=JSON.parse(localStorage.getItem('chefEnquiries')||'[]');saved.push(message);localStorage.setItem('chefEnquiries',JSON.stringify(saved));await Promise.resolve();status.textContent='Demo mode: your enquiry was saved in this browser. Add a form API endpoint in script.js to send it online.';}form.reset();}catch(error){status.textContent='The enquiry could not be sent. Please try again later.';}});
if(window.L&&$('#map')){const map=L.map('map',{scrollWheelZoom:false}).setView([-26.2041,28.0473],12);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap contributors',maxZoom:19}).addTo(map);L.marker([-26.2041,28.0473]).addTo(map).bindPopup('<strong>Chef\'s Table</strong><br>Johannesburg, South Africa').openPopup();}
$('#year').textContent=new Date().getFullYear();renderMenu();
