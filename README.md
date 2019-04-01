# meeting-timer

A simple HTML 5 / CSS / JS meeting/countdown timer with an alarm sound implementation.

Works on any modern **Desktop & Mobile** browser.

> Although mobile browsers block automatic sound playback, this timer will have sound capabilities even on mobile browsers.

## Getting started
If you just want to use the meeting timer on your own site clone or download a release of this repository and simply copy the contents of the _dist_ directory to a webroot on your web server. There is no special web server configuation required. All you need to do is host the index.html file.


## Demo
See the timer in action: https://timer.seriousmonkey.de/

## Development
> **Note:** This section is only revelant if you want to build your own version of autover. For simple usage the upper part of this document is all you need.

### Requirements
* NodeJS >= 10.x.x: http://nodejs.org

> The script could also run on older versions of NodeJS, but were never tested with them.

If you want to modify the source to create your own version you have to install all dependencies, first.

```sh
npm install
```
to install all dependencies required to build the project.

### Start a development server run
```sh
npm start
```

You can then open the URL http://localhost:8080/ in your browser.

**Note:** All source code changes will update the site automatically.


### Build
```sh
npm run build
```

This will build the project and put the output into the dist directory.
