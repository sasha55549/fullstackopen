import { useState } from 'react'

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({text,value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {

  if (props.all===0) return (
  <>
  <h1>statistics</h1>
  <p>No feedback given</p>
  </>
  )

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
      <StatisticLine text="good" value={props.good}/>
      <StatisticLine text="neutral" value={props.neutral}/>
      <StatisticLine text="bad" value={props.bad}/>
      <StatisticLine text="all" value={props.all}/>
      <StatisticLine text="average" value={props.avg}/>
      <StatisticLine text="positive" value={props.positive+' %'}/>
      </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avg, setAvg] = useState(0)
  const [positive,setPositive] = useState(0);
  

  const handleGood = ()=> {
    const newGood = good+1;
    const newAll = all+1;
    setAll(newAll);
    setGood(newGood);
    const newAvg = calculateAvg(newGood,bad,newAll);
    setAvg(newAvg);
    const newPos = calculatePos(newGood,newAll);
    setPositive(newPos);
  }

  const handleNeutral = ()=> {
    const newNeutral = neutral+1;
    const newAll = all+1;
    setAll(newAll);
    setNeutral(newNeutral);
    const newAvg = calculateAvg(good,bad,newAll);
    setAvg(newAvg);
    const newPos = calculatePos(good,newAll);
    setPositive(newPos);
  }

  const handleBad = ()=> {
    const newBad = bad+1;
    const newAll = all+1;
    setAll(newAll);
    setBad(newBad);
    const newAvg = calculateAvg(good,newBad,newAll);
    setAvg(newAvg);
    const newPos = calculatePos(good,newAll);
    setPositive(newPos);
  }

  const calculateAvg = (g,b,a) => {
    const newAvg = (g-b)/a;
    return newAvg;
  }

  const calculatePos = (g,a) => {
    const newPos = g/a*100;
    return newPos;
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text="good"/>
      <Button onClick={handleNeutral} text="neutral"/>
      <Button onClick={handleBad} text="bad"/>    
      <Statistics good={good} neutral={neutral} bad={bad} all={all} avg={avg} positive={positive} />
    </div>
  )
}

export default App