import { Children, useEffect, useRef, useState } from 'react';

export default function Carousel({ children, className, previousLabel, nextLabel, dotsLabel }) {
  const trackRef = useRef(null);
  const [positions, setPositions] = useState([0]);
  const [current, setCurrent] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });
  const positionsRef = useRef([0]);
  const count = Children.count(children);

  useEffect(() => {
    const track = trackRef.current;
    function update() {
      const max = Math.max(0, track.scrollWidth - track.clientWidth);
      setEdges({ start: track.scrollLeft < 5, end: track.scrollLeft >= max - 5 });
      let nearest = 0;
      positionsRef.current.forEach((left, i) => {
        if (Math.abs(left - track.scrollLeft) < Math.abs(positionsRef.current[nearest] - track.scrollLeft)) nearest = i;
      });
      setCurrent(nearest);
    }
    function measure() {
      const cards = [...track.children];
      const max = Math.max(0, track.scrollWidth - track.clientWidth);
      const values = [...new Set(cards.map(card => Math.max(0, Math.min(card.offsetLeft - cards[0].offsetLeft, max))))];
      positionsRef.current = values;
      setPositions(values);
      update();
    }
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    for (const card of track.children) observer.observe(card);
    track.addEventListener('scroll', update, { passive: true });
    measure();
    return () => { observer.disconnect(); track.removeEventListener('scroll', update); };
  }, [count]);

  function behavior() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  }
  function move(direction) {
    const track = trackRef.current;
    const card = track.firstElementChild;
    if (!card) return;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    track.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: behavior() });
  }

  return (
    <div className={'carousel ' + className} data-carousel="">
      <button type="button" className="arrow previous" aria-label={previousLabel} disabled={edges.start} onClick={() => move(-1)}>❮</button>
      <div className="track" ref={trackRef}>{children}</div>
      <button type="button" className="arrow next" aria-label={nextLabel} disabled={edges.end} onClick={() => move(1)}>❯</button>
      <div className="dots" aria-label={dotsLabel}>
        {positions.map((left, i) => (
          <button type="button" key={i} aria-label={'Go to slide ' + (i + 1)} aria-current={i === current ? 'true' : 'false'} onClick={() => trackRef.current.scrollTo({ left, behavior: behavior() })} />
        ))}
      </div>
    </div>
  );
}
