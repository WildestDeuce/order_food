const express = require('express');

const bodyparser = require('body-parser');

const app = express();

const port = process.env.PORT || 3200;

//middleware

app.use(bodyparser.json());
app.use(bodyparser.urlenconded({ extended:false }));

app.listen(port, () => {
  console.log(`running at port ${port}`)
});
