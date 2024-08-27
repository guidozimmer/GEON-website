gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin, GSDevTools);

gsap.defaults({ease: "none"});



const fadeInTimeline = gsap.timeline({
    defaults: {
        autoAlpha: 0,
        ease: "power2.out",
        duration: 1.5 
    }
})
.to(".element1", {
    autoAlpha: 1,
    x: "-50px", 
    ease: "power2.out", 
    filter: "blur(0px)", 
}, 2)



const main = gsap.timeline({
  scrollTrigger: {
    trigger: ".introSection",
    scrub: true,
    start: "top top",   
    end: "bottom",  
  }
})

.add(fadeInTimeline, 0) 
.to({}, { duration: 1.5 });






// GSDevTools for debugging
GSDevTools.create({animation: main});
