"use strict"
import {questions,choice,ans} from './home.js';

window.addEventListener("load", () => {
    populateQuiz();
});

const populateQuiz = () => {
    console.log('populated quiz inside quiz.js');
    var quizEntry = document.getElementById('quizEntry');
    for (let pair of questions) {
        var [question, options] = pair;
        var quizdiv = document.getElementById('quiz');
        var heading = document.createElement('h5');
        heading.innerHTML = question;
        quizdiv.append(heading);

        var ul = document.createElement('ul');
        var op = 1;
        for(let option in options) {
            var li = document.createElement('li');
            li.innerHTML = option;
            li.setAttribute('style', 'display: block;');
            ul.append(li);
        }
        quizdiv.append(ul);
    }
}