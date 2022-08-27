document.addEventListener('DOMContentLoaded', () => {
    createJokeClickEvent();
    homeLinkClickEvent();
    randomJokeClickEvent();
    fetchJokeCategories();
    myJokesClickEvent();
})



//Nodes
const main = () => document.getElementById('main')
const createLink = () => document.getElementById('create-link')
const homeLink = () => document.getElementById('home-link')
const randomLink = () => document.getElementById('random-link')
const categoryJoke = () => document.getElementById('category-joke')
const submitForm = () => document.getElementById('submit-form')
const myJokesLink = () => document.getElementById('my-jokes-link')


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

function myJokesClickEvent () {
    myJokesLink().addEventListener('click', fetchMyJokes)
}


//Event Handlers
function resetMain () {
    main().innerText = ''
}

function resetCategoryJoke () {
    categoryJoke().innerText = ''
}

function showForm () {
    submitForm().style = 'display: block'
}

function hideForm () {
    submitForm().style = 'display: none'
}


function homepage (data) {
    resetMain()
    hideForm()
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
        const btn = document.createElement('button')
        btn.className = 'white-text'
        btn.style = 'display: inline; padding: 10px; margin: 40px; background-color: #e65100'
        btn.addEventListener('click', () => {
            fetch(`https://v2.jokeapi.dev/joke/${data[i]}`)
                .then(res => res.json())
                .then(joke => {
                    console.log(joke)
                    resetCategoryJoke();
                    const p = document.createElement('p')
                    p.className = 'center-align'
                    p.style = 'margin-top: 50px; text-color: red darken-4'
                    p.innerText = joke.joke || joke.setup
                    const div = document.createElement('div')
                    div.className = 'center-align'
                    div.style = 'padding: 100px'
                    div.innerText = joke.delivery || ' '
                    p.appendChild(div)
                    categoryJoke().appendChild(p)
                })
        })
        btn.innerText = data[i]
        ul.appendChild(btn)
    }
    main().appendChild(h2)
    main().appendChild(h5)
    main().appendChild(ul)
}

function createJokePage () {
    resetMain();
    resetCategoryJoke();
    showForm();
    const h3 = document.createElement('h3')
    h3.className = 'center-align'
    h3.style = 'margin-bottom: 100px'
    h3.innerText = 'Submit A Joke'
    main().appendChild(h3)
    
    document.getElementById('form').addEventListener('submit', () => fetchMyJokes())

    // const form = document.getElementById('form')
    // form.reset()
}

function randomJokePage (joke, answer) {
    resetMain();
    resetCategoryJoke();
    hideForm();
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

function myJokesPage (jokes) {
    resetMain()
    resetCategoryJoke()
    hideForm()
    const h3 = document.createElement('h3')
    h3.className = 'center-align'
    h3.style = 'margin-bottom: 100px'
    h3.innerText = "My Jokes"
    main().appendChild(h3)

    jokes.forEach(joke => {
        const li = document.createElement('li')
        li.innerText = joke.joke
        const p = document.createElement('p')
        p.style = 'margin-left: 75px'
        p.className = 'white-text'
        p.innerText = joke.answer
        li.appendChild(p)

        main().appendChild(li)
    })
}


//Fetch
function fetchRandomJoke () {
    fetch('https://v2.jokeapi.dev/joke/Any')
        .then(res => res.json())
        .then(joke => {
            console.log(joke)
            randomJokePage(joke.setup || joke.joke, joke.delivery || ' ')
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

function fetchMyJokes () {
    fetch('http://localhost:3000/myjokes')
        .then(res => res.json())
        .then(jokes => {
            myJokesPage(jokes)
        })
}