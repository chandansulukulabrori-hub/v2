const launchButton = document.getElementById("launchButton");
const countdown = document.getElementById("countdown");
const rocketContainer = document.getElementById("rocketContainer");
const numbers = [
    "T - 05",
    "T - 04",
    "T - 03",
    "T - 02",
    "T - 01",
    "IGNITION",
    "LIFTOFF"
];

// Durasi animasi CSS yang harus ditunggu SETELAH langkah "LIFTOFF" tampil,
// supaya sequence ruang angkasa gak mulai sebelum roket & transisi langit selesai.
// - .rocket-liftoff (di style.css) durasinya 2.5s
// - .to-space (di style.css) durasinya 3s
// Diambil yang paling lama, ditambah sedikit jeda (200ms) biar mulus.
const LIFTOFF_ANIM_MS = 2500;
const SKY_TRANSITION_MS = 3000;
const POST_LIFTOFF_BUFFER_MS = 200;
const WAIT_AFTER_LIFTOFF_MS = Math.max(LIFTOFF_ANIM_MS, SKY_TRANSITION_MS) + POST_LIFTOFF_BUFFER_MS;

launchButton.addEventListener("click", handleLaunchClick);

async function handleLaunchClick() {
    await startLaunch();
    await sleep(WAIT_AFTER_LIFTOFF_MS);
    triggerDeepSpaceSequence();
}

async function startLaunch(){
    launchButton.style.display = "none";
    countdown.style.display = "block";
    rocketContainer.style.display = "block"; 
    for(const item of numbers){
        countdown.textContent = item;
        if(item === "T - 04") {
            rocketContainer.classList.add("engine-start");
        }
        if(item === "IGNITION") {
            rocketContainer.classList.add("rocket-shake");
            document.body.classList.add("camera-shake"); 
        }
        if(item === "LIFTOFF") {
            rocketContainer.classList.remove("rocket-shake"); 
            document.body.classList.remove("camera-shake"); 
            
            rocketContainer.classList.add("rocket-liftoff"); 
            document.body.classList.add("to-space");
        }
        await sleep(1000); 
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function triggerDeepSpaceSequence() {
    const spaceContainer = document.getElementById("spaceContainer");
    const moonGroup = document.querySelector(".moon-group");
    const landingSection = document.getElementById("landing");
    if (landingSection) {
        landingSection.style.transition = "opacity 1s ease";
        landingSection.style.opacity = "0";
        setTimeout(() => {
            landingSection.style.display = "none";
        }, 1000);
    }
    if (spaceContainer) {
        spaceContainer.classList.add("active");
    }
    setTimeout(() => {
        if (moonGroup) {
            moonGroup.classList.add("active");
        }
    }, 400);
    setTimeout(() => {
        document.body.classList.add("in-deep-space");
    }, 1200);
    setTimeout(() => {
        showPostLaunchContent();
    }, 3500);
}

function showPostLaunchContent() {
    const postContent = document.getElementById("postLaunchContent");
    
    if(postContent) {
        postContent.classList.remove("hidden");
        void postContent.offsetWidth; 
        postContent.style.opacity = "1";
        
        initScrollObserver();
    }
}

function initScrollObserver() {
    const fadeElements = document.querySelectorAll('.fade-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { 
        threshold: 0.15, 
        rootMargin: "0px 0px -50px 0px"
    });
    fadeElements.forEach(el => observer.observe(el));
}
