'use strict';

import { newNode } from "./functions.js";

const $gamesContainer = document.getElementById('gamesContainer');
const $mainList = document.getElementById('mainList');
let existingCategories = [],
    gamesToBuy = [];

const getData$ = async () => {
    try {
        renderData(await (await fetch('games.json')).json());
    } catch (error) {
        console.error(error);
        alert('the information could not load, please reload the pages or try later');
    }
}

const renderData = (games) => {
    const fragment = document.createDocumentFragment();
    const categoriesfragment = document.createDocumentFragment();
    console.log(games);
    games.forEach((game) => {

        const $card = newNode({
            parent: fragment,
            classes: ['card']
        });

        $card.game = game;

        newNode({ HTMLTag: 'h2', parent: $card, txtContent: game.name, classes: ['card__title'] })

        const $img = newNode({
            HTMLTag: 'img',
            parent: $card,
            classes: ['card__img']
        });

        $img.setAttribute('alt', game.name);
        $img.setAttribute('src', game.imageURL);

        newNode({
            HTMLTag: "button",
            txtContent: "Buy",
            parent: $card,
            classes: ['card__button']
        });

        /* Show up categories */
        game.categories.forEach((category) => {
            if (!existingCategories.includes(category)) {
                existingCategories = existingCategories.concat(category);
                newNode({
                    HTMLTag: 'li',
                    parent: categoriesfragment,
                    txtContent: category,
                    classes: ['main__item']
                });
            }
        });
    });
    $gamesContainer.append(fragment);
    $mainList.append(categoriesfragment);
}

const updateLS = (data) => {
    localStorage.setItem('cart', JSON.stringify(gamesToBuy));
}

getData$();

document.body.addEventListener('click', (e) => {
    const $E = e.target;
    if ($E.classList.contains('main__item')) {
        document.querySelectorAll('.card--hidden').forEach((card) => card.classList.remove('card--hidden'));

        if ($E.textContent === 'All')
            return false;

        document.querySelectorAll('.card').forEach((card) => {
            const category = $E.textContent.trim();

            if (!card.game.categories.includes(category))
                card.classList.add('card--hidden');
        });
    }
});

$gamesContainer.addEventListener('click', (event) => {
    const $E = event.target;
    const game = $E.closest('.card').game;

    if ($E.classList.contains('card__button') &&
        !gamesToBuy.some((E) => E.name === game.name)) {

        gamesToBuy = gamesToBuy.concat(game);
        document.querySelector('.icon--cart').setAttribute('products', gamesToBuy.length);
        updateLS();
        $E.setAttribute('disabled','');
    }
});

document.querySelector('.icon--cart').setAttribute('products', gamesToBuy.length);