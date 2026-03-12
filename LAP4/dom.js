$(document).ready(function(){

let students=[]
let filteredStudents=[]

let sortOrder=null

function getRank(score){

if(score>=8.5) return "Giỏi"
if(score>=7) return "Khá"
if(score>=5) return "Trung bình"
return "Yếu"

}

function applyFilters(){

let keyword=$("#search").val().toLowerCase()

let rank=$("#filterRank").val()

filteredStudents=students.filter(function(sv){

let matchName=sv.name.toLowerCase().includes(keyword)

let matchRank= rank==="all" || getRank(sv.score)===rank

return matchName && matchRank

})

if(sortOrder==="asc"){
filteredStudents.sort((a,b)=>a.score-b.score)
}

if(sortOrder==="desc"){
filteredStudents.sort((a,b)=>b.score-a.score)
}

renderTable()

}

function renderTable(){

let html=""
let total=0

if(filteredStudents.length===0){

$("#tableBody").html(`<tr><td colspan="5">Không có kết quả</td></tr>`)

$("#stats").text(`Tổng SV: 0 | Điểm trung bình: 0`)

return
}

filteredStudents.forEach(function(sv,index){

total+=sv.score

let rowClass= sv.score<5 ? "class='low'" : ""

html+=`
<tr ${rowClass}>
<td>${index+1}</td>
<td>${sv.name}</td>
<td>${sv.score}</td>
<td>${getRank(sv.score)}</td>
<td><button class="deleteBtn" data-name="${sv.name}">Xóa</button></td>
</tr>
`

})

$("#tableBody").html(html)

let avg=(total/filteredStudents.length).toFixed(2)

$("#stats").text(`Tổng SV: ${filteredStudents.length} | Điểm trung bình: ${avg}`)

}

function addStudent(){

let name=$("#name").val().trim()

let score=parseFloat($("#score").val())

if(name===""){
alert("Họ tên không được trống")
return
}

if(isNaN(score)||score<0||score>10){
alert("Điểm phải từ 0 đến 10")
return
}

students.push({
name:name,
score:score
})

$("#name").val("")
$("#score").val("")
$("#name").focus()

applyFilters()

}

$("#addBtn").click(addStudent)

$("#score").keypress(function(e){

if(e.which==13){
addStudent()
}

})

$("#search").on("input",applyFilters)

$("#filterRank").change(applyFilters)

$("#sortScore").click(function(){

if(sortOrder==="asc"){
sortOrder="desc"
$(this).text("Điểm ▼")
}else{
sortOrder="asc"
$(this).text("Điểm ▲")
}

applyFilters()

})

$("#tableBody").on("click",".deleteBtn",function(){

let name=$(this).data("name")

students=students.filter(sv=>sv.name!==name)

applyFilters()

})

})
