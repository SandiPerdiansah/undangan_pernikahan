import {data} from "../services/data.js";

export const galeri = () => {
    const galeriModal = document.querySelector('.galeri_modal');
    const containerModal = document.querySelector('.container_modal');

    const galeriBox = document.querySelector('.galeri_box');
    const pagination = document.querySelector('.pagination');

    let currentIndex = 0;
    let intervalId;

    data.galeri.map((item, index) => {
        galeriBox.innerHTML += `<img src="${item.img}" alt="ARDI & ICHA" data-id="${item.id}" style="display: ${index === 0 ? 'block' : 'none'};" >`;
        pagination.innerHTML += `<div class="pagination_item ${index === 0 ? 'active' : ''}" data-index="${index}"></div>`;
        containerModal.innerHTML += `<img src=${item.img} alt="ARDI & ICHA">`;
    })

    const updateGallery = (newIndex) => {
        const images = galeriBox.querySelectorAll('img');
        const paginationItems = pagination.querySelectorAll('.pagination_item');

        images[currentIndex].style.display = 'none';
        paginationItems[currentIndex].classList.remove('active');

        currentIndex = newIndex;

        images[currentIndex].style.display = 'block';
        paginationItems[currentIndex].classList.add('active');
    };

    const startAutoSlide = () => {
        intervalId = setInterval(() => {
            const newIndex = (currentIndex === data.galeri.length - 1) ? 0 : currentIndex + 1;
            updateGallery(newIndex);
        }, 3000);
    };

    const stopAutoSlide = () => {
        clearInterval(intervalId);
    };

    document.querySelector('.prev').addEventListener('click', () => {
        stopAutoSlide();
        const newIndex = (currentIndex === 0) ? data.galeri.length - 1 : currentIndex - 1;
        updateGallery(newIndex);
        startAutoSlide();
    });

    document.querySelector('.next').addEventListener('click', () => {
        stopAutoSlide();
        const newIndex = (currentIndex === data.galeri.length - 1) ? 0 : currentIndex + 1;
        updateGallery(newIndex);
        startAutoSlide();
    });

    pagination.addEventListener('click', (event) => {
        if (event.target.classList.contains('pagination_item')) {
            stopAutoSlide();
            const newIndex = parseInt(event.target.getAttribute('data-index'));
            updateGallery(newIndex);
            startAutoSlide();
        }
    });

    document.getElementById('galeri_modal_button').addEventListener('click', () => {
        galeriModal.classList.toggle('active');
    });

    document.getElementById('hide_modal').addEventListener('click', () => {
        galeriModal.classList.remove('active');
    })

    startAutoSlide();
};
