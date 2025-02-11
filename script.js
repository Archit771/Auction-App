const players = [
    { name: "Player 1", stats: "Speed: 80, Strength: 75" zz},
    { name: "Player 2", stats: "Speed: 70, Strength: 85" },
    { name: "Player 3", stats: "Speed: 90, Strength: 60" },
    { name: "Player 4", stats: "Speed: 75, Strength: 80" },
    { name: "Player 5", stats: "Speed: 85, Strength: 70" }
];

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const playerCard = document.getElementById("player-card");
const playerName = document.getElementById("player-name");
const playerStats = document.getElementById("player-stats");
const teamTitle = document.getElementById("team-title");
const suggestionsList = document.getElementById("suggestions-list");

const teamNames = ["Team 1", "Team 2", "Team 3", "Team 4"];
let teamIndex = 0; // Keeps track of which team to assign next
let assignedPlayers = []; // Stores assigned players
let teams = [[], [], [], []]; // Array for 4 teams

// ✅ Function to update player suggestions and show team immediately
function updateSuggestions() {
    const query = searchInput.value.trim().toLowerCase();
    suggestionsList.innerHTML = ""; // Clear previous suggestions

    if (query === "") {
        suggestionsList.style.display = "none"; // Hide if empty
        teamTitle.textContent = "Search for a Player"; // Reset team text
        return;
    }

    const filteredPlayers = players.filter(player => 
        player.name.toLowerCase().includes(query) && !assignedPlayers.includes(player.name)
    );

    if (filteredPlayers.length > 0) {
        suggestionsList.style.display = "block"; // Show suggestions
        teamTitle.textContent = `This player is for ${teamNames[teamIndex]}`; // ✅ Show team before clicking
    } else {
        suggestionsList.style.display = "none"; // Hide if no matches
        teamTitle.textContent = "Player not found or already assigned!";
    }

    filteredPlayers.forEach(player => {
        const li = document.createElement("li");
        li.textContent = player.name;
        li.addEventListener("click", () => {
            searchInput.value = player.name;
            suggestionsList.innerHTML = ""; // Clear suggestions when clicked
            suggestionsList.style.display = "none"; // Hide list
            teamTitle.textContent = `This player is for ${teamNames[teamIndex]}`; // ✅ Show team immediately
        });
        suggestionsList.appendChild(li);
    });
}

// ✅ Function to trigger confetti animation when a player is found
function createConfetti() {
    for (let i = 0; i < 500; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.animationDuration = Math.random() * 2 + 1 + "s";
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 2000);
    }
}

// ✅ Search and display player details (confirm selection & show confetti)
searchBtn.addEventListener("click", function () {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        alert("Please enter a player name.");
        return;
    }

    const foundPlayer = players.find(player => player.name.toLowerCase() === query);

    if (foundPlayer && !assignedPlayers.includes(foundPlayer.name)) {
        playerName.textContent = foundPlayer.name;
        playerStats.textContent = foundPlayer.stats;
        playerCard.style.display = "block";

        // ✅ Assign player to a team
        teams[teamIndex].push(foundPlayer);
        assignedPlayers.push(foundPlayer.name); // Prevent duplicate assignment

        teamTitle.textContent = `This player is for ${teamNames[teamIndex]}`;

        createConfetti(); // 🎉 Trigger confetti when a player is confirmed!

        // ✅ Rotate teams for the next search
        teamIndex = (teamIndex + 1) % 4;

        // ✅ If all players are assigned, show final screen
        if (assignedPlayers.length === players.length) {
            setTimeout(showFinalTeams, 2000); // Delay to let confetti finish
        }
    } else {
        alert("Player not found or already assigned!");
        playerCard.style.display = "none";
    }
});

// ✅ Detect input changes and update suggestions dynamically
searchInput.addEventListener("input", updateSuggestions);

// ✅ Function to display final team assignments (End Screen)
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
                    <ul>Team 1</ul>
                    <div>${teamOneNames}</div>
                </div>
                <div class="team team2">
                    <ul>Team 2</ul>
                    <div>${teamTwoNames}</div>
                </div>
                <div class="team team3">
                    <ul>Team 3</ul>
                    <div>${teamThreeNames}</div>
                </div>
                <div class="team team4">
                    <ul>Team 4</ul>
                    <div>${teamFourNames}</div>
                </div>
            </div>
            <button class="restart-btn" onclick="location.reload()">Restart Game</button>
        </div>
    `;
}
