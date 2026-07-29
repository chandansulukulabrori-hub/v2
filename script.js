const launchButton = document.getElementById("launchButton");
const countdown = document.getElementById("countdown");

const numbers = [
    "T - 05"
    "T - 04"
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

    for(const item of numbers){

        countdown.textContent = item;

        await sleep(1000);

    }

}

function sleep(ms){

    return new Promise(resolve => setTimeout(resolve, ms));

}
