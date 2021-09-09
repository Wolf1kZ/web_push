# Web Push Notifications demo app

This project is demo project (backend and frontend sides) for demonstating work of web push notifications.

## Requirements

Installed NodeJS

## Quick Start

In the project directory:

- Install dependecies

```
npm install
```

- Generate your Vapid keys and update them in index.js (backend) file

```
./node_modules/.bin/web-push generate-vapid-keys
```

- Run command for start server

```
npm run dev
```

- Open http://localhost:3000 in your browser

## Notes

- You can check current subscriptions http://localhost:3000/subscriptions

- For send notification you should send post request with notification paload to http://localhost:3000/send-notification

Payload example (JSON)
```
{
  title: 'Push Notification',
  body: 'Content of notification',
  data: 'Data of notification',
  actions: [
    {
      action: 'open',
      title: 'View'
    },
    {
      action: 'close',
      title: 'Close'
    }
  ]
}
```
