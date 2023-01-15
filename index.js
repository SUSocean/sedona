import { hotels } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

window.onload = function () {
    slideOne()
    slideTwo()
}


document.addEventListener('click', function (e) {
    if (e.srcElement.id === 'decrement-adults' && document.getElementById('adults').value > 0) {
        document.getElementById('adults').value--
    } else if (e.srcElement.id === 'increment-adults') {
        document.getElementById('adults').value++
    }
    if (e.srcElement.id === 'decrement-kids' && document.getElementById('kids').value > 0) {
        document.getElementById('kids').value--
    } else if (e.srcElement.id === 'increment-kids') {
        document.getElementById('kids').value++
    }

    if (e.srcElement.id === 'open-popUP') {
        document.getElementById('hotels-search-popup').style.display = 'flex'
        document.getElementById('main').style.opacity = "30%"
    }
    if (e.srcElement.id === 'close-popup-btn') {
        document.getElementById('hotels-search-popup').style.display = 'none'
        document.getElementById('main').style.opacity = "100%"
    }
})

// navigation focus with scroll setting

document.addEventListener('scroll', function () {
    if (scrollY > 696 && !document.getElementById('hotels-nav-link').classList.contains('active')) {
        document.getElementById('about-nav-link').classList.add('active')
        document.getElementById('home-nav-link').classList.remove('active')
    } else if (scrollY < 696 && !document.getElementById('hotels-nav-link').classList.contains('active')) {
        document.getElementById('about-nav-link').classList.remove('active')
        document.getElementById('home-nav-link').classList.add('active')
    }
})



// slider functions (needs to be sorted )
let sliderOne = document.getElementById('slider-1')
let sliderTwo = document.getElementById('slider-2')
let minGap = 10
let sliderMaxValue = document.getElementById('slider-1').max
let percent1 = 0
let percent2 = 0


sliderOne.addEventListener('input', slideOne)
sliderTwo.addEventListener('input', slideTwo)



function slideOne() {
    if (sliderTwo.value - sliderOne.value <= minGap) {
        sliderOne.value = sliderTwo.value - minGap
    }
    document.getElementById('range1').textContent = sliderOne.value * 100
    fillColor()
}

function slideTwo() {
    if (sliderTwo.value - sliderOne.value <= minGap) {
        sliderTwo.value = sliderOne.value + minGap
    }
    document.getElementById('range2').textContent = sliderTwo.value * 100
    fillColor()
}

function fillColor() {
    percent1 = (sliderOne.value / sliderMaxValue) * 100
    percent2 = (sliderTwo.value / sliderMaxValue) * 100
    document.getElementById('slider-track').style.background = `linear-gradient(to right, #ccc ${percent1}% , #3F5E72 ${percent1}% , #3F5E72 ${percent2}%, #ccc ${percent2}%)`
}

//  hotels display functions

function getStarHTML(element) {
    let starsHTML = ``
    for (let i = 0; i < element.stars; i++) {
        starsHTML += `<i class="fa-sharp fa-solid fa-star"></i>`
    }
    return starsHTML
}

function getFinalHTML(array) {

    let finalHTML = ``
    array.forEach(element => {
        finalHTML += `
            <div class='hotel-card'>
                <img src='${element.picture}' alt='${element.name} picture'>
                <h2 class='hotel-card-name'>${element.name}</h2>
                <div class="spcBtn-container">
                    <span class='hotel-card-type'>${element.type}</span>
                    <span class='hotel-card-price'>${element.price} $</span>
                </div>
                <div class="spcBtn-container">
                    <button id='reserve-btn' class='button'>RESERVE</button>
                    <button id='add-to-favorite-btn' data-uiid="${element.uiid}" class='button blue-button'>Favorites</button>
                </div>
                <div class="spcBtn-container">
                    <span class="hotel-card-stars-container"> ${getStarHTML(element)}</span>
                    <span class="hotel-card-score">SCORE: ${element.score}</span>
                </div>
            </div>
        `
    });
    return finalHTML
}

function render(array) {
    document.getElementById('total-hotels-found').textContent = `HOTELS FOUND: ${array.length}`
    document.getElementById('hotels').innerHTML = getFinalHTML(array)
}

render(hotels)


// gett liked hotels array and html

document.addEventListener('click', function (e) {
    if (e.target.dataset.uiid) {
        hotels.forEach(function (hotel) {
            if (hotel.uiid === e.target.dataset.uiid) {
                hotel.isInFavorite = true
            }
        })
        getLikedHotels()
        if (getLikedHotels().length > 0) {
            document.getElementById('liked-hotels-counter').classList.remove('hidden')
            document.getElementById('liked-hotels-counter').innerText = getLikedHotels().length
        }

    }
    console.log(getLikedHotels())
})

function getLikedHotels() {
    let likedHotels = []
    hotels.forEach(function (hotel) {
        if (hotel.isInFavorite) {
            likedHotels.push(hotel)
        }
    })
    return likedHotels
}

