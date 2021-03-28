var createScene = () => {

    var scene = new BABYLON.Scene(engine);
    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0)); 
    scene.getPhysicsEngine().setTimeStep(0.25 / 60);
    
    //=================CAMERA===============
    var camera = new BABYLON.VRDeviceOrientationFreeCamera("camera", new BABYLON.Vector3(0, 1.6, -7), scene);
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
    
    var ground = BABYLON.Mesh.CreateGround("ground", 50, 50, 1, scene);
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution:0.8, friction:0.6 }, scene);


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
    });
    
    return scene;
    
    };
    