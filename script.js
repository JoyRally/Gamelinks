// Sample game data
const games = [
    { id: 1, title: "Cyber Quest", desc: "Futuristic RPG adventure", icon: "🧠" },
    { id: 2, title: "Dragon Realm", desc: "Epic fantasy battle game", icon: "🐉" },
    { id: 3, title: "Neon Racing", desc: "High-speed futuristic racing", icon: "🚗" },
    { id: 4, title: "Space Explorers", desc: "Explore the unknown universe", icon: "🚀" },
    { id: 5, title: "Magic Puzzles", desc: "Mind-bending puzzle adventure", icon: "🧩" },
    { id: 6, title: "Zombie Survival", desc: "Survive the zombie apocalypse", icon: "🧟" },
    { id: 7, title: "Ocean Odyssey", desc: "Underwater exploration game", icon: "🐙" },
    { id: 8, title: "Wild West", desc: "Cowboy adventure shooter", icon: "🤠" },
    { id: 9, title: "Robot Arena", desc: "Build and battle your robots", icon: "🤖" },
    { id: 10, title: "Mystic Forest", desc: "Enchanted forest adventure", icon: "🌳" },
    { id: 11, title: "Cyber Football", desc: "Futuristic sports game", icon: "🏈" },
    { id: 12, title: "Pixel Quest", desc: "Retro-style adventure game", icon: "👾" },
    { id: 13, title: "Sky Champions", desc: "Aerial combat game", icon: "✈️" },
    { id: 14, title: "Desert Rally", desc: "Off-road racing adventure", icon: "🏜️" },
    { id: 15, title: "Ninja Stealth", desc: "Stealth action game", icon: "🥷" }
];

// Variables for pagination
const gamesPerPage = 5;
let currentPage = 1;
let filteredGames = [...games];

// Function to display games
function displayGames() {
    const gamesGrid = document.getElementById('gamesGrid');
    gamesGrid.innerHTML = '';
    
    const startIndex = (currentPage - 1) * gamesPerPage;
    const endIndex = startIndex + gamesPerPage;
    const gamesToDisplay = filteredGames.slice(startIndex, endIndex);
    
    if (gamesToDisplay.length === 0) {
        gamesGrid.innerHTML = '<div class="no-results">No games found. Try a different search.</div>';
        return;
    }
    
    gamesToDisplay.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <div class="game-image">${game.icon}</div>
            <div class="game-info">
                <div class="game-title">${game.title}</div>
                <div class="game-desc">${game.desc}</div>
                <button class="download-btn">Download Now</button>
            </div>
        `;
        gamesGrid.appendChild(gameCard);
    });
}

// Function to setup pagination
function setupPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    
    const pageCount = Math.ceil(filteredGames.length / gamesPerPage);
    
    if (pageCount <= 1) return;
    
    // Previous button
    if (currentPage > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'page-btn nav';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i> Prev';
        prevBtn.addEventListener('click', () => {
            currentPage--;
            displayGames();
            setupPagination();
        });
        pagination.appendChild(prevBtn);
    }
    
    // Page buttons
    for (let i = 1; i <= pageCount; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            displayGames();
            setupPagination();
        });
        pagination.appendChild(pageBtn);
    }
    
    // Next button
    if (currentPage < pageCount) {
        const nextBtn = document.createElement('button');
        nextBtn.className = 'page-btn nav';
        nextBtn.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
        nextBtn.addEventListener('click', () => {
            currentPage++;
            displayGames();
            setupPagination();
        });
        pagination.appendChild(nextBtn);
    }
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    if (searchTerm) {
        filteredGames = games.filter(game => 
            game.title.toLowerCase().includes(searchTerm) || 
            game.desc.toLowerCase().includes(searchTerm)
        );
    } else {
        filteredGames = [...games];
    }
    
    currentPage = 1;
    displayGames();
    setupPagination();
});

// Add event listeners to download buttons after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initial display
    displayGames();
    setupPagination();
    
    // Add event delegation for download buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('download-btn')) {
            const gameTitle = e.target.closest('.game-card').querySelector('.game-title').textContent;
            alert(`Downloading ${gameTitle}...`);
            // Here you would typically redirect to the download page or start the download
        }
    });
});
