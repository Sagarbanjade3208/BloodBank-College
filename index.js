const app = require('./app');
const mongoose = require('mongoose');

app.listen(3000, async () => {
  await mongoose.connect(
    'mongodb+srv://sagarbanjade:sagarbanjade@cluster0.hgpwlgj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  );
  console.log('Connected to MONGODB');
  console.log('Server started at port number 3000');
});
