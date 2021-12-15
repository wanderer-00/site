// Стрелки ← ↑ → ↓ △ ▽ ◁ ▷

// ОБЪЯВЛЯЕТ КАНСТАНТУ И ПЕРЕДАЕТ ЭЛЕМЕНТ
// ↓ передача списка, в котором будут содержаться карточки
const charactersList = document.getElementById('charactersList');
// ↓ передача поисковой строки
const searchBar = document.getElementById('searchBar');
// СОЗДАНИЕ ПУСТОГО МАССИВА
let hpCharacters = [];

// Метод .addEventListener() регистрирует [отслеживает протекания события]
// eventTarget.addEventListener(тип_события, обработчик, фаза);

// тип_события: строка, указывающая тип события для которого регистрируется обработчик. Тип события указывается без префикса "on".
// обработчик: функция выражение или имя функции, которая должна вызываться при возникновении события, указанного типа.
// фаза: булево значение, которое определяет, для какой фазы распространения события будет зарегистрирован обработчик. Возможные значения: true | false

// поисковая_строка.отслеживание_событи('отжатие_любой_клавиши', (выполнение_фуекции_e))

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = hpCharacters.filter((character) => {
        return (
            // Метод includes() определяет, содержит ли массив определённый элемент, возвращая в зависимости от этого true или false.
            character.name.toLowerCase().includes(searchString) ||
            character.clan.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
    // Конструкция try...catch пытается выполнить инструкции в блоке try, и, в случае ошибки, выполняет блок catch.
    try {
        // const res = await fetch('https://hp-api.herokuapp.com/api/characters');
        const res = await fetch('config.js'); // config.js => ../config.js
        hpCharacters = await res.json();
        displayCharacters(hpCharacters);
    // переменная err (можно выбрать и другое название)
    } catch (err) {
        // Выводить текст ошибки в консоль
        console.error(err);
    }
};

/* передача константе displayCharacters результата анонимной функции */
const displayCharacters = (characters) => {
    const htmlString = characters.map((character) => {
        // return - останавливает выполнение функции
        return`
            <li class="character">
                <a href="players/${character.url}">
                    <h2>${character.name}</h2>
                </a>
                <img src="img/${character.image}"></img>
                <p>КЛАН: ${character.clan}</p>
            </li>
        `;
        }).join(''); // Метод join() объединяет все элементы массива (или массивоподобного объекта) в строку.
    charactersList.innerHTML = htmlString;
};

loadCharacters();

