// const http = require('http');
const https = require('https');
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const mqtt = require('mqtt');
const MongoClient = require('mongodb').MongoClient;
var URI = "mongodb://hudzaifahrh:kimochi69@x1.hcm-lab.id:27072/shop?authSource=admin";

function getPathObject() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(URI).then(db => {
            var dbo = db.db("shop");
            let aw = [];
                dbo.collection('products').find(
                    {fileType: "gltf"}, {projection: {path: 1}}).forEach(function(result){
                aw.push(result.path);
                console.log(result);
                        });             
            setTimeout(() => {
                resolve(linkpath);
            }, 2000);
        })
    })
}

function getimgPath() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(URI).then(dbimg => {
            var dba = dbimg.db("shop");
            let linkpathimg = [];
                    // console.log(c.name);
                        dba.collection('products').find(
                                {fileType: "gltf"}, {projection: {pathImage: 1}}).forEach(function(result){
                             // console.log(result.path);
                            linkpathimg.push(result.pathImage);
                        });             
            setTimeout(() => {
                resolve(linkpathimg);
            }, 2000);
        })
    })
}

const port = 8056;
const Server = https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
},app);
// const Server = http.createServer(app);
const io = require('socket.io').listen(Server);

//MQTT Settings
var mqtt_host = 'mqtt://x1.hcm-lab.id';
var mqtt_port = 1883;
// var mqtt_user = 've';
// var mqtt_pwd = '8080';

//MQTT Client Options
var mqtt_Options = {
    port : mqtt_port,
    keepalive : 60,
    // username : mqtt_user,
    // password : mqtt_pwd
}

//Routes
const conveyorView = require('./routes/conveyor');
const testView = require('./routes/test');
const armRobotView = require('./routes/arm-robot');
const guiView = require('./routes/gui-robot');
const twenty = require('./routes/twenty');
const onestand = require('./routes/onestand');
const ground = require('./routes/ground');
const skybox = require('./routes/skybox');
const pameran = require('./routes/pameran');
const industrialSimulastion = require('./routes/industry');
//Engine EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));


//Start MQTT
console.log('Starting MQTT...');
var mqtt_client = mqtt.connect(mqtt_host, mqtt_Options);


//Socket MQTT
io.on('connection', socket => {
    getPathObject()
    .then(pathTemp => {
        console.log(pathTemp);
        socket.emit('pathObj', pathTemp);
    })
    .catch(error => {
        console.log(error);
    });
    getimgPath()
    .then(imgTemp => {
        console.log(imgTemp);
        socket.emit('pathImg', imgTemp);
    })
    .catch(error => {
        console.log(error);
    })

    var potTopic = "serial/ve/out/pot";    
    mqtt_client.subscribe(potTopic);
    
    socket.on('lastInput', button => {
        let inputValue = button;
        let inputTopic = "serial/ve/lastinput";
        inputValue = inputValue.toString();
        mqtt_client.publish(inputTopic, inputValue);
        console.log(inputValue);
        
        if(button === true){
            mqtt_client.subscribe(potTopic);
        } else {
            mqtt_client.unsubscribe(potTopic);
            socket.on('sliderBase', value => {
                let baseValue = value;
                let sliderTopic = "serial/ve/out/slider";
                baseValue = baseValue.toString();
                mqtt_client.publish(sliderTopic, baseValue);
                // console.log(baseValue);
            });
        }
    });

    mqtt_client.on('message', (topic, message, packet) => {
        let m = message.toString();
        let data = m.split("?");
        socket.emit('data',data);
        // console.log(data);
    });
    
});


//Controller View
app.use(guiView);
app.use(testView);
app.use(armRobotView);
app.use(conveyorView); 
app.use(ground);
app.use(skybox);
app.use(onestand);
app.use(twenty);
app.use(pameran);
app.use(industrialSimulastion);
//root url harus bawah sendiri

app.use((req,res,next) => {
    res.status(404).render('404', {pageTitle: '404 Error'});
});

Server.listen(port, () => {
    console.log(`Server connected on ${port}`);
});