const form=document.getElementById("registerForm")

function showError(id,message){
document.getElementById(id+"Error").innerText=message
}

function clearError(id){
document.getElementById(id+"Error").innerText=""
}

function validateFullname(){

let name=document.getElementById("fullname").value.trim()

let regex=/^[A-Za-zÀ-ỹ\s]{3,}$/

if(name===""){
showError("fullname","Không được để trống")
return false
}

if(!regex.test(name)){
showError("fullname","Ít nhất 3 ký tự và chỉ chứa chữ")
return false
}

clearError("fullname")
return true
}

function validateEmail(){

let email=document.getElementById("email").value.trim()

let regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/

if(email===""){
showError("email","Không được để trống")
return false
}

if(!regex.test(email)){
showError("email","Email không đúng định dạng")
return false
}

clearError("email")
return true
}

function validatePhone(){

let phone=document.getElementById("phone").value.trim()

let regex=/^0\d{9}$/

if(phone===""){
showError("phone","Không được để trống")
return false
}

if(!regex.test(phone)){
showError("phone","Số điện thoại phải 10 số và bắt đầu bằng 0")
return false
}

clearError("phone")
return true
}

function validatePassword(){

let pass=document.getElementById("password").value

let regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

if(pass===""){
showError("password","Không được để trống")
return false
}

if(!regex.test(pass)){
showError("password","Ít nhất 8 ký tự gồm hoa, thường, số")
return false
}

clearError("password")
return true
}

function validateConfirm(){

let pass=document.getElementById("password").value
let confirm=document.getElementById("confirmPassword").value

if(confirm!==pass){
showError("confirm","Mật khẩu không khớp")
return false
}

clearError("confirm")
return true
}

function validateGender(){

let gender=document.querySelector('input[name="gender"]:checked')

if(!gender){
showError("gender","Vui lòng chọn giới tính")
return false
}

clearError("gender")
return true
}

function validateTerms(){

let terms=document.getElementById("terms").checked

if(!terms){
showError("terms","Bạn phải đồng ý điều khoản")
return false
}

clearError("terms")
return true
}

form.addEventListener("submit",function(e){

e.preventDefault()

let valid=
validateFullname() &
validateEmail() &
validatePhone() &
validatePassword() &
validateConfirm() &
validateGender() &
validateTerms()

if(valid){

let name=document.getElementById("fullname").value

form.style.display="none"

document.getElementById("successMessage").innerText=
"Đăng ký thành công! 🎉 Xin chào "+name

}

})

document.getElementById("fullname").addEventListener("blur",validateFullname)
document.getElementById("email").addEventListener("blur",validateEmail)
document.getElementById("phone").addEventListener("blur",validatePhone)
document.getElementById("password").addEventListener("blur",validatePassword)
document.getElementById("confirmPassword").addEventListener("blur",validateConfirm)

document.querySelectorAll("input").forEach(function(input){
input.addEventListener("input",function(){
clearError(input.id)
})
})
document.getElementById("fullname").addEventListener("input",function(){

let len=this.value.length

document.getElementById("nameCount").innerText=len+"/50"

})
document.getElementById("password").addEventListener("input",function(){

let pass=this.value

let strength=0

if(pass.length>=8) strength++
if(/[A-Z]/.test(pass)) strength++
if(/[a-z]/.test(pass)) strength++
if(/\d/.test(pass)) strength++

let bar=document.getElementById("strengthLevel")
let text=document.getElementById("strengthText")

if(strength<=1){
bar.style.width="33%"
bar.style.background="red"
text.innerText="Yếu"
}

else if(strength<=3){
bar.style.width="66%"
bar.style.background="orange"
text.innerText="Trung bình"
}

else{
bar.style.width="100%"
bar.style.background="green"
text.innerText="Mạnh"
}

})
document.getElementById("togglePassword").onclick=function(){

let pass=document.getElementById("password")

if(pass.type==="password"){
pass.type="text"
}else{
pass.type="password"
}

}

