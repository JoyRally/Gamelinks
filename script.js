// Sample game data with multiple images
const games = [
    { 
        id: 1, 
        title: "CATO", 
        desc: " 2d Platformer & adventure", 
        icon: "😺",
        images: ["img1.jpg"],
        link: "https://blasin.itch.io/cato"
    },
    { 
        id: 2, 
        title: "Dragon Realm", 
        desc: "Epic fantasy battle game", 
        icon: "🐉",
        images: ["img3.jpg", "img4.jpg"],
        link: "https://example.com/download/dragon-realm"
    },
    { 
        id: 3, 
        title: "Neon Racing", 
        desc: "High-speed futuristic racing", 
        icon: "🚗",
        images: ["img5.jpg"],
        link: "https://example.com/download/neon-racing"
    },
    { 
        id: 4, 
        title: "Space Explorers", 
        desc: "Explore the unknown universe", 
        icon: "🚀",
        images: ["img6.jpg", "img7.jpg"],
        link: "https://example.com/download/space-explorers"
    },
    { 
        id: 5, 
        title: "Magic Puzzles", 
        desc: "Mind-bending puzzle adventure", 
        icon: "🧩",
        images: ["img8.jpg"],
        link: "https://example.com/download/magic-puzzles"
    },
    { 
        id: 6, 
        title: "Zombie Survival", 
        desc: "Survive the zombie apocalypse", 
        icon: "🧟",
        images: ["img1.jpg", "img2.jpg"],
        link: "https://example.com/download/zombie-survival"
    },
    { 
        id: 7, 
        title: "Ocean Odyssey", 
        desc: "Underwater exploration game", 
        icon: "🐙",
        images: ["img3.jpg", "img4.jpg"],
        link: "https://example.com/download/ocean-odyssey"
    },
    { 
        id: 8, 
        title: "Wild West", 
        desc: "Cowboy adventure shooter", 
        icon: "🤠",
        images: ["img5.jpg"],
        link: "https://example.com/download/wild-west"
    },
    { 
        id: 9, 
        title: "Robot Arena", 
        desc: "Build and battle your robots", 
        icon: "🤖",
        images: ["img6.jpg", "img7.jpg"],
        link: "https://example.com/download/robot-arena"
    }
];

// Variables for pagination
const gamesPerPage = 6;
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
            <div class="game-image">
                ${game.images && game.images.length > 0 ? 
                    `<img src="${game.images[0]}" alt="${game.title}" loading="lazy">
                     ${game.images.length > 1 ? `
                     <button class="image-nav image-prev"><i class="fas fa-chevron-left"></i></button>
                     <button class="image-nav image-next"><i class="fas fa-chevron-right"></i></button>
                     <div class="image-indicators">
                         ${game.images.map((_, index) => 
                             `<div class="image-indicator ${index === 0 ? 'active' : ''}" data-index="${index}"></div>`
                         ).join('')}
                     </div>` : ''}`
                    : `<div class="image-placeholder">${game.icon}</div>`}
            </div>
            <div class="game-info">
                <div class="game-title">${game.title}</div>
                <div class="game-desc">${game.desc}</div>
                <button class="download-btn" data-link="${game.link || '#'}">Download Now</button>
            </div>
        `;
        gamesGrid.appendChild(gameCard);
        
        // Add event listeners for image navigation if there are multiple images
        if (game.images && game.images.length > 1) {
            const imageElement = gameCard.querySelector('img');
            const prevButton = gameCard.querySelector('.image-prev');
            const nextButton = gameCard.querySelector('.image-next');
            const indicators = gameCard.querySelectorAll('.image-indicator');
            let currentImageIndex = 0;
            
            // Function to update displayed image
            const updateImage = (index) => {
                imageElement.src = game.images[index];
                indicators.forEach(indicator => indicator.classList.remove('active'));
                indicators[index].classList.add('active');
                currentImageIndex = index;
            };
            
            // Previous button event
            prevButton.addEventListener('click', (e) => {
                e.stopPropagation();
                let newIndex = currentImageIndex - 1;
                if (newIndex < 0) newIndex = game.images.length - 1;
                updateImage(newIndex);
            });
            
            // Next button event
            nextButton.addEventListener('click', (e) => {
                e.stopPropagation();
                let newIndex = currentImageIndex + 1;
                if (newIndex >= game.images.length) newIndex = 0;
                updateImage(newIndex);
            });
            
            // Indicator events
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', (e) => {
                    e.stopPropagation();
                    updateImage(index);
                });
            });
        }
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
            const downloadLink = e.target.getAttribute('data-link');
            
            if (downloadLink && downloadLink !== '#') {
                // Redirect to the actual download link
                window.location.href = downloadLink;
            } else {
                // Fallback to alert if no link specified
                alert(`Downloading ${gameTitle}...`);
            }
        }
    });
});