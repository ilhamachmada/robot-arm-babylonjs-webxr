var createScene = function () {

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0)); 
    scene.getPhysicsEngine().setTimeStep(0.25 / 60);
    
    //=================CAMERA===============
    var camera = new BABYLON.VRDeviceOrientationFreeCamera("camera", new BABYLON.Vector3(0, 1.6, -7), scene);
    camera.speed = 0.4
    camera.checkCollisions = true;
    //camera.applyGravity
    camera.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.9;

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

    // Our built-in 'sphere' shape.
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);

    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;

    // Our built-in 'ground' shape.
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 25, height: 25}, scene);
    
    /* var plane = BABYLON.Mesh.CreatePlane("plane", 5);
    plane.position = new BABYLON.Vector3(-4, 4, -1);
    plane.addChild(youtube); */
    var youtube = document.createElement("iframe");
    youtube.src = "https://www.bing.com"
    document.body.appendChild(youtube);
    //css di js
    youtube.style.position = "absolute";
    youtube.style.bottom = "100px";
	youtube.style.right = "40px";
	youtube.style.width = '600px';
	youtube.style.height = "600px";

    /* function css3Transform() {
    // Code for Safari
    var posX = camera.position.x;
    var posY = camera.position.y;
    var posZ = camera.position.z;
    var rotX = camera.rotation.x * 100;
    var rotY = camera.rotation.y * 100;
    var rotZ = camera.rotation.z * 100;
     //console.log(camera.rotation)
    //rotation
    youtube.style.webkitTransform = "translateZ(-100px) rotateY("+rotY+"deg) rotateX("+rotX+"deg)"; //for safari and chrome
    youtube.style.MozTransform = "translateZ(-100px) rotateY("+rotY+"deg) rotateX("+rotX+"deg)"; //for firefox
//perspective
     var rotation = window.getComputedStyle(youtube).getPropertyValue('transform');
    youtube.style.transform = rotation+("perspective(50px) translate3d("+posX+"px,"+posY+"px,"+posZ+"px)"); 
    } */
    /* scene.registerBeforeRender(function(){
    
    css3Transform();
     }) */
     

    return scene;

};