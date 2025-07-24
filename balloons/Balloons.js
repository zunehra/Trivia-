const gameContainer = document.getElementById('gameContainer');

function random(num) {
    return Math.floor(Math.random() * num);
}

function getRandomStyles() {
    var mt = random(200);
    var ml = random(window.innerWidth -1);
    var dur = random(5) + 5;
    return `
        margin: ${mt}px 0 0 ${ml}px;
        animation: float ${dur}s ease-in infinite;
    `;
}

function createBalloons(num) {
    const colors = ['red', 'pink', 'redpink'];

    for (let i = num; i > 0; i--) {
        const balloon = document.createElement("div");
        const color = colors[random(colors.length)];

        balloon.className = `balloon ${color} animate`;
        balloon.style.cssText = getRandomStyles();
        gameContainer.appendChild(balloon);
    }
}

window.addEventListener("load", () => {
    createBalloons(15);
});
