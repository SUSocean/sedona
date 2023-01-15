import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const hotels = [
    {
        name: 'Amara Resort & Spa',
        type: 'Hotel',
        picture: './imgaes/amara-resort.png',
        score: '8.5',
        stars: 4,
        price: 300,
        isInFavorite: false,
        uiid: uuidv4(),
    },
    {
        name: 'Villas at Poco Diablo',
        type: 'Hotel',
        picture: '/imgaes/villas-at-poco.jpg',
        score: '9.2',
        stars: 4,
        price: 250,
        isInFavorite: false,
        uiid: uuidv4(),
    },
    {
        name: 'Desert Quail Inn',
        type: 'Apartment',
        picture: '/imgaes/desert-quail.jpg',
        score: '8.5',
        stars: 3,
        price: 200,
        isInFavorite: false,
        uiid: uuidv4(),
    },
    {
        name: 'GreenTree Inn',
        type: 'Motel',
        picture: '/imgaes/greenTree.jpg',
        score: "5,0",
        stars: 2,
        price: 100,
        isInFavorite: false,
        uiid: uuidv4(),
    },
]

export { hotels }