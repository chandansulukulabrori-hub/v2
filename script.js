const countdown = document.getElementById("countdown");
const launchButton = document.getElementById("launchButton");

launchButton.addEventListener("click", () => {

    launchButton.disabled = true;

    let timeLeft = 6;

    countdown.textContent = `T - ${timeLeft}`;

    const timer = setInterval(() => {

        timeLeft--;

        if (timeLeft > 0) {
            countdown.textContent = `T - ${timeLeft}`;
        } else {
            clearInterval(timer);

            countdown.textContent = "🚀 Liftoff!";

            // pindah halaman setelah 1 detik
            setTimeout(() => {
                window.location.href = "home.html";
            }, 1000);
        }

    }, 1000);

});
