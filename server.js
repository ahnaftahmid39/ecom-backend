require('dotenv/config');
const app = require('./app');
const mongoose = require('mongoose');

const dbAddress = process.env.MONGODB_URL.toString().replace(
  '<password>',
  process.env.DB_PASSWORD
);

mongoose
  .connect(dbAddress, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.error('MongoDB Connection Failed!'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App running on port ${port}!`);
});
