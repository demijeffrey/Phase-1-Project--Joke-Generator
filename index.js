//Nodes
const main = () => document.getElementById('main')
const createLink = () => document.getElementById('create-link')
const homeLink = () => document.getElementById('home-link')
const randomLink = () => document.getElementById('random-link')


//Event Listeners
function createJokeClickEvent () {
    createLink().addEventListener('click', createJokePage)
}

function homeLinkClickEvent () {
    homeLink().addEventListener('click', homepage)
}

function randomJokeClickEvent () {
    randomLink().addEventListener('click', randomJokePage)
}


//Event Handlers
function resetMain () {
    main().innerText = ''
}

function homepage () {
    resetMain()
    const h3 = document.createElement('h3')
    h3.innerText = 'Welcome to Joke Generator'
    main().appendChild(h3)
}

function createJokePage () {
    resetMain()
    const h3 = document.createElement('h3')
    h3.innerText = 'Submit A Joke'
    main().appendChild(h3)
}

function randomJokePage () {
    resetMain()
    const h3 = document.createElement('h3')
    h3.innerText = 'Generate a Random Joke'
    main().appendChild(h3)
}




document.addEventListener('DOMContentLoaded', () => {
    homepage();
    createJokeClickEvent();
    homeLinkClickEvent();
    randomJokeClickEvent();
})