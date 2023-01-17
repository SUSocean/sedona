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
    document.getElementById('range1').textContent = sliderOne.value * 5
    fillColor()
}

function slideTwo() {
    if (sliderTwo.value - sliderOne.value <= minGap) {
        sliderTwo.value = sliderOne.value + minGap
    }
    document.getElementById('range2').textContent = sliderTwo.value * 5
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
        const faworite = ((element.isInFavorite) ? 'addToFaws' : '')
        const inner = ((element.isInFavorite) ? 'Added' : 'Favorites')
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
                    <button id='${element.uiid}' data-uiid="${element.uiid}" class='button blue-button ${faworite}'>${inner}</button>
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
    if (document.getElementById('hotels-by-price-display').value === 'high-price-first') {
        array.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
    } else {
        array.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    }
    document.getElementById('total-hotels-found').textContent = `HOTELS FOUND: ${array.length}`
    document.getElementById('hotels').innerHTML = getFinalHTML(array)
}

render(hotels)


//  liked hotels array and html

document.addEventListener('click', function (e) {
    if (e.target.dataset.uiid) {
        hotels.forEach(function (hotel) {
            if (hotel.uiid === e.target.dataset.uiid && !hotel.isInFavorite) {
                hotel.isInFavorite = true
                document.getElementById(`${e.target.dataset.uiid}`).classList.toggle('addToFaws')
                document.getElementById(`${e.target.dataset.uiid}`).innerText = 'added'
            } else if (hotel.uiid === e.target.dataset.uiid && hotel.isInFavorite) {
                hotel.isInFavorite = false
                document.getElementById(`${e.target.dataset.uiid}`).classList.toggle('addToFaws')
                document.getElementById(`${e.target.dataset.uiid}`).innerText = 'Favorites'
            }
        })
        if (getLikedHotels().length > 0) {
            document.getElementById('liked-hotels-counter').classList.remove('hidden')
            document.getElementById('liked-hotels-counter').innerText = getLikedHotels().length
        } else {
            document.getElementById('liked-hotels-counter').classList.add('hidden')
        }

    } else if (e.target.dataset.like) {
        render(getLikedHotels())
    } else if (e.target.dataset.allhotels) {
        render(hotels)
    } else if (e.target.id === 'submit-hotels-search-setings-btn') {
        render(getSearchedArray())
    } else if (e.target.id === 'clear-hotels-search-setings-btn') {
        makeUnchecked()
    } else if (e.target.id === 'fa-list') {
        const hotelCards = document.getElementsByClassName('hotel-card')
        document.getElementById('fa-list').classList.add('active-grid-display')
        document.getElementById('fa-grip').classList.remove('active-grid-display')
        for (const hotelCard of hotelCards) {
            hotelCard.classList.add('hotel-card-line');
        }
    } else if (e.target.id === 'fa-grip') {
        const hotelCards = document.getElementsByClassName('hotel-card')
        document.getElementById('fa-list').classList.remove('active-grid-display')
        document.getElementById('fa-grip').classList.add('active-grid-display')
        for (const hotelCard of hotelCards) {
            hotelCard.classList.remove('hotel-card-line');
        }
    }
})

function getLikedHotels() {
    let likedHotels = []
    likedHotels = hotels.filter(function (hotel) {
        return hotel.isInFavorite
    })
    return likedHotels
}

// search settings

function getSearchedArray() {
    let searchedArray = hotels
    const pool = (document.getElementById('pool').checked) ? 'pool' : ''
    const parking = (document.getElementById('parking').checked) ? 'parking' : ''
    const wiFi = (document.getElementById('wi-fi').checked) ? 'wi-fi' : ''
    const typeOfHousing = (document.getElementById('hotel').checked) ? 'Hotel' : (document.getElementById('motel').checked) ? 'Motel' : (document.getElementById('appartment').checked) ? 'Apartment' : ''
    if (pool) {
        searchedArray = searchedArray.filter(function (hotel) {
            return hotel.hasPool
        })
    }
    if (parking) {
        searchedArray = searchedArray.filter(function (hotel) {
            return hotel.hasParking
        })
    }
    if (wiFi) {
        searchedArray = searchedArray.filter(function (hotel) {
            return hotel.hasWiFi
        })
    }
    if (typeOfHousing) {
        searchedArray = searchedArray.filter(function (hotel) {
            return hotel.type === typeOfHousing
        })
    }
    searchedArray = searchedArray.filter(function (hotel) {
        return hotel.price <= document.getElementById('range2').textContent
    })
    searchedArray = searchedArray.filter(function (hotel) {
        return hotel.price >= document.getElementById('range1').textContent
    })
    return searchedArray
}

function makeUnchecked() {
    document.getElementById('pool').checked = false
    document.getElementById('parking').checked = false
    document.getElementById('wi-fi').checked = false
    document.getElementById('hotel').checked = false
    document.getElementById('motel').checked = false
    document.getElementById('appartment').checked = false
    document.getElementById('range2').textContent = 500
    document.getElementById('range1').textContent = 0
    sliderOne.value = 0
    sliderTwo.value = 500
    fillColor()
    render(hotels)
}

