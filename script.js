function gameBoard() {
    const rows = 3;
    const columns = 3;
    let board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const setCellValue = (cell, player) => {
        if (cell.getValue() === 0) {
            cell.addToken(player.token);
        }
    };

    const isFull = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j].getValue() === 0) {
                    return false;
                }
            }
        }
        return true;
    };

    const getBoard = () => board;

    return { getBoard, setCellValue, rows, columns, isFull };
}

function Cell() {
    let value = 0;

    const addToken = (token) => {
        value = token;
    };

    const getValue = () => value;

    return { getValue, addToken };
}

function gameController(PlayerOneName = 'Player 1', PlayerTwoName = 'Player 2') {
    const gameboard = gameBoard();

    const players = [
        {
            name: PlayerOneName,
            token: 1
        },
        {
            name: PlayerTwoName,
            token: 2
        }
    ];

    let activePlayer = players[0];

    const switchTurn = () => (activePlayer === players[0] ? players[1] : players[0]);

    const getActivePlayer = () => activePlayer;

    const printNewRoud = () => `Agora é a vez de ${activePlayer.name}`;

    const playRound = (cell) => {
        if (cell.isFull()) {
            return;
        }
        gameboard.setCellValue(cell, activePlayer);
        const winner = verifyWinner();

        if (winner === activePlayer.token) {
            return printWinner();
        } else if (winner === 'empate') {
            return 'O jogo empatou';
        }

        activePlayer = switchTurn();
        let print = printNewRoud();
        return print;
    };

    const verifyWinner = () => {
        const board = gameboard.getBoard();

        for (let i = 0; i < 3; i++) {
            if (
                (board[i][0].getValue() === board[i][1].getValue() && board[i][1].getValue() === board[i][2].getValue()) ||
                (board[0][i].getValue() === board[1][i].getValue() && board[1][i].getValue() === board[2][i].getValue())
            ) {
                return board[i][i].getValue();
            }
        }

        if (
            (board[0][0].getValue() === board[1][1].getValue() && board[1][1].getValue() === board[2][2].getValue()) ||
            (board[0][2].getValue() === board[1][1].getValue() && board[1][1].getValue() === board[2][0].getValue())
        ) {
            return board[1][1].getValue();
        }

        if (gameboard.isFull()) {
            return 'empate';
        }

        return null;
    };

    const printWinner = () => `Vitória de ${activePlayer.name}`;

    return { playRound, getActivePlayer };
}











