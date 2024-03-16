import Player from './Player.js';

const board = document.querySelector('#game-board')
const {left, right} = board.getBoundingClientRect()
console.log(left, right);

const player = new Player()

const bullets = []

const handleKeys = (e) => {
    switch (e.code) {
        case 'ArrowLeft': 
            player.movePlayer(-1)
            break
        case 'ArrowRight': 
            player.movePlayer(1)
            break
        case 'Space':
            createBullet()
            break
    }
}

const createBullet = () => {
    const bullet = document.createElement('div')
    bullet.classList.add('bullet')
    board.append(bullet)
    bullet.style.left = `${player.getPositionX()}px`
    bullet.style.top = `${player.getPositionY() - bullet.offsetHeight}px`
    bullets.push(bullet)
}

const moveBullets = () => {
    bullets.forEach(bullet => {
        bullet.style.top = `${bullet.offsetTop - 10}px`
        if (bullet.offsetTop < 0) {
            bullets.splice(bullet, 1)
            bullet.remove()
        }
    })
}

window.addEventListener('keydown', handleKeys)

setInterval(moveBullets, 25)