const tl = gsap.timeline({ paused: true });

// Ensure timeline is registered for HyperFrames
window.__timelines = [tl];


// Animation for chunk-0 (Start: 0s, End: 3s)
tl.to("#chunk-0", { opacity: 1, duration: 0.5 }, 0);
tl.fromTo("#chunk-0 .spoken-text", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, 0 + 0.2);
tl.to("#chunk-0", { opacity: 0, duration: 0.5 }, 3 - 0.5);

// Animation for chunk-1 (Start: 3s, End: 8s)
tl.to("#chunk-1", { opacity: 1, duration: 0.5 }, 3);
tl.fromTo("#chunk-1 .spoken-text", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, 3 + 0.2);
tl.fromTo("#chart-1", { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)" }, 3 + 0.4);
tl.to("#chunk-1", { opacity: 0, duration: 0.5 }, 8 - 0.5);

// Animation for chunk-2 (Start: 8s, End: 10s)
tl.to("#chunk-2", { opacity: 1, duration: 0.5 }, 8);
tl.fromTo("#chunk-2 .spoken-text", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, 8 + 0.2);
tl.to("#chunk-2", { opacity: 0, duration: 0.5 }, 10 - 0.5);
