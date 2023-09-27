let questions = [
    {
        question: "Wer hat HTML erfunden?",
        answer_1: "Robbie Williams",
        answer_2: "Lady Gaga",
        answer_3: "Tim Berners-Lee",
        answer_4: "Justin Bieber",
        right_answer: 3,
    },
    {
        question: "Wie bindet man eine Website in eine Website?",
        answer_1: "Antwort1",
        answer_2: "Antwort2",
        answer_3: "Antwort3",
        answer_4: "Antwort4545",
        right_answer: 2,
    },
    {
        question: "Wer ist am 21.09.1990 geboren?",
        answer_1: "Robbie Williams",
        answer_2: "Lady Gaga",
        answer_3: "Mehmet Tekin",
        answer_4: "Justin Bieber",
        right_answer: 3,
    },
    {
        question: "Wer ist der beste Fußballer der Welt?",
        answer_1: "Robbie Williams",
        answer_2: "Christiano Ronaldo",
        answer_3: "Mehmet Tekin",
        answer_4: "Justin Bieber",
        right_answer: 2,
    },
    {
        question: "Wer ist der beste Fußballer der Welt?",
        answer_1: "Robbie Williams",
        answer_2: "Christiano Ronaldo",
        answer_3: "Mehmet Tekin",
        answer_4: "Justin Bieber",
        right_answer: 2,
    },
    {
        question: "Wer ist der beste Fußballer der Welt?",
        answer_1: "Robbie Williams",
        answer_2: "Christiano Ronaldo",
        answer_3: "Mehmet Tekin",
        answer_4: "Justin Bieber",
        right_answer: 2,
    },
    {
        question: "Wer ist der beste Fußballer der Welt?",
        answer_1: "Robbie Williams",
        answer_2: "Christiano Ronaldo",
        answer_3: "Mehmet Tekin",
        answer_4: "Justin Bieber",
        right_answer: 2,
    },
];

let fragenummer = 0;
let fragennummertotal = questions.length;
let richtig = 0;
let falsch = 0;

let AUDIO_SUCCES = new Audio('sounds/success.mp3');
let AUDIO_FAIL = new Audio('sounds/wrong.mp3');
let AUDIO_FINISH = new Audio('sounds/finish.mp3')


function showQuestion() {
    let content = document.getElementById('questions');

    content.innerHTML = '';

    let current_question = questions[fragenummer];

    updateProgressbar();
    content.innerHTML += showQuestionHTML(current_question.question);

    content.innerHTML += showAnswerHTML(current_question.answer_1,current_question.answer_2,current_question.answer_3,current_question.answer_4);
    content.innerHTML += showFooterQuizz(fragenummer);
}

function nextQuestion() {

    fragenummer++;

    if (fragenummer == questions.length) {
        finishQuizz();
    }
    else {
        showQuestion();
        resetAnswerButtons();
    }

}

function finishQuizz() {
    let content = document.getElementById('questions');

    content.innerHTML = '';

    AUDIO_FINISH.play();
    document.getElementById('questions-image').src = 'img/trophy-gc4e46cbd6_640.png';
    content.innerHTML = `
    <h2>Quizz Beendet!</h2>

    <p>Du hast ${richtig} Fragen von ${fragennummertotal} richtig beantwortet.</p>
    <p>Falsch beantwortet: ${falsch}</p>

    <button onclick="restartQuizz()" class="btn btn-warning">Nochmal starten</button>
    `;
}

function restartQuizz() {
    fragenummer = 0;
    richtig = 0;
    falsch = 0;
    document.getElementById('questions-image').src = 'img/quiz-g0c16ec56e_1280.png';
    showQuestion();
}

function updateProgressbar() {

    let prozent = (fragenummer + 1) / questions.length;
    prozent = prozent * 100;
    console.log(prozent.toFixed().replace(',', '.'))
    document.getElementById('progressbar2').innerHTML = `${prozent.toFixed().replace(',', '.')} %`;
    document.getElementById('progressbar2').style = `width: ${prozent}%`;
}

function answerQuestion(antwort) {

    let letztebuchstabe = antwort.slice(-1);

    if (questions[fragenummer].right_answer == letztebuchstabe) {
        rightAnswer(letztebuchstabe);
    }
    else {
        falseAnswer(letztebuchstabe)
    }
}


function rightAnswer(letztebuchstabe) {
    AUDIO_SUCCES.play();
    document.getElementById(`answer_${letztebuchstabe}`).classList.add('card-bodyR');
    document.getElementById('nextQuestion').disabled = false;
    richtig++;
}

function falseAnswer(letztebuchstabe){
    AUDIO_FAIL.play();
    document.getElementById(`answer_${letztebuchstabe}`).classList.add('card-bodyF');
    document.getElementById(`answer_${questions[fragenummer].right_answer}`).classList.add('card-bodyR');
    document.getElementById('nextQuestion').disabled = false;
    falsch++;
}

function resetAnswerButtons() {
    document.getElementById('answer_1').classList.remove("card-bodyF", "card-bodyR");
    document.getElementById('answer_2').classList.remove("card-bodyF", "card-bodyR");
    document.getElementById('answer_3').classList.remove("card-bodyF", "card-bodyR");
    document.getElementById('answer_4').classList.remove("card-bodyF", "card-bodyR");
}


function showQuestionHTML(frage) {
    return `
    <div>
        <h4>${frage}</h4>
    </div>    
    `;
}

function showAnswerHTML(answer_1, answer_2, answer_3, answer_4){
    return `
    <div class="answer_Container" id="answer_1" onclick="answerQuestion('answer_1')">
        <span>${answer_1}</span>
    </div>
    <div class="answer_Container" id="answer_2" onclick="answerQuestion('answer_2')">
        <span>${answer_2}</span>
    </div>
    <div class="answer_Container" id="answer_3" onclick="answerQuestion('answer_3')">
        <span>${answer_3}</span>
    </div>
    <div class="answer_Container" id="answer_4" onclick="answerQuestion('answer_4')">
        <span>${answer_4}</span>
    </div>
    `;
}

function showFooterQuizz(fragenummer){
    return `
    <div class="trennlinie"></div>
    
    <div class="end-Container">
        <div><b>${fragenummer + 1}</b> von <b>${fragennummertotal}</b> Fragen</div>
        <div><button id="nextQuestion" disabled="true" class="btn btn-primary" onclick="nextQuestion()">Nächste Frage</button></div>    
    </div>
    `;
}
