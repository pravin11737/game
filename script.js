const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const gameContainer = document.getElementById("gameContainer");
let isGameOver = false;

document.addEventListener("keydown", movePlayer);

function movePlayer(event) {
    const playerRect = player.getBoundingClientRect();
    const containerRect = gameContainer.getBoundingClientRect();

    if (event.key === "ArrowLeft" && playerRect.left > containerRect.left) {
        player.style.left = playerRect.left - 15 + "px";
    } else if (event.key === "ArrowRight" && playerRect.right < containerRect.right) {
        player.style.left = playerRect.left + 15 + "px";
    }
}

function startGame() {
    let obstaclePosition = 0;
    const moveObstacle = setInterval(() => {
        if (isGameOver) {
            clearInterval(moveObstacle);
            alert("Game Over!");
            return;
        }

        obstaclePosition += 5; // Move obstacle downwards

        if (obstaclePosition > gameContainer.offsetHeight) {
            obstaclePosition = 0;
            obstacle.style.left = Math.random() * (gameContainer.offsetWidth - 30) + "px"; // Reset position
        }

        obstacle.style.top = obstaclePosition + "px";

        // Check for collisions
        if (checkCollision(player, obstacle)) {
            isGameOver = true;
        }
    }, 100);
}

// Collision detection function
function checkCollision(rect1, rect2) {
    const rect1Bounds = rect1.getBoundingClientRect();
    const rect2Bounds = rect2.getBoundingClientRect();
    return !(
        rect1Bounds.top > rect2Bounds.bottom ||
        rect1Bounds.bottom < rect2Bounds.top ||
        rect1Bounds.left > rect2Bounds.right ||
        rect1Bounds.right < rect2Bounds.left
    );
}

startGame();