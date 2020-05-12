var questions = []

var questionline;
var answerBlock;
var endBlock;

var currentQuestionID =0;
var answerIndexes = [];

function onStart(){
    var q1 = new Question("0,9999999.... = ?", ["0,99999999","1", "&infin;"]);
    var q2 = new Question("1 + 2 + 3 + 4 + 5 + .... = ?", ["&infin;","-1/12", "15", "0"]);
    questions.push(q1,q2);

    questionline =  document.getElementById("questionline")
    answerBlock =  document.getElementById("answerBlock")
    endBlock = document.getElementById("endBlock")
    document.getElementById("questionsBlock").hidden = true;
    document.getElementById("endSummary").hidden = true;
}

function AskNextQuestion(){
    if(currentQuestionID < questions.length){
        let question = questions[currentQuestionID];
        showQuestion(question)
    }
    else{
        ShowEndSummary();
    }
}

function ShowEndSummary(){
    document.getElementById("startBlock").hidden = true;
    document.getElementById("questionsBlock").hidden = true;
    document.getElementById("endSummary").hidden = false;
   
    let answerIndexcounter = 0
    questions.forEach(element => {
        endBlock.innerHTML += Question.getQuestion(element)
        +" <P class=\"summary\">Vastasit: "+Question.getAnswer(element, answerIndexes[answerIndexcounter]) 
        answerIndexcounter ++;})
}

function startQuestionnaire(){
    currentQuestionID = 0;
    answerIndexes = [];
    endBlock.innerHTML = "";
    document.getElementById("startBlock").hidden = true;
    document.getElementById("questionsBlock").hidden = false;
    document.getElementById("endSummary").hidden = true;
    AskNextQuestion();
}

function showQuestion(question){
    
    questionline.innerHTML = question.question;
    ShowAnswerOptions(question.answer);
}

function ShowAnswerOptions(answers){
    //note indexOf does not work, if this is not an array
    var answerArray = Array.from(answers);
    
    answerArray.forEach(element => {
        answerBlock.innerHTML += "<tr>" + "<td><button onclick=AnswerButtonClicked("+answerArray.indexOf(element)+") class=\"btnColor ml-3 mr-5\"> Valitse</button>" + element + "</td>" + "</tr>"
        //answerBlock.innerHTML += "<a href=\"#\" class=\"list-group-item\"> <button onclick=AnswerButtonClicked("+answerArray.indexOf(element)+") class=\"btnColor\"> Valitse</button> " + "\t\t" + element + "</a>"
        //note no need for " " in onclick
    });
}

function CreateAnswerElement(answer){
    //luodaan elementti joka lisätään kyssäreihin.
}

function AnswerButtonClicked(index){
    ClearScreen();
    console.log("Button test:"+index);
    answerIndexes.push(index);
    currentQuestionID += 1;
    AskNextQuestion();
}

function ClearScreen(){
    questionline.innerHTML = "";
    answerBlock.innerHTML = "";
}