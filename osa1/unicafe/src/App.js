import { useState } from "react";

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleFeedBack = (feedbacktype) => {
        switch (feedbacktype) {
            case "good":
                setGood(good + 1);
                break;
            case "neutral":
                setNeutral(neutral + 1);
                break;
            case "bad":
                setBad(bad + 1);
                break;
            default:
        }
    };

    return (
        <>
            <div>
                <h1>Give feedback</h1>
                <Button name={"good"} onClick={handleFeedBack} />
                <Button name={"neutral"} onClick={handleFeedBack} />
                <Button name={"bad"} onClick={handleFeedBack} />
            </div>

            <Statistics good={good} neutral={neutral} bad={bad} />
        </>
    );
};

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad;

    const feedbackAveragePercentage = () => {
        const result = (good - bad) / total;
        return result.toFixed(2);
    };

    const feedbackPositevePercentage = () => {
        const result = (good / total) * 100;
        return result.toFixed(2);
    };

    return (
        <div>
            <h1>Statistics</h1>
            {total < 1 && (
                <>
                    <p>No feedback given</p>
                </>
            )}
            {total > 0 && (
                <table>
                    <tbody>
                        <StatisticLine rowName={"good"} rowValue={good} />
                        <StatisticLine rowName={"neutral"} rowValue={neutral} />
                        <StatisticLine rowName={"bad"} rowValue={bad} />
                        <StatisticLine rowName={"all"} rowValue={total} />
                        <StatisticLine
                            rowName={"average"}
                            rowValue={feedbackAveragePercentage()}
                        />
                        <StatisticLine
                            rowName={"positive"}
                            rowValue={feedbackPositevePercentage() + " %"}
                        />
                    </tbody>
                </table>
            )}
        </div>
    );
};

const Button = ({ onClick, name }) => {
    return <button onClick={() => onClick(name)}>{name}</button>;
};

const StatisticLine = ({ rowName, rowValue }) => {
    return (
        <tr>
            <td>
                {rowName} {rowValue}
            </td>
        </tr>
    );
};

export default App;
