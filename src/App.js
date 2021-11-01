import './App.css';
import React, { useDebugValue, useState } from 'react';

import Questions from './Questions.json'

function App() {
  // hook used to keep track of what type is being used
  const [pickType, setpickType] = useState(true);
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-body">
          <button onClick={() => setpickType(!pickType)}>Change Type - Type {pickType?"1":"2"}</button>
          <QAHolder pickType={pickType}/>
        </div>
      </header>
    </div>
  );
}

function QAHolder(props) {
  // create a title and QACategory element for each category in Questions.json
  const QAList = []
  for(var Category in Questions){
    QAList.push(
      <div key={Category}>
        <h2>{Category}</h2>
        <QACategories Category={Category} pickType={props.pickType} />
      </div>
    )
  }
  return(
    <>
    {QAList}
    </>
  );
}

function QACategories(props) {
  // Selected hook, for use when only one question can be expanded.
  const [Selected, setSelected] = useState(0);
  // When clicking on the getByTitle, change selected to that one
  function ChangeSelected(id){
    setSelected(id)
  }
  // Loop through each question/ answer pair under the category
  const QuestionList = []
  var Category = Questions[props.Category]
  for(var Questionreturn in Category){
    // Split each newline in the answers into separate paragraphs
    const ParagraphList = []
    for(var Paragraph in Category[Questionreturn]["Answer"].split("\n")){
      ParagraphList.push(
        <p className="QuestionAnswer" key={Paragraph}>
          {Category[Questionreturn]["Answer"].split("\n")[Paragraph]}
        </p>
      )
    }
    // Check what type is currently being used - for opening more than one at once
    if(props.pickType==true){
      QuestionList.push(
        // separate react component to localise the opening/closing
        <SeparateQuestions key={Questionreturn} Questionreturn={Questionreturn} Category={Category} ParagraphList={ParagraphList} />
      )
      // otherwise for opening ony one at a time
    }else{
      QuestionList.push(
        <div className="AnswerHolder" key={Questionreturn} id={Questionreturn}>
          <h5 id={Questionreturn} className="AnswerHeader" onClick={(event) => ChangeSelected(event.target.id)}>{Category[Questionreturn]["Question"]}</h5>
          <div id={Questionreturn} className={Selected==Questionreturn?`AnswerExpanded AnswerAnswer`:`AnswerCollapsed AnswerAnswer`}>
            {ParagraphList}
          </div>
        </div>
      )
    }
  }
  return(
    <div>
    {QuestionList}
    </div>
  )
}

function SeparateQuestions(props) {
  // Used to open/close each question individually
  const [Open, setOpen] = useState(false);
  // Used to open the first entry at the beginning. Probably a better way to do this.
  const [OneTime, setOneTime] = useState(true);
  if(props.Questionreturn==0&OneTime){
    setOpen(true);
    setOneTime(false);
  };
  return(
    <div className="AnswerHolder" key={props.Questionreturn} id={props.Questionreturn}>
      <h5 id={props.Questionreturn} className="AnswerHeader" onClick={() => setOpen(!Open)}>{props.Category[props.Questionreturn]["Question"]}</h5>
      <div id={props.Questionreturn} className={Open?`AnswerExpanded AnswerAnswer`:`AnswerCollapsed AnswerAnswer`}>
        {props.ParagraphList}
      </div>
    </div>
  )
}

export default App;
