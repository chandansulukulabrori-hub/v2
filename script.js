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

// Event listener tombol launch
launchButton.addEventListener("click", startLaunch);

async function startLaunch(){
    launchButton.style.display = "none";
    countdown.style.display = "block";
    rocketContainer.style.display = "block"; 

    for(const item of numbers){
        countdown.textContent = item;

        // Pemicu 1: T-04 (Mesin nyala & asap tipis)
        if(item === "T - 04") {
            rocketContainer.classList.add("engine-start");
        }

        // Pemicu 2: IGNITION (Getaran & asap tebal)
        if(item === "IGNITION") {
            rocketContainer.classList.add("rocket-shake");
            document.body.classList.add("camera-shake"); 
        }

        // Pemicu 3: LIFTOFF (Terbang & langit berubah)
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

// ========================================
// POST-LIFTOFF TIMELINE & DEEP SPACE SEQUENCE
// ========================================
window.addEventListener('DOMContentLoaded', () => {
    const launchBtn = document.getElementById("launchButton");
    if (launchBtn) {
        launchBtn.addEventListener("click", () => {
            // Kalkulasi: 6s hitung mundur + 2.5s animasi terbang + 700ms jeda sinematik = 9200ms
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

    // Sembunyikan halaman awal (tulisan & roket yg udah terbang)
    if (landingSection) {
        landingSection.style.transition = "opacity 1s ease";
        landingSection.style.opacity = "0";
        setTimeout(() => {
            landingSection.style.display = "none";
        }, 1000);
    }

    // Munculkan kontainer luar angkasa
    if (spaceContainer) {
        spaceContainer.classList.add("active");
    }

    // Bulan perlahan masuk layar
    setTimeout(() => {
        if (moonGroup) {
            moonGroup.classList.add("active");
        }
    }, 400);

    // Aktifkan efek gerak perlahan (kamera & parallax)
    setTimeout(() => {
        document.body.classList.add("in-deep-space");
    }, 1200);

    // Buka akses ke cerita & galeri setelah suasana tenang (3 detik setelah luar angkasa muncul)
    setTimeout(() => {
        showPostLaunchContent();
    }, 3500);
}

function showPostLaunchContent() {
    const postContent = document.getElementById("postLaunchContent");
    
    if(postContent) {
        postContent.classList.remove("hidden");
        // Force reflow agar transisi CSS jalan
        void postContent.offsetWidth; 
        postContent.style.opacity = "1";
        
        // Inisialisasi efek animasi saat scroll (fade-in-up)
        initScrollObserver();
    }
}

function initScrollObserver() {
    const fadeElements = document.querySelectorAll('.fade-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Jika elemen masuk ke dalam pandangan layar
            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: hentikan observasi jika hanya ingin animasi 1x jalan
                // observer.unobserve(entry.target); 
            }
        });
    }, { 
        threshold: 0.15, // Memicu animasi saat 15% elemen terlihat 
        rootMargin: "0px 0px -50px 0px"
    });

    fadeElements.forEach(el => observer.observe(el));
}
