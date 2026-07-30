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
    launchButton.style.display = "none";
    countdown.style.display = "block";
    rocketContainer.style.display = "block"; 

    for(const item of numbers){
        countdown.textContent = item;

        // Di T-04, api mesin mulai menyala pelan
        if(item === "T - 04") {
            rocketContainer.classList.add("engine-start");
        }

        // Di IGNITION, Roket bergetar hebat & asap abu-abu mengepul
        if(item === "IGNITION") {
            rocketContainer.classList.add("rocket-shake");
            document.body.classList.add("camera-shake"); 
        }

        // Di LIFTOFF, Roket meluncur & Background Berubah jadi luar angkasa
        if(item === "LIFTOFF 🚀") {
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
