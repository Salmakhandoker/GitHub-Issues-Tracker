

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

<h3>${issue.title}</h3>

<p>${issue.description}</p>

<p><b>Status:</b> ${issue.status}</p>

<p><b>Category:</b> ${issue.category}</p>

<p><b>Author:</b> ${issue.author}</p>

<p><b>Priority:</b> ${issue.priority}</p>

<p><b>Label:</b> ${issue.label}</p>

<p><b>Created:</b> ${issue.createdAt}</p>

<button onclick="openModal(${issue.id})">Details</button>

`

container.appendChild(card)

})

}


/* FILTER */

function filterIssues(status){

const filtered = allIssues.filter(issue => issue.status === status)

displayIssues(filtered)

}


/* SEARCH */

async function searchIssue(){

const text = document.getElementById("searchInput").value

showLoader()

const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`)

const data = await res.json()

displayIssues(data.data)

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