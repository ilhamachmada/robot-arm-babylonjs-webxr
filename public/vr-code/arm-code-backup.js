BABYLON.DefaultLoadingScreen.prototype.displayLoadingUI = function () {
    if (document.getElementById("customLoadingScreenDiv")) {
        // Do not add a loading screen if there is already one
        document.getElementById("customLoadingScreenDiv").style.display = "initial";
        return;
    }
    this._loadingDiv = document.createElement("div");
    this._loadingDiv.id = "customLoadingScreenDiv";
    this._loadingDiv.style.position = "absolute";
    this._loadingDiv.style.left = "50%";
    this._loadingDiv.style.top = "50%"
    this._loadingDiv.style.fontFamily = "Arial";
    this._loadingDiv.innerHTML = "Please Wait...";
    var customLoadingScreenCss = document.createElement('style');
    customLoadingScreenCss.type = 'text/css';
    customLoadingScreenCss.innerHTML = `
    #customLoadingScreenDiv{
        background-color: #000000cc;
        color: white;
        font-size:30px;
        text-align:center;
    }
    `;
    document.getElementsByTagName('head')[0].appendChild(customLoadingScreenCss);
    this._resizeLoadingUI();
    window.addEventListener("resize", this._resizeLoadingUI);
    document.body.appendChild(this._loadingDiv);
};

BABYLON.DefaultLoadingScreen.prototype.hideLoadingUI = function(){
    document.getElementById("customLoadingScreenDiv").style.display = "none";
    console.log("scene is now loaded");
}

var createScene = async function() {
engine.displayLoadingUI();
//=================SCENE==================================
var scene = new BABYLON.Scene(engine);
scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0));
scene.getPhysicsEngine().setTimeStep(0.25 / 60);
//=========================================================


//=================CAMERA===============
var camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 1.6, -7), scene);
camera.speed = 0.4
camera.checkCollisions = true;
camera.applyGravity = true;
camera.attachControl(canvas, true);
scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
//=========================================================

//================LIGHTS===============
var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    light1.intensity = 1;
//=========================================================


//=================GROUND===============
var ground = BABYLON.Mesh.CreateGround("ground", 40, 40, 40, scene);
ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.PlaneImpostor, {mass: 0, friction: 0.5, restitution: 0.7}, scene);
var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("assets/ground/industryfloor2.jpg", scene);
    groundMaterial.diffuseTexture.uScale = 6;
    groundMaterial.diffuseTexture.vScale = 6;
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    ground.material = groundMaterial;
    ground.receiveShadows = true;
    ground.checkCollisions = true;
    ground.isPickable = false
    
// Skybox
var skybox = BABYLON.Mesh.CreateBox("wall", 40, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("wall", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/textures/wall/wall", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;
        skybox.checkCollisions = true;
        skybox.isPickable = false;

// generate random boxes and its position
var box1 = BABYLON.Mesh.CreateBox("box1", 1, scene);
    box1.position = new BABYLON.Vector3(5, 0.5, 0);
    box1.physicsImpostor = new BABYLON.PhysicsImpostor(box1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
    box1.checkCollisions = true;
var box2 = BABYLON.Mesh.CreateBox("box2", 1, scene);
    box2.position = new BABYLON.Vector3(-5, 0.5, 0); 
    box2.physicsImpostor = new BABYLON.PhysicsImpostor(box2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene); 
    box2.checkCollisions = true;  
var box3 = BABYLON.Mesh.CreateBox("box3", 1, scene);
    box3.position = new BABYLON.Vector3(0, 0.5, 5);  
    box3.physicsImpostor = new BABYLON.PhysicsImpostor(box3, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
    box3.checkCollisions = true;     
var box4 = BABYLON.Mesh.CreateBox("box4", 1, scene);
    box4.position = new BABYLON.Vector3(0, 0.5, -5);   
    box4.physicsImpostor = new BABYLON.PhysicsImpostor(box4, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
    box4.checkCollisions = true;
var boxx1 = BABYLON.Mesh.CreateBox("boxx1", 1, scene);
    boxx1.position = new BABYLON.Vector3(-9, 0.5, -9);   
    boxx1.physicsImpostor = new BABYLON.PhysicsImpostor(boxx1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
    boxx1.checkCollisions = true;
var boxx2 = BABYLON.Mesh.CreateBox("boxx1", 1, scene);
    boxx2.position = new BABYLON.Vector3(-9, 1, -9);   
    boxx2.physicsImpostor = new BABYLON.PhysicsImpostor(boxx2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
    boxx2.checkCollisions = true;
var boxx3 = BABYLON.Mesh.CreateBox("boxx3", 1, scene);
    boxx3.position = new BABYLON.Vector3(-9, 3, -9);   
    boxx3.physicsImpostor = new BABYLON.PhysicsImpostor(boxx3, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
    boxx3.checkCollisions = true;
var boxx4 = BABYLON.Mesh.CreateBox("boxx1", 1, scene);
    boxx4.position = new BABYLON.Vector3(-8, 0.5, -9);   
    boxx4.physicsImpostor = new BABYLON.PhysicsImpostor(boxx4, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
    boxx4.checkCollisions = true;
var boxx5 = BABYLON.Mesh.CreateBox("boxx1", 1, scene);
    boxx5.position = new BABYLON.Vector3(-8, 1, -9);   
    boxx5.physicsImpostor = new BABYLON.PhysicsImpostor(boxx5, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
    boxx5.checkCollisions = true;
var boxx6 = BABYLON.Mesh.CreateBox("boxx3", 1, scene);
    boxx6.position = new BABYLON.Vector3(-8, 3, -9);   
    boxx6.physicsImpostor = new BABYLON.PhysicsImpostor(boxx6, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
    boxx6.checkCollisions = true;
var boxx7 = BABYLON.Mesh.CreateBox("boxx1", 1, scene);
    boxx7.position = new BABYLON.Vector3(-9, 0.5, -7.7);   
    boxx7.physicsImpostor = new BABYLON.PhysicsImpostor(boxx7, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
    boxx7.checkCollisions = true;
var boxx8 = BABYLON.Mesh.CreateBox("boxx1", 1, scene);
    boxx8.position = new BABYLON.Vector3(-9, 1, -7.7);   
    boxx8.physicsImpostor = new BABYLON.PhysicsImpostor(boxx8, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
    boxx8.checkCollisions = true;
var boxx9 = BABYLON.Mesh.CreateBox("boxx3", 1, scene);
    boxx9.position = new BABYLON.Vector3(-9, 3, -7.7);   
    boxx9.physicsImpostor = new BABYLON.PhysicsImpostor(boxx9, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
    boxx9.checkCollisions = true;
var boxMaterial = new BABYLON.StandardMaterial("boxMat1", scene);
    boxMaterial.diffuseTexture = new BABYLON.Texture("assets/crate/crate2.png", scene);
var boxMaterial1 = new BABYLON.StandardMaterial("box2", scene);
    boxMaterial1.diffuseTexture = new BABYLON.Texture("assets/crate/crate.png", scene);
var boxMaterial = new BABYLON.StandardMaterial("ground", scene);
    boxMaterial.diffuseTexture = new BABYLON.Texture("assets/crate/crate.png", scene);
    box1.material = boxMaterial;
    box2.material = boxMaterial;
    box3.material = boxMaterial;
    box4.material = boxMaterial;
    boxx1.material = boxMaterial1;
    boxx2.material = boxMaterial1;
    boxx3.material = boxMaterial1;
    boxx4.material = boxMaterial1;
    boxx5.material = boxMaterial1;
    boxx6.material = boxMaterial1;
    boxx7.material = boxMaterial1;
    boxx8.material = boxMaterial1;
    boxx9.material = boxMaterial1;
//=========================================================

//=================BORDER================
var border0 = BABYLON.Mesh.CreateBox("border0", 1, scene);
    border0.scaling = new BABYLON.Vector3(1, 40, 40);
    border0.position.x = -19.0;
    border0.physicsImpostor = new BABYLON.PhysicsImpostor(border0, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    border0.checkCollisions = true;
    border0.isVisible = false;
    border0.isPickable = false;

    var border1 = BABYLON.Mesh.CreateBox("border1", 1, scene);
    border1.scaling = new BABYLON.Vector3(1, 40, 40);
    border1.position.x = 19.0;
    border1.physicsImpostor = new BABYLON.PhysicsImpostor(border1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    border1.checkCollisions = true;
    border1.isVisible = false;
    border1.isPickable = false;

    var border2 = BABYLON.Mesh.CreateBox("border2", 1, scene);
    border2.scaling = new BABYLON.Vector3(40, 40, 1);
    border2.position.z = 19.0;
    border2.physicsImpostor = new BABYLON.PhysicsImpostor(border2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    border2.checkCollisions = true;
    border2.isVisible = false;
    border2.isPickable = false;

    var border3 = BABYLON.Mesh.CreateBox("border3", 1, scene);
    border3.scaling = new BABYLON.Vector3(40, 40, 1);
    border3.position.z = -19.0;
    border3.physicsImpostor = new BABYLON.PhysicsImpostor(border3, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    border3.checkCollisions = true;
    border3.isVisible = false;
    border3.isPickable = false;
//========================================================

//=====================Db object and img===================
let arrObj = [];
let arrImg = [];
let arrScene = [];
let arrSceneName = [];
let arrQuestion = [];
socket.on('pathobj', data => {
    data.forEach(c => {
        arrObj.push(c);
    });
});
socket.on('pathImg', data => {
    data.forEach(c => {
        arrImg.push(c);
    });
});
socket.on('pathScene', data => {
    data.forEach(c => {
        arrScene.push(c);
    });
});
socket.on('sceneName', data => {
    data.forEach(c => {
        arrSceneName.push(c);
    })
});
socket.on('question', data => {
    data.forEach(c => {
        arrQuestion.push(c);
    });
});

//=========================================================

//=============MESH SETUP=====================================================================================================================
    BABYLON.SceneLoader.ImportMesh("", "assets/arm-robot/", "arm-robot.babylon", scene, function (newMeshes, particleSystem, skeletons) {
            var base = newMeshes[0];
            base.position.y = 0.25;
            var mesh = newMeshes[1];
            mesh.rotation = new BABYLON.Vector3(89.50, 0, 0);
            mesh.checkCollisions = true;
           // mesh.physicsImpostor = new BABYLON.PhysicsImpostor(mesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.1 }, scene);

            var mesh1 = newMeshes[2];
            mesh1.rotation = new BABYLON.Vector3(0, 92.65, -0.6);
            mesh1.checkCollisions = true;
           // mesh1.physicsImpostor = new BABYLON.PhysicsImpostor(mesh1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);

            var mesh2 = newMeshes[3];
            mesh2.rotation = new BABYLON.Vector3(0 ,0 ,0.2);
            mesh2.checkCollisions = true;
          //  mesh2.physicsImpostor = new BABYLON.PhysicsImpostor(mesh2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);

            var mesh3 = newMeshes[4];
            mesh3.rotation = new BABYLON.Vector3(-89.6 ,0 ,89.6);
            mesh3.checkCollisions = true;
           // mesh3.physicsImpostor = new BABYLON.PhysicsImpostor(mesh3, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);

            var mesh4 = newMeshes[5]; //left grip
            mesh4.rotation =  new BABYLON.Vector3(89.5, 0, 0.5);
            mesh4.checkCollisions = true;
            
           // mesh4.physicsImpostor = new BABYLON.PhysicsImpostor(mesh4, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);

            var mesh5 = newMeshes[6]; //right grip
            mesh5.rotation = new BABYLON.Vector3(-89.5, 0, 91.5);
            mesh5.checkCollisions = true;
            //mesh5.physicsImpostor = new BABYLON.PhysicsImpostor(mesh5, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
	
            var meshMaterial = new BABYLON.StandardMaterial("ground", scene);
            meshMaterial.diffuseTexture = new BABYLON.Texture("assets/arm-robot/yellow.jpg", scene);
            base.material = meshMaterial;
            mesh.material = meshMaterial;
            mesh1.material = meshMaterial;
            mesh2.material = meshMaterial;
            mesh3.material = meshMaterial;
            mesh4.material = meshMaterial;
            mesh5.material = meshMaterial;

            //Socket Data From Server.js
                socket.on('data', data => {
                    if(data){
                    mesh.rotation.y = (data[0]/180)*Math.PI;
                    mesh1.rotation.z = (data[2]/105);
                    mesh2.rotation.z = -(data[1]/100*Math.PI);
                    }     
                });

            
            base.isPickable = false;
            mesh.isPickable = false;
            mesh1.isPickable = false;
            mesh2.isPickable = false;
            mesh3.isPickable = false;
            mesh4.isPickable = false;
            mesh5.isPickable = false;
            //SLIDER
            var plane = BABYLON.Mesh.CreatePlane("plane", 5);
            plane.position = new BABYLON.Vector3(-4, 4, -1);
            var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);
                var panel = new BABYLON.GUI.StackPanel();
                panel.width = "220px";
                panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
                panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
                advancedTexture.addControl(panel);

            var header = new BABYLON.GUI.TextBlock();
                header.text = "Base";
                header.height = "30px";
                header.color = "white";
                panel.addControl(header); 

            var slider = new BABYLON.GUI.Slider();
                slider.minimum = 0;
                slider.maximum = 1 * Math.PI;
                slider.value = 0;
                slider.height = "20px";
                slider.width = "200px";
                slider.onValueChangedObservable.add(function(value) {
                    socket.emit('sliderBase', value);
                    socket.emit('lastInput', false);
                        if (mesh) {
                            mesh.rotation.y = value;
                        }
                });
                slider.onPointerOutObservable.add(function(){
                        
                    setTimeout(function(){
                        socket.emit('lastInput', true);
                        // socket.emit('subscribe', {topic: "serial/ve/out/pot"});
                    }, 5000);
                    
                });
                panel.addControl(slider);
                var header2 = new BABYLON.GUI.TextBlock();
                header2.text = "Joint 1";
                header2.height = "30px";
                header2.color = "white";
                panel.addControl(header2); 

            var slider2 = new BABYLON.GUI.Slider();
                slider2.minimum = -0.6;
                slider2.maximum = 3;
                slider2.value = 0;
                slider2.height = "20px";
                slider2.width = "200px";
                slider2.onValueChangedObservable.add(function(value) {
                    socket.emit('sliderJoint1', value);
                    socket.emit('lastInput', true);
                    if (mesh1) {
                        mesh1.rotation.z = value;
                    }
                });
                panel.addControl(slider2);    

            var header3 = new BABYLON.GUI.TextBlock();
                header3.text = "Joint 2";
                header3.height = "30px";
                header3.color = "white";
                panel.addControl(header3); 

            var slider3 = new BABYLON.GUI.Slider();
                slider3.minimum = 0;
                slider3.maximum = 1 * Math.PI;
                slider3.value = 0;
                slider3.height = "20px";
                slider3.width = "200px";
                slider3.onValueChangedObservable.add(function(value) {
                    socket.emit('sliderJoint2', value);
                    socket.emit('lastInput', true);
                    if (mesh2) {
                        mesh2.rotation.z = -value;
                    }
                });
                panel.addControl(slider3);
                
            var header4 = new BABYLON.GUI.TextBlock();
                header4.text = "Joint 3";
                header4.height = "30px";
                header4.color = "white";
                panel.addControl(header4); 

            var slider4 = new BABYLON.GUI.Slider();
                slider4.minimum = -3;
                slider4.maximum = 0.5;
                slider4.value = 0;
                slider4.height = "20px";
                slider4.width = "200px";
                slider4.onValueChangedObservable.add(function(value) {
                // header4.text = "Arm: " + (BABYLON.Tools.ToDegrees(value) | 0) +" derajat";
                    if (mesh3) {
                        mesh3.rotation.x = value;
                        mesh3.rotation.y = 89.6;
                        mesh3.rotation.z = 0;
                    }
                });
                panel.addControl(slider4);  

                

                var header5 = new BABYLON.GUI.TextBlock();
                header5.text = "Grip";
                header5.height = "30px";
                header5.color = "white";
                panel.addControl(header5); 

                var checkbox = new BABYLON.GUI.Checkbox();
                checkbox.width = "20px";
                checkbox.height = "20px";
                checkbox.isChecked = true;
                checkbox.color = "green";
                checkbox.onIsCheckedChangedObservable.add(function(newMeshes){
                    if (newMeshes) {
                        mesh4.rotation =  new BABYLON.Vector3(89.5, 0, -0.5);
                        mesh5.rotation = new BABYLON.Vector3(-89.5, 0, 90.5);
                    }
                    else{
                        mesh4.rotation =  new BABYLON.Vector3(89.5, 0, 0.5);
                        mesh5.rotation = new BABYLON.Vector3(-89.5, 0, 91.5);
                    }
                });
                panel.addControl(checkbox);
                
                setTimeout(() => {
                    engine.hideLoadingUI();
                }, 15000);
            }, 
            function (evt) {
                // onProgress
                var loadedPercent = 0;
                if (evt.lengthComputable) {
                    loadedPercent = (evt.loaded * 100 / evt.total).toFixed();
                } else {
                    var dlCount = evt.loaded / (1024 * 1024);
                    loadedPercent = Math.floor(dlCount * 100.0) / 100.0;
                }
                // assuming "loadingScreenPercent" is an existing html element
                document.getElementById("customLoadingScreenDiv").innerHTML = "Please wait while scene is loading..." + "<br>" + loadedPercent + "%";
            }); 


//======================3DGUI==============================================
            var manager = new BABYLON.GUI.GUI3DManager(scene);

            var panel = new BABYLON.GUI.CylinderPanel();
            panel.margin = 0.1;
            panel.radius = 5;
            panel.columns = 5;
            manager.addControl(panel);
            // panel.position.x = camera.position.x;
            // panel.position.y = camera.position.y-1;
            // panel.position.z = camera.position.z-3;

            var button1 = new BABYLON.GUI.HolographicButton("orientation1");
            panel.addControl(button1);
            panel.scaling.x = 0.4;
            panel.scaling.y = 0.4;
            // button1.text = "3D Library";
            button1.imageUrl = "/assets/icon/download.png";
            button1.onPointerUpObservable.add(() => {
                tvBox.position.x = panel.position.x-1.3;
                tvBox.position.y = panel.position.y+1;
                tvBox.position.z = panel.position.z+5;
                imagePlane.position.x = panel.position.x-1.3;
                imagePlane.position.y = panel.position.y+1.2;
                imagePlane.position.z = panel.position.z+4.98;
                plane3.position.x = panel.position.x-1.85;
                plane3.position.y = panel.position.y+0.5;
                plane3.position.z = panel.position.z+4.43;
                tvBox.isVisible = !tvBox.isVisible;
                imagePlane.isVisible = !imagePlane.isVisible;
                plane3.isVisible = !plane3.isVisible;
            })
            button1.isVisible = false;

            var button2 = new BABYLON.GUI.HolographicButton("orientation2");
            panel.addControl(button2);
            panel.scaling.x = 0.4;
            panel.scaling.y = 0.4;
            // button2.text = "Screenshot";
            button2.imageUrl = "/assets/icon/reload.png"
            button2.onPointerUpObservable.add(() => {
                BABYLON.Tools.CreateScreenshot(engine, camera, {precision: 2});
            });
            button2.isVisible = false;

            var button3 = new BABYLON.GUI.HolographicButton("orientation3");
            panel.addControl(button3);
            panel.scaling.x = 0.4;
            panel.scaling.y = 0.4;
            button3.onPointerUpObservable.add(() => {
                tvBoxQuestion.position.x = panel.position.x;
                tvBoxQuestion.position.y = panel.position.y+1;
                tvBoxQuestion.position.z = panel.position.z+6;
                imagePlaneQuestion.position.x = panel.position.x;
                imagePlaneQuestion.position.y = panel.position.y+1.6;
                imagePlaneQuestion.position.z = panel.position.z+5.978;
                plane3Question.position.x = panel.position.x;
                plane3Question.position.y = panel.position.y+0.5;
                plane3Question.position.z = panel.position.z+5.978;
                tvBoxQuestion.isVisible = !tvBoxQuestion.isVisible;
                imagePlaneQuestion.isVisible = !imagePlaneQuestion.isVisible;
                plane3Question.isVisible = !plane3Question.isVisible;
            });
            button3.imageUrl = "/assets/icon/test-quiz.png"
            button3.isVisible = false;

            var button4 = new BABYLON.GUI.HolographicButton("orientation4");
            panel.addControl(button4);
            panel.scaling.x = 0.4;
            panel.scaling.y = 0.4;
            // button4.text = "D";
            button4.imageUrl = "/assets/icon/transform.png";
            button4.onPointerUpObservable.add(() => {
                gizmoManager.boundingBoxGizmoEnabled = !gizmoManager.boundingBoxGizmoEnabled;
            })
            button4.isVisible = false;

            var button5 = new BABYLON.GUI.HolographicButton("orientation5");
            panel.addControl(button5);
            panel.scaling.x = 0.4;
            panel.scaling.y = 0.4;
            // button5.text = "E";
            button5.imageUrl = "/assets/icon/script.png";
            button5.onPointerUpObservable.add(() => {
                tvBoxScript.position.x = panel.position.x+1.3;
                tvBoxScript.position.y = panel.position.y+1;
                tvBoxScript.position.z = panel.position.z+5;
                imagePlaneScript.position.x = panel.position.x+1.3;
                imagePlaneScript.position.y = panel.position.y+1.12;
                imagePlaneScript.position.z = panel.position.z+4.98;
                plane3Script.position.x = panel.position.x+1;
                plane3Script.position.y = panel.position.y+0.8;
                plane3Script.position.z = panel.position.z+5.27;
                tvBoxScript.isVisible = !tvBoxScript.isVisible;
                imagePlaneScript.isVisible = !imagePlaneScript.isVisible;
                plane3Script.isVisible = !plane3Script.isVisible;
            }); 
            button5.isVisible = false;

//=========================================================================
//======================XRHelper===========================================
let teleportMaterial = new BABYLON.StandardMaterial("teleport", scene);
teleportMaterial.backFaceCulling = false;
teleportMaterial.diffuseColor = BABYLON.Color3.Red();
// teleportMaterial.diffuseTexture = new BABYLON.Texture('/assets/biru.png', scene);


const xrHelper = await scene.createDefaultXRExperienceAsync({
    floorMeshes: [ground]
});

const fm = xrHelper.baseExperience.featuresManager;

const xrTeleportation = fm.enableFeature(BABYLON.WebXRFeatureName.TELEPORTATION, 'stable' /* or latest */, {
        xrInput: xrHelper.input,
        floorMeshes: [ground],
        defaultTargetMeshOptions: {
            torusArrowMaterial: teleportMaterial,
            teleportationFillColor: '#035bff',
            teleportationBorderColor: 'red'
        }
    });

const xrPhysics = fm.enableFeature(BABYLON.WebXRFeatureName.PHYSICS_CONTROLLERS, "latest", {
    xrInput: xrHelper.input,
    physicsProperties: {
        restitution: 0.5,
        impostorSize: 0.1,
        impostorType: BABYLON.PhysicsImpostor.BoxImpostor
    },
    enableHeadsetImpostor: true
});

xrHelper.input.onControllerAddedObservable.add((controller) => {
    controller.onMotionControllerInitObservable.add((motionController) => {
        if (motionController.handness === 'left') {
            const xButton = motionController.getComponent("x-button");
            if(xButton){
                xButton.onButtonStateChangedObservable.add(() => {
                    if(xButton.changes.pressed){
                        if(xButton.pressed){
                        panel.position.x = scene.activeCamera.position.x;
                        panel.position.y = scene.activeCamera.position.y-1;
                        panel.position.z = scene.activeCamera.position.z-3;
                        button1.isVisible = !button1.isVisible;
                        button2.isVisible = !button2.isVisible;
                        button3.isVisible = !button3.isVisible;
                        button4.isVisible = !button4.isVisible;
                        button5.isVisible = !button5.isVisible;
                        tvBox.isVisible = false;
                        imagePlane.isVisible = false;
                        plane3.isVisible = false;
                        tvBoxScript.isVisible = false;
                        imagePlaneScript.isVisible = false;
                        plane3Script.isVisible = false;
                        tvBoxQuestion.isVisible = false;
                        imagePlaneQuestion.isVisible = false;
                        plane3Question.isVisible = false;
                        }
                    }
                })
            }
            // const yButton = motionController.getComponent("y-button");
            // if(yButton){
            //     yButton.onButtonStateChangedObservable.add(() => {
            //         if(yButton.changes.pressed){
            //             if(yButton.pressed){
            //                 gizmoManager.boundingBoxGizmoEnabled = !gizmoManager.boundingBoxGizmoEnabled;
            //             }
            //         }
            //     });
            // }
        }
    })
})

 // Initialize GizmoManager
 var gizmoManager = new BABYLON.GizmoManager(scene)
 gizmoManager.boundingBoxGizmoEnabled = false;

//Keyboard Button Input
document.onkeydown = (e)=>{
    if(e.key == 'f'){
        console.log(scene.activeCamera.position.x + " " + scene.activeCamera.position.y + " " + scene.activeCamera.position.z);
        // console.log("x: " + camera.rotation.x + " y: " + camera.rotation.y + " z: " + camera.rotation.z); 
                    panel.position.x = camera.position.x;
                    panel.position.y = scene.activeCamera.position.y-1;
                    panel.position.z = scene.activeCamera.position.z-3;
                    button1.isVisible = true;
                    button2.isVisible = true;
                    button3.isVisible = true;
                    button4.isVisible = true;
                    button5.isVisible = true;
    }

    if(e.key == 'r'){
        button1.isVisible = false;
        button2.isVisible = false;
        button3.isVisible = false;
        button4.isVisible = false;
        button5.isVisible = false;
        tvBox.isVisible = false;
        imagePlane.isVisible = false;
        plane3.isVisible = false;
        tvBoxScript.isVisible = false;
        imagePlaneScript.isVisible = false;
        plane3Script.isVisible = false;
        tvBoxQuestion.isVisible = false;
        imagePlaneQuestion.isVisible = false;
        plane3Question.isVisible = false;
    }

    if(e.key == 't'){
        gizmoManager.boundingBoxGizmoEnabled = !gizmoManager.boundingBoxGizmoEnabled;
    }
}
//=========================================================================

// BABYLON.SceneLoader.ImportMesh("", "assets/conveyor/", "conveyor.babylon", scene, function (newMeshesC, particleSystemC, skeletonsC) {
//     var conveyor = newMeshesC[0];
//     conveyor.position = new BABYLON.Vector3(4,0,6);
//     conveyor.checkCollisions = true;
// });
// BABYLON.SceneLoader.ImportMesh("", "assets/conveyor/", "conveyor.babylon", scene, function (newMeshesCC, particleSystemCC, skeletonsCC) {
//     var conveyorc = newMeshesCC[0];
//     conveyorc.position = new BABYLON.Vector3(4,0,4);
//     conveyorc.checkCollisions = true;
// });
// BABYLON.SceneLoader.ImportMesh("", "assets/conveyor/", "conveyor.babylon", scene, function (newMeshesCC, particleSystemCC, skeletonsCC) {
//     var conveyorc = newMeshesCC[0];
//     conveyorc.position = new BABYLON.Vector3(4,0,8);
//     conveyorc.checkCollisions = true;
// });
// BABYLON.SceneLoader.ImportMesh("", "assets/conveyor/", "conveyor.babylon", scene, function (newMeshesCC, particleSystemCC, skeletonsCC) {
//     var conveyorc = newMeshesCC[0];
//     conveyorc.position = new BABYLON.Vector3(4,0,2);
//     conveyorc.checkCollisions = true;
// });
// BABYLON.SceneLoader.ImportMesh("", "assets/conveyor//", "conveyor.babylon", scene, function (newMeshesCC, particleSystemCC, skeletonsCC) {
//     var conveyorc = newMeshesCC[0];
//     conveyorc.position = new BABYLON.Vector3(4,0,0);
//     conveyorc.checkCollisions = true;
// });
// BABYLON.SceneLoader.ImportMesh("", "assets/conveyor/", "conveyor.babylon", scene, function (newMeshesCC, particleSystemCC, skeletonsCC) {
//     var conveyorc = newMeshesCC[0];
//     conveyorc.position = new BABYLON.Vector3(-6.5,0,0);
//     conveyorc.rotation = new BABYLON.Vector3(0,11,0);
//     conveyorc.checkCollisions = true;
// });
// BABYLON.SceneLoader.ImportMesh("", "assets/conveyor/", "conveyor.babylon", scene, function (newMeshesCC, particleSystemCC, skeletonsCC) {
//     var conveyorc = newMeshesCC[0];
//     conveyorc.position = new BABYLON.Vector3(-8.5,0,0);
//     conveyorc.rotation = new BABYLON.Vector3(0,11,0);
//     conveyorc.checkCollisions = true;
// });
//==================================================================================================================



//========================3D Library=====================================
//IMAGE BOX
    var tvBox = BABYLON.MeshBuilder.CreateBox("tvBox", {
    width: 1.2, 
    height: 1.7, 
    depth: 0.000100 
    }, scene);
        
    tvBox.rotation.y = 2.37;
    tvBox.isVisible = false;
    tvBox.isPickable = false;
    
    var mat = new BABYLON.StandardMaterial("tvBoxMat",scene);
    mat.diffuseColor = new BABYLON.Color4(0, 0, 0, 1);
    tvBox.material = mat;

    //IMAGE VIEW
    var imagePlane = BABYLON.MeshBuilder.CreatePlane("imgBox", {
        height: 1, 
        width: 1, 
        sideOrientation: BABYLON.Mesh.BACKSIDE
        }, scene);
        
        
        imagePlane.rotation.y = 2.37;

        imagePlane.isVisible = false;
        imagePlane.isPickable = false;
        function imageDisp(id){
            //Create dynamic texture    
            var materialGround = new BABYLON.StandardMaterial("Mat", scene);    				
            materialGround.diffuseTexture = new BABYLON.Texture("https://x1.hcm-lab.id:3001/" + arrImg[imgID], scene);;
            imagePlane.material = materialGround;
        }
    var imgID = 0;
    // imageDisp(imgID);

    //Interactive Object Button
    var plane3 = BABYLON.MeshBuilder.CreatePlane("plane", {height: 2, width: 2, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
    plane3.rotation.y = -0.79;
    plane3.isVisible = false;
    
    var advancedTexture3 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane3);
    var panelBut = new BABYLON.GUI.StackPanel();
    panelBut.width = "220px";
    panelBut.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    panelBut.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    advancedTexture3.addControl(panelBut);
    
    var buttonNext = BABYLON.GUI.Button.CreateSimpleButton("but1", "Next");
    buttonNext.width = 2;
    buttonNext.height = "60px";
    buttonNext.color = "black";
    buttonNext.cornerRadius = 20;
    buttonNext.background = "green";
    buttonNext.onPointerUpObservable.add(function() {
        imgID++;
        if(imgID == arrImg.length){
            imgID = arrImg.length - 1;
        }
        console.log(imgID +" = "+ arrImg[imgID] + " " + arrObj[imgID]);
        imageDisp(imgID);
    });
    panelBut.addControl(buttonNext);

    var buttonPrev = BABYLON.GUI.Button.CreateSimpleButton("but2", "Previous");
    buttonPrev.width = 2;
    buttonPrev.height = "60px";
    buttonPrev.color = "black";
    buttonPrev.cornerRadius = 20;
    buttonPrev.background = "green";
    buttonPrev.onPointerUpObservable.add(function() {
        imgID--;
        if(imgID < 0){
            imgID = 0;
        }
        console.log(imgID +" = "+ arrImg[imgID] + " " + arrObj[imgID]);
        imageDisp(imgID);
    });
    panelBut.addControl(buttonPrev); 

    var buttonDownload = BABYLON.GUI.Button.CreateSimpleButton("but2", "Download");
    buttonDownload.width = 2;
    buttonDownload.height = "60px";
    buttonDownload.color = "black";
    buttonDownload.cornerRadius = 20;
    buttonDownload.background = "green";
    buttonDownload.onPointerUpObservable.add(function() {
        //arrID =+ 1;
        BABYLON.SceneLoader.ImportMesh("", "https://x1.hcm-lab.id:3001/", arrObj[imgID], scene, function (newMeshes, particleSystem, skeletons) {
            var objek = newMeshes[0];
            // objek.position = new BABYLON.Vector3(-15,3,-5);
            // objek.physicsImpostor = new BABYLON.PhysicsImpostor(objek, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
            // objek.checkCollisions = true;
            objek.position.x = panel.position.x+1;
            objek.position.y = panel.position.y+2;
            objek.position.z = panel.position.z+5;
            objek.scaling = new BABYLON.Vector3(1,1,1); 
            // objek.rotation.y = 1.55;
        });
        
    });
    panelBut.addControl(buttonDownload); 


//========================SCRIPT NODE=====================================
       //IMAGE BOX
       var tvBoxScript = BABYLON.MeshBuilder.CreateBox("tvBoxScript", {
        width: 1, 
        height: 0.7, 
        depth: 0.000100 
        }, scene);
        
        // tvBox.position = new BABYLON.Vector3(-9.3,7,-5);
        // tvBox.position.x = scene.activeCamera.position.x;
        // tvBox.position.y = scene.activeCamera.position.y - 1;
        // tvBox.position.z = scene.activeCamera.position.z - 3;

        tvBoxScript.rotation.y = -2.37;
        tvBoxScript.isVisible  = false;
        tvBoxScript.isPickable = false;
        
        var matScript = new BABYLON.StandardMaterial("tvBoxScriptMat",scene);
        matScript.diffuseColor = new BABYLON.Color4(0, 0, 0, 1);
        tvBoxScript.material = matScript;
    
        //IMAGE VIEW
        var planeWidth = 0.9;
        var planeHeight = 0.3;
        var imagePlaneScript = BABYLON.MeshBuilder.CreatePlane("imagePlaneScript", {
            width: planeWidth, 
            height: planeHeight, 
            }, scene);
       

        imagePlaneScript.isVisible  = false;
        imagePlaneScript.isPickable = false;
        imagePlaneScript.rotation.y = 7.05;
        
        function scriptDisp(id){
            var DTWidth = planeWidth * 500;
            var DTHeight = planeHeight * 500;

            console.log(arrSceneName[id]);

            var font_type = "Arial";
            
            var text = arrSceneName[id] + " scene";
            console.log(text);
            
            var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", {width:DTWidth, height:DTHeight}, scene);
            
            //Check width of text for given font type at any size of font
            var ctx = dynamicTexture.getContext();
            var size = 12; //any value will work
            ctx.font = size + "px " + font_type;
            var textWidth = ctx.measureText(text).width;

            //Calculate ratio of text width to size of font used
            var ratio = textWidth/size;
            
            //set font to be actually used to write text on dynamic texture
            var font_size = Math.floor(DTWidth / (ratio * 1)); //size of multiplier (1) can be adjusted, increase for smaller text
            var font = font_size + "px " + font_type;
            
            //Draw text
            dynamicTexture.drawText(text, null, null, font, "#000000", "#ffffff", true);

            var materialGroundScript = new BABYLON.StandardMaterial("Mat", scene);
            materialGroundScript.diffuseTexture = dynamicTexture;
            imagePlaneScript.material = materialGroundScript;

        }

        var scriptID = 0;
        // scriptDisp(scriptID);
    
        //Interactive Object Button
        var plane3Script = BABYLON.MeshBuilder.CreatePlane("plane3Script", {height: 1, width: 1, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
        // plane3.isPickable = false;
        // plane3.rotation.x = 1;
        plane3Script.rotation.y = 0.77;
        plane3Script.isVisible = false;
        
        var advancedTexture3Script = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane3Script);
        var panelButScript = new BABYLON.GUI.StackPanel();
        panelButScript.width = "220px";
        panelButScript.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        panelButScript.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        advancedTexture3Script.addControl(panelButScript);
        
        var buttonNextScript = BABYLON.GUI.Button.CreateSimpleButton("but1", "Next");
        buttonNextScript.width = 2;
        buttonNextScript.height = "60px";
        buttonNextScript.color = "black";
        buttonNextScript.cornerRadius = 20;
        buttonNextScript.background = "green";
        buttonNextScript.onPointerUpObservable.add(function() {
            scriptID++;
            if(scriptID == arrSceneName.length){
                scriptID = arrSceneName.length - 1;
            }
            console.log(scriptID +" = "+ arrSceneName[scriptID]);
            scriptDisp(scriptID);
        });
        panelButScript.addControl(buttonNextScript);
    
        var buttonPrevScript = BABYLON.GUI.Button.CreateSimpleButton("but2", "Previous");
        buttonPrevScript.width = 2;
        buttonPrevScript.height = "60px";
        buttonPrevScript.color = "black";
        buttonPrevScript.cornerRadius = 20;
        buttonPrevScript.background = "green";
        buttonPrevScript.onPointerUpObservable.add(function() {
            scriptID--;
            if(scriptID < 0){
                scriptID = 0;
            }
            console.log(scriptID +" = "+ arrSceneName[scriptID]);
            scriptDisp(scriptID);
        });
        panelButScript.addControl(buttonNextScript); 
    
        var buttonDownloadScript = BABYLON.GUI.Button.CreateSimpleButton("but2", "Download");
        buttonDownloadScript.width = 2;
        buttonDownloadScript.height = "60px";
        buttonDownloadScript.color = "black";
        buttonDownloadScript.cornerRadius = 20;
        buttonDownloadScript.background = "green";
        buttonDownloadScript.onPointerUpObservable.add(function() {
            var url = arrScene[scriptID];
            var s = document.createElement("script");
            s.type = "text/javascript";
            s.src = url;
            document.head.appendChild(s);
            s.onload = function() {
                simulation(scene);
            }   
            ground.isVisible = false;
            
        });
        panelButScript.addControl(buttonDownloadScript); 

//===============QUESTION=======================================
var tvBoxQuestion = BABYLON.MeshBuilder.CreateBox("tvBox", {
    width: 1.7, 
    height: 1.7, 
    depth: 0.000100 
    }, scene);

    tvBoxQuestion.isVisible = false;
    tvBoxQuestion.isPickable = false;
    
    var matQuestion = new BABYLON.StandardMaterial("tvBoxMat",scene);
    matQuestion.diffuseColor = new BABYLON.Color3(1, 1, 1);
    tvBoxQuestion.material = matQuestion;

    //QUEST VIEW
    var planeWidth2 = 1.5;
    var planeHeight2 = 0.2;
    var imagePlaneQuestion = BABYLON.MeshBuilder.CreatePlane("imgBox", {
        height: planeHeight2, 
        width: planeWidth2, 
        }, scene);
        
        
        // imagePlane.rotation.y = 2.37;

        imagePlaneQuestion.isVisible = false;
        imagePlaneQuestion.isPickable = false;

        function questDisp(id){
            var DTWidth = planeWidth2 * 500;
            var DTHeight = planeHeight2 *500;

            var font_type = "Arial";
            
            var text = arrQuestion[id];
            console.log(text);
            
            var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", {width:DTWidth, height:DTHeight}, scene);
            
            //Check width of text for given font type at any size of font
            var ctx = dynamicTexture.getContext();
            var size = 12; //any value will work
            ctx.font = size + "px " + font_type;
            var textWidth = ctx.measureText(text).width;
    
            //Calculate ratio of text width to size of font used
            var ratio = textWidth/size;
            
            //set font to be actually used to write text on dynamic texture
            var font_size = Math.floor(DTWidth / (ratio * 1)); //size of multiplier (1) can be adjusted, increase for smaller text
            var font = font_size + "px " + font_type;
            
            //Draw text
            dynamicTexture.drawText(text, null, null, font, "#000000", "#ffffff", true);
    
            var materialGroundQuestion = new BABYLON.StandardMaterial("Mat", scene);
            materialGroundQuestion.diffuseTexture = dynamicTexture;
            imagePlaneQuestion.material = materialGroundQuestion;
    
        }

        var questID = 0;
    
        //Interactive Object Button
        var plane3Question = BABYLON.MeshBuilder.CreatePlane("plane", {height: 2, width: 2, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
        plane3Question.isVisible = false;
        
        var advancedTexture3Question = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane3Question);
        var panelButQuestion = new BABYLON.GUI.StackPanel();
        panelButQuestion.width = "220px";
        panelButQuestion.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        panelButQuestion.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        advancedTexture3Question.addControl(panelButQuestion);

        var panelRadio = new BABYLON.GUI.StackPanel();
        panelRadio.scaleX = 4;
        panelRadio.scaleY = 4;   
        panelRadio.top = "-300px";
        panelRadio.left = "120px" 
        advancedTexture3Question.addControl(panelRadio);

        var addRadio = function(text, parent) {

            var button = new BABYLON.GUI.RadioButton();
            button.width = "20px";
            button.height = "20px";
            button.color = "white";
            button.background = "green";     

            var header = BABYLON.GUI.Control.AddHeader(button, text, "100px", { isHorizontal: true, controlFirst: true });
            header.height = "30px";

            parent.addControl(header);    
        }

        addRadio("Yes", panelRadio);
        addRadio("No", panelRadio);

        
        var buttonNextQuestion = BABYLON.GUI.Button.CreateSimpleButton("but1", "Next");
        buttonNextQuestion.width = 2;
        buttonNextQuestion.height = "60px";
        buttonNextQuestion.color = "black";
        buttonNextQuestion.cornerRadius = 20;
        buttonNextQuestion.background = "green";
        buttonNextQuestion.onPointerUpObservable.add(function() {
            questID++;
            if(questID == arrQuestion.length){
                questID = arrQuestion.length - 1;
            }
            console.log(questID +" = "+ arrQuestion[questID]);
            questDisp(questID);
        });
        panelButQuestion.addControl(buttonNextQuestion);

        var buttonPrevQuestion = BABYLON.GUI.Button.CreateSimpleButton("but2", "Previous");
        buttonPrevQuestion.width = 2;
        buttonPrevQuestion.height = "60px";
        buttonPrevQuestion.color = "black";
        buttonPrevQuestion.cornerRadius = 20;
        buttonPrevQuestion.background = "green";
        buttonPrevQuestion.onPointerUpObservable.add(function() {
            questID--;
            if(questID < 0){
                questID = 0;
            }
            console.log(questID +" = "+ arrQuestion[questID]);
            questDisp(questID);
        });
        panelButQuestion.addControl(buttonPrevQuestion); 
//==============================================================
    
//==================================================================================================================
    return scene;
    
};


