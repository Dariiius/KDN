// gsap.registerPlugin(Observer, SplitText);

// let sections = document.querySelectorAll(".panel");
// let outerWrappers = gsap.utils.toArray(".outer");
// let innerWrappers = gsap.utils.toArray(".inner");
// let headings = gsap.utils.toArray(".section-heading");
// let images = document.querySelectorAll(".bg");
// let splitHeadings = headings.map(heading => new SplitText(
//     heading, { type: "chars,words,lines", linesClass: "clip-text" }
//   ));
// let currentIndex = -1;
// let wrap = gsap.utils.wrap(0, sections.length);
// let animating;

// gsap.set(outerWrappers, { yPercent: 100 });
// gsap.set(innerWrappers, { yPercent: -100 });

// function gotoSection(index, direction) {
//   index = wrap(index);
//   animating = true;
//   let fromTop = direction === -1
//   let dFactor = fromTop ? -1 : 1

//   tl = gsap.timeline({
//     defaults: { duration: 1.25, ease: "power1.inOut" },
//     onComplete: () => animating = false
//   });

//   if (currentIndex >= 0) {
//     gsap.set(sections[currentIndex], { zIndex: 0 });
    
//     tl.to(images[currentIndex], { yPercent: -15 * dFactor })
//       .set(sections[currentIndex], { autoAlpha: 0 });
//   }

//   gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });

//   tl.fromTo([outerWrappers[index], innerWrappers[index]], { 
//       yPercent: i => i ? -100 * dFactor : 100 * dFactor
//     }, { 
//       yPercent: 0 
//     }, 0)
//     .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
//     .fromTo(splitHeadings[index].chars, { 
//         autoAlpha: 0, 
//         yPercent: 150 * dFactor
//     }, {
//         autoAlpha: 1,
//         yPercent: 0,
//         duration: 1,
//         ease: "power2",
//         stagger: {
//           each: 0.02,
//           from: "random"
//         }
//       }, 0.5);

//   currentIndex = index;
// }

// Observer.create({
//   type: "wheel,touch,pointer",
//   wheelSpeed: -1,
//   onDown: () => !animating && gotoSection(currentIndex - 1, -1),
//   onUp: () => !animating && gotoSection(currentIndex + 1, 1),
//   tolerance: 10,
//   preventDefault: true
// });

// gotoSection(0, 1);

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let panels = gsap.utils.toArray(".panel"),
    observer,
    scrollTween;

if (ScrollTrigger.isTouch === 1) {
  observer = ScrollTrigger.normalizeScroll(true);
}

// on touch devices, ignore touchstart events if there's an in-progress tween so that touch-scrolling doesn't interrupt and make it wonky
document.addEventListener("touchstart", e => {
  if (scrollTween) {
    e.preventDefault();
    e.stopImmediatePropagation();
  }
}, {capture: true, passive: false})

function goToSection(i) {
  scrollTween = gsap.to(window, {
    scrollTo: {y: i * innerHeight, autoKill: false},
    onStart: () => {
      if (!observer) return;
      observer.disable(); // for touch devices, as soon as we start forcing scroll it should stop any current touch-scrolling, so we just disable() and enable() the normalizeScroll observer
      observer.enable();
    },
    duration: 1,
    onComplete: () => scrollTween = null,
    overwrite: true
  });
}

panels.forEach((panel, i) => {
  ScrollTrigger.create({
    trigger: panel,
    start: "top bottom",
    // end: "+=199%",
    onToggle: self => self.isActive && !scrollTween && goToSection(i)
  });
});

// just in case the user forces the scroll to an inbetween spot (like a momentum scroll on a Mac that ends AFTER the scrollTo tween finishes):
ScrollTrigger.create({
  start: 0, 
  end: "max",
  snap: 1 / (panels.length - 1)
})

let tl1 = gsap.timeline({
  scrollTrigger: {
    trigger: ".panel",
    // start: "top bottom",
    // end: "bottom top",
    // start: "bottom bottom",
    start: "0%",
    end: "200%",
    scrub: true,
    markers: true,
    id: "scrub"
  } 
});
tl1.to(".b", {
  duration: 1,
  x: 400,
});
tl1.to(".b", {
  duration: 1,
  x: 800,
});

let tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".panel",
    // start: "top bottom",
    // end: "bottom top",
    // start: "bottom bottom",
    start: "0%",
    end: "200%",
    scrub: true,
    markers: true,
    id: "scrub"
  } 
});
tl2.to(".c", {
  duration: 1,
  x: 900,
});
tl2.to(".c", {
  duration: 1,
  x: 700,
});
