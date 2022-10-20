import React, { useEffect, useState } from 'react';
import './App.css';
import prizes from './moneyPrizeData';
import data from './data';
import useSound from 'use-sound';
import play from './sounds/play.mp3'
import wait from './sounds/wait.mp3'
import wrong from './sounds/wrong.mp3'
import correct from './sounds/correct.mp3'
import Timer from './components/Timer';

const App = () => {



  const [questionNumber, setQuestionNumber] = useState(0);
  const [item, setItem] = useState(data[questionNumber]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerClass, setAnswerClass] = useState(`answer`);
  const [earned, setEarned] = useState('$ 0');
  // const [time, setTime] = useState(30)
  const [letsPlay] = useSound(play);
  const [correctPlay] = useSound(correct);
  const [wrongPlay] = useSound(wrong);
  const [waitPlay] = useSound(wait);

  // useEffect(() => {
  //   letsPlay();
  // }, [letsPlay])


  useEffect(() => {
    setItem(data[questionNumber])

  }, [questionNumber])

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(prizes.find((m) => m.id === questionNumber).amount);
  }, [questionNumber, prizes]);

  //------------------------DELAY-FUNCTION------------------------//
  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration)
  }

  //-----------------------TIMER-------------------------------//



  //--------------------HANDLE-CLICK------------------------//
  const handleClick = (answer) => {

    setSelectedAnswer(answer);

    //WIN-LOGIC
    if (answer.correct) {
      setAnswerClass('answer correct');
      delay(2000, () => {
        correctPlay();
      })
      delay(5000, () => {

        setQuestionNumber(prev => prev + 1);

      })

    }
    //LOSE-LOGIC
    else {
      setAnswerClass('answer wrong');

      delay(2000, () => {
        wrongPlay();
      })
      delay(6000, () => {
        setIsGameOver(true);
      })

    }
  }


  console.log(questionNumber);
  if (questionNumber === 15) {
    return <div className="win-game">
      <p className='congrats'>Congrats!!!</p>
      <p >You have earned $ 1,000,000</p>
    </div>
  }

  return (
    <div className='app'>
      {isGameOver ? <div className="gameOver">
        <h1>You have earned {earned}</h1>
      </div> : <div className="main">
        <div className="top">
          <h1><Timer questionNumber={questionNumber} setIsGameOver={setIsGameOver} /></h1>

        </div>
        <div className="bottom">
          <div className="question">
            {item?.question}
          </div>
          <div className="answers">
            {item?.answers.map(answer => {
              return <div className={selectedAnswer === answer ? answerClass : `answer`} onClick={() => handleClick(answer)}>{answer.text}</div>
            })}

          </div>
        </div>
      </div>}


      <div className="money">
        {prizes.map(prize => {
          return <div className={prize.id === questionNumber + 1 ? `prize-item active` : `prize-item`}>
            <div className="prize-id">{prize.id}</div>
            <div className="prize-amount">{prize.amount}</div>
          </div>
        })}
      </div>
    </div>
  )
}

export default App