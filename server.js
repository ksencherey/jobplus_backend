require ('dotenv').config();

const app = require('./src/app');

const port = process.env.PORT || 4000;


app.get('/', (req, res) => {
  res.send('<h1>Welcome to coding</h1>');
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:port ${port}`);
});