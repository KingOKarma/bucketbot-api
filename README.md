# Bucketbot API
This is a API written in [Typescript(4.0)](https://www.typescriptlang.org/)

## Setup
How to setup and use this API

### Config
Copy ``config.example.json`` and rename it to ``config.json``


```
{
    "ExpressPort": 8080,
    "mongoUrl": "mongodb://localhost/bucket-bot",
    "discord": {
        "token": "",
        "oAuth": {
            "clientID": "",
            "clientSecret": "",
            "redirectURL": "",
            "scopes": [
                "identify",
                "email",
                "guilds"
            ]
        }
    }
}
```

### Usage
Install packages ``yarn`` or ``npm i``


Run it using one of the scripts defined in `package.json` e.g. `yarn dev`

```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "tsc",
    "dev": "tsc && node dist/app"
  }
````
