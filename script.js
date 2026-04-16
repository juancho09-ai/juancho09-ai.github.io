const juegos = [
    // PLAYSTATION
    {nombre:"God of War (2018)", precio:50, plataforma:"ps", imagen:"img/gow2018.jpg"},
    {nombre:"God of War Ragnarök", precio:60, plataforma:"ps", imagen:"img/gowragnarok.jpg"},
    {nombre:"The Last of Us Part I", precio:50, plataforma:"ps", imagen:"img/tlou1.jpg"},
    {nombre:"The Last of Us Part II", precio:50, plataforma:"ps", imagen:"img/tlou2.jpg"},
    {nombre:"Bloodborne", precio:40, plataforma:"ps", imagen:"img/bloodborne.jpg"},
    {nombre:"Ghost of Tsushima", precio:55, plataforma:"ps", imagen:"img/tsushima.jpg"},
    {nombre:"Marvel's Spider-Man", precio:50, plataforma:"ps", imagen:"img/spiderman.jpg"},
    {nombre:"Spider-Man 2", precio:60, plataforma:"ps", imagen:"img/spiderman2.jpg"},
    {nombre:"Horizon Zero Dawn", precio:40, plataforma:"ps", imagen:"img/hzd.jpg"},
    {nombre:"Horizon Forbidden West", precio:60, plataforma:"ps", imagen:"img/hfw.jpg"},
    {nombre:"Helldivers 2", precio:50, plataforma:"ps", imagen:"img/helldivers2.jpg"},
    {nombre:"Final Fantasy VII Rebirth", precio:70, plataforma:"ps", imagen:"img/ff7.jpg"},

    // XBOX
    {nombre:"Red Dead Redemption 2", precio:60, plataforma:"xbox", imagen:"img/rdr2.jpg"},
    {nombre:"Elden Ring", precio:60, plataforma:"xbox", imagen:"img/eldenring.jpg"},
    {nombre:"The Witcher 3: Wild Hunt", precio:40, plataforma:"xbox", imagen:"img/witcher3.jpg"},
    {nombre:"Cyberpunk 2077", precio:50, plataforma:"xbox", imagen:"img/cyberpunk.jpg"},
    {nombre:"Doom Eternal", precio:40, plataforma:"xbox", imagen:"img/doom.jpg"},
    {nombre:"Resident Evil 4 Remake", precio:60, plataforma:"xbox", imagen:"img/re4.jpg"},
    {nombre:"Alan Wake 2", precio:60, plataforma:"xbox", imagen:"img/alanwake2.jpg"},

    // PC
    {nombre:"Baldur's Gate 3", precio:60, plataforma:"pc", imagen:"img/bg3.jpg"},
    {nombre:"Disco Elysium: The Final Cut", precio:40, plataforma:"pc", imagen:"img/disco.jpg"},
    {nombre:"Hades", precio:30, plataforma:"pc", imagen:"img/hades.jpg"},
    {nombre:"Stardew Valley", precio:20, plataforma:"pc", imagen:"img/stardew.jpg"},
    {nombre:"It Takes Two", precio:35, plataforma:"pc", imagen:"img/ittakestwo.jpg"},
    {nombre:"Mass Effect Legendary Edition", precio:50, plataforma:"pc", imagen:"img/masseffect.jpg"},
    {nombre:"Sekiro: Shadows Die Twice", precio:60, plataforma:"pc", imagen:"img/sekiro.jpg"},
    {nombre:"Minecraft", precio:30, plataforma:"pc", imagen:"img/minecraft.jpg"},
    {nombre:"Grand Theft Auto V", precio:40, plataforma:"pc", imagen:"img/gta5.jpg"},
    {nombre:"Persona 5 Royal", precio:50, plataforma:"pc", imagen:"img/persona5.jpg"},
    {nombre:"Hollow Knight", precio:25, plataforma:"pc", imagen:"img/hollowknight.jpg"},

    // NINTENDO
    {nombre:"Zelda: Breath of the Wild", precio:60, plataforma:"nintendo", imagen:"img/botw.jpg"},
    {nombre:"Zelda: Tears of the Kingdom", precio:70, plataforma:"nintendo", imagen:"img/totk.jpg"},
    {nombre:"Super Mario Odyssey", precio:55, plataforma:"nintendo", imagen:"img/mario.jpg"},
    {nombre:"Mario Kart 8 Deluxe", precio:50, plataforma:"nintendo", imagen:"img/mariokart.jpg"},
    {nombre:"Super Smash Bros Ultimate", precio:60, plataforma:"nintendo", imagen:"img/smash.jpg"}
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
            <img src="${juego.imagen}" alt="${juego.nombre}">
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
    const juego = juegos.find(j => j.nombre === nombre);
    carrito.push(juego);
    actualizarCarrito();

    // 🔥 ABRIR CARRITO AUTOMÁTICO
    document.getElementById("carrito").classList.remove("oculto");
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
    document.getElementById("carrito").classList.toggle("oculto");
}

function eliminar(index) {
    carrito.splice(index, 1);
    actualizarCarrito();

    // 🔥 SI QUEDA VACÍO → CERRAR
    if (carrito.length === 0) {
        document.getElementById("carrito").classList.add("oculto");
    }
}

function toggleMenu() {
    document.getElementById("menu").classList.toggle("oculto");
}

// MODAL
function generarFactura() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío 😢");
        return;
    }

    document.getElementById("modal").classList.add("activo");
}

function cerrarModal() {
    document.getElementById("modal").classList.remove("activo");
}

function confirmarCompra() {
    localStorage.setItem("misJuegos", JSON.stringify(carrito));

    alert("✅ Tu compra se ha realizado con éxito");

    carrito.length = 0;
    actualizarCarrito();

    cerrarModal();
    mostrarMisJuegos();
}

// MIS JUEGOS
function mostrarMisJuegos() {
    document.getElementById("inicio").style.display = "none";
    lista.innerHTML = "";

    let juegosComprados = JSON.parse(localStorage.getItem("misJuegos")) || [];

    if (juegosComprados.length === 0) {
        lista.innerHTML = "<p>No has comprado juegos aún 😢</p>";
        return;
    }

    juegosComprados.forEach(juego => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <img src="img/default.jpg">
            <h3>${juego.nombre}</h3>
            <p>$${juego.precio}</p>
            <p>✅ Comprado</p>
        `;

        lista.appendChild(div);
    });
}
function buscarJuego() {
    const texto = document.getElementById("buscador").value.toLowerCase();

    // 🔥 SI ESTÁ VACÍO → VOLVER AL INICIO
    if (texto === "") {
        mostrarInicio();
        return;
    }

    lista.innerHTML = "";

    juegos
    .filter(j => j.nombre.toLowerCase().includes(texto))
    .forEach(juego => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <img src="${juego.imagen}" alt="${juego.nombre}">
            <h3>${juego.nombre}</h3>
            <p>$${juego.precio}</p>
            <button onclick="agregar('${juego.nombre}', ${juego.precio})">Agregar</button>
        `;

        lista.appendChild(div);
    });
}