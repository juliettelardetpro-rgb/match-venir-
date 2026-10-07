(function(){
var BASE='https://cdn.jsdelivr.net/gh/juliettelardetpro-rgb/match-venir-@main/';
var DATA=['https://raw.githubusercontent.com/juliettelardetpro-rgb/match-venir-/main/usv-programme.json','https://cdn.jsdelivr.net/gh/juliettelardetpro-rgb/match-venir-@main/usv-programme.json'];
var root=document.getElementById('usvpw');if(!root)return;
root.innerHTML='<div class="f"><button class="on" data-f="all">Tout le week-end</button><button data-f="Samedi">Samedi</button><button data-f="Dimanche">Dimanche</button><button data-f="fem">Féminines</button></div><div class="list"></div>';
var list=root.querySelector('.list'),N={},cards=[],io=null;
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function logo(k){var n=esc(N[k]||k);return '<span class="l" tabindex="0" role="img" aria-label="'+n+'"><img src="'+BASE+'logos/'+encodeURIComponent(k)+'.webp" alt="'+n+'" draggable="false" loading="lazy"></span>';}
function reveal(arr){arr.forEach(function(c){c.classList.remove('in','done');if(io)io.observe(c);else c.classList.add('in','done');});}
function build(d){
 N=d.clubs||{};
 list.innerHTML=d.matchs.map(function(m){
  return '<article class="c rv'+(m.feminin?' fem':'')+'" data-d="'+esc(m.jour)+'" data-f="'+(m.feminin?1:0)+'">'
  +'<div class="w"><b>'+esc(m.jour)+'</b><i>'+esc(m.heure)+'</i><small>'+esc(m.stade)+'</small></div>'
  +'<div class="v"><h3 class="t" style="margin:0">'+esc(m.categorie)+'</h3><div class="m">'+logo(m.gauche)+'<span class="x">X</span>'+logo(m.droite)+'</div></div></article>';
 }).join('');
 cards=[].slice.call(list.children);
 if('IntersectionObserver' in window){io=new IntersectionObserver(function(es){var n=0;es.forEach(function(e){if(e.isIntersecting){var c=e.target;io.unobserve(c);c.style.setProperty('--i',n++);c.classList.add('in');setTimeout(function(){c.classList.add('done')},1000);}});},{threshold:.1,rootMargin:'0px 0px -30px 0px'});}
 reveal(cards);
 setTimeout(function(){cards.forEach(function(c){if(!c.classList.contains('off')&&!c.classList.contains('in'))c.classList.add('in','done');});},2800);
}
root.addEventListener('click',function(e){
 var b=e.target.closest('.f button');
 if(b){
  [].forEach.call(root.querySelectorAll('.f button'),function(x){x.classList.remove('on');});b.classList.add('on');
  var f=b.getAttribute('data-f'),vis=[];
  cards.forEach(function(c){var ok=f==='all'||(f==='fem'?c.getAttribute('data-f')==='1':c.getAttribute('data-d')===f);c.classList.toggle('off',!ok);if(io)io.unobserve(c);if(ok)vis.push(c);});
  void root.offsetWidth;vis.forEach(function(c){c.classList.remove('in','done');});void root.offsetWidth;
  vis.forEach(function(c,i){c.style.setProperty('--i',i%8);c.classList.add('in');setTimeout(function(){c.classList.add('done')},900);});
  return;
 }
 var l=e.target.closest('.l');if(!l||!window.matchMedia('(hover:none)').matches)return;
 [].forEach.call(root.querySelectorAll('.l.pop'),function(x){x.classList.remove('pop');});
 l.classList.add('pop');setTimeout(function(){l.classList.remove('pop');},1800);
});
function load(i){
 if(i>=DATA.length){list.innerHTML='<p style="text-align:center;color:#12285f;font-family:Arial,sans-serif">Le programme du week-end est momentanément indisponible.<br><small>Fichier introuvable : '+DATA[0]+'</small></p>';return;}
 fetch(DATA[i],{cache:'no-store'}).then(function(r){if(!r.ok)throw 0;return r.json();}).then(build).catch(function(){load(i+1);});
}
load(0);
})();
