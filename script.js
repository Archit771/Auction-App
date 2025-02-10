const players = [
    { name: "Player 1", stats: "Speed: 80, Strength: 75" },
    { name: "Player 2", stats: "Speed: 70, Strength: 85" },
    { name: "Player 3", stats: "Speed: 90, Strength: 60" },
    { name: "Player 4", stats: "Speed: 75, Strength: 80" },
    { name: "Player 5", stats: "Speed: 85, Strength: 70" }
];

// Shuffle the players array randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffleArray(players);

const teamNames = ["Team One", "Team Two", "Team Three", "Team Four"]; // Controls team switching
let currentPlayerIndex = 0;
let teams = [[], [], [], []]; // 4 teams as an array of arrays
let teamIndex = 0; // Keeps track of which team to assign the next player



const teamTitle = document.getElementById("team-title");
const playerName = document.getElementById("player-name");
const playerStats = document.getElementById("player-stats");
const drawBtn = document.getElementById("draw-btn");

function drawPlayer() {
    if (currentPlayerIndex >= players.length) {
        showFinalTeams();
        drawBtn.disabled = true;
        drawBtn.textContent = "All Players Assigned!";
        return;
    }

    // Get the next player randomly from the shuffled array
    const player = players[currentPlayerIndex];

   // Assign player to one of the 4 teams in a rotating manner
    teams[teamIndex].push(player);
    teamTitle.textContent = `This player is for ${teamNames[teamIndex]}`;


    playerName.textContent = player.name;
    playerStats.textContent = player.stats;

    // Toggle teams for next draw
    teamIndex = (teamIndex + 1) % 4;
    currentPlayerIndex++;

    // Remove old canvas and create a new one
    const oldCanvas = document.getElementById("scratchCanvas");
    if (oldCanvas) oldCanvas.remove();

    const newCanvas = document.createElement("canvas");
    newCanvas.id = "scratchCanvas";
    newCanvas.width = 350;
    newCanvas.height = 200;
    newCanvas.style.position = "absolute";
    newCanvas.style.top = "0";
    newCanvas.style.left = "0";
    newCanvas.style.cursor = "crosshair";
    newCanvas.style.background = "#ccc";

    document.getElementById("scratch-card").appendChild(newCanvas);

    // Update the canvas reference and context
    canvas = newCanvas;
    ctx = canvas.getContext("2d");

    setupScratchCard(); // Reinitialize scratch functionality
}

// Function to display final team assignments
function showFinalTeams() {
    const teamOneNames = teams[0].map(player => `<li>${player.name} - ${player.stats}</li>`).join("");
    const teamTwoNames = teams[1].map(player => `<li>${player.name} - ${player.stats}</li>`).join("");
    const teamThreeNames = teams[2].map(player => `<li>${player.name} - ${player.stats}</li>`).join("");
    const teamFourNames = teams[3].map(player => `<li>${player.name} - ${player.stats}</li>`).join("");


    document.body.innerHTML = `
        <div class="final-results">
            <h1>Final Teams</h1>
            <div class="team-container">
                <div class="team team1">
                    <ul>Team One</ul>
                    <div>${teamOneNames}</div>
                </div>
                <div class="team team2">
                    <ul>Team Two</ul>
                    <div>${teamTwoNames}</div>
                </div>
                <div class="team team3">
                    <ul>Team Three</ul>
                    <div>${teamThreeNames}</div>
                </div>
                <div class="team team4">
                    <ul>Team Four</ul>
                    <div>${teamFourNames}</div>
                </div>
            </div>
            <!-- <button class="restart-btn" onclick="location.reload()">Restart Game</button> -->
        </div>
        <img src="Logo.png" alt="Power Play Logo" class="logo1">
        <img src="Payment.png" alt="Power Play Logo" class="pay1">
        <h2 class="donate1">Scan To Donate</h2>
    `;
    // Add click event to expand team cards
    document.querySelectorAll(".team").forEach(team => {
        team.addEventListener("click", function () {
            if (this.classList.contains("fullscreen")) {
                this.classList.remove("fullscreen"); // Exit full-screen mode
            } else {
                document.querySelectorAll(".team").forEach(t => t.classList.remove("fullscreen")); // Reset others
                this.classList.add("fullscreen"); // Expand this card
            }
        });
    });

}


// Function to set up scratch card functionality
function setupScratchCard() {
    // Ensure we get the latest canvas
    const canvas = document.getElementById("scratchCanvas");
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#a1a1a1"; // Scratch layer color
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let isDrawing = false;
    let totalArea = canvas.width * canvas.height;
    let scratchedArea = 0;
    const scratchThreshold = 2; // 50%

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

    // Add event listeners to the new canvas
    canvas.addEventListener("mousedown", () => isDrawing = true);
    canvas.addEventListener("mouseup", () => isDrawing = false);
    canvas.addEventListener("mousemove", (e) => isDrawing && clearScratch(e));
}

// Function to create confetti animation
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

// Initialize scratch card on page load
setupScratchCard();
drawBtn.addEventListener("click", drawPlayer);
