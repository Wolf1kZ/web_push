const path = require('path');
const express = require('express');
const webPush = require('web-push');

const app = express();
const PORT = 3000;

// Vapid keys
const publicKey =
  'BLXpdiyjXs1E2DBKahB1GaMh-rY-PKDQh3KoaNn1eMY4JCPSOd6K-1gaWYg-uw1UMRGia_y6drKyPFP3dilqUb8';
const privateKey = 'n5hr1uNnS34Vf0atsOtwuaILSXatmp9z7bqpYe_rsIs';

const subscriptions = [];

webPush.setVapidDetails(
  'mailto:konstantin.zelinsky@effective.band',
  publicKey,
  privateKey
);

app.use(express.json());

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

app.use(express.static(path.join(__dirname, 'client')));

app.get('/subscriptions', (req, res) => {
  res.status(200).json(subscriptions);
});

app.post('/subscribe', (req, res) => {
  const subscription = req.body;

  if (
    subscriptions.findIndex(
      (subscriber) =>
        subscriber.keys.p256h === subscription.keys.p256h &&
        subscriber.keys.auth === subscription.keys.auth
    ) === -1
  ) {
    console.log('Add subscription');
    subscriptions.push(subscription);
  }

  res.status(201).end();
});

app.post('/send-notification', async (req, res) => {
  const payload = JSON.stringify(req.body);

  subscriptions.forEach(async (subscription) => {
    await webPush.sendNotification(subscription, payload);
  });

  res.status(200).end();
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
