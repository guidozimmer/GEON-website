gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin, GSDevTools);

gsap.defaults({ease: "none"});



const fadeInTimeline = gsap.timeline({
    defaults: {
        autoAlpha: 0,
        ease: "power2.out",
        duration: 3,
        filter: "blur(0px)"
    }
})


// Select all elements with the class .infoBox
document.querySelectorAll('.infoBox').forEach(function(element, index) {
  // Add each element to the timeline with a 1-second delay between them
  fadeInTimeline.to(element, {
    autoAlpha: 1,
    x: "0",
    duration: 5.5
  }, index + 2.5); // `index * 1` creates a 1-second delay between each animation
})




const main = gsap.timeline({
  scrollTrigger: {
    trigger: "body",
    scrub: true,
    start: "top top",   
    end: "bottom",  
  }
})

.add(fadeInTimeline, 0) 
.to({}, { duration: 6.5 });






// GSDevTools for debugging
//GSDevTools.create({animation: main});
