# puppeteer-screenshot-microservice
A simple express based micro-service that generates a screenshot of a URL with a specified dimension. 

### Usage
Clone repo and change into the repo directory

```sh
$ npm install
$ npm start
```


There are 2 routes available. The default port is 3000

| Endpoint | Usage                                                            |
| -------- | ---------------------------------------------------------------- |
| GET /    | This will return status 200 and witht he message 'running...'    |
| POST /   | This route generates the screenshot and sends it as a PNG image. |

