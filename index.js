const Player = function (name, isTurn) {
    this.name = name;
    this.isTurn = isTurn;
    this.moves = [];
    this.changeTurn = function () {
        this.isTurn = !this.isTurn;
    }
}



const makeBoard = (function () {
    const gameboard = {
        board: [],
        winStates: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6], [0, 4, 8]],
        init() {
            this.cacheDom()
            this.render()
            this.cacheDom()
            this.bindEvents()
        },
        cacheDom() {
            this.container = document.querySelector('#gameBoard');
            this.spaces = document.querySelectorAll('.space')
            this.xInput = document.querySelector('#player1')
            this.oInput = document.querySelector('#player2')
            this.play = document.querySelector('.play')
        },
        bindEvents() {
            this.spaces.forEach(space => {
                space.addEventListener('click', this.updateBoard)
            })
            this.play.addEventListener('click', this.makePlayers.bind(this))
        },
        render() {
            for (let i = 0; i < 9; i++) {
                if (!this.board[i]) {
                    this.spaces[i].innerText = '';
                } else {
                    this.spaces[i].innerText = this.board[i];
                }

            }
        },
        makePlayers() {
            const p1Name = this.xInput.value;
            const p2Name = this.oInput.value;
            this.player1 = new Player(p1Name, true)
            this.player2 = new Player(p2Name, false)
            console.log(this.player1, this.player2)
        },
        updateBoard() {
            if (gameboard.player1 && gameboard.player2) {
                if (gameboard.player1.isTurn) {
                    if (!gameboard.board[this.dataset.index]) {
                        gameboard.player1.changeTurn()
                        gameboard.player2.changeTurn()
                        gameboard.board[this.dataset.index] = 'X';
                        gameboard.player1.moves.push(parseInt(this.dataset.index))
                    }
                    gameboard.render();
                    gameboard.checkForWin(gameboard.winStates);
                } else if (gameboard.player2.isTurn) {
                    if (!gameboard.board[this.dataset.index]) {
                        gameboard.player1.changeTurn()
                        gameboard.player2.changeTurn()
                        gameboard.board[this.dataset.index] = 'O';
                        gameboard.player2.moves.push(parseInt(this.dataset.index))
                    }
                    gameboard.render();
                    gameboard.checkForWin(gameboard.winStates);
                }
            }
        },
        checkForWin(arr) {
            let curMoves1 = this.player1.moves
            let curMoves2 = this.player2.moves
            arr.forEach(el => {
                for (let i = 0; i < el.length; i++) {
                    if (curMoves1.includes(el[i]) && curMoves1.includes(el[i + 1]) && curMoves1.includes(el[i + 2])) {
                        console.log('player 1 win')
                    } else if (curMoves2.includes(el[i]) && curMoves2.includes(el[i + 1]) && curMoves2.includes(el[i + 2])) {
                        console.log('player 2 win')
                    }
                }
            })
        }

    }
    gameboard.init()
})();

