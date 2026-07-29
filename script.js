const launchButton = document.getElementById("launchButton");
const countdown = document.getElementById("countdown");

launchButton.addEventListener("click", () => {

    launchButton.disabled = true;

    let seconds = 6;

    countdown.textContent = `T - ${seconds}`;

    const timer = setInterval(() => {

        seconds--;

        if (seconds > 0) {

            countdown.textContent = `T - ${seconds}`;

        } else {

            clearInterval(timer);

            countdown.textContent = "🚀 Liftoff!";

            setTimeout(() => {
                // Ganti sesuai halaman berikutnya
                window.location.href = "home.html";
            }, 1000);

        }

    }, 1000);

});
