const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');

const assert = require('assert');
const mongoUri =
  'mongodb+srv://ans:anis123456789@cluster0-4akrb.mongodb.net/test?retryWrites=true&w=majority';
const dataBase = 'contact_db';
const app = express();
app.use(express.json());

MongoClient.connect(mongoUri, { useUnifiedTopology: true }, (err, client) => {
  //   err ? console.log(`can't connect to db`) : console.log('db connected');
  assert.equal(null, err, 'cant connect to db');
  console.log('db connected');
  const dataB = client.db(dataBase);

  app.get('/contacts', (req, res) => {
    dataB
      .collection('contacts')
      .find()
      .toArray((err, data) =>
        err ? console.log(`can't find data`) : res.send(data)
      );
  });
  app.post('/newContact', (req, res) => {
    let newContact = req.body;
    dataB
      .collection('contacts')
      .insertOne(newContact, (err, Sala7) =>
        err ? console.log(`can't add data`) : res.send(Sala7)
      );
  });
  app.delete('/deleteContact/:id', (req, res) => {
    const contact = req.params.id;
    dataB
      .collection('contacts')
      .deleteOne({ _id: ObjectID(contact) }, (err, data) =>
        err ? console.log('cant delete') : res.send(data)
      );
  });
  app.put('/editContact/:id', (req, res) => {
    const id = req.params.id;
    dataB
      .collection('contacts')
      .findOneAndUpdate(
        { _id: ObjectID(id) },
        { $set: req.body },
        (err, data) => (err ? console.log('error editing') : res.send(data))
      );
  });
});

app.listen(6000, err =>
  err ? console.log('Error runnig') : console.log('server runnig in prot 6000')
);
