document.addEventListener('DOMContentLoaded', function() {
    // Obtener datos almacenados en localStorage
    let cajaData = JSON.parse(localStorage.getItem('cajaData')) || [
        { fecha: '2024-01-01', descripcion: 'Venta', categoria: 'Ingreso', ingreso: 1000, egreso: 0, saldo: 1000, imagen: 'img/producto1.jpg' },
        { fecha: '2024-01-02', descripcion: 'Compra', categoria: 'Egreso', ingreso: 0, egreso: 500, saldo: 500, imagen: 'img/producto2.jpg' },
        // Agrega más datos según sea necesario
    ];

    // Función para renderizar la tabla de control de caja
    function renderCajaTable(data) {
        const tbody = document.querySelector('#caja tbody');
        tbody.innerHTML = '';
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.fecha}</td>
                <td>${item.descripcion}</td>
                <td>${item.categoria}</td>
                <td class="text-success">${item.ingreso}</td>
                <td class="text-danger">${item.egreso}</td>
                <td>${item.saldo}</td>
                <td><img src="${item.imagen}" alt="${item.descripcion}" style="width: 50px; height: 50px;"></td>
            `;
            tbody.appendChild(row);
        });
    }

    // Función para renderizar el carrusel de productos
    function renderCarrusel(data) {
        const indicators = document.querySelector('.carousel-indicators');
        const inner = document.querySelector('.carousel-inner');
        indicators.innerHTML = '';
        inner.innerHTML = '';

        data.forEach((item, index) => {
            const indicator = document.createElement('li');
            indicator.setAttribute('data-target', '#carouselExampleIndicators');
            indicator.setAttribute('data-slide-to', index);
            if (index === 0) indicator.classList.add('active');
            indicators.appendChild(indicator);

            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if (index === 0) carouselItem.classList.add('active');
            carouselItem.innerHTML = `
                <img src="${item.imagen}" class="d-block w-100" alt="${item.descripcion}">
                <div class="carousel-caption d-none d-md-block">
                    <h5>${item.descripcion}</h5>
                    <p>Fecha: ${item.fecha}, Ingreso: ${item.ingreso}, Egreso: ${item.egreso}, Saldo: ${item.saldo}</p>
                </div>
            `;
            inner.appendChild(carouselItem);
        });
    }

    // Función para agregar un nuevo producto
    function agregarProducto(event) {
        event.preventDefault(); // Evita el envío del formulario

        const fecha = document.getElementById('fecha').value;
        const descripcion = document.getElementById('descripcion').value;
        const categoria = document.getElementById('categoria').value;
        const ingreso = parseFloat(document.getElementById('ingreso').value);
        const egreso = parseFloat(document.getElementById('egreso').value);
        const saldo = parseFloat(document.getElementById('saldo').value);
        const imagenInput = document.getElementById('imagen');
        let imagen = '';

        if (imagenInput.files && imagenInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagen = e.target.result;
                const nuevoProducto = { fecha, descripcion, categoria, ingreso, egreso, saldo, imagen };
                cajaData.push(nuevoProducto);

                // Guardar datos en localStorage
                localStorage.setItem('cajaData', JSON.stringify(cajaData));

                renderCajaTable(cajaData);
                renderCarrusel(cajaData);

                // Limpiar el formulario
                document.getElementById('productoForm').reset();
            };
            reader.readAsDataURL(imagenInput.files[0]);
        } else {
            imagen = imagenInput.value;
            const nuevoProducto = { fecha, descripcion, categoria, ingreso, egreso, saldo, imagen };
            cajaData.push(nuevoProducto);

            // Guardar datos en localStorage
            localStorage.setItem('cajaData', JSON.stringify(cajaData));

            renderCajaTable(cajaData);
            renderCarrusel(cajaData);

            // Limpiar el formulario
            document.getElementById('productoForm').reset();
        }
    }

    // Función para buscar transacciones
    function buscarTransacciones(event) {
        const query = event.target.value.toLowerCase();
        const filteredData = cajaData.filter(item => 
            item.descripcion.toLowerCase().includes(query) ||
            item.categoria.toLowerCase().includes(query)
        );
        renderCajaTable(filteredData);
    }

    // Añadir evento al formulario para agregar productos
    document.getElementById('productoForm').addEventListener('submit', agregarProducto);

    // Añadir evento al campo de búsqueda
    document.getElementById('buscar').addEventListener('input', buscarTransacciones);

    // Renderizar la tabla y el carrusel con los datos iniciales
    renderCajaTable(cajaData);
    renderCarrusel(cajaData);
});