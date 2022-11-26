/*var sliderImages = Array.from(document.querySelectorAll('.slider-container img'));
var slidsCount = sliderImages.length;
var currentSlide =2;
var slideNumberElement = document.getElementById('slider-number')
var prevButton = document.getElementById('prev');
var naxtButton = document.getElementById('next');

function nextSlide(){
    if(naxtButton.classList.contains('disapled')){ 
    return false;}
    else { 
    currentSlide++;
    theChecker()}
}
function prevSlide(){
    if(prevButton.classList.contains('disapled')){ 
        return false;}
        else { 
        currentSlide--;
        theChecker()}  
}
naxtButton.onclick =nextSlide;
prevButton.onclick = prevSlide;

console.log(slideNumberElement)

//Create main ul element
var padginationElament = document.createElement('ul');
    padginationElament.setAttribute('id','padgination-ul');

for(var i=1;i<=slidsCount;i++){
    var padginationItems = document.createElement("li");
    padginationItems.setAttribute('data-index',i);
    padginationItems.appendChild(document.createTextNode(i));
    padginationElament.appendChild(padginationItems);   
};
document.getElementById('indicator').appendChild(padginationElament); 


function theChecker(){
    //set The sloder number
    slideNumberElement.textContent = 'slide #' + (currentSlide)+ ' of ' + (slidsCount);
    // set activ class in to current slide
    sliderImages[currentSlide-1].classList.add('active')
}
theChecker()*/


let countSpan = document.querySelector(".count span");
let bulletSpanContainer = document.querySelector('.bullets .spans')
let quizArea = document.querySelector('.quiz-area');
let answerArea= document.querySelector('.answer-area')
let submitButton = document.querySelector('.btn');
let currentIndex =0;


function getQuestions(){
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange= function(){
        if(this.readyState === 4 && this.status === 200){
          let questionObject = JSON.parse(this.responseText)
          let QCount = questionObject.length;
          createBullets(QCount)
          addQuestionsData(questionObject[currentIndex],QCount)
          submitButton.onclick=()=>{
            let theRightAnswer = questionObject[currentIndex].right_answer;
            currentIndex++;
            checkAnswer(theRightAnswer,QCount);
          }
        }
    }
    myRequest.open("GET","htmlQ.json",true)
    myRequest.send();
                       }
getQuestions();


function createBullets(num){
    countSpan.innerHTML=num;

    for(let i=0;i<num;i++){
        let theBullet = document.createElement("span");
        if(i === 0){
            theBullet.className= "on";
        }
        bulletSpanContainer.appendChild(theBullet)
    }
}



function addQuestionsData(obj,countQ){
let questionTitle = document.createElement('h2')
let questionTExt = document.createTextNode(obj["title"]);
questionTitle.appendChild(questionTExt)
quizArea.appendChild(questionTitle)

for(var i =1; i<=4; i++){
    let mainDiv = document.createElement("div");
    mainDiv.className="answer";
    let radioInput  = document.createElement('input');
    radioInput.name = "question";
    radioInput.type = "radio";
    radioInput.id   = `answer_${i}`;
    radioInput.dataset.answer = obj[`answer_${i}`];
if(i===1){
    radioInput.checked=true;
}

    let TheLabel = document.createElement('label')
    TheLabel.htmlFor=`answer_${i}`;
    let TheLableText = document.createTextNode(obj[`answer_${i}`])
    TheLabel.appendChild(TheLableText)
    mainDiv.appendChild(radioInput);
    mainDiv.appendChild(TheLabel);
    answerArea.appendChild(mainDiv)
}
                                  }

function checkAnswer(rAnswer,count2){
    console.log(rAnswer)
    console.log(count2,`Question`)
}