class Player {
    constructor () {
        this.board = document.querySelector('#game-board')
        this.player = document.createElement('div')
        this.player.setAttribute('id', 'player')
        this.board.append(this.player)
    }

    movePlayer = (direction) => {
        const newPosition = this.player.offsetLeft + direction * 30
        const { left, right} = this.board.getBoundingClientRect()
        const minLeft = this.player.offsetWidth / 2
        const maxRight = right - left - minLeft
        if (newPosition >= minLeft && newPosition <= maxRight) {
            this.player.style.left = `${newPosition}px`
        }
    }

    getPositionX = () => {
        return this.player.offsetLeft
    }

    getPositionY = () => {
        return this.player.offsetTop
    }
}

export default Player