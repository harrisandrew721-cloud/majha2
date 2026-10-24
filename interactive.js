/* No-dependency controls for Majha's prebuilt static upload. */
(() => {
 const menu=document.querySelector('.menu-toggle');
 const nav=document.querySelector('#navigation');
 if(menu&&nav){
  const setOpen=open=>{nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation')};
  menu.addEventListener('click',()=>setOpen(!nav.classList.contains('open')));
  nav.addEventListener('click',e=>{if(e.target.closest('a'))setOpen(false)});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){setOpen(false);menu.focus()}});
 }
 const scenes=[...document.querySelectorAll('.hero-scene')];
 const slideshow=document.getElementById('video-toggle');
 let scene=0,paused=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const sync=()=>{if(slideshow){slideshow.textContent=paused?'Play ▷':'Pause Ⅱ';slideshow.setAttribute('aria-label',paused?'Play inspiration slideshow':'Pause inspiration slideshow')}};
 sync();
 let cycle=null;
 const rotate=()=>{scene=(scene+1)%scenes.length;scenes.forEach((el,i)=>el.classList.toggle('active',i===scene))};
 const schedule=()=>{clearInterval(cycle);if(!paused&&scenes.length>1)cycle=setInterval(rotate,6500)};
 if(slideshow)slideshow.addEventListener('click',()=>{paused=!paused;sync();schedule()});
 schedule();
 document.querySelectorAll('[data-carousel]').forEach(carousel=>{
  const track=carousel.querySelector('.track');
  const prev=carousel.querySelector('.previous');
  const next=carousel.querySelector('.next');
  const dots=carousel.querySelector('.dots');
  let places=[];
  const behavior=()=>matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth';
  const update=()=>{
   const scroll=track.scrollLeft, max=Math.max(0,track.scrollWidth-track.clientWidth);
   prev.disabled=scroll<5;next.disabled=scroll>=max-5;
   let nearest=0;
   places.forEach((pos,i)=>{if(Math.abs(pos-scroll)<Math.abs(places[nearest]-scroll))nearest=i});
   [...dots.children].forEach((dot,i)=>dot.setAttribute('aria-current',String(i===nearest)));
  };
  const measure=()=>{
   const children=[...track.children];
   if(!children.length)return;
   const max=Math.max(0,track.scrollWidth-track.clientWidth);
   places=[...new Set(children.map(el=>Math.max(0,Math.min(el.offsetLeft-children[0].offsetLeft,max))))];
   dots.replaceChildren(...places.map((pos,i)=>{
    const btn=document.createElement('button');btn.type='button';btn.setAttribute('aria-label',`Go to slide ${i+1}`);
    btn.addEventListener('click',()=>track.scrollTo({left:pos,behavior:behavior()}));return btn;
   }));
   update();
  };
  const move=direction=>{
   const el=track.firstElementChild;if(!el)return;
   const gap=parseFloat(getComputedStyle(track).gap)||0;
   track.scrollBy({left:direction*(el.getBoundingClientRect().width+gap),behavior:behavior()});
  };
  prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
  track.addEventListener('scroll',update,{passive:true});
  if('ResizeObserver' in window){
    const ro=new ResizeObserver(measure);ro.observe(track);[...track.children].forEach(c=>ro.observe(c));
  }else window.addEventListener('resize',measure);
  measure();
 });
})();