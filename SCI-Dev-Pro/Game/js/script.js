alert("please click arrowUp to start game and then click left anda right arrow.");
const playerCar = document.getElementById("playerCar");
const scoreDisplay = document.getElementById("score");
const gameOverMessage = document.getElementById("gameOverMessage");

let score = 0;
let gameOver = false;
let playerPosition = window.innerWidth / 2 - 30; // Start in the center
let obstacles = [];

// Player car movement
document.addEventListener("keydown", (event) => {
    if (gameOver) return;

    if (event.key === "ArrowLeft" && playerPosition > 0) {
        playerPosition -= 15;
    } else if (event.key === "ArrowRight" && playerPosition < window.innerWidth - 60) {
        playerPosition += 15;
    }

    playerCar.style.left = `${playerPosition}px`;
});

// Create a new obstacle
function createObstacle() {
    const obstacle = document.createElement("div");
    obstacle.classList.add("carObstacle");
    obstacle.style.left = `${Math.random() * (window.innerWidth - 60)}px`;
    obstacle.style.top = "-100px"; // Start above the screen
    gameContainer.appendChild(obstacle);
    obstacles.push(obstacle);
}

// Move obstacles down the screen
function moveObstacles() {
    obstacles.forEach((obstacle, index) => {
        let currentTop = parseInt(obstacle.style.top, 10);
        obstacle.style.top = `${currentTop + 5}px`;

        // Collision detection
        if (
            currentTop + 100 >= window.innerHeight - 20 &&
            parseInt(obstacle.style.left, 10) < playerPosition + 60 &&
            parseInt(obstacle.style.left, 10) + 60 > playerPosition
        ) {
            gameOver = true;
            gameOverMessage.textContent = "Game Over!";
            gameOverMessage.style.display = "block";
        }

        // Remove obstacles when they go off-screen
        if (currentTop > window.innerHeight) {
            obstacle.remove();
            obstacles.splice(index, 1);
            score++;
            scoreDisplay.textContent = score;
        }else if(score == 200) {
            alert("winner");
        }
    });
}

// Game loop
function gameLoop() {
    if (gameOver) return;

    if (Math.random() < 0.02) {
        createObstacle(); // Random chance to create a new obstacle
    }

    moveObstacles();
    requestAnimationFrame(gameLoop); // Keep the loop going
}

// Start the game loop
gameLoop();
