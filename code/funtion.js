// ================= MCQs =================
const mcqs = [
{q:"কম্পিউটারের মস্তিষ্ক কোনটি?",o:["CPU","RAM","Keyboard","Monitor"],a:0},
{q:"RAM এর পূর্ণরূপ কি?",o:["Random Access Memory","Read Memory","Run Memory","None"],a:0},
{q:"ROM কি ধরনের মেমরি?",o:["Volatile","Non Volatile","Temporary","Cache"],a:1},
{q:"Keyboard কোন ধরনের ডিভাইস?",o:["Input","Output","Storage","Network"],a:0},
{q:"Printer কোন ধরনের ডিভাইস?",o:["Input","Output","CPU","Memory"],a:1},
{q:"ওয়েব ব্রাউজার কোন ধরনের সফটওয়্যার?",o:["Software","Hardware","CPU","Network"],a:0},
{q:"GUI মানে?",o:["Graphical User Interface","General User Interface","Good UI","None"],a:0},
{q:"LAN কি?",o:["Network","Storage","CPU","Program"],a:0},
{q:"URL এর পূর্ণরূপ?",o:["Uniform Resource Locator","Universal Resource","Uniform Run","None"],a:0},
{q:"Hard Disk কোন ধরনের ডিভাইস?",o:["Storage","CPU","RAM","Monitor"],a:0},
{q:"ALU কাজ কি?",o:["Math and Logic","Video","Audio","Print"],a:0},
{q:"Windows কি?",o:["Operating System","Software","Hardware","Browser"],a:0},
{q:"Parity bit এর কাজ কি?",o:["Error check","Speed","Storage","Graphics"],a:0},
{q:"MS Word কোন ধরনের সফটওয়্যার?",o:["Application","OS","Hardware","None"],a:0},
{q:"10 decimal এর binary?",o:["1010","1110","1000","1100"],a:0},
{q:"OS এর কাজ কি?",o:["Hardware manage","Print","Internet","None"],a:0},
{q:"Programming language নয়?",o:["Python","Java","HTML","Windows"],a:3},
{q:"সুপারকম্পিউটার কোন কাজে ব্যবহৃত?",o:["Scientific calc","Games","Music","Video"],a:0},
{q:"BIOS এর পূর্ণরূপ?",o:["Basic Input Output System","Binary System","Basic Internal","None"],a:0},
{q:"Volatile memory কোনটি?",o:["RAM","ROM","Flash","Disk"],a:0},
{q:"Modem এর কাজ?",o:["Signal convert","Print","Scan","Store"],a:0},
{q:"Cancel key কোনটি?",o:["Esc","Ctrl","Alt","Tab"],a:0},
{q:"Compiler কাজ কি?",o:["Translate code","Run","Store","Debug"],a:0},
{q:"Memory নয়?",o:["Primary","Secondary","Secret","Tertiary"],a:2},
{q:"Network connect device?",o:["Hub","Printer","Scanner","Monitor"],a:0},
{q:"HTTP পূর্ণরূপ?",o:["HyperText Transfer Protocol","HighText","HyperLink","None"],a:0},
{q:"Input নয়?",o:["Joystick","Mic","Printer","Keyboard"],a:2},
{q:"Cache এর কাজ?",o:["CPU speed increase","Store","Graphics","Network"],a:0},
{q:"Portable storage?",o:["USB","RAM","ROM","CPU"],a:0},
{q:"ফাইল এবং ফোল্ডার ম্যানেজ?",o:["File Manager","Compiler","Browser","ALU"],a:0}
];

const exam=document.getElementById("exam");
let answers = JSON.parse(localStorage.getItem("answers") || "{}");
let timerValue = parseInt(localStorage.getItem("timerValue") || "1800");
let examLocked = (localStorage.getItem("examLocked") === "true");

// ================= Load Exam =================
function loadExam(){
  exam.innerHTML='';
  mcqs.forEach((m,i)=>{
    let div=document.createElement("div");
    div.className="question";
    let html=`<p>${i+1}. ${m.q}</p><div class="options">`;
    m.o.forEach((opt,j)=>{
      let checked = (answers[i]==j) ? "checked" : "";
      html+=`<label><input type="radio" name="q${i}" value="${j}" ${checked} onchange="saveAnswer(${i},${j})" ${examLocked ? "disabled":""}> ${opt}</label>`;
    });
    html+='</div>';
    div.innerHTML=html;
    exam.appendChild(div);
  });
  document.getElementById("submitDiv").style.display = examLocked ? "none" : "block";
}

// ================= Save Answer =================
function saveAnswer(qIndex, val){
  if(examLocked) return;
  answers[qIndex] = val;
  localStorage.setItem("answers", JSON.stringify(answers));
}

// ================= Start Exam =================
function startExam(){
  let pass=document.getElementById("startPass").value;
  if(pass==="mh7hridoy"){
    document.getElementById("lock").style.display="none";
    document.getElementById("countdown").style.display="block";
    let c=5;
    document.getElementById("count").innerText=c;
    let ct=setInterval(()=>{
      c--;
      document.getElementById("count").innerText=c;
      if(c<=0){
        clearInterval(ct);
        document.getElementById("countdown").style.display="none";
        document.getElementById("examTimer").style.display="block"; // show timer
        exam.style.display="block";
        loadExam();
        startTimer();
      }
    },1000);
  }else{
    alert("Wrong Password");
  }
}

// ================= Timer 30 min =================
function startTimer(){
  if(examLocked) return;
  let t=setInterval(()=>{
    if(examLocked) { clearInterval(t); return; }
    let min=Math.floor(timerValue/60);
    let sec=timerValue%60;
    document.getElementById("examTimer").innerText="Time Left: "+min+":"+(sec<10?"0"+sec:sec);
    timerValue--;
    localStorage.setItem("timerValue", timerValue);
    if(timerValue<0){
      clearInterval(t);
      lockExam();
    }
  },1000);
}

// ================= Lock Exam =================
function lockExam(){
  examLocked=true;
  document.querySelectorAll("input").forEach(i=>i.disabled=true);
  document.getElementById("submitDiv").style.display="none";
  localStorage.setItem("examLocked","true");
  alert("Time Over. Exam Locked!");
  showResultAfterLock();
}

// ================= Submit Exam =================
function submitExam(){
  let p=prompt("Submit Password");
  if(p!=="1313"){ alert("Wrong Password"); return;}
  lockExam();
}

// ================= Show Result After Lock/Submit =================
function showResultAfterLock(){
  let score=0;
  let blank=0;
  mcqs.forEach((m,i)=>{
    let ans=answers[i];
    if(ans!=null){
      if(ans==m.a) score++;
    } else blank++;
  });
  localStorage.setItem("score",score);
  localStorage.setItem("blank",blank);
  showResult(score,blank);
}

// ================= Show Result =================
function showResult(score, blank){
  exam.style.display="none";
  document.getElementById("submitDiv").style.display="none";
  document.getElementById("examTimer").style.display="none";
  document.getElementById("result").innerHTML=`
    <div class="result fadeIn">
      <h2>Exam Result</h2>
      <p>Total Questions : 30</p>
      <p>Correct : ${score}</p>
      <p>Wrong : ${30-score-blank}</p>
      <p>Blank : ${blank}</p>
      <p>Score : ${(score*3.33).toFixed(2)}</p>
    </div>
  `;
  document.getElementById("restartDiv").style.display="block";
}

// ================= Restart Exam =================
function restartExam(){
  if(confirm("Are you sure to restart the exam?")) {
    localStorage.clear();
    location.reload();
  }
}

// ================= Reload Protection =================
window.onload=function(){
  if(localStorage.getItem("score")!==null){
    examLocked=true;
    showResult(localStorage.getItem("score"), localStorage.getItem("blank"));
    return;
  }
  if(Object.keys(answers).length>0 || timerValue<1800){
    document.getElementById("lock").style.display="none";
    document.getElementById("countdown").style.display="none";
    document.getElementById("examTimer").style.display="block"; // show timer
    exam.style.display="block";
    loadExam();
    startTimer();
  }
}

// ================= Logo Flip =================
const flipLogo=document.getElementById("flipLogo");
flipLogo.onclick=function(){
  flipLogo.classList.toggle("flipped");
};
