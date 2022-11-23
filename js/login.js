const token = localStorage.getItem("register-token")

if (token) {
  window.location.replace("/index.html");
  
}

const elSignInForm = document.querySelector(".site-sign-in-form");
const emailInput = document.querySelector(".search-input");
const paswordInput = document.querySelector(".password");
const paswordSignUpInput = document.querySelector(".password-sign-up");


const paswordShow = elSignInForm.querySelector(".pasword-btn");
const paswordSignUpShow = document.querySelector(".pasword-sign-up-btn");
const elSignUpForm = document.querySelector(".site-sign-up-form");

const elSignUp = document.querySelector(".sign-up");
const elSignIn = elSignUpForm.querySelector(".sign-in");


const registerUserName = document.querySelector(".input-user-username");
const registerEmail = document.querySelector(".input-user-email");
const registerPhone = document.querySelector(".input-user-phone");
const registerPasword = document.querySelector(".input-user-password");


async function registerPost(){
  
  const userNameValue =  registerUserName.value
  const emailValue =  registerEmail.value
  const phoneValue =  registerPhone.value
  const paswordValue =  registerPasword.value
  
  try {
    const res = await fetch("http://192.168.4.92:5000/user/register", {
    method: "POST", 
    
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_name: userNameValue,
      phone: phoneValue,
      email: emailValue,
      password: paswordValue,
    })
  })
  
  const data = await res.json();
  
  console.log(data)
  if (data.token) {
    localStorage.setItem("register-token", data.token);
    window.location.replace("/index.html");
  }
  
} catch (error) {
  console.log(error);
}
}

async function loginPost(){
  const emailValue =  emailInput.value;
  const passwordValue = paswordInput.value;  
  try {
    const res = await fetch("http://192.168.4.92:5000/user/login", {
    method: "POST", 
    
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: emailValue,
      password: passwordValue,
    })
  })
  
  const data = await res.json();
  
  console.log(data)
  if (data.token) {
    localStorage.setItem("register-token", data.token);
    
    window.location.replace("/index.html");
    
  }
  
} catch (error) {
  console.log(error);
}
}

paswordShow.addEventListener("mousedown", ()=> {
  paswordInput.type = "text";
});

paswordSignUpShow.addEventListener("mousedown", ()=> {
  paswordSignUpInput.type = "text";
});

paswordSignUpShow.addEventListener("mouseup", ()=> {
  paswordSignUpInput.type = "password";
});

window.addEventListener("mouseup", ()=> {
  paswordInput.type = "password";
  paswordSignUpInput.type = "password";
})

// events
elSignUpForm.addEventListener("submit", evt => {
  evt.preventDefault();
  console.log("ds")
  
  registerPost()
})

elSignInForm.addEventListener("submit", function(evt){
  evt.preventDefault();
  
  loginPost()
})

// sign 
elSignUp.addEventListener("click", ()=>{
  console.log("sign up")
  elSignInForm.classList.add("d-none");
  elSignUpForm.classList.remove("d-none");
  
})

elSignIn.addEventListener("click", ()=>{
  elSignInForm.classList.remove("d-none");
  
  elSignInForm.classList.add("d-block");
  elSignUpForm.classList.add("d-none");
  
})
