const hazman = document.getElementById('hazman');
const ground = document.getElementById('ground');
const jump = document.getElementById('jump');
const end = document.getElementById('end');
let isJumping = false
let position = 0;

let gameOver = false;


function stopJump(e) {
    if (e.keyCode === 32) {
        if (!isJumping) {
            jumps();
        }
    }
}

function jumps() {
    isJumping = true
    jump.play();
    let intervalJump = setInterval(() => {
        if (position >= 150) {
            //falling
            clearInterval(intervalJump);
            let intervalFall = setInterval(() => {
                if (position <= 0) {
                    clearInterval(intervalFall);
                    isJumping = false;
                } else {
                    position -= 20;
                    hazman.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            //jumping
            position += 20;
            hazman.style.bottom = position + 'px';
        }
    }, 20);
}

function spawnCactus() {

    const cactus = document.createElement('div');
    let positionCactus = 2000;
    let timeRandom = Math.random() * 6000;

    if (gameOver) return;

    cactus.classList.add('cactus');
    ground.appendChild(cactus);
    cactus.style.left = positionCactus + 'px';

    let timeMoving = setInterval(() => {
        if (positionCactus < -60) {
            //Saiu da tela
            clearInterval(timeMoving);
            ground.removeChild(cactus);
        } else if (positionCactus > 0 && positionCactus < 60 && position < 60) {
            //Game over
            gameOver = true;
            position = 5000;
            clearInterval(timeMoving);
            document.body.innerHTML = `
            <div class="end" id="end">
            <img class="game-over-img" src="./img/game-over.png">
            <audio autoplay>
            <source src="./sound/gameover.wav" type="audio/wav">
            </audio>
            <img class="btn" src="./img/btn.png" onclick="refreshPage()">
            `;
        } else {
            positionCactus -= 10;
            cactus.style.left = positionCactus + 'px';
        }
    }, 20);
    setTimeout(spawnCactus, timeRandom);
}

function refreshPage(){
    return location.reload();
}

spawnCactus();
document.addEventListener('keydown', stopJump);