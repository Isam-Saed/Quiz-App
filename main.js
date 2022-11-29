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
let bullets = document.querySelector('.bullets');
let submitButton = document.querySelector('.btn');
let result = document.querySelector('.result');
let countDown = document.querySelector('.countDown');
let Student = prompt(`Welcome in Quiz App .. Please Enter Your Name.`);
//set Data
let currentIndex =0;
let rightAnswer   =0;
let countDownInterval;
function getQuestions(){
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange= function(){
        if(this.readyState === 4 && this.status === 200){
          let questionObject = JSON.parse(this.responseText)
          let QCount = questionObject.length;
          createBullets(QCount)
          addQuestionsData(questionObject[currentIndex],QCount)
          countDownfun(11,QCount);
          
          submitButton.onclick=()=>{
            let theRightAnswer = questionObject[currentIndex].right_answer;
            currentIndex++;
            checkAnswer(theRightAnswer,QCount);

            quizArea.innerHTML   ='';
            answerArea.innerHTML ='';
            addQuestionsData(questionObject[currentIndex],QCount);
            
            handelBullet();
            
            clearInterval(countDownInterval);
            countDownfun(11,QCount)
            showResult(QCount);
            
                                    };
             
                              
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
        let numberQSpan =document.createTextNode(`${i+1}`)
        theBullet.appendChild(numberQSpan)
        bulletSpanContainer.appendChild(theBullet)
    }
}



function addQuestionsData(obj,countQ){
    
    if(currentIndex < countQ){ 
let questionTitle = document.createElement('h2')
questionTitle.className='wow flipInY'

let questionTExt = document.createTextNode(obj["title"]);
questionTitle.appendChild(questionTExt)
quizArea.appendChild(questionTitle)

for(var i =1; i<=4; i++){
    let mainDiv = document.createElement("div");
    mainDiv.className="answer wow fadeInDown";
    let radioInput  = document.createElement('input');
    radioInput.name = "question";
    radioInput.type = "radio";
    radioInput.id   = `answer_${i}`;
    radioInput.dataset.answer = obj[`answer_${i}`];
if(i===1){ radioInput.checked=true;}

    let TheLabel = document.createElement('label')
    TheLabel.htmlFor=`answer_${i}`;
    let TheLableText = document.createTextNode(obj[`answer_${i}`])
    TheLabel.appendChild(TheLableText)
    mainDiv.appendChild(radioInput);
    mainDiv.appendChild(TheLabel);
    answerArea.appendChild(mainDiv)
}
                                  }}



function checkAnswer(rAnswer,count2){
   let answers = document.getElementsByName('question')
   let theChoosenAnswer ;
   for(var i=0;i<answers.length;i++){
     if(answers[i].checked){theChoosenAnswer=answers[i].dataset.answer}
     
   }
   if(theChoosenAnswer === rAnswer){
    rightAnswer++;
    console.log(`Good Answer isam the right Answer is ${rAnswer}`)
                                   }
}

function handelBullet(){
    let bullitSpans3= document.querySelectorAll('.bullets .spans span');
    let ArrayOfSpans = Array.from(bullitSpans3);
    ArrayOfSpans.forEach((span,index) =>{
        if(currentIndex === index){
            span.className='on';}
    })
}

function showResult(count3){
    let theResults;
    if(currentIndex === count3){
        quizArea.remove();
        answerArea.remove();
        bullets.remove();
        submitButton.remove();
        if(rightAnswer > count3/2 && rightAnswer  < count3){
            theResults =`<div class="wow wobble"><span class="good  wow fadeInLeft ">Good</span>,You solve ${rightAnswer} from ${count3} Q  Good ${Student} </div>`
        }
        else if(rightAnswer === count3){
            theResults =`<div class="wow wobble"><span class="perfect  wow fadeInLeft ">Perfect</span>, All Answer IS Good ${Student}</div> `
        }
        else{
            theResults =   `<div class="wow wobble"><span class="bad  wow fadeInLeft">Bad</span>,You solve ${rightAnswer} from ${count3} Q bad ${Student} Please agin</div> `
        }
        result.innerHTML=theResults;
}

}
function countDownfun(duration,count4){
if(currentIndex < count4){
    let minutes,secunds;
    countDownInterval = setInterval(function(){
        minutes =parseInt(duration /60);
        secunds =parseInt(duration %60);
 minutes =minutes<10?`0${minutes}`: minutes;
 secunds =secunds<10?`0${secunds}`: secunds;
        countDown.innerHTML=`${minutes}:${secunds}`
        if(--duration <0){
            clearInterval(countDownInterval);
            submitButton.click();
        }
    },1000)
}
}
