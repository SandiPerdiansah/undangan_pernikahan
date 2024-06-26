export const date = () => {
    const daysElement = document.getElementById('day');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('second');

    const startCountdown = () => {
        const endTime = new Date("2024-11-14T00:00:00");

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = endTime - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysElement.innerText = days.toString();
            hoursElement.innerText = hours.toString();
            minutesElement.innerText = minutes.toString();
            secondsElement.innerText = seconds.toString();

            if (distance < 0) {
                clearInterval(intervalId);
                daysElement.innerText = '0';
                hoursElement.innerText = '0';
                minutesElement.innerText = '0';
                secondsElement.innerText = '0';
                localStorage.removeItem('countdownEndTime');
            }
        };

        updateCountdown();
        const intervalId = setInterval(updateCountdown, 1000);
    };

    startCountdown();
};
