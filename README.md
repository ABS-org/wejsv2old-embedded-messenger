we-messenger
==========

# Old version! for We.js v0.2.x ,see https://github.com/wejs/we-client-emberjs-messenger for new client side APP

## Usage

```bash
git clone git@github.com:wejs/we-messenger.git
```

## Developing

After cloning repository, install library dependencies.

```bash
npm install
bower install
```

Then build with `grunt`.

```bash
grunt
```

You can serve the application locally with `grunt serve`.

```bash
grunt serve
```

## Initialization

After serving the files from the dist folder to your webpage, the WeMessenger must be initialized through the `initialize()` method.

```bash
WeMessenger.initialize({
  authTokenName: 'wetoken', // Cookie's name that holds token for authenticated users
  accounts: 'CdP oAuth Server', // CdP oAuth server i.e: 'https://perfis.atencaobasica.org.br/'
  server: 'CdP Messenger Server' // CdP messenger server i.e: 'https://novo.atencaobasica.org.br/'
});
```

There's one other parameters allowed to speed up development locally. If you have the authentication token value to grant access to the application you can pass it in directly through `wetoken` option.

```bash
WeMessenger.initialize({
  wetoken: 'ac178fe59e15d20d8836cdc81520206d56a1b63ee21b9be1af', // Authenticated token
  accounts: 'CdP oAuth Server', // CdP oAuth server i.e: 'https://perfis.atencaobasica.org.br/'
  server: 'CdP Messenger Server' // CdP messenger server i.e: 'https://novo.atencaobasica.org.br/'
});
```
