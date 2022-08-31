document.addEventListener('DOMContentLoaded', () => {
    createJokeClickEvent();
    homeLinkClickEvent();
    randomJokeClickEvent();
    fetchJokeCategories();
    myJokesClickEvent();
    favoritesClickEvent();
})



//Nodes
const main = document.getElementById('main')
const createLink = document.getElementById('create-link')
const homeLink = document.getElementById('home-link')
const randomLink = document.getElementById('random-link')
const categoryJoke = document.getElementById('category-joke')
const submitForm = document.getElementById('submit-form')
const myJokesLink = document.getElementById('my-jokes-link')
const favoritesLink = document.getElementById('favorite-jokes-link')
const form = document.getElementById('form')


//Event Listeners
function createJokeClickEvent () {
    createLink.addEventListener('click', createJokePage)
}

function homeLinkClickEvent () {
    homeLink.addEventListener('click', fetchJokeCategories)
}

function randomJokeClickEvent () {
    randomLink.addEventListener('click', fetchRandomJoke)
}

function myJokesClickEvent () {
    myJokesLink.addEventListener('click', fetchMyJokes)
}

function favoritesClickEvent () {
    favoritesLink.addEventListener('click', fetchFavoriteJokes)
}


//Event Handlers
function resetMain () {
    main.innerText = ''
}

function resetCategoryJoke () {
    categoryJoke.innerText = ''
}

function showForm () {
    submitForm.style = 'display: block'
}

function hideForm () {
    submitForm.style = 'display: none'
}


function homepage (data) {
    resetMain()
    hideForm()
    const h2 = document.createElement('h2')
    h2.className = 'center-align background-color: orange darken-2'
    h2.innerText = 'Welcome to \'Pun\'ny Joke Randomizer'
    const h5 = document.createElement('h5')
    h5.className = 'center-align'
    h5.style = 'margin-top: 50px; margin-bottom: 50px'
    h5.innerText = 'Random Joke By Category'

    console.log(data)
    const ul = document.createElement('ul')
    for(let i=1; i<data.length; i++) {
        const btn = document.createElement('button')
        btn.className = 'white-text'
        btn.style = 'display: inline; padding: 10px; margin: 40px; background-color: #b71c1c'
        btn.addEventListener('click', () => {
            fetch(`https://v2.jokeapi.dev/joke/${data[i]}`)
                .then(res => res.json())
                .then(joke => {
                    console.log(joke)
                    resetCategoryJoke();
                    const h6 = document.createElement('h6')
                    h6.className = 'center-align'
                    h6.style = 'margin-top: 50px'
                    h6.innerText = joke.joke || joke.setup
                    const p = document.createElement('p')
                    p.className = 'center-align white-text'
                    p.style = 'padding: 100px; margin-bottom: 10px'
                    p.innerText = joke.delivery || ' '
                    
                    h6.appendChild(p)

                    const favBtn = document.createElement('button')
                    favBtn.className = 'waves-effect waves-light btn-small red lighten-1'
                    favBtn.style = 'margin-left: 400px'
                    favBtn.innerText = 'Add to Favorites'
                    favBtn.addEventListener('click', () => {
                            fetch('http://localhost:3000/favorites', {
                                method: 'POST',
                                headers: {
                                    'Content-type': 'application/json',
                                    'Accept': 'application/json'
                                },
                                body: JSON.stringify({
                                    joke: joke.setup || joke.joke,
                                    answer: joke.delivery || ' '
                                })
                            })
                            .then(res => res.json())
                            .then(joke => {
                                console.log(joke)
                                fetchFavoriteJokes()
                            })
                    })

                    categoryJoke.appendChild(h6)
                    categoryJoke.appendChild(favBtn)
                })
        })
        btn.innerText = data[i]
        ul.appendChild(btn)
    }
    main.appendChild(h2)
    main.appendChild(h5)
    main.appendChild(ul)
}

function createJokePage () {
    resetMain();
    resetCategoryJoke();
    showForm();
    const h3 = document.createElement('h3')
    h3.className = 'center-align background-color: orange darken-2'
    h3.style = 'margin-bottom: 100px'
    h3.innerText = 'Create A Joke'
    main.appendChild(h3)

    document.getElementById('form').addEventListener('submit', () => fetchMyJokes())
    form.reset()
}

function randomJokePage (joke, answer) {
    resetMain();
    resetCategoryJoke();
    hideForm();
    const h3 = document.createElement('h3')
    h3.innerText = 'Any Random Joke'
    h3.className = 'center-align background-color: orange darken-2'
    const h5 = document.createElement('h5')
    h5.className = 'center-align'
    h5.innerText = joke
    h5.style = 'padding: 50px; margin-top: 50px'
    const p = document.createElement('p')
    p.className = 'center-align white-text'
    p.innerText = answer
    
    const btn = document.createElement('button')
    btn.className = 'waves-effect waves-light btn-small center-align red lighten-1'
    btn.style = 'margin-left: 400px; margin-top: 100px'
    btn.innerText = 'Add to Favorites'
    btn.addEventListener('click', () => {
            fetch('http://localhost:3000/favorites', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    joke: joke,
                    answer: answer
                })
            })
            .then(res => res.json())
            .then(joke => {
                console.log(joke)
                fetchFavoriteJokes()
            })
    })

    main.appendChild(h3)
    main.appendChild(h5)
    main.appendChild(p)
    main.appendChild(btn)
}

function myJokesPage (jokes) {
    resetMain()
    resetCategoryJoke()
    hideForm()
    const h3 = document.createElement('h3')
    h3.className = 'center-align background-color: orange darken-2'
    h3.style = 'margin-bottom: 100px'
    h3.innerText = "Created Jokes"
    main.appendChild(h3)

    jokes.forEach(joke => {
        const li = document.createElement('li')
        li.innerText = joke.joke
        const p = document.createElement('p')
        p.style = 'margin-left: 75px'
        p.className = 'white-text'
        p.innerText = joke.answer
        li.appendChild(p)

        main.appendChild(li)
    })
}

function favoritesPage (jokes) {
    resetMain();
    resetCategoryJoke();
    hideForm();
    const h3 = document.createElement('h3')
    h3.className = 'center-align background-color: orange darken-2'
    h3.style = 'margin-bottom: 100px'
    h3.innerText = "Favorite Jokes"
    main.appendChild(h3)

    jokes.forEach(joke => {
        const li = document.createElement('li')
        li.innerText = joke.setup || joke.joke
        const p = document.createElement('p')
        p.style = 'margin-left: 75px'
        p.className = 'white-text'
        p.innerText = joke.answer || joke.delivery
        li.appendChild(p)

        main.appendChild(li)
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

function fetchFavoriteJokes () {
    fetch('http://localhost:3000/favorites')
        .then(res => res.json())
        .then(jokes => {
            favoritesPage(jokes)
        })
}