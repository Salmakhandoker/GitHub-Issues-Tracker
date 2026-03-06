

const loginPage = document.getElementById("loginPage")
const mainPage = document.getElementById("mainPage")

const container = document.getElementById("issuesContainer")
const loader = document.getElementById("loader")


let allIssues = []


/* LOGIN */

function login(){

const username = document.getElementById("username").value
const password = document.getElementById("password").value

if(username === "admin" && password === "admin123"){

loginPage.classList.add("hidden")
mainPage.classList.remove("hidden")

loadIssues()

}else{

alert("Invalid credentials")

}

}


/* LOAD ALL ISSUES */

async function loadIssues(){

showLoader()

const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

const data = await res.json()

allIssues = data.data

displayIssues(allIssues)

hideLoader()

}


/* DISPLAY ISSUES */

function displayIssues(issues){

container.innerHTML = ""

issues.forEach(issue => {

const card = document.createElement("div")

card.className = "issue-card"

if(issue.status === "open"){
card.style.borderTop = "6px solid green"
}else{
card.style.borderTop = "6px solid purple"
}

card.innerHTML = `

<div class="card-top">
    <span class="status-icon"></span>
    <span class="priority ${issue.priority.toLowerCase()}">${issue.priority}</span>
</div>

<h3 class="title">${issue.title}</h3>

<p class="desc">${issue.description}</p>

<div class="labels">
    <span class="bug">BUG</span>
    <span class="help">HELP WANTED</span>
</div>

<div class="card-footer">
    <span>#${issue.id} by ${issue.author}</span>
    <span>${issue.createdAt}</span>
</div>
    `

container.appendChild(card)

})

}


/* FILTER */


function filterIssues(status){

const filtered = allIssues.filter(issue => issue.status === status)

displayIssues(filtered)


}
if(issue.status === "open"){
card.style.borderTop = "4px solid #00b894"
}else{
card.style.borderTop = "4px solid #a55eea"
}


/* SEARCH */

// async function searchIssue(){

// const text = document.getElementById("searchInput").value

// showLoader()

// const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`)

// const data = await res.json()

// displayIssues(data.data)

// hideLoader()

// }
document.getElementById("issueCount").innerText = allIssues.length + " Issues"



async function loadIssues(){

showLoader()

const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

const data = await res.json()

allIssues = data.data

document.getElementById("issueCount").innerText = allIssues.length + " Issues"

displayIssues(allIssues)

hideLoader()
}

/* MODAL */

async function openModal(id){

const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)

const data = await res.json()

const issue = data.data

document.getElementById("modalBody").innerHTML = `

<h2>${issue.title}</h2>

<p>${issue.description}</p>

<p>Status: ${issue.status}</p>

<p>Category: ${issue.category}</p>

<p>Author: ${issue.author}</p>

<p>Priority: ${issue.priority}</p>

<p>Label: ${issue.label}</p>

<p>Created: ${issue.createdAt}</p>

`

document.getElementById("modal").classList.remove("hidden")

}

function closeModal(){

document.getElementById("modal").classList.add("hidden")

}


/* LOADER */

function showLoader(){
loader.classList.remove("hidden")
}

function hideLoader(){
loader.classList.add("hidden")
}