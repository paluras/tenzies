import { useState , useEffect } from "react";
import Die from "../component/Die.tsx";
import "./App.css";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

function App() {
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  const allNewDice = () => {
    const arr = [];

    for (let index = 0; index < 10; index++) {
      arr.push({ value: getRandomInt(6), isHeld: false, id: index });
    }
    return arr;
  };
  const [diceArr, setDiceArr] = useState(allNewDice());
  const [tenzies,setTenzies] = useState(false)


  useEffect(()=>{
 
  //  const allHeld = diceArr.every(die => die.isHeld)
  const allHeld = diceArr.every(die => die.isHeld)
  const firstValue = diceArr[0].value
  const allSameValue = diceArr.every(die => die.value === firstValue)
  if(allHeld && allSameValue){
    setTenzies(true)
    console.log("You won!")
  }
  console.log("Dice state changed")
     
      
  },[diceArr])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: getRandomInt(1000000),
    };
  }
  const handleClickRoll = () => {tenzies ? setDiceArr(allNewDice()):
    
    setDiceArr(oldDice => oldDice.map(die => {
      return die.isHeld ? 
          die :
          generateNewDie()
  }))
  setTenzies(false)};
  console.log(tenzies);
  

  function holdDice(id: number) {
    setDiceArr((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = diceArr.map((die) => (
    <Die
      holdDice={() => holdDice(die.id)}
      color={die.isHeld ? "#59E391" : ""}
      key={die.id}
      value={die.value}
    />
  ));

  return (
    <>
      <main>
        <div className="main-app">
        <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="die-main">{diceElements}</div>
          <button onClick={handleClickRoll}>{tenzies ? "New Game":"Roll"}</button>
        </div>
        {tenzies? <Confetti /> : "" }
      </main>
    
    </>
  );
}

export default App;
