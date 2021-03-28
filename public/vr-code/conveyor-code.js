function attachHtml(id , W, H ,L , T ,p ,ts,content)
{
    let deg = 180 / Math.PI; 
    let el = document.createElement('div');
    let exist = false;
    if(document.getElementById('spDiv'+id)) {
        exist = true;
        el = document.getElementById('spDiv'+id);
    }
   
    let zone = document.getElementById('canvasZone');
    let w = zone.offsetWidth.valueOf()*1;
    let h = zone.offsetHeight.valueOf()*1;
    
    el.setAttribute('style', 'transform: scale(1.0) scaleZ(1.0) rotateX('+ts.rx+'deg) rotateY('+ts.ry+'deg) rotateZ('+ts.rz+'deg);transform-origin: 50% 50%;perspective: '+p+';-webkit-transform: scale(1.0) scaleZ(1.0) rotateX('+ts.rx+'deg) rotateY('+ts.ry+'deg)  rotateZ('+ts.rz+'deg);-webkit-transform-origin: 50% 50%;-moz-transform: scale(1.0) scaleZ(1.0) rotateX('+ts.rx+'deg)  rotateY('+ts.ry+'deg) rotateZ('+ts.rz+'deg);-moz-transform-origin: 50% 50%;-o-transform: scale(1.0) scaleZ(1.0) rotateX('+ts.rx+'deg)  rotateY('+ts.ry+'deg) rotateZ('+ts.rz+'deg);-o-transform-origin: 50% 50%;-ms-transform: scale(1.0) scaleZ(1.0) rotateX('+ts.rx+'deg)  rotateY('+ts.ry+'deg) rotateZ('+ts.rz+'deg);-ms-transform-origin:50% 50%;transform: scale(1.0) scaleZ(1.0) rotateX('+ts.rx+'deg)  rotateY('+ts.ry+'deg)  rotateZ('+ts.rz+'deg);transform-origin: 50% 50%;position:absolute;top:'+(h/2-H/2+T)+'px;left:'+(w/2-W/2+L)+'px;z-index:100;background-color:#ffffff;width:'+W+'px;height:'+H+'px;opacity:1.;');
    el.id = "spDiv"+id;
    zone.setAttribute('style','-o-perspective: '+p+';-o-perspective-origin: 50% 50%;-webkit-perspective: '+p+';-webkit-perspective-origin: 50% 50%;-moz-perspective: '+p+';-moz-perspective-origin: 50% 50%;-ms-perspective: '+p+';-ms-perspective-origin: 50% 50%;perspective: '+p+';perspective-origin: 50% 50%;position:relative');

    if(!exist) { 
        el.innerHTML = content;
        zone.appendChild(el);
    }
}

function createPage(scene, camera, url = "https://www.bing.com")
{
    scene.registerBeforeRender(function() {  
        let cp = camera.position;
        let dx = Math.atan(Math.sqrt(cp.x * cp.x + cp.z * cp.z) / cp.y) * 180 / Math.PI;
        let dy = 0;
        let sign = 1;
        let baseSize = 180;
        if(dx > 0) { sign = -1; }
        let dz =  sign*Math.atan(cp.x/cp.z) * 180./Math.PI;			
        let size = baseSize * camera.fov / Math.sqrt(Math.pow(cp.x, 2.0) + Math.pow(cp.y, 2.0) + Math.pow(cp.z, 2.0));			
        attachHtml('PageWeb', baseSize * size, baseSize * size, 0, 0, '800px', {rx: dx, ry: dy, rz: dz} ,'<iframe src="'+url+'" width="100%" height="100%"></iframe>'); 				   
    });
}


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
var advancedTexture1 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);
var panelNext = new BABYLON.GUI.StackPanel();
panelNext.width = "220px";
panelNext.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
panelNext.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
advancedTexture1.addControl(panelNext);

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
var advancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane2);
var panelPrev = new BABYLON.GUI.StackPanel();
panelPrev.width = "220px";
panelPrev.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
panelPrev.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
advancedTexture2.addControl(panelPrev);

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



//IMAGE BOX
var tvBox = BABYLON.MeshBuilder.CreateBox("tvBox", {width: 2.646700, height: 1.926200, depth: 0.100000 }, scene);
    tvBox.position = new BABYLON.Vector3(9,7,-24.8);
    
    var mat = new BABYLON.StandardMaterial("tvBoxMat",scene);
    mat.diffuseColor = new BABYLON.Color4(0, 0, 0, 1);
    tvBox.material = mat;
    var planeOptsimg = {
    height: 5.4762, 
    width: 7.3967, 
    sideOrientation: BABYLON.Mesh.BACKSIDE
    };

//IAMGE VIEW
var imagePlane = BABYLON.MeshBuilder.CreatePlane("imgBox", planeOptsimg, scene);
imagePlane.position = new BABYLON.Vector3(9,7,-24.7);



var idImage = [1,2,3,4,5];
var imgID = 0;

imageDisp(imgID);

//Button Next
var plane3 = BABYLON.MeshBuilder.CreatePlane("plane", {height: 5.4762, width: 7.3967, sideOrientation: BABYLON.Mesh.BACKSIDE}, scene);
plane3.position = new BABYLON.Vector3(4, 3.85, -24.7);
var advancedTexture3 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane3);
var panelNext1 = new BABYLON.GUI.StackPanel();
panelNext1.width = "220px";
panelNext1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
panelNext1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
advancedTexture3.addControl(panelNext1);

var button11 = BABYLON.GUI.Button.CreateSimpleButton("but1", "<<<<<");
button11.width = 2;
button11.height = "60px";
button11.color = "black";
button11.cornerRadius = 20;
button11.background = "green";
button11.onPointerUpObservable.add(function() {
    imgID++;
    if(imgID > 4){
        imgID = 4;
    }
    imageDisp(imgID);
});
panelNext1.addControl(button11);


//Button Previous
var plane4 = BABYLON.MeshBuilder.CreatePlane("plane", {height: 5.4762, width: 7.3967}, scene);
plane4.position = new BABYLON.Vector3(8.2, 3.85, -24.7);
var advancedTexture4 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane4);
var panelPrev1 = new BABYLON.GUI.StackPanel();
panelPrev1.width = "220px";
panelPrev1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
panelPrev1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
advancedTexture4.addControl(panelPrev1);

var button22 = BABYLON.GUI.Button.CreateSimpleButton("but2", ">>>>>");
button22.width = 2;
button22.height = "60px";
button22.color = "black";
button22.cornerRadius = 20;
button22.background = "green";
button22.onPointerUpObservable.add(function() {
    imgID--;
    if(imgID < 0){
        imgID = 0;
    }
    imageDisp(imgID);
});
panelPrev1.addControl(button22); 


//Button Import
var plane5 = BABYLON.MeshBuilder.CreatePlane("plane", {height: 5.4762, width: 7.3967}, scene);
plane5.position = new BABYLON.Vector3(6.2, 3.85, -24.7);
var advancedTexture5 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane5);
var panelPrev2 = new BABYLON.GUI.StackPanel();
panelPrev2.width = "220px";
panelPrev2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
panelPrev2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
advancedTexture5.addControl(panelPrev2);

var button222 = BABYLON.GUI.Button.CreateSimpleButton("but2", "Download");
button222.width = 2;
button222.height = "60px";
button222.color = "black";
button222.cornerRadius = 20;
button222.background = "green";
button222.onPointerUpObservable.add(function() {
    //arrID =+ 1;
    BABYLON.SceneLoader.ImportMesh("", "assets/obj-list/", "obj"+idImage[imgID]+".babylon", scene, function (newMeshes, particleSystem, skeletons) {
        var objek = newMeshes[0];
        objek.position = new BABYLON.Vector3(10.2, 1.85, -18.7);
        objek.scaling = new BABYLON.Vector3(2,2,2); 
    });
});
panelPrev2.addControl(button222); 


//===============GIZMO=====================
// Initialize GizmoManager
var gizmoManager = new BABYLON.GizmoManager(scene)
vrHelper.onControllerMeshLoaded.add((webVRController)=>{
    webVRController.onSecondaryButtonStateChangedObservable.add((stateObject)=>{
            if(webVRController.hand==="left"){
                if(stateObject.pressed === true){
                    if(stateObject.pressed === true){
                        gizmoManager.boundingBoxGizmoEnabled=true;
                    }else{
                        gizmoManager.attachToMesh(null);
                }
            }
        }else{
                if(stateObject.pressed === true){
                    if(stateObject.pressed === true){
                        if(stateObject.pressed === true){                            
                            gizmoManager.attachToMesh(null);
                            gizmoManager.boundingBoxGizmoEnabled=false;  
                        }
                    }
                    }
                
            }
        });
});

return scene;



function imageDisp(id){
    //Create dynamic texture
    var textureResolution = 1500;
    var textureGround = new BABYLON.DynamicTexture("dynamic texture", textureResolution, scene);   
    var textureContext = textureGround.getContext();

    var materialGround = new BABYLON.StandardMaterial("Mat", scene);    				
    materialGround.diffuseTexture = textureGround;
    imagePlane.material = materialGround;
    var img = new Image();
    img.src = 'assets/textures/img/image'+ idImage[id] +'.png';
    img.onload = function() {
    //Add image to dynamic texture
    textureContext.drawImage(this, 0, 0);
    textureGround.update();

}	
}


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

