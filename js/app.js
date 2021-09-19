'use strict';

const $main = document.getElementById('main');

/*create new Element, append them and return them*/
const newNode = ({ HTMLTag = 'div', parent, txtContent = '', classes = [] }) => {
    const $node = document.createElement(HTMLTag);
    /* add textContent if it is defined */
    if (txtContent !== undefined)
        $node.textContent = txtContent;
    /* ADD CLASS IF IT IS DEFINED */
    if (classes.length > 0)
        classes.forEach((E) => $node.classList.add(E));
    /* APPEND THE NODE IN THE PARENT NODE (PARAMETER)*/
    parent.append($node)
    return $node;
}

const getData = async () => {
    try {
        renderData(await (await fetch('games.json')).json());
    } catch (error) {
        console.error(error);
        alert('the information could not load, please reload the pages or try later');
    }
}

const renderData = (games) => {
    const fragment = document.createDocumentFragment();
    games.forEach((game) => {
        const card = game.newNode({ parent: fragment });

    });
}

getData()