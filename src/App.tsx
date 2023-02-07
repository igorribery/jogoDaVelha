import { useEffect, useState } from 'react';
import './styles.css';

const winningCombinations = [
  // horizontals
  
  { indexes: [0, 1, 2],},
  { indexes: [3, 4, 5],},
  { indexes: [6, 7, 8],},

  // verticals
  { indexes: [0, 3, 6],},
  { indexes: [1, 4, 7],},
  { indexes: [2, 5, 8],},
  
  // diagonals
  { indexes: [0, 4, 8],},
  { indexes: [2, 4, 6],},

];




const App = () => {

  const [gameData, setGameData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [turn, setTurn] = useState(1);
  const [winningCombo, setWinningCombo] = useState<any>(null);
  const [gameEnd, setGameEnd] = useState(false);
  const [whichWinner, setWhichWinner] = useState('');

  const handleClick = (clickedIndex: number) => {
    console.log(clickedIndex)

    if(gameData[clickedIndex] !== 0) {
      return;
    }
    if(winningCombo) {
      return;
    }

    setGameData((prev) => {
      const newGameData = [...prev];

      newGameData[clickedIndex] = turn;

      return newGameData;
    });
    setTurn((prev) => prev === 1 ? 2 : 1);

  }

  useEffect(() => {
    checkWinner();
    checkGameEnded();
  }, [gameData]);


  const checkGameEnded = () => {
    if(gameData.every((item) => item !== 0)) {
      setWhichWinner('Deu velha!')
      setGameEnd(true);
    }
   
  }

  

  const checkWinner = () => {
    
    let winner = null;
    

    for(let combination of winningCombinations) {
      const { indexes } = combination;
      

      if(gameData[indexes[0]] === 1 && 
        gameData[indexes[1]] === 1 && 
        gameData[indexes[2]] === 1
        ) {
          winner = 'player1';
          setWhichWinner('❌ foi o vencedor!')
          
        }
      if(gameData[indexes[0]] === 2 &&
        gameData[indexes[1]] === 2 &&
        gameData[indexes[2]] === 2
      ) {
        winner = 'player2';
        setWhichWinner('🔵 foi o vencedor!')
        
      }
      if(winner) {
        setWinningCombo(combination);
        setGameEnd(true);
        break;
      }
  }
}

const resetGame = () => {
  setGameData([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  setWinningCombo(null);
  setGameEnd(false);
}

  return (
    <>
      <div className="title">Jogo da Velha</div>
      <div className="board">
        {gameData.map((value, index) => (
          <div className="cell" key={index}
          
            onClick={() => handleClick(index)}>
              
            {value === 1 && '❌'} 
            {value === 2 && '🔵'}
            
          </div>
        ))}
      </div>

      <div className='buttonArea'>
       
        {gameEnd && <h2>{whichWinner}</h2>}
        {gameEnd && 
        <button onClick={resetGame}>Reiniciar</button>}
      </div>
      
    </>
  )
}

export default App