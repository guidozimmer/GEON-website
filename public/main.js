gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin, GSDevTools);

gsap.defaults({ease: "none"});

const pulses = gsap.timeline({
    defaults: {
      scale: 2,
      autoAlpha:1,
      transformOrigin: 'center', 
      ease: "elastic(2.5, 1)"
    }})
  .to(".text01", {}, 0.84) 
  .to(".text02", {}, 1.36)
  .to(".text03", {}, 1.92)
  

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

GSDevTools.create({animation:main})