import {API_COMENTAR} from "../services/API_COMENTAR.js";

const api = API_COMENTAR;
export const comentar = () => {
    const form = document.getElementById('form_comentar');
    const buttonForm = form.querySelector('button');
    const totalComentar = document.querySelector('.total_comentar');
    const listComentar = document.querySelector('.list_comentar');
    const pageNumber = document.querySelector('.pages_no');

    const itemListComentar = (data) => {
        const formattedName = data.name
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        return `<li data-id=${data.id}>
                <div style="background-color: ${data.color}">
                    ${data.name.split('')[0].toUpperCase()}
                </div>
                <div>
                    <p>${formattedName}</p>
                    <span class="tanggal">Tanggal : ${data.date}</span>
                    <span>Status : ${data.status}</span>
                    <p>${data.comment}</p>
                </div>
            </li>`;
    };

    // color
    const getRandomColor = () => {
        const getRandomHexColor = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;

        let color = getRandomHexColor();

        const avoidColors = ['#000000', '#ffffff', '#f0f0f0', '#f5f5f5', '#fafafa'];

        while (avoidColors.includes(color)) {
            color = getRandomHexColor();
        }

        return color;
    };


    // time
    const getCurrentDateTime = () => {
        const now = new Date();
        let year = now.getFullYear();
        let month = (now.getMonth() + 1).toString().padStart(2, '0');
        let day = now.getDate().toString().padStart(2, '0');
        let hours = now.getHours().toString().padStart(2, '0');
        let minutes = now.getMinutes().toString().padStart(2, '0');
        let seconds = now.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    // id
    const generateId = () => {
        return Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    };

    // add new comentar
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        buttonForm.textContent = 'Loading...';

        try {
            const response = await api.getALLComentar();

            const object = {
                id: generateId(),
                name: e.target.name.value,
                status: e.target.status.value === 'hadir' ? 'Hadir' : 'Tidak Hadir',
                comment: e.target.doa.value,
                date: getCurrentDateTime(),
                color: getRandomColor(),
            };

            await api.postDataComentar(object);

            buttonForm.textContent = 'Berhasil di kirim';
            listComentar.insertAdjacentHTML('afterbegin', itemListComentar(object));
            totalComentar.textContent = `${++response.length} Orang telah mengucapkan`;

        } catch (error) {
            console.log('Error :' + error.message);
        } finally {
            e.target.name.value = '';
            e.target.status.value = '';
            e.target.doa.value = '';

            setTimeout(() => {
                buttonForm.textContent = 'Kirim';
            }, 1000);
        }
    });

    // click prev & next
    let num = 1;
    const commentsPerPage = 5;
    let totalComments = 0;

    document.getElementById('next_page').addEventListener('click', async () => {
        await loadComments(num + 1);
    });

    document.getElementById('prev_page').addEventListener('click', async () => {
        if (num > 1) {
            await loadComments(num - 1);
        }
    });

    async function loadComments(page) {
        listComentar.innerHTML = '<h1 style="margin: auto; font-size: 1rem">Loading..</h1>';
        pageNumber.textContent = '..';

        try {
            const response = await api.getALLComentar();
            response.reverse();
            totalComments = response.length;

            const startIndex = (page - 1) * commentsPerPage;
            const endIndex = startIndex + commentsPerPage;
            const nextResponse = response.slice(startIndex, endIndex);

            listComentar.innerHTML = '';

            if (nextResponse.length > 0) {
                num = page;
                pageNumber.textContent = `${num}`;
                nextResponse.forEach(item => listComentar.innerHTML += itemListComentar(item));
            } else {
                listComentar.innerHTML = '<h1 style="margin: auto; font-size: 1rem">No more comments</h1>';
            }
        } catch (error) {
            console.log('Error :' + error.message);
            listComentar.innerHTML = '<h1 style="margin: auto; font-size: 1rem">Error loading comments</h1>';
        }
    }

    // load data comentar
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            const response = await api.getALLComentar();

            if (response.length > 0) {
                response.reverse();
                response.map((item) => listComentar.innerHTML += itemListComentar(item));
                totalComentar.textContent = `${response.length} Orang telah mengucapkan`;
            } else {
                listComentar.innerHTML = '';
                totalComentar.textContent = `Belum ada yang mengucapkan`;
            }

            pageNumber.textContent = num.toString();
        } catch (error) {
            console.log(error)
        }
    });
};