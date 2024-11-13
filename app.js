const express = require('express');
const app = express();
const postsRoutes = require('./api/posts/posts.routes');
const connectDb = require('./database');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

connectDb();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/media", express.static(path.join(__dirname, "media")));
app.use('/posts', postsRoutes);
app.use(postsRoutes.val);
app.use('*', (req, res, next) => {
  res.status(404).send("Page Not Found");
});

app.listen(8000, () => {
  console.log('The application is running on localhost:8000');
});
