

import "./Die.style.css";

interface DieProps {
  value: number;
  color:string;
  holdDice:number | any;
}




function Die({ value , color, holdDice }: DieProps) {


    


  return (
    <div onClick={holdDice} style={{backgroundColor:color}} className="die-container">
      <p className="die-number">{value}</p>
    </div>
  );
}

export default Die;
