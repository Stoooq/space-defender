import Player from './Player.js';

const board = document.querySelector('#game-board')
const {left, right} = board.getBoundingClientRect()
console.log(left, right);

const player = new Player()

const bullets = []
const enemies = []

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
        } else {
            checkBulletCollision(bullet)
        }
    })
}

const checkBulletCollision = (bullet) => {
    const position = bullet.getBoundingClientRect()
    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i]
        const enemyPosition = enemy.getBoundingClientRect()
        if (checkCollision(position, enemyPosition)) {
            const idx = bullets.indexOf(bullet)
            bullets.splice(idx, 1)
            bullet.remove()
            enemies.splice(i, 1)
            enemy.remove()
            break
        }
    }
}

const checkCollision = (bullet, enemy) => {
    return (bullet.left > enemy.left && bullet.right < enemy.right && bullet.top < enemy.bottom)
}

const createEnemy = () => {
    const shouldCreate = Math.round(Math.random())
    if (!shouldCreate) return

    const enemy = document.createElement('div')
    enemy.classList.add('enemy')
    enemy.style.top = `${-60}px`
    enemy.style.left = `${Math.floor(Math.random() * (board.offsetWidth - 120) + 60)}px`
    board.append(enemy)
    enemies.push(enemy)
}

const moveEnemies = () => {
    enemies.forEach(enemy => {
        enemy.style.top = `${enemy.offsetTop + 1}px`
        if (enemy.offsetTop > board.offsetHeight) {
            enemies.splice(enemy, 1)
            enemy.remove()
            alert('GameOver')
        }
    })
}

window.addEventListener('keydown', handleKeys)

setInterval(moveBullets, 25)
setInterval(createEnemy, 1250)
setInterval(moveEnemies, 25)