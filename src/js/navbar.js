import {data} from "../services/data.js";

export const navbar = () => {
    const navbar = document.querySelector('.navbar');

    data.navbar.map((item) => {
        navbar.innerHTML += itemNavbar(item);
    });

    const links = navbar.querySelectorAll('a');
    links.forEach((link) => {
        const path = link.dataset.href;

        link.addEventListener('click', (e) => {
            e.preventDefault();

            links.forEach((a) => {
                a.classList.remove('active');
            });

            link.classList.toggle('active');

            if (path) {
                window.location.href = path;
            }

        });
    });

    function itemNavbar(data) {
        return `<a href="${data.path}" data-href="${data.path}">
                    <i class="${data.icons}"></i>
                    <span>${data.teks}</span>
                </a>`;
    }
}
