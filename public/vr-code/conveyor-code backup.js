var createScene = () => {

var scene = new BABYLON.Scene(engine);
scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0));

scene.getPhysicsEngine().setTimeStep(0.25 / 60);

//=================CAMERA===============
var camera = new BABYLON.VRDeviceOrientationFreeCamera("camera", new BABYLON.Vector3(0, 5, 7), scene);
//camera.rotation.y = 10;
camera.setTarget(BABYLON.Vector3.Zero());
//var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 1.6, -10), scene);
//var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 4, Math.PI / 2.5, 10, BABYLON.Vector3.Zero(), scene);
camera.speed = 0.4
camera.checkCollisions = true;
//camera.applyGravity
camera.attachControl(canvas, true);
scene.gravity = new BABYLON.Vector3(0, -0.5, 0);

//================VR SETUP=============
var vrHelper = scene.createDefaultVRExperience();
vrHelper.enableInteractions();
vrHelper.enableTeleportation({floorMeshName: "ground"});
vrHelper.onAfterEnteringVRObservable.add(()=>{
if(scene.activeCamera === vrHelper.vrDeviceOrientationCamera){
BABYLON.FreeCameraDeviceOrientationInput.WaitForOrientationChangeAsync(1000).then(()=>{
    // Successfully received sensor input
}).catch(()=>{
    alert("Device orientation camera is being used but no sensor is found, prompt user to enable in safari settings");
})
}
})

var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
light.intensity = 0.9;

var mat = new BABYLON.StandardMaterial("mat1", scene);
mat.diffuseColor = new BABYLON.Color3(1, 1, 0);


//GROUND
var ground = BABYLON.Mesh.CreateGround("ground", 50, 50, 1, scene);
ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution:0.8, friction:0.6 }, scene);
var groundMaterial = new BABYLON.StandardMaterial("groundMat", scene);
groundMaterial.diffuseTexture = new BABYLON.Texture("assets/textures/floor.jpg", scene);
//groundMaterial.diffuseTexture.uScale = 6;
//groundMaterial.diffuseTexture.vScale = 6;
groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
ground.material = groundMaterial;


//SKYBOX
var skybox = BABYLON.Mesh.CreateBox("wall", 50, scene);
var skyboxMaterial = new BABYLON.StandardMaterial("wall", scene);
skyboxMaterial.backFaceCulling = false;
skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/textures/wall/wall", scene);
skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
skybox.material = skyboxMaterial;
skybox.checkCollisions = true;



//BOX DIATAS CONVEYOR
var boxMaterial = new BABYLON.StandardMaterial("boxMat1", scene);
boxMaterial.diffuseTexture = new BABYLON.Texture("assets/crate/crate2.png", scene);
var box = BABYLON.Mesh.CreateBox("box", 1, scene);
box.material = boxMaterial;
box.position = new BABYLON.Vector3(5,6,-5);
box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1000, restitution: 0.05, friction:1 }, scene);
box.checkCollisions = true;



//CONVEYOR OBJECT
BABYLON.SceneLoader.ImportMesh("", "assets/conveyor/", "conveyor.babylon", scene, function (newMeshesC, particleSystemC, skeletonsC) {
var conveyor = newMeshesC[0];


// Add colliders
var collidersVisible = false;

var boxCollider2 = BABYLON.Mesh.CreateBox("box2", 1, scene);
boxCollider2.scaling.x = 3;
boxCollider2.scaling.y = 0.2;
boxCollider2.scaling.z = 12;
boxCollider2.position = new BABYLON.Vector3(5,2,0);
boxCollider2.material = mat;
boxCollider2.isVisible = collidersVisible;
boxCollider2.physicsImpostor = new BABYLON.PhysicsImpostor(boxCollider2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1, friction:0.1 }, scene);
boxCollider2.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 0, 1));


// Create a physics root and add all children
var physicsConv = new BABYLON.Mesh("", scene);
physicsConv.addChild(conveyor);
//physicsConv.addChild(boxCollider);
//physicsConv.addChild(boxCollider2);
physicsConv.position.x = 5;
physicsConv.position.y = 0;
physicsConv.scaling = new BABYLON.Vector3(3,3,6);
physicsConv.physicsImpostor = new BABYLON.PhysicsImpostor(physicsConv, BABYLON.PhysicsImpostor.NoImpostor, { mass: 0 }, scene);



// Orient the physics root
physicsConv.rotation.x = Math.PI/5;
physicsConv.rotation.z = Math.PI/6;

});


//Box TV

var tvBox = BABYLON.MeshBuilder.CreateBox("tvBox", {width: 7.646700, height: 6.926200, depth: 0.100000 }, scene);
tvBox.position = new BABYLON.Vector3(0,7,-24.8);

var mat = new BABYLON.StandardMaterial("tvBoxMat",scene);
mat.diffuseColor = new BABYLON.Color4(0, 0, 0, 1);
tvBox.material = mat;
var planeOpts = {
height: 5.4762, 
width: 7.3967, 
sideOrientation: BABYLON.Mesh.BACKSIDE
};


var idVideo = [1,2,3,4,5];
var arrID = 0;

//Video
var tvBoxVideo = BABYLON.MeshBuilder.CreatePlane("plane", planeOpts, scene);
var vidPos = (new BABYLON.Vector3(0,7,-24.7));
tvBoxVideo.position = vidPos;
var tvBoxVideoMat = new BABYLON.StandardMaterial("m", scene);
var tvBoxVideoVidTex = new BABYLON.VideoTexture("vidtex","assets/textures/video" + idVideo[arrID] + ".mp4", scene);
tvDisplay();




//Button Next
var plane = BABYLON.MeshBuilder.CreatePlane("plane", {height: 5.4762, width: 7.3967, sideOrientation: BABYLON.Mesh.BACKSIDE}, scene);
plane.position = new BABYLON.Vector3(-5, 3.85, -24.7);
var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);
var panelNext = new BABYLON.GUI.StackPanel();
panelNext.width = "220px";
panelNext.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
panelNext.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
advancedTexture.addControl(panelNext);

var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "<<<<<");
button1.width = 2;
button1.height = "60px";
button1.color = "black";
button1.cornerRadius = 20;
button1.background = "green";
button1.onPointerUpObservable.add(function() {
tvBoxVideoVidTex.video.pause();
arrID++;
if(arrID > 4){
    arrID = 4;
}
tvBoxVideoVidTex = new BABYLON.VideoTexture("vidtex","assets/textures/video" + idVideo[arrID] + ".mp4", scene);
tvDisplay();
});
panelNext.addControl(button1);


//Button Previous
var plane2 = BABYLON.MeshBuilder.CreatePlane("plane", {height: 5.4762, width: 7.3967}, scene);
plane2.position = new BABYLON.Vector3(-0.8, 3.85, -24.7);
var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane2);
var panelPrev = new BABYLON.GUI.StackPanel();
panelPrev.width = "220px";
panelPrev.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
panelPrev.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
advancedTexture.addControl(panelPrev);

var button2 = BABYLON.GUI.Button.CreateSimpleButton("but2", ">>>>>");
button2.width = 2;
button2.height = "60px";
button2.color = "black";
button2.cornerRadius = 20;
button2.background = "green";
button2.onPointerUpObservable.add(function() {
tvBoxVideoVidTex.video.pause();
arrID--;
if(arrID < 0){
    arrID = 0;
}
tvBoxVideoVidTex = new BABYLON.VideoTexture("vidtex","assets/textures/video" + idVideo[arrID] + ".mp4", scene);
tvDisplay();
});
panelPrev.addControl(button2); 

return scene;

function tvDisplay() {
tvBoxVideoMat.diffuseTexture = tvBoxVideoVidTex;
tvBoxVideoMat.roughness = 1;
tvBoxVideoMat.emissiveColor = new BABYLON.Color3.White();
tvBoxVideo.material = tvBoxVideoMat;
scene.onPointerObservable.add(function(evt){
if(evt.pickInfo.pickedMesh === tvBoxVideo){
    //console.log("picked");
        if(tvBoxVideoVidTex.video.paused)
            tvBoxVideoVidTex.video.play();
        else
            tvBoxVideoVidTex.video.pause();
        console.log(tvBoxVideoVidTex.video.paused?"paused":"playing");
}
}, BABYLON.PointerEventTypes.POINTERPICK);
}


};

