"use strict"
import {geoLocation,geo_eng,geo_italian,splitFullName} from '/static/js/utils.js';

const questions = new Map(); 
const choice = new Map();
const ans = new Map();


const submit_btn = document.getElementById("submitChoice");
if(submit_btn) {
  submit_btn.addEventListener("click", () => {
    getQuestionsForChoice();
  });
}


const getQuestionsForChoice = () => {
  const form = document.getElementById('initDet');
  if(!form.email.checkValidity() || !form.fullname.checkValidity()) {
    return;
  }
  localStorage.setItem('fullname', form.fullname.value);
  localStorage.setItem('fname', form.fname.value);
  localStorage.setItem('mname', form.mname.value);
  localStorage.setItem('lname', form.lname.value);
  sessionStorage.setItem('email', form.email.value);
  const select = document.getElementById('category');
  const choice_val = select.options[select.selectedIndex].value;
  const text = select.options[select.selectedIndex].text;
  console.log('Requesting questions from category '+choice_val+' text:'+text);
  fetch('/getQuestions/'+choice_val)
    .then(response => response.json())
    .then(data => {
      console.log('populating quiz...');
      let ques = data.results;
      console.log(ques);
      let i = 1;
      for(let q of ques) {
        questions.set(i,q.question);
        let incorrect_ans = [];
        let vals = q.incorrect_answers;
        for(let inc of vals) {
          incorrect_ans.push(inc);
        }
        let correct_answer = q.correct_answer;
        incorrect_ans.push(correct_answer);
        choice.set(i,incorrect_ans);
        ans.set(i+"",correct_answer);
        i++;
      }
      //window.location.href = "/quiz";
      populateQuiz();
    });
}

const populateQuiz = () => {
  console.log('populated quiz inside quiz.js');
  let quizEntry = document.getElementById('quizEntry');
  let q = 1;
  for (let pair of questions) {
      let [i, question] = pair;
      let quizdiv = document.createElement('div');
      let heading = document.createElement('h3');
      heading.innerHTML = "Que "+q+". "+question;
      quizdiv.append(heading);

      let ul = document.createElement('ul');
      let op = 1;
      for(let option of choice.get(i)) {
          let li = document.createElement('li');
          let btn = document.createElement('input');
          btn.type = "button";
          btn.value = option; 
          btn.classList.add('options');
          btn.style.backgroundColor =  "#bddbfa";
          let localQ  = q+"";
          btn.id = localQ+"_"+op;
          btn.onclick = () => { 
              if(btn.value == ans.get(localQ)) {
                btn.className = 'greenButton';
                //btn.style.backgroundColor = "#90EE90";
              } else {
                btn.className = 'redButton';
                //btn.style.backgroundColor = "#FF0000";
              }
          };
          li.append(btn);
          li.setAttribute('style', 'display: block;');
          ul.append(li);
          op++;
      }
      quizdiv.append(ul);
      quizEntry.append(quizdiv);
      q++;
  }
  let greetArray = ['Hello',localStorage.getItem('fname')];
  let {greeting,uname} = greetArray;//array destructuring
  geoLocation.call(geo_eng,greeting,uname);
  geoLocation.apply(geo_italian,...greetArray); //spread operator
  geoLocation.apply(geo_italian,["Ciao","Komal"]);
  
}

const fntxt = document.getElementById("fullname");
fntxt.addEventListener("keyup", (e) => {
  populateNameAsSections(fntxt.value);
});

const populateNameAsSections = (fullName) => {
  let nameString = splitFullName(fullName);
  let nameJson = JSON.parse(nameString);
  console.log('format of nameString is: '+typeof(nameString));
  console.log('format of nameJson is: '+typeof(nameJson));

  let {fname,mname,lname} = nameJson; //object destructuring
  const fName = document.getElementById('fname');
  fName.value = fname;
  const mName = document.getElementById('mname');
  mName.value = mname;
  const lName = document.getElementById('lname');
  lName.value = lname;
}

const showNameInConsole = (...allnames) => {
  console.log(allnames);
}

