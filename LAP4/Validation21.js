const prices={
"Áo":150000,
"Quần":200000,
"Giày":300000
}

const form=document.getElementById("orderForm")

function showError(id,msg){
document.getElementById(id+"Error").innerText=msg
}

function clearError(id){
document.getElementById(id+"Error").innerText=""
}

function validateProduct(){

let p=document.getElementById("product").value

if(p===""){
showError("product","Chọn sản phẩm")
return false
}

clearError("product")
return true
}

function validateQuantity(){

let q=document.getElementById("quantity").value

if(q<1||q>99){
showError("quantity","Số lượng 1-99")
return false
}

clearError("quantity")
return true
}

function validateDate(){

let d=new Date(document.getElementById("deliveryDate").value)
let today=new Date()

let max=new Date()
max.setDate(today.getDate()+30)

if(d<today||d>max){
showError("date","Ngày giao phải trong 30 ngày")
return false
}

clearError("date")
return true
}

function validateAddress(){

let a=document.getElementById("address").value.trim()

if(a.length<10){
showError("address","Địa chỉ ít nhất 10 ký tự")
return false
}

clearError("address")
return true
}

function validateNote(){

let note=document.getElementById("note").value

if(note.length>200){
showError("note","Tối đa 200 ký tự")
return false
}

clearError("note")
return true
}

function validatePayment(){

let p=document.querySelector('input[name="payment"]:checked')

if(!p){
showError("payment","Chọn phương thức thanh toán")
return false
}

clearError("payment")
return true
}

function updateTotal(){

let product=document.getElementById("product").value
let quantity=document.getElementById("quantity").value

if(prices[product]&&quantity){

let total=prices[product]*quantity

document.getElementById("totalPrice").innerText=
Number(total).toLocaleString("vi-VN")

}

}

document.getElementById("product").addEventListener("change",updateTotal)
document.getElementById("quantity").addEventListener("input",updateTotal)

document.getElementById("note").addEventListener("input",function(){

let len=this.value.length

document.getElementById("charCount").innerText=len+"/200"

if(len>200){
document.getElementById("charCount").style.color="red"
}else{
document.getElementById("charCount").style.color="black"
}

})

form.addEventListener("submit",function(e){

e.preventDefault()

let valid=
validateProduct()&
validateQuantity()&
validateDate()&
validateAddress()&
validateNote()&
validatePayment()

if(!valid) return

let product=document.getElementById("product").value
let quantity=document.getElementById("quantity").value
let date=document.getElementById("deliveryDate").value

let total=prices[product]*quantity

document.getElementById("summary").innerText=
`Sản phẩm: ${product}
Số lượng: ${quantity}
Tổng tiền: ${Number(total).toLocaleString("vi-VN")} VNĐ
Ngày giao: ${date}`

document.getElementById("confirmBox").style.display="block"

})

document.getElementById("confirmBtn").onclick=function(){

document.getElementById("confirmBox").style.display="none"

form.style.display="none"

document.getElementById("success").innerText=
"Đặt hàng thành công 🎉"

}

document.getElementById("cancelBtn").onclick=function(){

document.getElementById("confirmBox").style.display="none"

}
