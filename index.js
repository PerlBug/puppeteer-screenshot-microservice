const express = require('express')
const { takeScreenshot } = require('./screenshot');
const app = express();
const port = 4000;
const { default: PQueue } = require('p-queue');
const bodyParser = require('body-parser');
const queue = new PQueue({ concurrency: 1 });

async function queueScreenshot(url, width, height, waitForId, screenshotId) {
  return queue.add(() => takeScreenshot(url, width, height, waitForId, screenshotId));
}

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

    let screenshot = await queueScreenshot(url, width, height, waitForId, screenshotId);

    return res.end(screenshot, 'binary');
  } catch (err) {
    console.error(err);
    return res.status(500).send(err.toString());
  }
})


app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}...`)
})