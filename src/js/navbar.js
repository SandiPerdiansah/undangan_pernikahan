import { data } from "../services/data.js";

export const navbar = () => {
    const navbar = document.querySelector('.navbar');

    data.navbar.map((item) => {
        navbar.innerHTML += itemNavbar(item);
    });

    function itemNavbar(data) {
        return `<a href="${data.path}" data-href="${data.path}">
                <i class="${data.icons}"></i>
                <span>${data.teks}</span>
            </a>`;
    }

    const links = navbar.querySelectorAll('a');
    let ignoreScrollEvent = false;

    links.forEach((link) => {
        const path = link.dataset.href;

        link.addEventListener('click', (e) => {
            e.preventDefault();

            links.forEach((a) => {
                a.classList.remove('active');
            });

            link.classList.add('active');

            if (path) {
                ignoreScrollEvent = true;
                window.location.href = path;
                setTimeout(() => {
                    ignoreScrollEvent = false;
                }, 1000);
            }
        });
    });

    document.addEventListener('scroll', () => {
        if (ignoreScrollEvent) return;

        const windowScroll = Math.ceil(window.scrollY);

        links.forEach((a) => {
            a.classList.remove('active');
        });

        if (windowScroll > 0 && windowScroll <= 1919) {
            links[1].classList.add('active');
        } else if (windowScroll > 1919 && windowScroll <= 2548) {
            links[2].classList.add('active');
        } else if (windowScroll > 2548 && windowScroll <= 3026) {
            links[3].classList.add('active');
        } else if (windowScroll > 3026 && windowScroll < 6000) {
            links[4].classList.add('active');
        } else {
            links[0].classList.add('active');
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        links[0].classList.add('active');
    });
}