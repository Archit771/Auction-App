const players = [
    { name: "Player 1", stats: "Speed: 80, Strength: 75" },
    { name: "Player 2", stats: "Speed: 70, Strength: 85" },
    { name: "Player 3", stats: "Speed: 90, Strength: 60" },
    { name: "Player 4", stats: "Speed: 75, Strength: 80" },
    { name: "Player 5", stats: "Speed: 85, Strength: 70" }
];

let teamToggle = true;
let currentPlayerIndex = 0;

const teamTitle = document.getElementById("team-title");
const playerName = document.getElementById("player-name");
const playerStats = document.getElementById("player-stats");
const drawBtn = document.getElementById("draw-btn");

const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 350;
canvas.height = 200;

function setupScratchCard() {
    ctx.fillStyle = "#a1a1a1"; // Scratch layer color
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let isDrawing = false;
    let totalArea = canvas.width * canvas.height;
    let scratchedArea = 0;
    const scratchThreshold = 1; // 50%

    function clearScratch(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();

        scratchedArea += Math.PI * 20 * 20; // Area of circle scratched

        if (scratchedArea / totalArea >= scratchThreshold) {
            fadeOutScratchCard();
        }
    }

    function fadeOutScratchCard() {
        canvas.style.transition = "opacity 0.5s ease-out";
        canvas.style.opacity = 0;
        setTimeout(() => canvas.remove(), 500);
        createConfetti();
    }

    canvas.addEventListener("mousedown", () => isDrawing = true);
    canvas.addEventListener("mouseup", () => isDrawing = false);
    canvas.addEventListener("mousemove", (e) => isDrawing && clearScratch(e));
}

function drawPlayer() {
    if (currentPlayerIndex >= players.length) {
        drawBtn.disabled = true;
        drawBtn.textContent = "All Players Assigned!";
        return;
    }

    const team = teamToggle ? "Team One" : "Team Two";
    teamTitle.textContent = `This player is for ${team}`;

    const player = players[currentPlayerIndex];
    playerName.textContent = player.name;
    playerStats.textContent = player.stats;

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#a1a1a1";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    canvas.style.opacity = 1;

    teamToggle = !teamToggle;
    currentPlayerIndex++;

    
}

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.animationDuration = Math.random() * 2 + 1 + "s";
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 2000);
    }
}

drawBtn.addEventListener("click", drawPlayer);
drawBtn.addEventListener("click", setupScratchCard);
setupScratchCard();
