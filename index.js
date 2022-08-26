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
    const h2 = document.createElement('h2')
    h2.innerText = 'Welcome to Joke Generator'
    const ul = document.createElement('ul')
    ul.innerText = 'Categories'

    main().appendChild(h2)
    main().appendChild(ul)
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
    h3.innerText = 'Random Joke'
    h3.className = 'center-align'
    const h5 = document.createElement('h5')
    h5.className = 'center-align'
    h5.innerText = joke
    h5.style = 'padding: 50px; margin-top: 50px'
    const p = document.createElement('p')
    p.className = 'center-align white-text'
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

function fetchJokeCategories () {
    fetch('https://v2.jokeapi.dev/categories')
        .then(res => res.json())
        .then(data => {
            data.categories.forEach(item => console.log(item))
        })
}



document.addEventListener('DOMContentLoaded', () => {
    homepage();
    createJokeClickEvent();
    homeLinkClickEvent();
    randomJokeClickEvent();
})