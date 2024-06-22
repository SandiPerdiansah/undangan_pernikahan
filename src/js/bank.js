import {data} from "../services/data.js";

export const bank = () => {
    const bank = document.querySelector('.bank');

    const itemListBank = (item) => {
        return `<div>
                     <img src=${item.img} alt=${item.name}>
                      <p>No. Rekening ${String(item.no).slice(0, 4)}xxxx</p>
                      <p>A.n ${item.name}</p>
                      <button type="button" class="copy" id="copy_btn" data-no=${item.no}>
                          Salin No. Rekening
                      </button>
               </div>`;
    }

    data.bank.map((item) => bank.innerHTML += itemListBank(item));

    document.querySelectorAll('#copy_btn').forEach((btn) => {
        btn.addEventListener('click', async (e) => {
            try {
                const rekening = e.target.dataset.no;
                await navigator.clipboard.writeText(rekening);

                e.target.textContent = 'Berhasil di salin';

                setTimeout(() => {
                    e.target.textContent = 'Salin No. Rekening';
                }, 2000);

            } catch (error) {
                e.target.textContent = 'Gagal menyalin';

                setTimeout(() => {
                    e.target.textContent = 'Salin No. Rekening';
                }, 2000);
            }
        });
    });

}