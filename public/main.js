gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin, GSDevTools);

gsap.defaults({ease: "none"});



//GSDevTools.create({animation:main})


document.addEventListener("DOMContentLoaded", function() {
    const lines = document.querySelectorAll('.vertical-line');


    function adjustHeight() {
        lines.forEach((element) => {
            const pageWidth = window.innerWidth;
            const pageHeight = window.innerHeight;

            const newHeight = (0.01 * pageHeight) * (0.01 * pageWidth);            
            
            element.style.height = `${newHeight}px`;
            element.style.borderLeft = "1px solid red";

        });
    }

    // Call function on page load and resize
    window.addEventListener('load', adjustHeight);
    window.addEventListener('resize', adjustHeight);




    // Define a global variable for scale timeline
    const scale = gsap.timeline({
        defaults: {
            scale: 0.75,
            duration: 4,
            transformOrigin: 'center',
            ease: "expo.out" // Smooth deceleration
        }
    })
    scale.to(".container", {}, 1.80)

    
    const main = gsap.timeline({
        scrollTrigger: {
            trigger: "#svg",
            scrub: true,
            start: "top center",
            end: "bottom center"
        }
    })
    .from(".theLine", {drawSVG: 0, duration: 4}, 0)
    .add(scale, 0); // Add the scale timeline only if it's defined

});
