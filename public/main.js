gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin, GSDevTools);

gsap.defaults({ease: "none"});

const pulses = gsap.timeline({
    defaults: {
      scale: 0.75,
      duration: 4,
      transformOrigin: 'center', 
      ease: "expo.out"      // Smooth deceleration
    }})
.to(".theOrangeLine", {}, 1.80) 
.to(".theLine", {}, 1.80) 



  

const main = gsap.timeline({
    scrollTrigger: {
        trigger: "#svg",
        scrub: true,
        start: "top center",
        end: "bottom center"
    }
})

.from(".theLine", {drawSVG:0, duration:4}, 0)

.add(pulses, 0 )

//GSDevTools.create({animation:main})





document.addEventListener('DOMContentLoaded', function() {
    // Sensitivity factor: the higher the value, the slower the scrolling
    const sensitivityFactor = 5;

    // Select all elements with the class 'container'
    const sensitiveSections = document.querySelectorAll('.container');

    sensitiveSections.forEach(function(section) {
        section.addEventListener('wheel', function(e) {
            const originalScrollAmount = e.deltaY;

            // Adjust the scroll position
            const newScrollAmount = originalScrollAmount / sensitivityFactor;

            // Apply the reduced scroll
            section.scrollTop += newScrollAmount;
        });
    });
});
