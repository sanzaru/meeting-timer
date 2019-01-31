import MeetingTimer from './meetingTimer.js';

const initNumberPickers = () => {
    const picker = document.querySelectorAll('.number-picker');
    for(let i=0, len=picker.length; i<len; i++) {
        const upControl = picker[i].querySelector('.number-picker-up');
        const downControl = picker[i].querySelector('.number-picker-down');
        const input = picker[i].querySelector('input');

        upControl.addEventListener('click', () => {
            let val = parseInt(input.value, 10) || 0;

            if (val < 99) {
                val += 1;
                input.value = val;
            }            
        });

        downControl.addEventListener('click', () => {
            let val = parseInt(input.value, 10) || 0;
            if (val > 0) {
                val -= 1;
                input.value = val;
            }            
        });
    }
}


((document, undefined) => {
    try {
        initNumberPickers();
        new MeetingTimer();
    } catch (e) {
        console.log(e);
    }
})(document);
