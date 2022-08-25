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
    randomLink().addEventListener('click', fetchRandomJoke)
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

function randomJokePage (joke, answer) {
    resetMain()
    const h3 = document.createElement('h3')
    h3.innerText = 'Generate a Random Joke'
    const h5 = document.createElement('p')
    h5.innerText = joke
    const p = document.createElement('p')
    p.innerText = answer


    main().appendChild(h3)
    main().appendChild(h5)
    main().appendChild(p)
}

function fetchRandomJoke () {
    fetch('https://v2.jokeapi.dev/joke/Any')
        .then(res => res.json())
        .then(joke => {
            console.log(joke)
            randomJokePage(joke.setup, joke.delivery)
    })
}



document.addEventListener('DOMContentLoaded', () => {
    homepage();
    createJokeClickEvent();
    homeLinkClickEvent();
    randomJokeClickEvent();
})