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
//------------------------------------Ground----------------------------------
var ground = BABYLON.Mesh.CreateGround("ground", 40, 40, 40, scene);
ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.PlaneImpostor, {mass: 0, restitution: 0.7}, scene);
var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("images/ground-iron.jpg", scene);
    groundMaterial.diffuseTexture.uScale = 6;
    groundMaterial.diffuseTexture.vScale = 6;
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    ground.material = groundMaterial;
    ground.receiveShadows = true;
    ground.checkCollisions = true;
    ground.isPickable = false;
//------------------------------------Wall----------------------------------
var skybox = BABYLON.Mesh.CreateBox("wall", 40, scene);
var skyboxMaterial = new BABYLON.StandardMaterial("wall", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("images/wall1/tembok", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
    skybox.checkCollisions = true;
    skybox.isPickable= false;//=========================================================

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
let obj = [];
let img = [];
socket.on('obj', data => {
    data.forEach(c => {
        obj.push(c);
    });
});

socket.on('img', data => {
    data.forEach(c => {
        img.push(c);
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
//==========================================Conveyor================================

//BOX DIATAS CONVEYOR
var boxMaterial = new BABYLON.StandardMaterial("boxMat1", scene);
boxMaterial.diffuseTexture = new BABYLON.Texture("images/crate.png", scene);
var box = BABYLON.Mesh.CreateBox("box", 1, scene);
box.material = boxMaterial;
box.position = new BABYLON.Vector3(5,6,-5);
box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1000, restitution: 0.05, friction:1 }, scene);
box.isVisible = true;
box.checkCollisions = true;



//CONVEYOR OBJECT
BABYLON.SceneLoader.ImportMesh("", "images/", "conveyor.babylon", scene, function (newMeshesC, particleSystemC, skeletonsC) {
var conveyor = newMeshesC[0];
// Add colliders
var collidersVisible = false;
var boxCollider2 = BABYLON.Mesh.CreateBox("box2", 1, scene);
boxCollider2.scaling.x = 1;
boxCollider2.scaling.y = 0.5;
boxCollider2.scaling.z = 6;
boxCollider2.position = new BABYLON.Vector3(7,0.5,2);
boxCollider2.material = mat;
boxCollider2.isVisible = collidersVisible;
boxCollider2.physicsImpostor = new BABYLON.PhysicsImpostor(boxCollider2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1, friction:0.1 }, scene);
boxCollider2.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 0, 1));


// Create a physics root and add all children
var physicsConv = new BABYLON.Mesh("", scene);
physicsConv.addChild(conveyor);
//physicsConv.addChild(boxCollider);
//physicsConv.addChild(boxCollider2);
physicsConv.position.x = 7;
physicsConv.position.y = 0;
physicsConv.position.z = 2;
physicsConv.scaling = new BABYLON.Vector3(1,1,3);
physicsConv.physicsImpostor = new BABYLON.PhysicsImpostor(physicsConv, BABYLON.PhysicsImpostor.NoImpostor, { mass: 0 }, scene);



// Orient the physics root
physicsConv.rotation.x = Math.PI/5;
physicsConv.rotation.z = Math.PI/6;

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
                        button4.isVisible = !button4.isVisible;
                        tvBox.isVisible = false;
                        imagePlane.isVisible = false;
                        plane3.isVisible = false;
                        tvBoxScript.isVisible = false;
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
                    button4.isVisible = true;
    }

    if(e.key == 'r'){
        button1.isVisible = false;
        button2.isVisible = false;
        button4.isVisible = false;
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
            materialGround.diffuseTexture = new BABYLON.Texture("https://x1.hcm-lab.id:8049/" + img[idimg], scene);;
            imagePlane.material = materialGround;
        }
    var idimg = 0;
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
        idimg++;
        if(idimg == img.length){
            idimg = img.length - 1;
        }
        console.log(idimg +" = "+ img[idimg] + " " + obj[idimg]);
        imageDisp(idimg);
    });
    panelBut.addControl(buttonNext);

    var buttonPrev = BABYLON.GUI.Button.CreateSimpleButton("but2", "Previous");
    buttonPrev.width = 2;
    buttonPrev.height = "60px";
    buttonPrev.color = "black";
    buttonPrev.cornerRadius = 20;
    buttonPrev.background = "green";
    buttonPrev.onPointerUpObservable.add(function() {
        idimg--;
        if(idimg < 0){
            idimg = 0;
        }
        console.log(idimg +" = "+ img[idimg] + " " + obj[idimg]);
        imageDisp(idimg);
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
        BABYLON.SceneLoader.ImportMesh("", "https://x1.hcm-lab.id:8049/", obj[idimg], scene, function (newMeshes, particleSystem, skeletons) {
            var objek = newMeshes[0];
            //objek.position = new BABYLON.Vector3(-15,3,-5);
            objek.physicsImpostor = new BABYLON.PhysicsImpostor(objek, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
            // objek.checkCollisions = true;
            objek.position.x = panel.position.x+1;
            objek.position.y = panel.position.y+2;
            objek.position.z = panel.position.z+5;
            objek.scaling = new BABYLON.Vector3(1,1,1); 
            // objek.rotation.y = 1.55;
        });
        
    });
    panelBut.addControl(buttonDownload); 

//==================================================================================================================
    return scene;
    
};


