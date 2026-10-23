const orderUrl = 'https://www.ubereats.com/au/store/govindas-hare-krishna-restaurant/l7J3CpciXXmh7L6WbrsTgg';
const dishes = [
  { id:'krishna', name:'Krishna Combo', price:17, category:'meals', image:'feast.jpg', tag:'The whole experience', description:'Rice, dhal, curry, salad and all the little extras. A complete, comforting meal.', details:'A generous combination of rice, dhal with curry, chutney, pappadum, salad, lassi and halva with custard. A little savoury, a little sweet, and plenty to enjoy.', diet:'Vegetarian. This combination includes lassi and custard, which contain dairy. Speak to our team about vegan options.' },
  { id:'day', name:'Day Meal', price:12, category:'meals', image:'thali.jpg', tag:'Your everyday favourite', description:'A satisfying plate of rice, dhal and curry, with pappadum and chutney.', details:'Rice, dhal with curry, crisp pappadum and chutney. Our simple, satisfying daytime meal. Daily curries can vary; ask our team what is being served today.', diet:'Vegetarian. Vegan options are available; please confirm the ingredients in today’s curry with the team.' },
  { id:'samosa', name:'Samosa', price:6, category:'sides', image:'samosa.jpg', tag:'A golden little extra', description:'A savoury pastry to enjoy on its own or alongside your favourite meal.', details:'A golden savoury pastry from our individual menu. Add one to your meal or enjoy a little something on its own. Check the current filling and serving size when you order.', diet:'Vegetarian. Please ask the team about allergens, ingredients and vegan suitability.' },
  { id:'pakora', name:'Pakora', price:2.5, category:'sides', image:'pakora.jpg', tag:'Small bite, big comfort', description:'Golden, savoury fritters in a seasoned batter. A little crunch for your plate.', details:'Savoury fritters made with seasoned batter and fried until golden and crisp. A simple extra alongside rice, dhal and curry.', diet:'Vegetarian. Please confirm ingredients, allergens and vegan suitability with the team.' },
  { id:'halva', name:'Halva & Custard', price:4.5, category:'sweet', image:'halva.jpg', tag:'A sweet finish', description:'Our comforting halva, served with custard. Save a little room.', details:'Halva served with custard: a comforting way to finish your meal or enjoy a sweet afternoon pause.', diet:'Vegetarian. Contains dairy. Please check other allergens directly with the team.' },
  { id:'lassi', name:'Lassi', price:2.8, category:'drinks', image:'lassi.jpg', tag:'Sip something lovely', description:'A chilled, creamy yoghurt drink to go with your favourite plate.', details:'A traditional yoghurt drink, blended until frothy and served chilled. A cooling companion to a warm, generous meal.', diet:'Vegetarian. Contains dairy and is not vegan.' }
];
const money = value => '$' + value.toFixed(2);
const grid = document.querySelector('#menu-grid');
grid.innerHTML = dishes.map(d=>`<article class="dish-card" data-category="${d.category}"><button type="button" class="dish-image" data-dish="${d.id}" aria-label="View ${d.name} details"><img src="assets/${d.image}" alt="${d.name} from Govinda’s menu" width="550" height="440" loading="lazy"><span class="dish-tag">${d.tag}</span><span class="dish-view"><svg aria-hidden="true"><use href="#i-up"/></svg></span></button><div class="dish-title"><h3>${d.name}</h3><span class="dish-price">${money(d.price)}</span></div><p class="dish-description">${d.description}</p><button type="button" class="dish-details" data-dish="${d.id}" aria-label="See what is in ${d.name}">What’s in it?</button></article>`).join('');
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});
  let count=0;
  grid.querySelectorAll('.dish-card').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;if(!card.hidden)count++});
  document.querySelector('#menu-status').textContent=`Showing ${count} ${count===1?'item':'items'}: ${button.textContent}`;
}));
const dishDialog = document.querySelector('#dish-dialog');
let lastDialogTrigger;
function openDialog(dialog,trigger){lastDialogTrigger=trigger;dialog.showModal();document.body.classList.add('dialog-open');dialog.querySelector('.dialog-close').focus()}
document.querySelectorAll('[data-dish]').forEach(button=>button.addEventListener('click',()=>{
  const dish=dishes.find(d=>d.id===button.dataset.dish);
  document.querySelector('#dish-dialog-content').innerHTML=`<div class="dialog-layout"><img src="assets/${dish.image}" alt="${dish.name}"><div class="dialog-copy"><p class="eyebrow">${dish.tag}</p><h2 id="dish-dialog-title">${dish.name}</h2><span class="dialog-price">${money(dish.price)} <small style="display:inline">AUD</small></span><p>${dish.details}</p><p class="diet-note">${dish.diet}</p><a class="button" href="${orderUrl}" target="_blank" rel="noopener">Order on Uber Eats <svg aria-hidden="true"><use href="#i-up"/></svg></a><small>Delivery menu price. In-store prices may differ.</small></div></div>`;
  openDialog(dishDialog,button);
}));
document.querySelectorAll('dialog').forEach(dialog=>{
  dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
  dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');lastDialogTrigger?.focus()});
});
document.querySelector('#credits-open').addEventListener('click',event=>openDialog(document.querySelector('#credits-dialog'),event.currentTarget));
const navToggle=document.querySelector('.nav-toggle');
const mobileNav=document.querySelector('#mobile-nav');
function closeNav(){navToggle.setAttribute('aria-expanded','false');navToggle.setAttribute('aria-label','Open menu');mobileNav.hidden=true}
navToggle.addEventListener('click',()=>{const open=navToggle.getAttribute('aria-expanded')==='true';navToggle.setAttribute('aria-expanded',String(!open));navToggle.setAttribute('aria-label',open?'Open menu':'Close menu');mobileNav.hidden=open});
mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeNav));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobileNav.hidden){closeNav();navToggle.focus()}});
document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeNav()});
matchMedia('(min-width: 901px)').addEventListener('change',event=>{if(event.matches)closeNav()});
function updateHours(){
  const parts=new Intl.DateTimeFormat('en-AU',{timeZone:'Australia/Perth',weekday:'short',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date());
  const value=type=>parts.find(p=>p.type===type)?.value;
  const minutes=Number(value('hour'))*60+Number(value('minute'));
  const close=value('weekday')==='Sun'?17*60:19*60;
  const isOpen=minutes>=690&&minutes<close;
  const el=document.querySelector('#open-status');
  el.textContent=isOpen?`Open until ${close===1020?'5':'7'} pm`:(minutes<690?'Opens at 11:30 am':'Closed for today');
  el.classList.toggle('is-open',isOpen);
  el.title='Based on usual opening hours in Perth. Public holidays may vary.';
}
updateHours();setInterval(updateHours,60000);
document.querySelector('#year').textContent=new Intl.DateTimeFormat('en',{timeZone:'Australia/Perth',year:'numeric'}).format(new Date());
