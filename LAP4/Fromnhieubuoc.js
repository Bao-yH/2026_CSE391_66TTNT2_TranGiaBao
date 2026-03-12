let currentStep=1

function showStep(step){

document.querySelectorAll(".step").forEach(s=>s.classList.remove("active"))

document.getElementById("step"+step).classList.add("active")

document.getElementById("progress").style.width=(step*33)+"%"

document.getElementById("stepText").innerText="Bước "+step+" / 3"

}

function validateStep1(){

let name=document.getElementById("fullname").value.trim()
let dob=document.getElementById("dob").value
let gender=document.querySelector('input[name="gender"]:checked')

let valid=true

if(name.length<3){
document.getElementById("nameError").innerText="Tên ≥3 ký tự"
valid=false
}else{
document.getElementById("nameError").innerText=""
}

if(dob===""){
document.getElementById("dobError").innerText="Chọn ngày sinh"
valid=false
}else{
document.getElementById("dobError").innerText=""
}

if(!gender){
document.getElementById("genderError").innerText="Chọn giới tính"
valid=false
}else{
document.getElementById("genderError").innerText=""
}

return valid

}

function validateStep2(){

let email=document.getElementById("email").value
let pass=document.getElementById("password").value
let confirm=document.getElementById("confirm").value

let valid=true

let emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/

if(!emailRegex.test(email)){
document.getElementById("emailError").innerText="Email sai"
valid=false
}else{
document.getElementById("emailError").innerText=""
}

if(pass.length<8){
document.getElementById("passError").innerText="Mật khẩu ≥8 ký tự"
valid=false
}else{
document.getElementById("passError").innerText=""
}

if(pass!==confirm){
document.getElementById("confirmError").innerText="Mật khẩu không khớp"
valid=false
}else{
document.getElementById("confirmError").innerText=""
}

return valid

}

document.getElementById("next1").onclick=function(){

if(validateStep1()){
currentStep=2
showStep(2)
}

}

document.getElementById("next2").onclick=function(){

if(validateStep2()){

let name=document.getElementById("fullname").value
let dob=document.getElementById("dob").value
let gender=document.querySelector('input[name="gender"]:checked').value
let email=document.getElementById("email").value

document.getElementById("summary").innerText=
`Họ tên: ${name}
Ngày sinh: ${dob}
Giới tính: ${gender}
Email: ${email}`

currentStep=3
showStep(3)

}

}

document.getElementById("back1").onclick=function(){

currentStep=1
showStep(1)

}

document.getElementById("back2").onclick=function(){

currentStep=2
showStep(2)

}

document.getElementById("multiForm").addEventListener("submit",function(e){

e.preventDefault()

document.getElementById("success").innerText=
"Đăng ký thành công 🎉"

this.style.display="none"

})
