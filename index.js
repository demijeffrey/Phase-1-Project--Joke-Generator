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
    homeLink().addEventListener('click', fetchJokeCategories)
}

function randomJokeClickEvent () {
    randomLink().addEventListener('click', fetchRandomJoke)
}


//Event Handlers
function resetMain () {
    main().innerText = ''
}

function homepage (data) {
    resetMain()
    const h2 = document.createElement('h2')
    h2.className = 'center-align'
    h2.innerText = 'Welcome to Joke Generator'
    const h5 = document.createElement('h5')
    h5.className = 'center-align'
    h5.style = 'margin-top: 50px; margin-bottom: 50px'
    h5.innerText = 'Jokes By Category'

    console.log(data)
    const ul = document.createElement('ul')
    for(let i=1; i<data.length; i++) {
        const li = document.createElement('li')
        li.style = 'display: inline; padding: 10px; margin: 50px'
        li.addEventListener('click', )
        li.innerText = data[i]
        ul.appendChild(li)
    }

    main().appendChild(h2)
    main().appendChild(h5)
    main().appendChild(ul)
}

function createJokePage () {
    resetMain()
    const h3 = document.createElement('h3')
    h3.className = 'center-align'
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
            console.log(data.categories)
            // data.categories.forEach(item => console.log(item))
            homepage(data.categories)
        })
}

// function renderJokeByCategory () {
//     const categoryJoke = document.getElementById('category-joke')
//     fetch(`https://v2.jokeapi.dev/joke/${}`)
// }



document.addEventListener('DOMContentLoaded', () => {
    // homepage();
    createJokeClickEvent();
    homeLinkClickEvent();
    randomJokeClickEvent();
    fetchJokeCategories();
})