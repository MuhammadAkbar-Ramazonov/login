const registertoken = localStorage.getItem("register-token")

if (!registertoken) {
  window.location.replace("/login.html");
  
}

const elForm = document.querySelector(".todos-form");
const elFormInput = document.querySelector(".todos-text");

const elUsersList = document.querySelector(".users-list");

const elUsersTemp = document.querySelector(".users-temp").content;
const newFragment = new DocumentFragment;

function renderUsers(arr, node){

  node.innerHTML = "";
  
  arr.forEach(element => {
    node.innerHTML += 
    `
    <li class="d-flex align-items-center justify-content-center bg-gradient mb-4 p-3">
      <p class="mb-0 fw-bolder me-4 fs-5">${element.todo_value}</p>
      <button class="edit-btn btn btn-primary me-3" data-id="${element.id}">Edit</button>
      <button class="delete-btn btn btn-primary" data-id="${element.id}">delet</button>
    </li>
    `;
  });
}

async function getUsers(){
  try {
    const res = await fetch("http://localhost:5000/todo", {
    headers:{
      Authorization: registertoken,
    },
  });
  
  const data = await res.json();
  
  renderUsers(data, elUsersList);
} catch (error) {
  console.log(error)
}
}

async function postUsers(){
  try {
    const res = await fetch("http://localhost:5000/todo", {
    method: "POST", 
    
    headers:{
      "Content-Type": "application/json",
      Authorization: registertoken,
    },
    
    body: JSON.stringify({
      text: elFormInput.value.trim() 
    })
  });
  
} catch (error) {
  console.log(error)
}
}

elForm.addEventListener("submit", evt => {
  evt.preventDefault();

  getUsers();
  postUsers();

})

getUsers();

async function editTodos(id){
  const newText = prompt("Edit todo title !");
  try {
    const res = await fetch(`http://localhost:5000/todo/${id}`, {
      method: "PUT",

      headers:{
        "Content-Type": "application/json",
        Authorization: registertoken,
      },

      body: JSON.stringify({
        text: newText
      })
    });

    const data = await res.json();
    
    alert(data);
    
    getUsers();

  } catch (error) {
    console.log(error);
  }
}



async function deleteTodos(id){
  try {
    const res = await fetch(`http://localhost:5000/todo/${id}`, {
      method: "DELETE",

      headers:{
        Authorization: registertoken,
      },
    });

    const data = await res.json();
    
    alert(data);
    
    getUsers();

  } catch (error) {
    console.log(error);
  }
}

elUsersList.addEventListener("click", evt => {
  if (evt.target.matches(".edit-btn")) {
    const todosEditBtb = evt.target.dataset.id;
    editTodos(todosEditBtb);
  }
  if (evt.target.matches(".delete-btn")) {
    const todosDeletBtb = evt.target.dataset.id;
    deleteTodos(todosDeletBtb);
  }
})



