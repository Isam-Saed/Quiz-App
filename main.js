 let catigory = document.querySelector('.category span');
 let quizArea  = document.querySelector(".quiz-area");
 let answerArea = document.querySelector('.answer-area');
 let bullets =document.querySelector('.bullets');
 let bullSpans = document.querySelector('.bullets .spans')
 let countSpan = document.querySelector('.count span')
 let btn2 = document.querySelector('.btn');
 let result = document.querySelector('.result');
 let countDown =document.querySelector('.countDown span');

 currentIndex = 0;
 point = 0;
 let countinterval;
function getQuestions(){
    let myRequest = new XMLHttpRequest();
    myRequest.open("GET","cssQ.json",true);
    myRequest.send();
    myRequest.onreadystatechange=function(){
       if(this.status === 200 && this.readyState === 4){
           let changetoString = JSON.parse(this.responseText);
           let Qcount =changetoString.length-1;

           createBullets(Qcount);
           addQuestionsData(changetoString[currentIndex],Qcount);
           countdown(19,Qcount);
           btn2.onclick=()=>{
            let RightAnswer  = changetoString[currentIndex].rightAnswer;
            checkAnswer(RightAnswer,Qcount);
            currentIndex ++ ;

             quizArea.innerHTML = '';
             answerArea.innerHTML = '';
             addQuestionsData(changetoString[currentIndex],Qcount);
             handelBullet();
             clearInterval(countinterval);
             countdown(19,Qcount);
             showFinalResult(Qcount,changetoString);
           }
         
          catigory.innerHTML= changetoString[Qcount].catigory;
       }
    }
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
        theBullet.appendChild(numberQSpan);
        bullSpans.appendChild(theBullet)
    }
}


function addQuestionsData(countQuetions,QN){
    if(currentIndex < QN){  
        let questionTitle = document.createElement('h2')
        questionTitle.className='an wow fadeInUp'
        
        let questionTExt = document.createTextNode(countQuetions["title"]);
        questionTitle.appendChild(questionTExt)
        quizArea.appendChild(questionTitle)
        


    for(var i=1;i<4;i++){
     let mainDiv=  document.createElement('div');
     mainDiv.className="answer wow fadeInDown";
     let radioInput2 = document.createElement('input')
     radioInput2.type='radio';
     radioInput2.name='question';
     radioInput2.id=`answer_${i}`;
     radioInput2.dataset.isamalhariri = countQuetions[`answer_${i}`]
   

let lable2 = document.createElement('label');
let lableText = document.createTextNode(countQuetions[`answer_${i}`])
lable2.htmlFor=`answer_${i}`;
lable2.appendChild(lableText);
mainDiv.appendChild(radioInput2)
mainDiv.appendChild(lable2)
answerArea.appendChild(mainDiv)
    }
   }
}


function checkAnswer(RAnswer,Qcount){
 
       let  choosenAnswer ;
        let answer3 = document.getElementsByName('question')
        for(let i=0;i<answer3.length;i++){
            if(answer3[i].checked){choosenAnswer = answer3[i].dataset.isamalhariri;}
                                         }
            if(RAnswer === choosenAnswer){++point;}
       
    }


    function handelBullet(){
        let bullitSpans3= document.querySelectorAll('.spans span');
        let ArrayOfSpans = Array.from(bullitSpans3);
        ArrayOfSpans.forEach((span,index) =>{
            if(currentIndex === index){
                span.className='on';}
        })
    }


  function countdown(duration,countQuestion3){
    if(currentIndex <countQuestion3){ 
        let minutes22,secunds22;
         countinterval = setInterval(()=>{
            minutes22=parseInt(duration/60);
            secunds22=parseInt(duration%60);

            minutes22=minutes22 < 10 ? `0${minutes22}` : minutes22;
            secunds22 =secunds22< 10 ? `0${secunds22}` : secunds22;


            countDown.innerHTML=` ${minutes22}:${secunds22}`;
            if(secunds22 <=5){
                countDown.style=" color:red";  
            }else{
                countDown.style=" color:#0f4755"; 
            }
            if(--duration <0){
            
                clearInterval(countinterval);
                btn2.onclick();
            }
            
        },1000);

    }}


   function showFinalResult(Qcount,cReponse){
    let result2;
    if(currentIndex === Qcount){ console.log(point)
    quizArea.remove();
    answerArea.remove();
    bullets.remove();
    btn2.remove();
    if(point > Qcount/2 && point >= Qcount-3 ){
        result2=`<div class="resu  container wow fadeInUpBig"><span class="perfect">Perfect</span>, All Answer IS Good,You solve ${point} from ${Qcount} Q  <br>
        You Finished ${cReponse[Qcount].catigory}${cReponse[Qcount].masage} . </div>
        `
    }
    else if(point> Qcount/2 && point < Qcount-3){
        result2=  `<div class="resu  container wow fadeInUpBig"><span class="good"> Good</span>,You solve ${point} from ${Qcount} Q  Good
        <br>
        You Finished ${cReponse[Qcount].catigory}${cReponse[Qcount].masage} . </div>`
    }
    else{
        result2= `<div class="resu container wow fadeInUpBig"><span class="bad">Bad</span>,You solve ${point} from ${Qcount} Q bad Please agin
        <br>
        You not Finish ${cReponse[Qcount].catigory} . </div>`
    }
    result.innerHTML =result2;
   }}
   