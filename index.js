const express = require('express')
const { takeScreenshot } = require('./screenshot');
const app = express()
const port = 3000
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('running...')
})

app.post('/', async (req, res) => {
  try {
    const { url, width, height, waitForId, screenshotId } = req.body;
    if (!url) return res.status(400).send('url is required');
    if (!waitForId) return res.status(400).send('waitForId is required');
    if (!screenshotId) return res.status(400).send('screenshotId is required');

    let screenshot = await takeScreenshot(url, width, height, waitForId, screenshotId);

    return res.end(screenshot, 'binary');
  } catch (err) {
    console.error(err);
    return res.status(500).send(err.toString());
  }
})


app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}...`)
})