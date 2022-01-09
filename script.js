//before loading webpage show notes
showNotes();

//uploading image on webpage...
const image_input=document.querySelector("#input");
var upload_image;

image_input.addEventListener("change",function(){
    // console.log(image_input.value);
    const reader=new FileReader();
    reader.addEventListener("load",function(){
        upload_image=reader.result;
        document.querySelector("#img").setAttribute("src",`${upload_image}`);

    });
    reader.readAsDataURL(this.files[0]);
});

//when click on generate button

var getCanvas;
var element = document.querySelector("#main");
const generate_btn=document.querySelector("#btn-preview");

generate_btn.addEventListener("click",function(){
    html2canvas(element, {
        onrendered: function (canvas) {
            //taking the value of canvas on get canvas....
                getCanvas = canvas;
            //make invisible of generate button
            var x=document.querySelector("#btn-preview").style;
            x.display="none";
            x=document.querySelector("#downloads").style;
            x.display="inline-block";
            }
        });

});




//downloading the screenshots using html2canvas library..

const download_btn=document.querySelector("#downloads");


download_btn.addEventListener("click",function(){
    var image= getCanvas.toDataURL("image/png");
    const a=document.createElement("a");
    document.body.appendChild(a);
    a.href=image;
    a.download="my-meme.png";
    a.click();
    document.body.removeChild(a);
});









//saving the image in localstorage....
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
//   let addTxt = document.getElementById("addTxt");
  let addTitle=document.getElementById("addTitle");

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj={
    title:addTitle.value,
    content:getCanvas.toDataURL("image/png"),
    btnDisplay:"none",
    btnText:"generate url to copy",
    color:"#a9f1df"
  }
  notesObj.push(myObj); //push the content or value of text area if click the button add notes
  localStorage.setItem("notes", JSON.stringify(notesObj));
  //to stringify the  content of JSON inside localStorage
//   addTxt.value = ""; //to blank the value of addTxt
  addTitle.value="";
  console.log(notesObj);
  showNotes();
});


  //showmemes function

  function showNotes() {
    let notes = localStorage.getItem("notes"); //take notes from localstorage.
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    let html = ""; //creating a null html string...
  
    //take the note array and traverse..
    notesObj.forEach(function(element, index) {
      html += `
        <div class="card mx-2 my-2 noteCard" style="width: 18rem;background-color:${element.color};">
        <img class="card-img-top" src="${element.content}" alt="Card image cap">
          <div class="card-body card${index}">
            <h5 class="card-title" style="color:green;">${element.title}</h5>
            <!--<input type="text" value="${element.content}" id="copy${index}" style="display:none;">-->
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-success">Delete</button>
            <!--<button onclick="myFunction(${index})" class="btn btn-warning" >${element.btnText}</button>-->
          </div>
        </div>`;
    });
    let notesElm = document.getElementById("notes");
  
    if (notesObj.length != 0) {
      notesElm.innerHTML = html;
    } else {
      notesElm.innerHTML = `<h3 style="color:blue;">Nothing to show!! Please add your Meme</h3>`;
    }
  
  }

  //function to mark Important...
function mark(index){
    console.log(index);
    let notes = localStorage.getItem("notes"); //take notes from localstorage.
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    if(notesObj[index].color=="#a9f1df")
    {
      notesObj[index].color="#f4ff61";
      notesObj[index].btnDisplay="inline";
      notesObj[index].btnText="Your Url";
    }
    else if(notesObj[index].color=="#f4ff61"){
      notesObj[index].color="#a9f1df";
      notesObj[index].btnDisplay="none";
      notesObj[index].btnText="generate url to copy"
    }
    localStorage.setItem("notes",JSON.stringify(notesObj));//updating localstorage..
    showNotes();
  
  }
  // function to delete a node
  
  function deleteNote(index) {
    console.log("deleting this node.", index);
    let notes = localStorage.getItem("notes"); //take notes from localstorage.
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
  
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));//updating localstorage..
    showNotes();
  
  }

  // //copying the url
  // function myFunction(index) {
  //   /* Get the text field */
  //   var copyText = document.getElementById("copy"+index);
  
  //   /* Select the text field */
  //   copyText.select();
  //   // copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
  //   /* Copy the text inside the text field */
  //   navigator.clipboard.writeText(copyText.value);
    
  //   /* Alert the copied text */
  //   alert("Copied the text: " + copyText.value);
  // }

  //refreshing the site again...
document.querySelector("#refresh").on('click',function (){
    location.reload();
  })