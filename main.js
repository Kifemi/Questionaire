var questions = []

var questionline;
var answerBlock;
var endBlock;

var currentQuestionID =0;
var answerIndexes = new Array();


function onStart(){
    var q1 = new Question("Paljonko kello?", ["aika paljon","Todella paljon", "aaaah!"]);
    var q2 = new Question("Voiko kalaa syödä?", ["kyllä voi","ei voi"]);
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
        +" <P>vastasit: "+Question.getAnswer(element, answerIndexes[answerIndexcounter]) 
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
        answerBlock.innerHTML += "<p>"+
        element+" <button onclick=AnswerButtonClicked("+answerArray.indexOf(element)+") class=\"btnColor\"> valitse</button>"
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