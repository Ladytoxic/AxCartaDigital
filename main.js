let dataCarta = []
const API = 'https://alexeos-catering-default-rtdb.firebaseio.com/CartaDigital.json'
const sectionCards = document.querySelector('section.cards');
const loader = document.querySelector('.progress');

const categorias = ["Cafetería", "Dulce Salado", "Postres", "Entradas", "Empanadas", "Pizzas", "Platos Principales", "Veggie", "Guarniciones", "Adicionales", "Pastas", "Salsas", "Bebidas", "Cervezas y Vinos"];

const categoriasIds = {};

categorias.forEach((categoria) => {
    let id;
    if (categoria === "Guarniciones") {
        id = "porciones";
    } else if (categoria === "Cervezas y Vinos") {
        id = "cervezas_vinos";
    } else {
        id = categoria.toLowerCase().replace(/[íï]/g, 'i').replace(/\s+/g, '_');
    }

    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('id', id);
    card.innerHTML = `<h2>${categoria.toUpperCase()}</h2>`;
    sectionCards.appendChild(card);

    categoriasIds[categoria] = id;
});

fetch(API)
    .then(response => response.json())
    .then(data => {
        dataCarta = ordenar(data)
        console.log(Object.values(categoriasIds))
        console.log(Object.keys(dataCarta))
        loader.style.display = 'none';
        renderCategories();


    })

    .catch(error => console.log(error));
loader.style.display = 'flex';
function renderCategories() {
    for (const categoria in dataCarta) {
        if (dataCarta.hasOwnProperty(categoria)) {
            const id = categoria.toLowerCase().replace(/[íï]/g, 'i').replace(/\s+/g, '_');
            renderCategory(id, dataCarta[categoria]);
        }
    }
}

function ordenar(obj) {
    const orden = [
        "cafeteria",
        "dulce_salado",
        "entradas",
        "empanadas",
        "pizzas",
        "platos_principales",
        "veggie",
        "porciones",
        "adicionales",
        "pastas",
        "salsas",
        "bebidas",
        "cervezas_vinos",
        "postres",
    ];

    const result = {};
    orden.forEach((key) => {
        if (obj[key]) {
            result[key] = obj[key];
        }
    });
    return result;

}

function renderCategory(section, items) {
    const sectionElem = document.querySelector(`#${section}`);
    const ulElem = document.createElement('ul');
    ulElem.classList.add('items-list');
    sectionElem.appendChild(ulElem);

    items.forEach((item) => {
        const itemElem = document.createElement('li');
        itemElem.classList.add('item');

        itemElem.innerHTML = `
        <div>
        <h4>${item.nombre}</h4>
        ${item.descripcion ? `<p>${item.descripcion}</p>` : ''}
        </div>
        ${item.precio ? `<span class="precio">$${item.precio.toFixed(2)}</span>` : ''}
      `;
        ulElem.appendChild(itemElem);
    });
}

