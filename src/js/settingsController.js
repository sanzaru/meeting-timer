const defaultSettings = {
  countAlarm: 0
};

export default class SettingsController {
  constructor(meetingTimer, cacheKey) {
    const settingsToggle = document.querySelector('.settings-toggle');
    if (settingsToggle) {
      settingsToggle.addEventListener('click', event => {
        if (!this.container.classList.contains('in')) {
          this.container.classList.add('in');
        }
      });
    }

    this.settingsCacheKey = cacheKey;
    if (!this.settingsCacheKey) {
      throw new Error('SettingsController: No cache key given.');
    }
    this.container = document.querySelector('.settings-container');
    if (!this.container) {
      throw new Error('SettingsController: Cannot find container node.');
    }

    this.form = this.container.querySelector('.settings-form');
    if (!this.form) {
      throw new Error('SettingsController: Cannot find form node.');
    }

    this.form.addEventListener('submit', event => {
      event.preventDefault();
      this.saveSettings();
      return false;
    });

    this.timer = meetingTimer;
    if (!this.timer) {
      throw new Error('SettingsController: No timer set.');
    }

    this.settings = defaultSettings;
    this._loadSettings();
  }

  // Private  methods
  _loadSettings() {
    if (!!window.localStorage) {
      const cachedSettings = window.localStorage.getItem(this.settingsCacheKey);

      if (cachedSettings) {
        const json = JSON.parse(cachedSettings);
        if (json) {
          for (let key in json) {
            if (this.settings.hasOwnProperty(key)) {
              this.settings[key] = json[key];
            }
          }
        }
      }
    }

    for (let key in this.settings) {
      const input = this.form.querySelector(`input[name="${key}"]`);
      if (input) {
        input.value = this.settings[key];
      }
    }
  }

  // Public methods
  getSettings() {
    return this.settings;
  }

  saveSettings() {
    if (!!window.localStorage) {
      const inputs = this.form.querySelectorAll('input');
      if (inputs) {
        inputs.forEach(input => {
          const name = input.getAttribute('name');
          if (name && this.settings.hasOwnProperty(name)) {
            this.settings[name] = input.value;
          }
        });
      }

      window.localStorage.setItem(
        this.settingsCacheKey,
        JSON.stringify(this.settings)
      );
      this.timer.loadSettings(this.settings);
      this.container.classList.remove('in');
    }

    return false;
  }
}
