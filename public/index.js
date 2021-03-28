// const socket = io.connect('https://x1.hcm-lab.id:8013/');
// const socket = io.connect('http://192.168.100.8:3000/');
const socket = io.connect('https://x1.hcm-lab.id:8013/');

// socket.on('connected', () => {
//   console.log('Socket Connected');
// });

socket.on('connect', () => {
  console.log('Socket Connected');
  // socket.emit('subscribe', {topic: "serial/ve/out/pot"});
});

socket.on('disconnect', () => {
  console.log('Socket Disconnected');
});
