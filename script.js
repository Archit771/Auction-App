const players = [
    { name: "Aarav K" },
    { name: "Aarush A" },
    { name: "Adesh A" },
    { name: "Alim G" },
    { name: "Almira L" },
    { name: "Aniksha B" },
    { name: "Anish M" },
    { name: "Ankush A" },
    { name: "Arham J" },
    { name: "Arjun J" },
    { name: "Arjun P" },
    { name: "Atharva A" },
    { name: "Attharva A" },
    { name: "Gaurav W" },,
    { name: "Humayun K" },
    { name: "Kanav" },
    { name: "Kashvi C" },
    { name: "Nikunj V" },
    { name: "Princeton T" },
    { name: "Priya K" },
    { name: "Rehaan B" },
    { name: "Reyaasnh B" },
    { name: "Reyansh J" },
    { name: "Rimsha D" },
    { name: "Riyansh S" },
    { name: "Ryan S" },
    { name: "Sai D" },
    { name: "Sanika B" },
    { name: "Sanvi G" },
    { name: "Swarad S" },
    { name: "Tarini K" },
    { name: "Vansh G" },
    { name: "Viaan J" },
    { name: "Viacna J" },
    { name: "Vidhi K" },
    { name: "Viraj" },
    { name: "Yash S" }
];

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const playerCard = document.getElementById("player-card");
const playerName = document.getElementById("player-name");
const playerImage = document.getElementById("player-image"); // Ensure this exists in HTML
const teamTitle = document.getElementById("team-title");
const suggestionsList = document.getElementById("suggestions-list");

const teamNames = ["Team 1", "Team 2", "Team 3", "Team 4"];
let teamIndex = 0;
let assignedPlayers = [];
let teams = [[], [], [], []];

function updateSuggestions() {
    const query = searchInput.value.trim().toLowerCase();
    suggestionsList.innerHTML = "";

    if (query === "") {
        suggestionsList.style.display = "none";
        teamTitle.textContent = "Search for a Player";
        return;
    }

    const filteredPlayers = players.filter(player =>
        player.name.toLowerCase().includes(query) && !assignedPlayers.includes(player.name)
    );

    if (filteredPlayers.length > 0) {
        suggestionsList.style.display = "block";
        teamTitle.textContent = `This player is for ${teamNames[teamIndex]}`;
    } else {
        suggestionsList.style.display = "none";
        teamTitle.textContent = "Player not found or already assigned!";
    }

    filteredPlayers.forEach(player => {
        const li = document.createElement("li");
        li.textContent = player.name;
        li.addEventListener("click", () => {
            searchInput.value = player.name;
            suggestionsList.innerHTML = "";
            suggestionsList.style.display = "none";
            teamTitle.textContent = `This player is for ${teamNames[teamIndex]}`;
        });
        suggestionsList.appendChild(li);
    });
}

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

searchBtn.addEventListener("click", function () {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        alert("Please enter a player name.");
        return;
    }

    const foundPlayer = players.find(player => player.name.toLowerCase() === query);

    if (foundPlayer && !assignedPlayers.includes(foundPlayer.name)) {
        playerName.textContent = foundPlayer.name;

        // Convert player name to image filename (replace spaces with underscores)
        let imageName = foundPlayer.name+ ".png";

        playerImage.src = imageName;
        playerImage.style.display = "block"; // Ensure image is visible
        playerImage.onerror = function () { 
            playerImage.src = foundPlayer.name.replace(/\s+/g, "_") + ".jpg"; // Fallback to JPG
        };

        playerCard.style.display = "block";

        teams[teamIndex].push(foundPlayer);
        assignedPlayers.push(foundPlayer.name);

        teamTitle.textContent = `This player is for ${teamNames[teamIndex]}`;

        createConfetti();

        teamIndex = (teamIndex + 1) % 4;

        if (assignedPlayers.length === players.length) {
            setTimeout(showFinalTeams, 2000);
        }
    } else {
        alert("Player not found or already assigned!");
        playerCard.style.display = "none";
    }
});

searchInput.addEventListener("input", updateSuggestions);

function showFinalTeams() {
    const teamOneNames = teams[0].map(player => `<li>${player.name}</li>`).join("");
    const teamTwoNames = teams[1].map(player => `<li>${player.name}</li>`).join("");
    const teamThreeNames = teams[2].map(player => `<li>${player.name}</li>`).join("");
    const teamFourNames = teams[3].map(player => `<li>${player.name}</li>`).join("");

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
        </div>
    `;
}
