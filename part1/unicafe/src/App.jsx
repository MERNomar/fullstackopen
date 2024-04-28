import { useState } from "react";
const Button = ({ eventHandler, title }) => {
  return <button onClick={eventHandler}>{title}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ score, good, allFeedbacks, neutral, bad }) => {
  const average = score / allFeedbacks || 0;
  const positive = (good / allFeedbacks) * 100 || 0;

  return (
    <table>
      <tbody>
        <StatisticLine text={"good"} value={good} />
        <StatisticLine text={"neutral"} value={neutral} />
        <StatisticLine text={"bad"} value={bad} />
        <StatisticLine text={"all"} value={allFeedbacks} />
        <StatisticLine text={"average"} value={average.toFixed(1)} />
        <StatisticLine text={"positive"} value={positive.toFixed(1)} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allFeedbacks, setAllFeedbacks] = useState(0);
  const [score, SetScore] = useState(0);

  const handleGood = () => {
    const currentGood = good + 1;
    setGood(currentGood);
    setAllFeedbacks(currentGood + bad + neutral);
    SetScore(score + 1);
  };

  const handleNeutral = () => {
    const currentNeutral = neutral + 1;
    setNeutral(currentNeutral);
    setAllFeedbacks(currentNeutral + good + bad);
  };

  const handleBad = () => {
    const currentBad = bad + 1;
    setBad(currentBad);
    setAllFeedbacks(currentBad + good + neutral);
    SetScore(score - 1);
  };

  return (
    <>
      <h1>Give feedback</h1>
      <Button eventHandler={() => handleGood()} title={"good"} />
      <Button eventHandler={() => handleNeutral()} title={"neutral"} />
      <Button eventHandler={() => handleBad()} title={"bad"} />
      <div>
        <h1>Statistics</h1>
        {allFeedbacks !== 0 ? (
          <Statistics
            good={good}
            bad={bad}
            score={score}
            neutral={neutral}
            allFeedbacks={allFeedbacks}
          />
        ) : (
          <h2>no feedbacks given</h2>
        )}
      </div>
    </>
  );
};

export default App;
