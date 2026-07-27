const launchButton = document.getElementById("launchButton");
const countdown = document.getElementById("countdown");

launchButton.addEventListener("click",startLaunch);

async function startLaunch(){

    launchButton.style.display="none";

    const numbers=["3","2","1","LIFTOFF 🚀"];

    for(let i=0;i<numbers.length;i++){

        countdown.innerHTML=numbers[i];

        countdown.classList.add("show");

        await delay(1000);

        countdown.classList.remove("show");

        await delay(300);

    }

}

function delay(ms){

    return new Promise(resolve=>setTimeout(resolve,ms));

}
