const publickKey =
  'BLXpdiyjXs1E2DBKahB1GaMh-rY-PKDQh3KoaNn1eMY4JCPSOd6K-1gaWYg-uw1UMRGia_y6drKyPFP3dilqUb8';

const messageContainer = document.getElementById(message);

const registerWorker = async () => {
  const worker = await navigator.serviceWorker.register('/sw.js');

  const subscription = await worker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publickKey,
  });

  await fetch('http://localhost:3000/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json',
    },
  });
};

const init = async () => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.addEventListener('message', (event) => {
      console.log(event);

      message.innerText = event.data.msg;

      setTimeout(() => {
        message.innerText = '';
      }, 5000);
    });

    try {
      await registerWorker();
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log('Push Notifications are not supported');
  }
};

init();
