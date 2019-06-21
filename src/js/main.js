import MeetingTimer from './meetingTimer.js';
import SettingsController from './settingsController.js';

const settingsCacheKey = 'meeting-timer-settings';

const initNumberPickers = () => {
  const picker = document.querySelectorAll('.number-picker');
  for (let i = 0, len = picker.length; i < len; i++) {
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
};

((document, undefined) => {
  try {
    const meetingTimer = new MeetingTimer();
    const settingsController = new SettingsController(
      meetingTimer,
      settingsCacheKey
    );

    initNumberPickers();
    meetingTimer.loadSettings(settingsController.getSettings());
  } catch (e) {
    console.log(e);
  }
})(document);
