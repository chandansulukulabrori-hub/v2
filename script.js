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
            // Kalkulasi: 6s hitung mundur + 2.5s animasi terbang + 700ms jeda sinematik
            setTimeout(() => {
                triggerDeepSpaceSequence();
            }, 9200); 
        });
    }
});

function triggerDeepSpaceSequence() {
    const spaceContainer = document.getElementById("spaceContainer");
    const moonGroup = document.querySelector(".moon-group");
    const contentDiv = document.querySelector(".content");

    // Sembunyikan elemen awal yang sudah tidak terpakai
    if (contentDiv) {
        contentDiv.style.transition = "opacity 1s ease";
        contentDiv.style.opacity = "0";
    }

    // Munculkan kontainer luar angkasa
    if (spaceContainer) {
        spaceContainer.classList.add("active");
    }

    // Bulan perlahan masuk layar dengan jeda tipis
    setTimeout(() => {
        if (moonGroup) {
            moonGroup.classList.add("active");
        }
    }, 400);

    // Aktifkan efek gerak perlahan (kamera & parallax)
    setTimeout(() => {
        document.body.classList.add("in-deep-space");
    }, 1200);
}
