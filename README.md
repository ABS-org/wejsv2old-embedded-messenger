we-messenger
==========

## Usage

```bash
bower install --save we-messenger
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

You can also serve the application localy with `grunt serve`.

```bash
grunt serve
```

## Initialization

After serving the files from the dist folder to your webpage, the WeMessenger must be initialized through the method `initialize()`.

```bash
  WeMessenger.initialize({
    authTokenName: 'wetoken',
    accounts: 'CdP Login Server',
    server: 'CdP Messenger Server'
  });
```