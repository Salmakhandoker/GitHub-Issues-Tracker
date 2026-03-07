
const api = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

window.onload = () => {

if(!localStorage.getItem("login")){
window.location.href="index.html"
}

loadIssues()

}


async function loadIssues(type="all"){

document.getElementById("loader").style.display="block"

const res = await fetch(api)

const data = await res.json()

let issues = data.data

if(type==="open"){
issues = issues.filter(i=>i.status==="open")
}

if(type==="closed"){
issues = issues.filter(i=>i.status==="closed")
}

displayIssues(issues)

document.getElementById("loader").style.display="none"

}


function displayIssues(issues){

const container = document.getElementById("issuesContainer")

container.innerHTML=""

issues.forEach(issue=>{

let color = issue.status==="open" ? "green" : "purple"

container.innerHTML +=`

<div class="card" style="border-top:5px solid ${color}" onclick="showIssue(${issue.id})">

<h3>${issue.title}</h3>

<p>${issue.description}</p>

<p>Status: ${issue.status}</p>

<p>Category: ${issue.category}</p>

<p>Author: ${issue.author}</p>

<p>Priority: ${issue.priority}</p>

<p>Label: ${issue.label}</p>

<p>${issue.createdAt}</p>

</div>

`

})

}



async function showIssue(id){

const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)

const data = await res.json()

const issue = data.data

document.getElementById("modalBody").innerHTML=`

<h2>${issue.title}</h2>

<p>${issue.description}</p>

<p>Status: ${issue.status}</p>

<p>Category: ${issue.category}</p>

<p>Author: ${issue.author}</p>

<p>Priority: ${issue.priority}</p>

<p>Label: ${issue.label}</p>

<p>${issue.createdAt}</p>

`

document.getElementById("issueModal").style.display="block"

}


function closeModal(){

document.getElementById("issueModal").style.display="none"

}


async function searchIssues(){

const text = document.getElementById("searchInput").value

const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`)

const data = await res.json()

displayIssues(data.data)

}