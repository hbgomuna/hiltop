// Copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', ev=>{
    const id = a.getAttribute('href');
    if(id.length > 1){
      const el = document.querySelector(id);
      if(el){ ev.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
    }
  });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const menu = document.getElementById('menu');
if(hamburger && menu){
  hamburger.addEventListener('click', ()=>{
    const open = menu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(open));
  });
}

// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
},{threshold:0.12, rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Back-to-top button
const toTop = document.querySelector('.to-top');
if(toTop){
  window.addEventListener('scroll', ()=>{
    toTop.classList.toggle('show', window.scrollY > 500);
  });
}

// Contact form → mailto handoff
const form = document.getElementById('contact-form');
if(form){
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const org = (form.org.value || '').trim();
    const msg = form.message.value.trim();

    const subject = `Proposal request — ${name}${org ? ` (${org})` : ''}`;
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0AOrganisation: ${org || '-'}%0D%0A%0D%0AProject details:%0D%0A${msg}`;

    window.location.href = `mailto:hiltopconsultancy@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
