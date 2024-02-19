window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', '']; //board consists of 9 tiles
    let currentPlayer = 'X'; //who's currentplayer X or O
    let isGameActive =true; //is game active or ended

    //end game result
    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON'; 
    const TIE = 'TIE';

    //winning conditions
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation(){
        let roundWon = false;
        //as total winning conditions are 8
        for(let i =0; i<=7; i++){
            const winCondition=winningConditions[i];
            const a = board[winCondition[0]];
            const b= board[winCondition[1]];
            const c= board[winCondition[2]];
            if(a===''||b===''||c===''){
                continue;
            }
            if(a===b && b===c){
                roundWon=true;
                break;
            }
        }
        if(roundWon){
            announce(currentPlayer==='X'? PLAYERX_WON : PLAYERO_WON );
            isGameActive=false;
            return;
        }
        if(!board.includes(''))
            announce(TIE);
    }
 
    const announce = (type)=>{
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML='PLayer <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML='Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText='Tie';  //innertext commonly used to manipulate text on a webpage dynamically through js  
        }
        announcer.classList.remove('hide'); //remove hide to show the announcer to the user

    }
    const isValidAction=(tile)=>{ //checks if player is only putting input in empty tile
        if(tile.innerText==='X'||tile.innerText==='O'){
            return false;
        }
        return true;
    }
    const updateBoard=(index)=>{
        board[index]=currentPlayer;
    }
    const changePlayer=() =>{
        playerDisplay.classList.remove(`player${currentPlayer}`); //removes current player
        currentPlayer=currentPlayer==='X'?'O':'X'; //if x then or else x
        playerDisplay.innerText=currentPlayer; //display current player
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction=(tile, index)=>{
        if(isValidAction(tile) && isGameActive){
            tile.innerText=currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation(); //whether we have a winner or not
            changePlayer();
        }
    }
    const resetBoard=()=>{ //resets board
        board=['','','','','','','','',''];
        isGameActive=true;
        announcer.classList.add('hide'); //hides announcer

        if(currentPlayer==='O'){
            changePlayer(); //as by definition player X will start the game, so if it's player O, then change player

        }
        tiles.forEach(tile =>{ //changes/resets UI
            tile.innerText='';
            tile.classList.remove('playerX'); //removes every player related classes
            tile.classList.remove('playerO');
        })

    }
   
    tiles.forEach((tile, index)=>{
        tile.addEventListener('click', ()=> userAction(tile, index));
    });
    resetButton.addEventListener('click', resetBoard);
});