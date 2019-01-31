const CLASSNAME_FA_PLAY = 'fa-play';
//const CLASSNAME_FA_STOP = 'fa-stop';
const CLASSNAME_FA_PAUSE = 'fa-pause';

export default class MeetingTimer {
    constructor() {
        this.soundIntervalHandler = null;
        this.intervalHandler = null;
        this.timerRunning = false;
        this.timerPaused = false;
        this.circleSeconds = 0;
        this.ticks = 0;
        this.snd = new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");        

        this.controls = document.querySelector('.controls-wrapper');
        if (!this.controls) throw ('Error: Controls wrapper not found');

        this.circleWrapper = document.querySelector('.circle-wrapper');
        if (!this.circleWrapper) throw ('Error: Circle wrapper not found');

        this.circleBar = this.circleWrapper.querySelector('.circle-bar');
        if (!this.circleBar) throw ('Error: Circle bar not found');

        this.inputMinutes = this.controls.querySelector('.minutes');
        this.inputSeconds = this.controls.querySelector('.seconds');
        if (!this.inputMinutes || !this.inputSeconds) throw ('Error: Control inputs not found');

        this.goButton = this.controls.querySelector('.btn-go');
        if (!this.goButton) throw ('Error: Go button not found');

        this.goButtonInner = this.goButton.querySelector('span');
        if (!this.goButtonInner) throw ('Error: Go button inner not found');                

        this.clickEvt = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });

        this.goButton.addEventListener('click', () => { 
            if (this.timerRunning) {
                this._pause();
            } else {
                this._init();
                this._beep();
                this._setInputState();
            }
        });    

        this.stopButton = this.controls.querySelector('.btn-stop');
        if (!this.stopButton) throw ('Error: Stop button not found');

        this.stopButton.addEventListener('click', () => {
            this._reset();
        });

        this._reset();
    }

    _beep() {
        this.soundIntervalHandler = window.setInterval(() => {
            this.snd.play();
        }, 1000);
        this.snd.play();
    }

    _pause() {
        this.timerPaused = !this.timerPaused;        
        this._setButtonLabel();
    }

    _setLabelText(mins, secs) {
        this.circleWrapper.setAttribute('data-mins', mins);
        this.circleWrapper.setAttribute('data-secs', this._getTimeText(secs));
    }

    _setButtonLabel() {
        if (this.timerRunning && !this.timerPaused) {
            this.goButtonInner.classList.remove(CLASSNAME_FA_PLAY);
            this.goButtonInner.classList.add(CLASSNAME_FA_PAUSE);            
        } else {
            this.goButtonInner.classList.remove(CLASSNAME_FA_PAUSE);
            this.goButtonInner.classList.add(CLASSNAME_FA_PLAY);
        }
    }

    _setTime() {
        this.mins = parseInt(this.inputMinutes.value, 10) || 0;
        this.secs = parseInt(this.inputSeconds.value, 10) || 0;
    
        if (this.secs > 59) {
            this.secs = 59;
        }

        this.totalSeconds = ((this.mins * 60) + this.secs);
        this.circleSeconds = this.totalSeconds;
    }

    _reset() {
        if (this.intervalHandler) {
            window.clearInterval(this.intervalHandler);
        }

        if (this.soundIntervalHandler) {
            window.clearInterval(this.soundIntervalHandler);
        }

        this.snd.muted = true;

        this._setTime();
        this._setLabelText(this.mins, this.secs);
        this.timerRunning = false;

        this.circleWrapper.classList.remove('timer-running')
        this.circleWrapper.classList.remove('timer-finished');
        this.circleBar.setAttribute('stroke-dasharray', '0, 100');
        this.circleWrapper.setAttribute('data-pct', '100');

        this.goButton.removeAttribute('hidden');

        this._setButtonLabel();
        this._setInputState();
    }

    _calcCircleOffset() {
        const offset = ((this.circleSeconds - this.totalSeconds) / this.circleSeconds) * 100;
        this.circleBar.setAttribute('stroke-dasharray', String(offset) + ', 100');
    }

    _setInputState() {
        if (this.timerRunning) {
            this.inputMinutes.setAttribute('disabled', 'disabled');
            this.inputSeconds.setAttribute('disabled', 'disabled');
        } else {
            this.inputMinutes.removeAttribute('disabled');
            this.inputSeconds.removeAttribute('disabled');
        }
    }

    _stopTimer() {
        if (this.intervalHandler) {
            window.clearInterval(this.intervalHandler);
        }

        this.circleBar.setAttribute('stroke-dasharray', '0, 100');
        this.circleWrapper.classList.remove('timer-running');
        this.circleWrapper.classList.add('timer-finished');

        this.goButton.setAttribute('hidden', '');

        this.snd.muted = false;
    }

    _run() {
        if (!this.timerPaused) {
            this.totalSeconds--;
            const rest = this.totalSeconds % 60;

            if (rest == 59) {
                this.mins--;
            }

            this._setLabelText(this.mins, rest);
            this._calcCircleOffset(this.totalSeconds);

            if (this.mins <= 0 && this.totalSeconds <= 0) {
                this._stopTimer();
                return;
            }

            this.ticks++;
        }        
    }

    _init() {
        if (this.timerRunning) {
            this._pause();
        } else {
            this._setTime();
            this._setLabelText(this.mins, this.secs);
            this.timerRunning = true;
            this._setButtonLabel();
            this.circleWrapper.classList.add('timer-running');

            this.intervalHandler = window.setInterval(() => {
                this._run();
            }, 1000);
        }
    }

    _getTimeText(time) {
        if (time) {
            return (time < 10) ? '0' + time : String(time);
        }

        return '00';
    }
}