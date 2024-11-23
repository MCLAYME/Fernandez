let currentImageIndex = 0;

function showNextImage() {
    const images = document.querySelectorAll('.carrusel img');
    images[currentImageIndex].classList.remove('active');
    currentImageIndex = (currentImageIndex + 1) % images.length;
    images[currentImageIndex].classList.add('active');
}

function showPrevImage() {
    const images = document.querySelectorAll('.carrusel img');
    images[currentImageIndex].classList.remove('active');
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    images[currentImageIndex].classList.add('active');
}

function handleSubmit(event) {
    event.preventDefault();
    alert('Formulario enviado con éxito!');
    document.getElementById('contactForm').reset();
}