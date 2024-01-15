document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.querySelector('.start-button');
    const resetButton = document.querySelector('.reset-button');
    const circles = document.querySelectorAll('.circle');
    const carImages = document.querySelectorAll('.anhxe');
    const finishLine = document.querySelector('.vachdich');

    let winningCar = null; 
    let gameInProgress = false;

    startButton.addEventListener('click', function () {
        if (!winningCar && !gameInProgress) {
            resetGame();
            gameInProgress = true;

            // Bắt đầu trò chơi
            addCircleClass(circles[0], 'red');
            removeCircleClass(circles[2], 'green');

            setTimeout(function () {
                removeCircleClass(circles[0], 'red');
                addCircleClass(circles[1], 'yellow');
            }, 1000);

            setTimeout(function () {
                removeCircleClass(circles[1], 'yellow');
                addCircleClass(circles[2], 'green');
                moveCarRandomSpeed(carImages[0], finishLine.offsetLeft);
                moveCarRandomSpeed(carImages[1], finishLine.offsetLeft);
            }, 2000);
        }
    });

    resetButton.addEventListener('click', function () {
        if (!gameInProgress) {
            resetGame();
            winningCar = null; 
        }
    });

    function moveCarRandomSpeed(car, finishLinePosition) {
        const animationDuration = 4 + Math.random() * 6;

        car.style.animation = `moveCarAnimation ${animationDuration}s linear infinite`;
        car.style.animationPlayState = 'running';

        const keyframes = `@keyframes moveCarAnimation {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(${finishLinePosition - car.offsetLeft}px);
            }
        }`;

        const styleElement = document.createElement('style');
        styleElement.innerHTML = keyframes;
        document.head.appendChild(styleElement);

        car.addEventListener('animationiteration', function () {
            if (!winningCar) {
                winningCar = car;
                announceWinner();
            }
        });
    }

    function announceWinner() {
        if (winningCar) {
            const carNumber = winningCar.dataset.xe;
            alert(`Xe ${carNumber} chiến thắng!`);
            gameInProgress = false; 
        }
    }

    function resetGame() {
        carImages.forEach(car => car.style.animation = 'none');
        gameInProgress = false; 
    }

    function addCircleClass(circle, className) {
        circle.classList.add(className);
    }

    function removeCircleClass(circle, className) {
        circle.classList.remove(className);
    }
});