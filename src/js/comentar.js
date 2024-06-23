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

        const differenceDate = calculateDifferenceDateNow(data.date);
        let myDate = "";
        if(differenceDate.days < 1){
            if(differenceDate.hours < 1){
                myDate = `${differenceDate.minutes} menit yang lalu`;
            }else{
                myDate = `${differenceDate.hours} jam yang lalu`;
            }
        }else{
            myDate = `${differenceDate.days} hari yang lalu`;
        }

        return `<li data-id=${data.id}>
                <div style="background-color: ${data.color}">
                    ${data.name.split('')[0].toUpperCase()}
                </div>
                <div>
                    <p>${formattedName}</p>
                    <span class="tanggal"> ${myDate}</span>
                    <span>${data.status}</span>
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
        //let seconds = now.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
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
    let currentPage = 1;
    let itemsPerPage = 5;
    let startIndex = 0;
    let endIndex = itemsPerPage;

    document.getElementById('next_page').addEventListener('click', async () => {
        listComentar.innerHTML = '<h1 style="font-size: 1rem; margin: auto">Loading...</h1>'
        pageNumber.textContent = '..';

        try {
            const response = await api.getALLComentar();
            response.reverse();

            currentPage++;
            startIndex = (currentPage - 1) * itemsPerPage;
            endIndex = startIndex + itemsPerPage;

            if (endIndex > response.length) {
                endIndex = response.length;
            }

            listComentar.innerHTML = '';
            response.slice(startIndex, endIndex).map((item) => listComentar.innerHTML += itemListComentar(item));
            pageNumber.textContent = currentPage.toString();
        } catch (error) {
            console.log(error)
        }
    });

    document.getElementById('prev_page').addEventListener('click', async () => {
        listComentar.innerHTML = '<h1 style="font-size: 1rem; margin: auto">Loading...</h1>'
        pageNumber.textContent = '..';

        try {
            const response = await api.getALLComentar();
            response.reverse();

            if (currentPage > 1) {
                currentPage--;
                startIndex = (currentPage - 1) * itemsPerPage;
                endIndex = startIndex + itemsPerPage;

                listComentar.innerHTML = '';
                response.slice(startIndex, endIndex).map((item) => listComentar.innerHTML += itemListComentar(item));
                pageNumber.textContent = currentPage.toString();
            }
        } catch (error) {
            console.log(error)
        }
    });

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

            pageNumber.textContent = currentPage.toString();
        } catch (error) {
            console.log(error)
        }
    });

    function calculateDifferenceDateNow(myDate) {
        // Konversi tanggal menjadi objek Date
        const d1 = new Date(myDate);
        const d2 = new Date();

        // Dapatkan selisih dalam milidetik
        const diffInMs = Math.abs(d2 - d1);

        // Konversi milidetik ke hari, jam, dan menit
        const msInMinute = 60 * 1000;
        const msInHour = 60 * msInMinute;
        const msInDay = 24 * msInHour;

        const days = Math.floor(diffInMs / msInDay);
        const hours = Math.floor((diffInMs % msInDay) / msInHour);
        const minutes = Math.floor((diffInMs % msInHour) / msInMinute);

        return {
            days: days,
            hours: hours,
            minutes: minutes
        };
    }
};