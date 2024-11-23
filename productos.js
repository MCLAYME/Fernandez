document.addEventListener('DOMContentLoaded', function() {
    const imagenesAdicionales = {
        motos: [
            { src: 'moto1.jpg', alt: 'Moto 1' },
            { src: 'moto2.jpg', alt: 'Moto 2' },
            { src: 'moto3.jpg', alt: 'Moto 3' }
        ],
        autos: [
            { src: 'auto1.jpg', alt: 'Auto 1' },
            { src: 'auto2.jpg', alt: 'Auto 2' },
            { src: 'auto3.jpg', alt: 'Auto 3' }
        ],
        tractores: [
            { src: 'tractor1.jpg', alt: 'Tractor 1' },
            { src: 'tractor2.jpg', alt: 'Tractor 2' },
            { src: 'tractor3.jpg', alt: 'Tractor 3' }
        ]
    };

    window.mostrarMasImagenes = function(categoria) {
        const container = document.getElementById('imagenes-container');
        container.innerHTML = '';

        imagenesAdicionales[categoria].forEach(imagen => {
            const col = document.createElement('div');
            col.classList.add('col-md-4');

            const card = document.createElement('div');
            card.classList.add('card');

            const img = document.createElement('img');
            img.src = imagen.src;
            img.alt = imagen.alt;
            img.classList.add('card-img-top');

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = imagen.alt;

            cardBody.appendChild(cardTitle);
            card.appendChild(img);
            card.appendChild(cardBody);
            col.appendChild(card);
            container.appendChild(col);
        });
    };

    window.scrollToTop = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
});