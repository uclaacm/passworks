# Passworks

![Node.js CI Build](https://github.com/uclaacm/passworks/workflows/Node.js%20CI%20Build/badge.svg)
![Lint](https://github.com/uclaacm/passworks/workflows/Lint/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/a10e42ae-1fa7-4282-b932-becd75562b1d/deploy-status)](https://app.netlify.com/sites/stupefied-varahamihira-55e231/deploys)

**Passworks** is one of [ACM Teach LA](https://teachla.uclaacm.com)'s first _learning labs_, a set of interactive online web modules designed to make learning easier. This specific learning lab is focused on **password security**: we teach students about using long and complex passwords, not using common passwords, and a taste of social engineering. We designed the content in conjunction with [ACM Cyber](https://acmcyber.com/). Big thanks to our content lead, Alyssa Wang, and our lead developer, [Jamie Liu](https://github.com/jamieliu386)!

*We wrote a [blog post](https://teachla.uclaacm.com/blog/dev/2020/09/23/the-making-of-passworks/) explaining how this module was made - check it out!*

We ran a beta-test of Passworks with [CityLab at UCLA](https://www.facebook.com/citylabatucla/) for our [Cyber Day with CityLab](https://teachla.uclaacm.com/citylab-cyber) in August 2020.

This project was written with [React](https://reactjs.org/), primarily relying on [Material-UI](https://material-ui.com/) components. We also make use of [react-router](https://reactrouter.com/) and Dropbox's [zxcvbn](https://github.com/dropbox/zxcvbn), as well as a list of the most common passwords from Wikipedia. It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It is deployed with [Netlify](https://www.netlify.com/).

## Development Setup

We'll use a really common Node.js project workflow!

First, let's clone our repository, and install all of our node dependencies:

```
git clone https://github.com/uclaacm/passworks.git
cd passworks
npm install
```

To start our app, you just need to run `npm start`!

```
npm start
```

And to build our project for production (with CRA's webpack bundling and all that goodness),

```
npm run build
```

_Note_: we've added a pre-commit hook (with [husky](https://github.com/typicode/husky)) that runs [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/). Admittedly, our rules are tighter than most, so we recommend you install an IDE plugin to make your development workflow easier.

## Licensing & Attribution

This project and its code are licensed under the MIT License. You're free to use them however you wish, though we'd love to hear from you if you found this useful!
