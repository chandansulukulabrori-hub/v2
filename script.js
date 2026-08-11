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

launchButton.addEventListener("click", startLaunch);

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

window.addEventListener('DOMContentLoaded', () => {
    const launchBtn = document.getElementById("launchButton");
    if (launchBtn) {
        launchBtn.addEventListener("click", () => {
            setTimeout(() => {
                triggerDeepSpaceSequence();
            }, 9200); 
        });
    }
});

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
