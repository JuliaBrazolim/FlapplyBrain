document.addEventListener('DOMContentLoaded' , () => {
    const brain = document.querySelector('.brain')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground-moving')

    let brainLeft = 220
    let brainBottom = 100
    let gravity = 3
    let isGameOver = false
    let gap = 430

    function startGame() {
        brainBottom -= gravity
        brain.style.bottom = brainBottom + 'px'
        brain.style.left = brainLeft + 'px'
    }

    let gameTimerId = setInterval(startGame, 20)

    function control(e) {
        if (e.keyCode === 38) {
            jump()
        }
    }

    function jump() {
        if (brainBottom < 500) brainBottom += 50
        brain.style.bottom = brainBottom + 'px'
        console.log(brainBottom)
    }
    document.addEventListener('keyup', control)


    function generateObstacle() {
        let obstaculoLeft = 500
        let randomHeight = Math.random() * 80
        let obstaculoBottom = randomHeight
        const obstaculo = document.createElement('div')
        const topObstaculo = document.createElement('div')
        if (!isGameOver) {
            obstaculo.classList.add('obstaculo')
            topObstaculo.classList.add('topObstaculo')
        }
        gameDisplay.appendChild(obstaculo)
        gameDisplay.appendChild(topObstaculo)
        obstaculo.style.left = obstaculoLeft + 'px'
        topObstaculo.style.left = obstaculoLeft + 'px'
        obstaculo.style.bottom = obstaculoBottom + 'px'
        topObstaculo.style.bottom = obstaculoBottom + gap + 'px'

        function moveObstacle() {
            obstaculoLeft -=2
            obstaculo.style.left = obstaculoLeft + 'px'
            topObstaculo.style.left = obstaculoLeft + 'px'

            if (obstaculoLeft === -60) {
                clearInterval(timerId)
                gameDisplay.removeChild(obstaculo)
                gameDisplay.removeChild(topObstaculo)
            }
            if (
                obstaculoLeft > 200 && obstaculoLeft < 280 && brainLeft === 130 &&
                    (brainBottom < obstaculoBottom + 153 || brainBottom > obstaculoBottom + gap -200) 
                    || brainBottom === 0 
                ) {
                gameOver()
            }

        }

        let timerId = setInterval(moveObstacle, 20) 
        if (!isGameOver) setTimeout(generateObstacle, 3000)

    }
    generateObstacle()


    function gameOver() {
        clearInterval(gameTimerId)
        console.log('fim do jogo')
        isGameOver = true
        document.removeEventListener('keyup', control)
        ground.classList.add('ground')
        ground.classList.remove('ground-moving')
    }


})