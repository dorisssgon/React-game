import React, { Component } from 'react';
import QuizOptions from './QuizOptions'
import classNames from 'classnames'
class Quiz extends Component {

  constructor(props) {
    super(props);

    let riddle = this.playGame();
    let correct = false;
    let gameOver = false;
    this.state = {riddle, correct, gameOver};
    this.renderOptions = this.renderOptions.bind(this);
  //  this.checkResults = this.checkResults.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.play = this.play.bind(this);
  }
  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  GenerateRandomOptions(sum){
    let resultsArray = [];
    let randomNumberArray = [];
    while(randomNumberArray.length <= 3) {
      let randomNumber = this.randomNumber(1,19);
        if(randomNumberArray.indexOf(randomNumber) > -1) {
        //find location, if not found, callback -1, otherwise, callback
        //location. ( from 0 )
          continue;
        }else {
          randomNumberArray.push(randomNumber);
        }
    }

    for(let i=0; i<3; i++) {
      let addSubtract = this.randomNumber(0,1);
      let result = sum;
      if(addSubtract === 1) {
        //add the number to the result
        result += randomNumberArray[i];
        resultsArray.push(result);
      }else {
        //Subtract the number from result
        result -= randomNumberArray[i];
        resultsArray.push(result);
      }
    }
    return resultsArray;
  }
  playGame() {
    let field1 = this.randomNumber(20,50);
    let field2 = this.randomNumber(20,50);
    let result = field1 + field2;
    let resultsArray = this.GenerateRandomOptions(result);
    resultsArray.push(result);
    resultsArray.sort(function(a,b) {
        return 0.5 - Math.random()
    });
    console.log(resultsArray);
    let riddle = {
      resultsArray : resultsArray,
      fields1 : field1,
      fields2: field2,
      answer: result
    };

  //  console.log(riddle);
    if(this.state && this.state.gameOver) {
      this.setState({riddle: riddle});
    }else {
      return riddle;
    }
  }
  checkResults(result) {
    console.log('checkResults called ' + result);
    if(this.state.riddle.answer === result) {
      console.log('correct answer');
      this.setState({correct: true, gameOver:true});

    }else {
      console.log('wrong answer');
      this.setState({correct: false, gameOver:true});
    }
  }
  renderOptions() {
    return(
      <div className="options">
        {this.state.riddle.resultsArray.map((options,i) =>
          <QuizOptions option={options} key ={i} checkResults = {(optionsss) => this.checkResults(optionsss)}/>
        )}
      </div>
    );

  }
  renderMessage() {
    if(this.state.correct) {
      return <h3>Good Job! Hit the button below to Play Again!</h3>
    }else {
      return <h3>Ohhh ohhh! Hit the button below to Play Again!</h3>
    }
  }
play() {
  this.setState({correct: false, gameOver:false});
  this.playGame();
}
  render() {
    return (
      <div className = "quiz">
        <div className ="quiz-content">
          <p className = "question">
           What is the sum of
            <span className = "text-info"> {this.state.riddle.fields1} </span>
            of <span className = "text-info"> {this.state.riddle.fields2} </span>?</p>
            {this.renderOptions()}
            </div>
            <div className = {classNames('after',{'hide': !this.state.gameOver},
            {'wrong animated zoomInDown': !this.state.correct},
            {'correct animated zoomInDown': this.state.correct})} >
                {this.renderMessage()}
            </div>
            <div className ="play-again">
              <a className ="button" onClick={this.play}>Play Again</a>
        </div>
      </div>
    )
  }
}
export default Quiz;
