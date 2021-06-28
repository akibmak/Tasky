/* this will get elment s in array format
 const taskContainer = document.getElementsByClassName("task_container");
 console.log(taskContainer); */

//to get the elements directly we can usr querySelector.
const taskContainer  = document.querySelector(".task_container");

let globalStore = [];

const generateNewCard = (taskData) => `
<div class="col-md-6 col-lg-4">
      <div class="card">
        <div class="card-header d-flex justify-content-end gap-2">
          <button type="button" class="btn btn-success"><i class="fas fa-pencil-alt"></i></button>
          <button type="button" class="btn btn-danger" id=${taskData.id} onclick="deleteCard.apply(this, arguments)">
            <i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this, arguments)"></i></button>
        </div>
        <img
          src=${taskData.imageUrl}
          class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${taskData.taskTitle}</h5>
          <p class="card-text">${taskData.taskDescryption}</p>
          <a href="#" class="btn btn-primary">${taskData.taskType}</a>
        </div>
        <div class="card-footer  ">
            <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
        </div>
      </div>
    </div> 
    `;

const loadInitialCardData = () => {
    // localstorage to get tasky card data
    const getCardData = localStorage.getItem("tasky");

    // convert from string to normal object
    const {cards} = JSON.parse(getCardData);

    // loop over those array of task object to create HTML card , inject it to DOM
    cards.map((cardObject) => {
        taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

         //adding user input task data in array 
         globalStore.push(cardObject);
    })
}

const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`, //unique number of id . We used $ to include javaScript expression inside a string which is enclosed in ``.
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescryption: document.getElementById("taskdescription").value,
    };

    //this will dynamically capture the data from the taskData and merge it with
    //card html and will create a new card with user input data
    

    //how do we add this new card to Dom for that we use insertAdjacent
   // now we have four options to add this new card to taskContainer 1.before begin, 2.after begin, 3.before end, 4. after end.
    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

    //adding user input task data in array 
    globalStore.push(taskData);

    //storing the array data in our system(local storage). If we don't use an array and
    //directly pass the taskData then only the current card data will be stored as it will override previous card data.
   
    // this will store data in object form we do not want that .
  //  localStorage.setItem("tasky",globalStore);

    localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));  //json.stringify expects an object thats why we added cards object.
};

const deleteCard = (event) => {
    //we'll ask parent to provide us with the required id
    event = window.event;
    const targetID  =  event.target.id;

    const tagName = event.target.tagName; // BUTTON

    //match the id of the element with the id inside globalstore
    //if match found remmove

    globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID); 
    localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));
    // we have updated array of cards

    //contact parent 
    if(tagName === "BUTTON"){
      return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
    }else{
      return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
    }
}

//Parent object 
//Browser -> window in browser you can send notification,alerts , open new tab and close new tab etc.
//DOM -> document  with DOM you can edit the html contents

//local storage <= 5mb
//API -> Aplication Programming Interface


