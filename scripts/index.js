import './script.js';



gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
    trigger: ".analogies",
    start: "top top", // When the top of the analogies section reaches the top of the window
    end: "bottom top", // When the bottom of the analogies section reaches the top of the window
    onEnter: () => gsap.to(".header", { color: '#f52571', duration: 0.5 }),
    onLeaveBack: () => gsap.to(".header", { color: '', duration: 0.5 }),
});
