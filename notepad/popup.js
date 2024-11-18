let altBox = document.querySelector(".alt-box");
  let hBtn = document.querySelector("#hBtn");
  let content = document.querySelector(".content");
  let addNote = ()=>{
    let form = document.querySelector('form');
    let title = document.getElementById("title").value;
    let note = document.getElementById('note').value;
    let dataExist = 0;
    let notes = JSON.parse(localStorage.getItem("notes")) ?? [];
    console.log(notes);
    for(let v of notes){
      if(v.title==title){
        dataExist = 1;
        break;
      }
    }
    if(dataExist==1){
      altBox.innerHTML=`<div class="del-popup">
      <div class="popup-card">
        <p>This note is already exist!</p>
        <div class="btns">
          <button id="cancel-btn">Ok</button>
        </div>
        </div>
    </div>`;
    document.querySelector("#cancel-btn").addEventListener("click",()=>altBox.innerHTML="");
    }else{
      const today = new Date();
      const yyyy = today.getFullYear();
      const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

      let day = weekday[today.getDay()];
      let mm = today.getMonth() + 1; // Months start at 0!
       let dd = today.getDate();

       if (dd < 10) dd = '0' + dd;
       if (mm < 10) mm = '0' + mm;

      let formattedToday = day +' - '+ dd + '/' + mm + '/' + yyyy;
      let id = new Date().getTime();
    notes.push({
      "id":id,
      "date":formattedToday,
      "title":title,
      "note":note
    });
    localStorage.setItem('notes',JSON.stringify(notes));
    displyData();
    form.reset();
    }
  }
  let updateNote = (i)=>{
    let form = document.querySelector('form');
    let title = document.getElementById("title").value;
    let note = document.getElementById('note').value;
    let dataExist = 0;
    let notes = JSON.parse(localStorage.getItem("notes")) ?? [];
    let xNotes = Object.fromEntries(Object.entries(notes).filter(([key,value])=>Number(key)!==i));
    xNotes = Object.values(xNotes);
    console.log(xNotes);
    console.log(notes);
    for(let v of xNotes){
      console.log(v.title);
      if(v.title==title){
        dataExist = 1;
        break;
      }
    }
   if(dataExist==1){
      altBox.innerHTML=`<div class="del-popup">
      <div class="popup-card">
        <p>This note is already exist!</p>
        <div class="btns">
          <button id="cancel-btn">Ok</button>
        </div>
        </div>
    </div>`;
    document.querySelector("#cancel-btn").addEventListener("click",()=>altBox.innerHTML="");
   }
    else{
    let targetedTodo = notes[i];
    let updetedTodo = {...targetedTodo, title:title,note:note}
    let newNotes = [...notes];
    newNotes[i] = updetedTodo;
    localStorage.setItem('notes',JSON.stringify(newNotes));
    displyData();
    form.reset();
   } 
  }
  
  let displyData = ()=>{
     let notes = JSON.parse(localStorage.getItem("notes")) ?? [];
    //let notes = [];
    let list = "";
      notes.slice().reverse().forEach((element, i)=>{
      list+=`<div class="card">
        <button class="remove-btn" id="${element.id}">×</button>
        <div class="card-content notes-list" id="${element.id}">
            <h2>${element.title}</h2>
            <p class="date">${element.date}<p>
            <p>${truncateText(element.note, 20) }</p>
        </div>
    </div>`;
    });
    content.innerHTML=list;
    hBtn.innerHTML=`<h2>Todo Notes</h2><span id ="input-form"><span class="add-btn">+</span> add new</span>`;
    document.querySelector("#input-form").addEventListener("click",inputForm);
    let noteList = document.querySelectorAll(".notes-list");
    noteList.forEach(e=>e.addEventListener("click",()=>{view(e.id)}));
   let delBtn = document.querySelectorAll(".remove-btn");
   delBtn.forEach(e=>e.addEventListener("click",()=>{del(e.id)}));
  }
  let del = (id)=>{
    altBox.innerHTML=`<div class="del-popup">
      <div class="popup-card">
        <p>Are you sure? You want to delete this note!</p>
        <div class="btns">
          <button id="cancel-btn">Cancel</button>
          <button id="remove-item">Confirm</button>
        </div>
        </div>
    </div>`;
    document.querySelector("#remove-item").addEventListener("click",()=>{removeItem(id)});
    document.querySelector("#cancel-btn").addEventListener("click",cancel);
  }
  let cancel = ()=>{
    altBox.innerHTML="";
  }
  let removeItem = (id)=>{
    console.log("remove",Number(id));
    let notes = JSON.parse(localStorage.getItem("notes")) ?? [];
    
    notes = notes.filter(n=>n.id !== Number(id));
    console.log(notes);
    localStorage.setItem('notes',JSON.stringify(notes));
    cancel();
    displyData();
  }
  let inputForm = ()=>{
    content.innerHTML=`<form>
  <input placeholder="Title" type="text" name="title" id="title"><br>
  <textarea placeholder="Write your note here..." name="note" id="note"></textarea>
</form>`;
  hBtn.innerHTML=`<span class="back">&larr;</span><button type="button" style="background-color:#00dc00" class="save-btn">Save</button>`;
  document.querySelector(".back").addEventListener("click",displyData);
  document.querySelector(".save-btn").addEventListener("click",addNote);
  }
  let editForm = (i)=>{
    content.innerHTML=`<form>
  <input placeholder="Title" type="text" name="title" id="title"><br>
  <textarea placeholder="Write your note here..." name="note" id="note"></textarea>
</form>`;
  hBtn.innerHTML=`<span class="back">&larr;</span><button type="button" style="background-color:#00dc00" class="update-btn">Update</button>`;
  document.querySelector(".back").addEventListener("click",displyData);
  document.querySelector('.update-btn').addEventListener("click",()=>updateNote(i));
  }
  
  let edit = (id)=>{
    let notes = JSON.parse(localStorage.getItem("notes")) ?? [];
    let indexNo = notes.findIndex(n=>n.id==id);
    let note = notes[indexNo];
    editForm(indexNo);
    document.getElementById("title").value=note.title;
    document.getElementById('note').value=note.note;
  }
  let truncateText = (fullText, wordLimit)=>{
      const words = fullText.split(' ');
      let textContent;
      if (words.length > wordLimit) {
         const truncatedWords = words.slice(0, wordLimit);
            textContent = truncatedWords.join(' ') + '...';
            }else{
              textContent = fullText;
            }
            return textContent;
        }
    let view = (id)=>{
      console.log("view",id);
      let notes = JSON.parse(localStorage.getItem("notes")) ?? [];
      let indexNo = notes.findIndex(n=>n.id==id);
      let note = notes[indexNo];
      console.log(note);
      content.innerHTML=`<div class="card">
        <div class="card-content">
            <p class="date">${note.date}<p>
            <h2>${note.title}</h2>
            <textarea disabled>${note.note}</textarea>
        </div>
        </div>`;
      hBtn.innerHTML=`<span class="back">&larr;</span><span><button type="button" style="background-color:red" class="del-button">Delete</button> <button style="background-color:orange" class="edit-btn">Edit</button></span>`;
      document.querySelector(".back").addEventListener("click",displyData);
      document.querySelector(".del-button").addEventListener("click",()=>del(note.id));
      document.querySelector(".edit-btn").addEventListener("click",()=>edit(note.id));
    }
    window.addEventListener("popstate", 
    ()=>{ 
        displyData();
        console.log('Back button was pressed!');
    });
  displyData();
  //localStorage.setItem('notes',JSON.stringify([]));
  let vv = JSON.parse(localStorage.getItem('notes'));
console.log(vv);