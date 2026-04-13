const juegos = [
    {nombre:"God of War (2018)", precio:50, plataforma:"ps"},
    {nombre:"God of War Ragnarök", precio:60, plataforma:"ps"},
    {nombre:"The Last of Us Part I", precio:50, plataforma:"ps"},
    {nombre:"The Last of Us Part II", precio:50, plataforma:"ps"},
    {nombre:"Bloodborne", precio:40, plataforma:"ps"},
    {nombre:"Ghost of Tsushima", precio:55, plataforma:"ps"},
    {nombre:"Marvel's Spider-Man", precio:50, plataforma:"ps"},
    {nombre:"Spider-Man 2", precio:60, plataforma:"ps"},
    {nombre:"Horizon Zero Dawn", precio:40, plataforma:"ps"},
    {nombre:"Horizon Forbidden West", precio:60, plataforma:"ps"},
    {nombre:"Helldivers 2", precio:50, plataforma:"ps"},

    {nombre:"Red Dead Redemption 2", precio:60, plataforma:"xbox"},
    {nombre:"Elden Ring", precio:60, plataforma:"xbox"},
    {nombre:"The Witcher 3", precio:40, plataforma:"xbox"},
    {nombre:"Cyberpunk 2077", precio:50, plataforma:"xbox"},
    {nombre:"Doom Eternal", precio:40, plataforma:"xbox"},
    {nombre:"Resident Evil 4 Remake", precio:60, plataforma:"xbox"},
    {nombre:"Alan Wake 2", precio:60, plataforma:"xbox"},

    {nombre:"Baldur's Gate 3", precio:60, plataforma:"pc"},
    {nombre:"Disco Elysium", precio:40, plataforma:"pc"},
    {nombre:"Hades", precio:30, plataforma:"pc"},
    {nombre:"Stardew Valley", precio:20, plataforma:"pc"},
    {nombre:"It Takes Two", precio:35, plataforma:"pc"},
    {nombre:"Mass Effect Legendary Edition", precio:50, plataforma:"pc"},
    {nombre:"Sekiro: Shadows Die Twice", precio:60, plataforma:"pc"},
    {nombre:"Minecraft", precio:30, plataforma:"pc"},

    {nombre:"Zelda: Breath of the Wild", precio:60, plataforma:"nintendo"},
    {nombre:"Zelda: Tears of the Kingdom", precio:70, plataforma:"nintendo"},
    {nombre:"Super Mario Odyssey", precio:55, plataforma:"nintendo"},
    {nombre:"Mario Kart 8 Deluxe", precio:50, plataforma:"nintendo"},
    {nombre:"Super Smash Bros Ultimate", precio:60, plataforma:"nintendo"},

    {nombre:"Grand Theft Auto V", precio:40, plataforma:"pc"},
    {nombre:"Persona 5 Royal", precio:50, plataforma:"pc"},
    {nombre:"Final Fantasy VII Rebirth", precio:70, plataforma:"ps"}
];

let carrito = [];

const lista = document.getElementById("lista-juegos");

// MOSTRAR JUEGOS
function mostrarJuegos(filtro) {
    lista.innerHTML = "";

    juegos
    .filter(j => !filtro || j.plataforma === filtro)
    .forEach(juego => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <img src="https://via.placeholder.com/300x200" alt="${juego.nombre}">
            <h3>${juego.nombre}</h3>
            <p>$${juego.precio}</p>
            <button onclick="agregar('${juego.nombre}', ${juego.precio})">Agregar</button>
        `;

        lista.appendChild(div);
    });
}

// FILTRAR
function filtrar(tipo) {
    document.getElementById("inicio").style.display = "none";
    mostrarJuegos(tipo);
}

// INICIO
function mostrarInicio() {
    document.getElementById("inicio").style.display = "block";
    lista.innerHTML = "";
}

// CARRITO
function agregar(nombre, precio) {
    carrito.push({nombre, precio});
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    listaCarrito.innerHTML = "";

    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio;

        const li = document.createElement("li");

        li.innerHTML = `
            ${item.nombre} - $${item.precio}
            <button onclick="eliminar(${index})">❌</button>
        `;

        listaCarrito.appendChild(li);
    });

    let impuesto = total * 0.07;
    let totalFinal = total + impuesto;

    document.getElementById("total").textContent =
        `Subtotal: $${total} | ITBMS (7%): $${impuesto.toFixed(2)} | Total: $${totalFinal.toFixed(2)}`;
}

function toggleCarrito() {
    const carrito = document.getElementById("carrito");
    carrito.classList.toggle("oculto");
}

function eliminar(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}
function toggleMenu() {
    document.getElementById("menu").classList.toggle("oculto");
}