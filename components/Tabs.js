// STEP 2: Create tabs
// -----------------------
// Using axios send a GET request to the address: https://lambda-times-backend.herokuapp.com/topics
// Once the data is resolved use console logs or breakpoints to review the structure.
// Iterate over the topics creating a new tab for each topic, and appending it to the DOM
// under the div.topics element.
//
//  Each tab should look like this:
//    <div class="tab">topic here</div>
//
// NOTE: you do _not_ need to install axios as it's included in the HTML via script element

import axios from 'axios'

const topics = document.querySelector('.topics')

axios.get('https://lambda-times-backend.herokuapp.com/topics')
.then((res) => {
    const articles = res.data.topics
    articles.array.forEach(element => {
        topics.appendChild(tabCreate(element))
    });
})
.catch((err) => {
    console.log(err)
})

function tabCreate(topic) {
    const tab = document.createElement('div')
    tab.className = 'tab'
    tab.textContent = 'topic here'
    
    return tab
}