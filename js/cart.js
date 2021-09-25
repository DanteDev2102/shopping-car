import { newNode } from "./functions.js";

const $gamesContainer = document.getElementById('gamesContainer');

if (localStorage.getItem('cart')) {
    const data = JSON.parse(localStorage.getItem('cart'));
    let total = 0;
    data.forEach((game) => total += game.price ?? 0);
    $gamesContainer.setAttribute('total', '$' + total);
    const fragment = document.createDocumentFragment();
    data.forEach(game => {
        const $card = newNode({
            parent: fragment,
            classes: ['card']
        });

        $card.game = game;


        const $img = newNode({
            HTMLTag: 'img',
            parent: $card,
            classes: ['card__img']
        });

        $img.setAttribute('alt', game.name);
        $img.setAttribute('src', game.imageURL);

        newNode({
            HTMLTag: 'h2',
            parent: $card,
            txtContent: game.name,
            classes: ['card__title']
        });

        /* newNode({
            HTMLTag: "button",
            txtContent: "Buy",
            parent: $card,
            classes: ['card__button']
        }); */
        newNode({
            HTMLTag: 'div',
            parent: $card,
            txtContent: (game.price) ? '$' + game.price : 'FREE',
            classes: ['card__price']
        });
    });

    document.querySelector('.icon--cart').setAttribute('products', data.length);

    $gamesContainer.append(fragment);
    console.log(data)
    if (data.length > 0) {
        const $gameActions = newNode({
            parent: $gamesContainer,
            classes: ['games__actions']
        })

        const $cancel = newNode({
            HTMLTag: 'button',
            parent: $gameActions,
            txtContent: 'Empty cart',
            classes: ['games__button', 'games__button--red']
        });
        const $buyButton = newNode({
            HTMLTag: 'button',
            parent: $gameActions,
            txtContent: 'Make purchase',
            classes: ['games__button', 'games__button--green']
        });

        $cancel.addEventListener('click', () => {
            localStorage.clear();
            location.reload()
        }, { once: true });

        $buyButton.addEventListener('click', () => {
            const $modal = document.getElementById('modal');
            $modal.classList.remove('modal--hidden');

            setTimeout(() => {
                $modal.classList.add('modal--hidden')
                localStorage.clear();
                location.href = '/'
            }, 1000);
        });
    }
} else {
    $gamesContainer.textContent = "Please add a product! :)"
    $gamesContainer.forEach((E) => E.remove());
}
