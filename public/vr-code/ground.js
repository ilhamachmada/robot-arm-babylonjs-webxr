var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };
var createScene = async function() {
//------------------------------------Scene----------------------------------            
    var scene = new BABYLON.Scene(engine);
    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0));
    scene.collisionsEnabled = true;
    scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
//------------------------------------Camera----------------------------------            
var camera = new BABYLON.UniversalCamera("camera1", new BABYLON.Vector3(0, 2, -45), scene);
  camera.speed = 0.4
  camera.attachControl(canvas, true);
  camera.checkCollisions = true;
  camera.applyGravity = true;
//------------------------------------Light----------------------------------
            var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
            light1.intensity = 1;
//------------------------------------Ground----------------------------------
            var ground = BABYLON.Mesh.CreateGround("ground", 100, 100, 100, scene);
            ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.PlaneImpostor, {mass: 0, restitution: 0.7}, scene);
            ground.position = new BABYLON.Vector3(0,-1,0);
            var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
                groundMaterial.diffuseTexture = new BABYLON.Texture("images/lantai.jpg", scene);
                groundMaterial.diffuseTexture.uScale = 6;
                groundMaterial.diffuseTexture.vScale = 6;
                groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
                ground.material = groundMaterial;
                ground.receiveShadows = true;
                ground.checkCollisions = true;
                ground.isPickable = false;
// //------------------------------------Wall----------------------------------
//             var skybox = BABYLON.Mesh.CreateBox("wall", 100, scene);
//                 skybox.position = new BABYLON.Vector3(0,-20,0);
//             var skyboxMaterial = new BABYLON.StandardMaterial("wall", scene);
//                 skyboxMaterial.backFaceCulling = false;
//                 skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("images/tembok/tembok", scene);
//                 //skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
//                 skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
//                 skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
//                 skybox.material = skyboxMaterial;
//                 skybox.checkCollisions = true;
// //=================BORDER================
// var border0 = BABYLON.Mesh.CreateBox("border0", 1, scene);
//     border0.scaling = new BABYLON.Vector3(1, 100, 100);
//     border0.position.x = -49.0;
//     border0.physicsImpostor = new BABYLON.PhysicsImpostor(border0, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
//     border0.checkCollisions = true;
//     border0.isVisible = false;
//     border0.isPickable = false;

//     var border1 = BABYLON.Mesh.CreateBox("border1", 1, scene);
//     border1.scaling = new BABYLON.Vector3(1, 100, 100);
//     border1.position.x = 49.0;
//     border1.physicsImpostor = new BABYLON.PhysicsImpostor(border1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
//     border1.checkCollisions = true;
//     border1.isVisible = false;
//     border1.isPickable = false;

//     var border2 = BABYLON.Mesh.CreateBox("border2", 1, scene);
//     border2.scaling = new BABYLON.Vector3(100, 100, 1);
//     border2.position.z = 49.0;
//     border2.physicsImpostor = new BABYLON.PhysicsImpostor(border2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
//     border2.checkCollisions = true;
//     border2.isVisible = false;
//     border2.isPickable = false;

//     var border3 = BABYLON.Mesh.CreateBox("border3", 1, scene);
//     border3.scaling = new BABYLON.Vector3(100, 100, 1);
//     border3.position.z = -49.0;
//     border3.physicsImpostor = new BABYLON.PhysicsImpostor(border3, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
//     border3.checkCollisions = true;
//     border3.isVisible = false;
//     border3.isPickable = false;
// //------------------------------------Sekat----------------------------------            
//             var pemisah1 = BABYLON.MeshBuilder.CreateBox("pemisah1", {height: 100, width: 100, depth: 0.1}, scene);
//                 pemisah1.position = new BABYLON.Vector3(20, 0, -25);
//             var pemisah1mat = new BABYLON.StandardMaterial("pemisah1", scene);
//                 pemisah1mat.backFaceCulling = false;
//                 pemisah1mat.reflectionTexture = new BABYLON.CubeTexture("images/tembok/tembok", scene);
//                 pemisah1mat.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
//                 pemisah1mat.specularColor = new BABYLON.Color3(0, 0, 0);
//                 pemisah1.material = pemisah1mat;
//                 pemisah1.checkCollisions = true;
//                 pemisah1.isPickable = false;
//             var pemisah2 = BABYLON.MeshBuilder.CreateBox("pemisah2", {height: 100, width: 100, depth: 0.1}, scene);
//                 pemisah2.position = new BABYLON.Vector3(-20, 0, 0);
//             var pemisah2mat = new BABYLON.StandardMaterial("pemisah2", scene);
//                 pemisah2mat.backFaceCulling = false;
//                 pemisah2mat.reflectionTexture = new BABYLON.CubeTexture("images/tembok/tembok", scene);
//                 pemisah2mat.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
//                 pemisah2mat.specularColor = new BABYLON.Color3(0, 0, 0);
//                 pemisah2.material = pemisah1mat;
//                 pemisah2.checkCollisions = true;
//                 pemisah2.isPickable = false;
//             var pemisah3 = BABYLON.MeshBuilder.CreateBox("pemisah3", {height: 100, width: 100, depth: 0.1}, scene);
//                 pemisah3.position = new BABYLON.Vector3(20, 0, 25);
//             var pemisah3mat = new BABYLON.StandardMaterial("pemisah3", scene);
//                 pemisah3mat.backFaceCulling = false;
//                 pemisah3mat.reflectionTexture = new BABYLON.CubeTexture("images/tembok/tembok", scene);
//                 pemisah3mat.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
//                 pemisah3mat.specularColor = new BABYLON.Color3(0, 0, 0);
//                 pemisah3.material = pemisah1mat;
//                 pemisah3.checkCollisions = true;
//                 pemisah3.isPickable = false;
// //----------------------------------------Stand Meja TV-------------------------------------            
//         for (let i = -1; i < 75; ++i) {
//             const positiontv = [
//                 new BABYLON.Vector3(45-i, 1.5, -28),
//                 new BABYLON.Vector3(18-i, 1.5, -3),
//                 new BABYLON.Vector3(45-i, 1.5, 22),
//                 new BABYLON.Vector3(18-i, 1.5, 47),
//             ];
//             const positionmeja = [
//                 new BABYLON.Vector3(45-i, 0, -28),
//                 new BABYLON.Vector3(18-i, 0, -3),
//                 new BABYLON.Vector3(45-i, 0, 22),
//                 new BABYLON.Vector3(18-i, 0, 47),
//             ];
//             positiontv.forEach((position, idx) => {
//                 BABYLON.SceneLoader.ImportMesh("", "images/object/led_tv/","scene.gltf", scene, function (newMeshesCC, particleSystemCC, skeletonsCC){
//                     var tv1 = newMeshesCC[0];
//                     tv1.position.copyFrom(position);
//                     tv1.scaling = new BABYLON.Vector3(0.5,0.5,0.5);
//                     tv1.rotation.y = -90;
//                     tv1.checkCollisions = true;
//                 });
//             });
//             positionmeja.forEach((position, idx) => {
//                 BABYLON.SceneLoader.ImportMesh("", "images/object/meja/","meja.gltf", scene, function (newMeshesCC, particleSystemCC, skeletonsCC){
//                     var meja1 = newMeshesCC[0];
//                     meja1.position.copyFrom(position);
//                     meja1.scaling = new BABYLON.Vector3(5,5,5);
//                     meja1.checkCollisions = true;
//                     });
//             });
//                     i = i + 15;
//             }
// /*------------------------------Poster-------------------------------------*/
// function poster(texture, x, y, z){
//     var layar = {
//         height: 9.3, 
//         width: 5.7, 
//         sideOrientation: BABYLON.Mesh.FRONTSIDE
//         };
//     var layartv = BABYLON.MeshBuilder.CreatePlane("layartv", layar, scene);
//         layartv.position = new BABYLON.Vector3(x, y, z);
//         var mat1 = new BABYLON.StandardMaterial("mat1", scene);
//         mat1.diffuseTexture = new BABYLON.Texture(texture, scene);
//         layartv.material = mat1;
//         return layartv;
//     }
// /*--------------------------------------------Stand Poster 1---------------------------------------*/
// poster("https://x1.hcm-lab.id:8049/images/2020-07-15T09-27-34.741Z-pameran1.jpg", 38, 4, -25.1);
// poster("https://x1.hcm-lab.id:8049/images/2020-07-15T09-27-34.741Z-pameran1.jpg", 22, 4, -25.1);
// poster("https://x1.hcm-lab.id:8049/images/2020-07-15T09-27-34.741Z-pameran1.jpg", 6, 4, -25.1);
// poster("https://x1.hcm-lab.id:8049/images/2020-07-15T09-27-34.741Z-pameran1.jpg", -10, 4, -25.1);
// poster("https://x1.hcm-lab.id:8049/images/2020-07-15T09-27-34.741Z-pameran1.jpg", -26, 4, -25.1);
// /*--------------------------------------------Stand Poster 2---------------------------------------*/
// poster("https://x1.hcm-lab.id:8049/images/2020-07-15T09-26-39.472Z-pameran2.jpg", -37, 4, -1);
// poster("https://x1.hcm-lab.id:8049/images/2020-07-15T09-26-39.472Z-pameran2.jpg", -21, 4, -1);
// poster("https://x1.hcm-lab.id:8049/images/2020-07-15T09-26-39.472Z-pameran2.jpg", -5, 4, -1);
// poster("https://x1.hcm-lab.id:8049/images/2020-07-15T09-26-39.472Z-pameran2.jpg", 9, 4, -1);
// poster("https://x1.hcm-lab.id:8049/images/2020-07-15T09-26-39.472Z-pameran2.jpg", 25, 4, -1);
// /*--------------------------------------------Stand Poster 3---------------------------------------*/
// poster("https://x1.hcm-lab.id:8049/images/2020-07-15T09-27-34.741Z-pameran1.jpg", 38, 4, 24.9);
// poster("https://x1.hcm-lab.id:8049/images/2020-07-15T09-27-34.741Z-pameran1.jpg", 22, 4, 24.9);
// poster("https://x1.hcm-lab.id:8049/images/2020-07-15T09-27-34.741Z-pameran1.jpg", 6, 4, 24.9);
// poster("https://x1.hcm-lab.id:8049/images/2020-07-15T09-27-34.741Z-pameran1.jpg", -10, 4, 24.9);
// poster("https://x1.hcm-lab.id:8049/images/2020-07-15T09-27-34.741Z-pameran1.jpg", -26, 4, 24.9);
// /*--------------------------------------------Stand Poster 4---------------------------------------*/
// poster("https://x1.hcm-lab.id:8049/images/2020-07-15T09-26-39.472Z-pameran2.jpg", -37, 4, 49.9);
// poster("https://x1.hcm-lab.id:8049/images/2020-07-15T09-26-39.472Z-pameran2.jpg", -21, 4, 49.9);
// poster("https://x1.hcm-lab.id:8049/images/2020-07-15T09-26-39.472Z-pameran2.jpg", -5, 4, 49.9);
// poster("https://x1.hcm-lab.id:8049/images/2020-07-15T09-26-39.472Z-pameran2.jpg", 9, 4, 49.9);
// poster("https://x1.hcm-lab.id:8049/images/2020-07-15T09-26-39.472Z-pameran2.jpg", 25, 4, 49.9);
// //------------------------------------------------Video------------------------------------
//     function video(texture, x, y, z){
//         //TV
//         var planeOpts = {
//             height: 3.3, 
//             width: 6.2,
//             sideOrientation: BABYLON.Mesh.FRONTSIDE
//             };
//         //Video
//         var tvBoxVideo = BABYLON.MeshBuilder.CreatePlane("plane", planeOpts, scene);
//             tvBoxVideo.position = new BABYLON.Vector3(x, y, z);
//         var tvBoxVideoMat = new BABYLON.StandardMaterial("m", scene);
//         var tvBoxVideoVidTex = new BABYLON.VideoTexture("", texture, scene);
//         tvDisplay();
//         function tvDisplay() {
//             tvBoxVideoMat.diffuseTexture = tvBoxVideoVidTex;
//             tvBoxVideoMat.roughness = 1;
//             tvBoxVideoMat.emissiveColor = new BABYLON.Color3.White();
//             tvBoxVideo.material = tvBoxVideoMat;
//             scene.onPointerObservable.add(function(evt){
//             if(evt.pickInfo.pickedMesh === tvBoxVideo){
//                 //console.log("picked");
//                     if(tvBoxVideoVidTex.video.paused)
//                         tvBoxVideoVidTex.video.play();
//                     else
//                         tvBoxVideoVidTex.video.pause();
//                     console.log(tvBoxVideoVidTex.video.paused?"paused":"playing");
//             }
//             }, BABYLON.PointerEventTypes.POINTERPICK);
//             };
            
//             return tvBoxVideo;
//         }
// /*---------------------------------------------------------Stand 1 Video-----------------------------------------*/
// video("https://x1.hcm-lab.id:8049/uploads/Virtual%20Engineering%20-%203D%20Scan%20and%20library%20platform.mp4", 46, 3.7, -28.4);
// video("https://x1.hcm-lab.id:8049/uploads/Virtual%20Engineering%20-%20Scenario%20and%20Sync%20Demo.mp4", 30, 3.7, -28.4);
// video("https://x1.hcm-lab.id:8049/uploads/Virtual%20Engineering%20-%20Digital%20twin%20simulation.mp4", 14, 3.7, -28.4);
// video("https://x1.hcm-lab.id:8049/uploads/Virtual%20Engineering%20-%203D%20Scan%20and%20library%20platform.mp4", -2, 3.7, -28.4);
// video("https://x1.hcm-lab.id:8049/uploads/Virtual%20Engineering%20-%203D%20Scan%20and%20library%20platform.mp4", -18, 3.7, -28.4);
// /*---------------------------------------------------------Stand 2 Video-----------------------------------------*/
// video("https://x1.hcm-lab.id:8049/uploads/Virtual%20Engineering%20-%203D%20Scan%20and%20library%20platform.mp4", -45, 3.7, -3.4)
// video("https://x1.hcm-lab.id:8049/uploads/Virtual%20Engineering%20-%20Scenario%20and%20Sync%20Demo.mp4", -29, 3.7, -3.4)
// video("https://x1.hcm-lab.id:8049/uploads/Virtual%20Engineering%20-%20Digital%20twin%20simulation.mp4", -13, 3.7, -3.4)
// video("https://x1.hcm-lab.id:8049/uploads/Virtual%20Engineering%20-%203D%20Scan%20and%20library%20platform.mp4", 3, 3.7, -3.4)
// video("https://x1.hcm-lab.id:8049/uploads/Virtual%20Engineering%20-%203D%20Scan%20and%20library%20platform.mp4", 19, 3.7, -3.4)
// /*---------------------------------------------------------Stand 3 Video-----------------------------------------*/
// video("https://x1.hcm-lab.id:8049/uploads/Virtual%20Engineering%20-%203D%20Scan%20and%20library%20platform.mp4", 46, 3.7, 21.6);
// video("https://x1.hcm-lab.id:8049/uploads/Virtual%20Engineering%20-%20Scenario%20and%20Sync%20Demo.mp4", 30, 3.7, 21.6);
// video("https://x1.hcm-lab.id:8049/uploads/Virtual%20Engineering%20-%20Digital%20twin%20simulation.mp4", 14, 3.7, 21.6);
// video("https://x1.hcm-lab.id:8049/uploads/Virtual%20Engineering%20-%203D%20Scan%20and%20library%20platform.mp4", -2, 3.7, 21.6);
// video("https://x1.hcm-lab.id:8049/uploads/Virtual%20Engineering%20-%203D%20Scan%20and%20library%20platform.mp4", -18, 3.7, 21.6);
// /*---------------------------------------------------------Stand 4 Video-----------------------------------------*/
// video("https://x1.hcm-lab.id:8049/uploads/Virtual%20Engineering%20-%203D%20Scan%20and%20library%20platform.mp4", -45, 3.7, 46.6)
// video("https://x1.hcm-lab.id:8049/uploads/Virtual%20Engineering%20-%20Scenario%20and%20Sync%20Demo.mp4", -29, 3.7, 46.6)
// video("https://x1.hcm-lab.id:8049/uploads/Virtual%20Engineering%20-%20Digital%20twin%20simulation.mp4", -13, 3.7, 46.6)
// video("https://x1.hcm-lab.id:8049/uploads/Virtual%20Engineering%20-%203D%20Scan%20and%20library%20platform.mp4", 3, 3.7, 46.6)
// video("https://x1.hcm-lab.id:8049/uploads/Virtual%20Engineering%20-%203D%20Scan%20and%20library%20platform.mp4", 19, 3.7, 46.6)
// /*------------------------------XR Helper---------------------------------*/
// let teleportMaterial = new BABYLON.StandardMaterial("teleport", scene);
// teleportMaterial.backFaceCulling = false;
// teleportMaterial.diffuseColor = BABYLON.Color3.Red();
// // teleportMaterial.diffuseTexture = new BABYLON.Texture('/assets/biru.png', scene);


// const xrHelper = await scene.createDefaultXRExperienceAsync({
//     floorMeshes: [ground]
// });

// const fm = xrHelper.baseExperience.featuresManager;

// const xrTeleportation = fm.enableFeature(BABYLON.WebXRFeatureName.TELEPORTATION, 'stable' /* or latest */, {
//         xrInput: xrHelper.input,
//         floorMeshes: [ground],
//         defaultTargetMeshOptions: {
//             torusArrowMaterial: teleportMaterial,
//             teleportationFillColor: '#035bff',
//             teleportationBorderColor: 'red'
//         }
//     });

// const xrPhysics = fm.enableFeature(BABYLON.WebXRFeatureName.PHYSICS_CONTROLLERS, "latest", {
//     xrInput: xrHelper.input,
//     physicsProperties: {
//         restitution: 0.5,
//         impostorSize: 0.1,
//         impostorType: BABYLON.PhysicsImpostor.BoxImpostor
//     },
//     enableHeadsetImpostor: true
// });

// xrHelper.input.onControllerAddedObservable.add((controller) => {
//     controller.onMotionControllerInitObservable.add((motionController) => {
//         if (motionController.handness === 'left') {
//             const xButton = motionController.getComponent("x-button");
//             if(xButton){
//                 xButton.onButtonStateChangedObservable.add(() => {
//                     if(xButton.changes.pressed){
//                         if(xButton.pressed){
//                         panel.position.x = scene.activeCamera.position.x;
//                         panel.position.y = scene.activeCamera.position.y-1;
//                         panel.position.z = scene.activeCamera.position.z-3;
//                         button1.isVisible = !button1.isVisible;
//                         button2.isVisible = !button2.isVisible;
//                         button3.isVisible = !button3.isVisible;
//                         tvBox.isVisible = false;
//                         imagePlane.isVisible = false;
//                         }
//                     }
//                 })
//             }
//         }
//     })
// })
//---------------------------------Gizmo Manager (Interaktif VR)--------------------------------
            var gizmoManager = new BABYLON.GizmoManager(scene);
            gizmoManager.boundingBoxGizmoEnabled = false;
//------------------------------------Interaksi lewat Keyboard----------------------------------            
document.onkeydown = (e)=>{
    if(e.key == 'f'){
        console.log(scene.activeCamera.position.x + " " + scene.activeCamera.position.y + " " + scene.activeCamera.position.z);
                    panel.position.x = camera.position.x;
                    panel.position.y = scene.activeCamera.position.y-1;
                    panel.position.z = scene.activeCamera.position.z-3;
                    button1.isVisible = true;
                    button2.isVisible = true;
                    button3.isVisible = true;
    }

    if(e.key == 'r'){
        button1.isVisible = false;
        button2.isVisible = false;
        button3.isVisible = false;
        tvBox.isVisible = false;
        imagePlane.isVisible = false;
        plane3.isVisible = false;
    }

    if(e.key == 't'){
        gizmoManager.boundingBoxGizmoEnabled = !gizmoManager.boundingBoxGizmoEnabled;
    }
}            
            return scene;
}

        
///=====================ENGINE=================================
try {
    engine = createDefaultEngine();
} catch(e) {
    console.log("the available createEngine function failed. Creating the default engine instead");
    engine = createDefaultEngine();
}
        if (!engine) throw 'engine should not be null.';
        scene = createScene();;
        scene.then(returnedScene => { sceneToRender = returnedScene; });
        
        engine.runRenderLoop(function () {
            if (sceneToRender) {
                sceneToRender.render();
            }
        });

        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });