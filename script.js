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
    "LIFTOFF 🚀"
];

launchButton.addEventListener("click", startLaunch);

async function startLaunch(){
    // Sembunyikan tombol, munculkan teks countdown dan roket
    launchButton.style.display = "none";
    countdown.style.display = "block";
    rocketContainer.style.display = "block"; 

    for(const item of numbers){
        countdown.textContent = item;

        // Pemicu 1: Di T-04, api mesin mulai menyala pelan
        if(item === "T - 04") {
            rocketContainer.classList.add("engine-start");
        }

        // Pemicu 2: Di IGNITION, Roket bergetar hebat & asap mengepul
        if(item === "IGNITION") {
            rocketContainer.classList.add("rocket-shake");
            document.body.classList.add("camera-shake"); 
        }

        // Pemicu 3: Di LIFTOFF, Roket meluncur & Background Berubah
        if(item === "LIFTOFF 🚀") {
            rocketContainer.classList.remove("rocket-shake"); 
            document.body.classList.remove("camera-shake"); 
            
            // Roket meluncur ke atas
            rocketContainer.classList.add("rocket-liftoff"); 
            
            // Background berubah jadi langit luar angkasa
            document.body.classList.add("to-space");
        }

        await sleep(1000); // Jeda 1 detik per tulisan
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
