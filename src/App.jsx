import { useEffect, useRef, useState } from 'react';
import Carousel from './Carousel.jsx';

function Header() {
 const [open, setOpen] = useState(false);
 const toggleRef = useRef(null);
 useEffect(() => {
  function onKey(event) { if (event.key === 'Escape' && open) { setOpen(false); toggleRef.current?.focus(); } }
  document.addEventListener('keydown', onKey);
  return () => document.removeEventListener('keydown', onKey);
 }, [open]);
 return (<header className="site-header">
<div className="utility">
<span>Fully insured · QBCC licensed</span>
<div>
<a className="pill small" href="tel:+61466800608">☎ &nbsp;0466 800 608</a>
<a href="mailto:majhaimprovehomes@gmail.com">Email our team</a>
<a className="pill outline small" href="#contact">Contact</a>
<a className="social-icon" href="https://www.facebook.com/profile.php?id=100071583172390" aria-label="Majha on Facebook">f</a>
</div>
</div>
<div className="brand-row">
<a className="brand" href="#" aria-label="Majha Improve Homes home">MAJHA <span>IMPROVE HOMES</span>
</a>
<p>Your outdoors. Our expertise.</p>
<button className="menu-toggle" aria-expanded={open} aria-controls="navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)} ref={toggleRef}>
<span>
</span>
<span>
</span>
<span>
</span>
</button>
</div>
<nav className={open ? "open" : ""} onClick={(event) => { if (event.target.closest("a")) setOpen(false); }} id="navigation" aria-label="Main navigation">
<a href="#services">Our Services <span>⌄</span>
</a>
<a href="#projects">Our Projects</a>
<a href="#landscaping">Landscaping & Turfing</a>
<a href="#concreting">Driveways & Concreting</a>
<a href="#fencing">Fencing & Gates</a>
<a href="#about">About Us</a>
<a href="#areas">Service Areas</a>
</nav>
</header>);
}

function Hero() {
 const videoRef = useRef(null);
 const [playing, setPlaying] = useState(false);
 const [failed, setFailed] = useState(false);
 useEffect(() => {
  const video = videoRef.current;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  function change() { if (reduced.matches) video.pause(); }
  reduced.addEventListener('change', change);
  if (!reduced.matches) video.play().catch(() => {});
  return () => { reduced.removeEventListener('change', change); video.pause(); };
 }, []);
 function toggleVideo() {
  const video = videoRef.current;
  if (video.paused) video.play().catch(() => setPlaying(false)); else video.pause();
 }
 return (<section className="hero">
<img className="hero-poster" src="https://coralhomes.com.au/wp-content/uploads/COR608947_Highlands_196-3-1.jpg" alt="Australian home and garden, architectural inspiration" />
<video ref={videoRef} className={playing ? "playing" : ""} onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)} id="hero-video" muted loop playsInline preload="metadata" aria-label="Architectural inspiration video">
<source onError={() => setFailed(true)} src="https://coralhomes.com.au/wp-content/uploads/coral_homes_-_highlands_38_loop-720p.mp4" type="video/mp4" />
</video>
<div className="hero-overlay">
</div>
<div className="hero-heading">
<h1>Beautiful Outdoor Living</h1>
<div>
<a className="pill" href="#services">⌂ &nbsp; Our Services</a>
<a className="pill" href="#contact">➤ &nbsp; Request a Quote</a>
</div>
</div>
<div className="video-options">
<span>ARCHITECTURAL INSPIRATION</span>
<button id="video-toggle" hidden={failed} onClick={toggleVideo} aria-label={playing ? "Pause background video" : "Play background video"}>{playing ? "Pause Ⅱ" : "Play ▷"}</button>
</div>
</section>);
}

function FeaturedServices() {
 return (<section className="featured section" id="featured">
<div className="heading">
<p className="eyebrow">BRING YOUR OUTDOORS TO LIFE</p>
<h2>Featured Services</h2>
<p>Make more of your home with landscaping, concreting and fencing.<br />Explore practical improvements and beautiful finishes for your outdoor space.</p>
</div>
<Carousel className="offers" previousLabel="Previous services" nextLabel="Next services" dotsLabel="Choose service slide">
<article className="offer-card">
<div className="offer-photo">
<img src="assets/driveway.png" alt="Concrete driveway from Majha's website" loading="lazy" />
<span className="tag">A BETTER FIRST IMPRESSION</span>
</div>
<div className="offer-body">
<p className="eyebrow">DRIVEWAYS & CONCRETING</p>
<h3>A welcoming arrival</h3>
<p>Driveways and concrete paths that make everyday access easier and bring your frontage together.</p>
<a className="text-link" href="#concreting">Explore Service →</a>
</div>
</article>
<article className="offer-card">
<div className="offer-photo">
<img src="assets/fence.jpeg" alt="Timber boundary fence from Majha's website" loading="lazy" />
<span className="tag">PRIVACY MEETS PRACTICALITY</span>
</div>
<div className="offer-body">
<p className="eyebrow">FENCING & GATES</p>
<h3>A space of your own</h3>
<p>Define your boundary and enjoy a more private outdoor space with fencing and gates.</p>
<a className="text-link" href="#fencing">Explore Service →</a>
</div>
</article>
<article className="offer-card">
<div className="offer-photo">
<img src="assets/hero.jpeg" alt="Garden preparation and turf installation work" loading="lazy" />
<span className="tag">ROOM TO ENJOY THE OUTDOORS</span>
</div>
<div className="offer-body">
<p className="eyebrow">LANDSCAPING & TURFING</p>
<h3>A fresh start outside</h3>
<p>Landscaping and lawns that turn the space around your house into a place you can enjoy.</p>
<a className="text-link" href="#landscaping">Explore Service →</a>
</div>
</article>
<article className="offer-card">
<div className="offer-photo">
<img src="assets/wall.jpg" alt="Retaining wall project from Majha's website" loading="lazy" />
<span className="tag">STRUCTURE FOR YOUR SPACE</span>
</div>
<div className="offer-body">
<p className="eyebrow">RETAINING WALLS</p>
<h3>Shape the possibilities</h3>
<p>Retaining walls and hard structural landscaping to give your outdoor areas definition.</p>
<a className="text-link" href="#retaining">Explore Service →</a>
</div>
</article>
</Carousel>
</section>);
}

function About() {
 return (<section className="about section" id="about">
<div className="about-image">
<img src="assets/hero.jpeg" alt="Majha's outdoor improvement work in progress" loading="lazy" />
</div>
<div className="about-copy">
<h2>Your Local<br />Outdoor Specialists</h2>
<p>Majha Improve Homes is a fully insured, QBCC licensed contractor based in Mango Hill. From landscaping and turfing to driveways, fencing and retaining walls, we help bring the different parts of your outdoor project together.</p>
<div className="credentials">
<div>
<strong>Local</strong>
<span>MANGO HILL BASED</span>
</div>
<div>
<strong>Insured</strong>
<span>PEACE OF MIND</span>
</div>
<div>
<strong>QBCC</strong>
<span>LICENSED</span>
</div>
</div>
<h3 className="signature">
<em>Experience</em> the Majha difference.</h3>
</div>
</section>);
}

function Intent() {
 return (<section className="intent section">
<h2 className="center">I <em>want</em> to...</h2>
<div className="intent-grid">
<a className="intent-tile" href="#landscaping">
<img loading="lazy" src="https://coralhomes.com.au/wp-content/uploads/Leading-Home-Builder.jpg" alt="Home and garden inspiration" />
<span className="image-label">INSPIRATION</span>
<div>
<h3>Transform My Garden</h3>
<span className="pill small">Explore Landscaping</span>
</div>
</a>
<a className="intent-tile" href="#concreting">
<img loading="lazy" src="https://coralhomes.com.au/wp-content/uploads/Best-Home-Builder.jpg" alt="Driveway and home frontage inspiration" />
<span className="image-label">INSPIRATION</span>
<div>
<h3>Upgrade My Driveway</h3>
<span className="pill small">Explore Concreting</span>
</div>
</a>
<a className="intent-tile" href="#fencing">
<img loading="lazy" src="assets/fence.jpeg" alt="Timber fencing" />
<div>
<h3>Create More Privacy</h3>
<span className="pill small">Explore Fencing</span>
</div>
</a>
<a className="intent-tile" href="#retaining">
<img loading="lazy" src="assets/wall.jpg" alt="Retaining wall construction" />
<div>
<h3>Build a Retaining Wall</h3>
<span className="pill small">Explore Retaining Walls</span>
</div>
</a>
</div>
</section>);
}

function Services() {
 return (<section className="services section" id="services">
<h2 className="center">Explore our <em>Services</em>
</h2>
<article className="service-row" id="landscaping">
<div className="service-photo">
<img loading="lazy" src="assets/hero.jpeg" alt="Landscaping preparation and turfing work" />
</div>
<div className="service-copy">
<h3>Landscaping & Turfing</h3>
<p>Make more of your garden with practical landscaping and fresh turf. We help shape the space around your home, from preparing the ground to bringing the outdoor details together.</p>
<a className="pill" href="mailto:majhaimprovehomes@gmail.com?subject=Landscaping%20enquiry">Enquire About Landscaping</a>
</div>
</article>
<article className="service-row reverse" id="concreting">
<div className="service-photo">
<img loading="lazy" src="assets/driveway.png" alt="Finished concrete driveway" />
</div>
<div className="service-copy">
<h3>Driveways & Concreting</h3>
<p>Create a welcoming arrival and useful paths around your property. Talk to us about driveway construction and footpath concreting for the spaces you use every day.</p>
<a className="pill" href="mailto:majhaimprovehomes@gmail.com?subject=Concreting%20enquiry">Enquire About Concreting</a>
</div>
</article>
<article className="service-row" id="fencing">
<div className="service-photo">
<img loading="lazy" src="assets/fence.jpeg" alt="Residential timber boundary fence" />
</div>
<div className="service-copy">
<h3>Fencing & Gates</h3>
<p>Define your boundary with fencing that suits your home and outdoor space. Discuss your fencing and gate requirements with our team, including the look, privacy and access you need.</p>
<a className="pill" href="mailto:majhaimprovehomes@gmail.com?subject=Fencing%20enquiry">Enquire About Fencing</a>
</div>
</article>
<article className="service-row reverse" id="retaining">
<div className="service-photo">
<img loading="lazy" src="assets/wall.jpg" alt="Concrete retaining wall in progress" />
</div>
<div className="service-copy">
<h3>Retaining Walls</h3>
<p>Bring structure and definition to your outdoor areas. Majha Improve Homes provides retaining wall construction and hard structural landscaping tailored to your project's requirements.</p>
<a className="pill" href="mailto:majhaimprovehomes@gmail.com?subject=Retaining%20wall%20enquiry">Enquire About Retaining Walls</a>
</div>
</article>
</section>);
}

function Projects() {
 return (<section className="projects section" id="projects">
<h2 className="center">Discover our <em>work</em>
</h2>
<Carousel className="project-carousel" previousLabel="Previous projects" nextLabel="Next projects" dotsLabel="Choose project slide">
<a className="project-card" href="https://www.facebook.com/profile.php?id=100071583172390">
<img loading="lazy" src="assets/driveway.png" alt="Concrete driveway" />
<h3>Driveway Concreting</h3>
<span>View Our Work</span>
</a>
<a className="project-card" href="https://www.facebook.com/profile.php?id=100071583172390">
<img loading="lazy" src="assets/fence.jpeg" alt="Timber fence" />
<h3>Boundary Fencing</h3>
<span>View Our Work</span>
</a>
<a className="project-card" href="https://www.facebook.com/profile.php?id=100071583172390">
<img loading="lazy" src="assets/wall.jpg" alt="Retaining wall" />
<h3>Retaining Walls</h3>
<span>View Our Work</span>
</a>
<a className="project-card" href="https://www.facebook.com/profile.php?id=100071583172390">
<img loading="lazy" src="assets/hero.jpeg" alt="Landscaping works" />
<h3>Landscaping & Turfing</h3>
<span>View Our Work</span>
</a>
</Carousel>
<a className="pill" href="https://www.facebook.com/profile.php?id=100071583172390">More Projects on Facebook</a>
</section>);
}

function Features() {
 return (<section className="features section">
<h2 className="center">Your Outdoor <em>Possibilities</em>
</h2>
<article className="feature-panel">
<div className="feature-copy charcoal">
<h3>
<em>Beautiful</em>
<br />OUTDOOR SPACES</h3>
<h4>More room to enjoy your home</h4>
<p>From the front entrance to the back garden, bring your ideas for a more practical, inviting outdoor space.</p>
<a className="pill muted" href="#contact">Discuss Your Ideas</a>
</div>
<div className="feature-image">
<img loading="lazy" src="https://coralhomes.com.au/wp-content/uploads/Investor-Home-Design.webp" alt="Australian outdoor living inspiration" />
<span className="image-label">ARCHITECTURAL INSPIRATION</span>
</div>
</article>
<article className="feature-panel flipped">
<div className="feature-copy green">
<h3>Thoughtful<br />Finishing Touches</h3>
<h4>Bring your outdoor project together</h4>
<p>Landscaping, concrete paths, fences and gates. Discuss the connected improvements you need with one local team.</p>
<a className="pill white" href="#services">Explore Our Services</a>
</div>
<div className="feature-image">
<img loading="lazy" src="assets/fence.jpeg" alt="Details of timber fencing and gate" />
</div>
</article>
<article className="feature-panel" id="areas">
<div className="feature-copy stone">
<h3>Local to You</h3>
<h4>Mango Hill & beyond</h4>
<p>Serving Brisbane, North Lakes, Caboolture South and the Sunshine Coast. Call us to discuss your project and location.</p>
<a className="pill white" href="tel:+61466800608">0466 800 608</a>
</div>
<div className="feature-image">
<img loading="lazy" src="assets/hero.jpeg" alt="Majha working on a residential outdoor project" />
</div>
</article>
</section>);
}

function Contact() {
 return (<section className="contact-section section" id="contact">
<h2 className="center">Let's bring your <em>ideas</em> to life.</h2>
<div className="contact-box">
<div>
<p className="eyebrow">MAJHA IMPROVE HOMES</p>
<h3>Your next project<br />starts with a conversation.</h3>
<p>Tell us your location, the work you need and the finish you have in mind.</p>
</div>
<div className="contact-details">
<a className="contact-phone" href="tel:+61466800608">0466 800 608</a>
<a href="mailto:majhaimprovehomes@gmail.com">majhaimprovehomes@gmail.com</a>
<a className="pill" href="mailto:majhaimprovehomes@gmail.com?subject=Project%20quote%20enquiry">Request a Quote</a>
</div>
</div>
</section>);
}

function FAQ() {
 return (<section className="faq section">
<h2 className="center">Frequently Asked <em>Questions</em>
</h2>
<div className="faq-list">
<details>
<summary>What services does Majha Improve Homes provide?</summary>
<p>Landscaping, turfing, driveways, footpath concreting, fencing, gates, retaining walls and hard structural landscaping.</p>
</details>
<details>
<summary>Which areas do you service?</summary>
<p>We are based in Mango Hill and service Brisbane, North Lakes, Caboolture South and the Sunshine Coast. Contact us to discuss your location.</p>
</details>
<details>
<summary>Are you licensed and insured?</summary>
<p>Majha Improve Homes is fully insured and QBCC licensed. Contact the team if you require licence or insurance documentation for your project.</p>
</details>
<details>
<summary>How do I request a quote?</summary>
<p>Call <a href="tel:+61466800608">0466 800 608</a> or email <a href="mailto:majhaimprovehomes@gmail.com">majhaimprovehomes@gmail.com</a> with your location and project details.</p>
</details>
<details>
<summary>Can I see examples of your work?</summary>
<p>View the projects above or visit <a href="https://www.facebook.com/profile.php?id=100071583172390">our Facebook page</a> for more photographs and updates.</p>
</details>
</div>
</section>);
}

function Footer() { return (<footer>
<div className="footer-top">
<a className="brand" href="#">MAJHA <span>IMPROVE HOMES</span>
</a>
<a className="social-icon" href="https://www.facebook.com/profile.php?id=100071583172390" aria-label="Facebook">f</a>
</div>
<div className="footer-grid">
<div>
<h4>OUR SERVICES</h4>
<a href="#landscaping">Landscaping & Turfing</a>
<a href="#concreting">Driveways & Concreting</a>
<a href="#fencing">Fencing & Gates</a>
<a href="#retaining">Retaining Walls</a>
</div>
<div>
<h4>EXPLORE</h4>
<a href="#about">About Majha</a>
<a href="#projects">Our Projects</a>
<a href="#featured">Featured Services</a>
<a href="#contact">Request a Quote</a>
</div>
<div>
<h4>SERVICE AREAS</h4>
<span>Mango Hill</span>
<span>Brisbane & North Lakes</span>
<span>Caboolture South</span>
<span>Sunshine Coast</span>
</div>
<div>
<h4>GET IN TOUCH</h4>
<a href="tel:+61466800608">0466 800 608</a>
<a href="mailto:majhaimprovehomes@gmail.com">majhaimprovehomes@gmail.com</a>
<span>Mango Hill, Queensland</span>
</div>
</div>
<p className="media-note">Project photographs from Majha Improve Homes. Architectural imagery and hero footage from Coral Homes are shown as design inspiration and do not depict Majha projects.</p>
<div className="footer-bottom">
<span>© Majha Improve Homes</span>
<a href="#">Back to top ↑</a>
</div>
</footer>); }
export default function App() {
 return (<><a className="skip" href="#main">Skip to content</a>
<Header />
<main id="main">
<Hero />
<FeaturedServices />
<About />
<Intent />
<Services />
<Projects />
<Features />
<Contact />
<FAQ />
</main>
<Footer />
<a className="floating-contact" href="tel:+61466800608">
<span>☏</span>
<span>Have a project?<br />
<strong>Let's talk</strong>
</span>
</a></>);
}
