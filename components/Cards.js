// STEP 3: Create article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-backend.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a card for each article in the response.
// This won't be as easy as just iterating over an array though.
//
// Write a function that takes a single article object and returns the following markup:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {author's name}</span>
//   </div>
// </div>
//
// Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
//
// Use your function to create a card for each of the articles, and append each card to the DOM.

const { default: Axios } = require("axios")

const create = c => document.createElement(c);
const query = q => document.querySelector(q);

const errors = query('.errors-container')
// console.log(errors)
const cards = query('.cards-container')
const articleURL = 'https://lambda-times-backend.herokuapp.com/articles'

Axios.get(articleURL)
.then((res) => {
    const articles = res.data.articles
    for(let obj in articles){
        articles[obj].forEach(element => {
            cards.appendChild(cardMaker(element))
        });
    }
})
.catch((err) => {
console.log(`error`,err)
// console.log(err.response)
// console.log(err.response.data)
// console.log(err.response.status)
// console.log(err.response.headers)
// console.log(err.response.request.statusText)

errors.appendChild(errorMessages(err))
})


function cardMaker(obj){
    const card = create('div')
    const headline = create('div')
    const author = create('div')
    const imgContainer = create('div')
    const img = create('img')
    const authorName = create('span')

    headline.textContent = obj.headline
    img.src = obj.authorPhoto
    authorName.textContent = obj.authorName

    card.className = 'card'
    headline.className = 'headline'
    author.className = 'author'
    imgContainer.className = 'img-container'

    card.appendChild(headline)
    card.appendChild(author)
    author.appendChild(imgContainer)
    imgContainer.appendChild(img)
    author.appendChild(authorName)

    card.addEventListener('click', () => {
        console.log(obj.headline)
    })

    return card
}

function errorMessages(err){
    const error = create('div')
    const status = create('h3')
    const headers = create('p')

    status.textContent = `Error ${err.response.status} ${err.response.request.statusText}`
    headers.textContent = err.message

    error.appendChild(status)
    error.appendChild(headers)

    return error
}