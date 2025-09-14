// Sample game data with multiple images
const games = [
    { 
        id: 1, 
        title: "Cyber Quest", 
        desc: "Futuristic RPG adventure", 
        icon: "🧠",
        images: [
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        ],
        link: "https://example.com/download/cyber-quest"
    },
    { 
        id: 2, 
        title: "Dragon Realm", 
        desc: "Epic fantasy battle game", 
        icon: "🐉",
        images: [
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
        ],
        link: "https://example.com/download/dragon-realm"
    },
    { 
        id: 3, 
        title: "Neon Racing", 
        desc: "High-speed futuristic racing", 
        icon: "🚗",
        images: [
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        ],
        link: "https://example.com/download/neon-racing"
    },
    { 
        id: 4, 
        title: "Space Explorers", 
        desc: "Explore the unknown universe", 
        icon: "🚀",
        images: [
            "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
            "https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        ],
        link: "https://example.com/download/space-explorers"
    },
    { 
        id: 5, 
        title: "Magic Puzzles", 
        desc: "Mind-bending puzzle adventure", 
        icon: "🧩",
        images: [
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        ],
        link: "https://example.com/download/magic-puzzles"
    },
    { 
        id: 6, 
        title: "Zombie Survival", 
        desc: "Survive the zombie apocalypse", 
        icon: "🧟",
        images: [
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        ],
        link: "https://example.com/download/zombie-survival"
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