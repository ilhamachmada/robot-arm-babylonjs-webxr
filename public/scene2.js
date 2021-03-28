var simulation = function(scene){
    // Ground 
    var plane = BABYLON.MeshBuilder.CreateGround("plane",{height: 100, width: 100},scene);
    plane.physicsImpostor = new BABYLON.PhysicsImpostor(plane, BABYLON.PhysicsImpostor.PlaneImpostor, {mass: 0, friction: 0.5}, scene);
    plane.checkCollisions = true;
    // Object 
    BABYLON.SceneLoader.ImportMesh("", "https://x1.hcm-lab.id:3001/","upload/cube/cube.gltf", scene, function (mesh, particle, skeleton) {
    var mesh1_model= mesh[0]
    mesh1_model.position = new BABYLON.Vector3(0, 3, 0);
    mesh1_model.physicsImpostor = new BABYLON.PhysicsImpostor(mesh1_model, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 1, restitution: 0.9}, scene);
    mesh1_model.checkCollisions = true;
    mesh1_model.scaling = new BABYLON.Vector3(1, 1, 1);
    var mesh1_modelEuler = mesh1_model.rotationQuaternion.toEulerAngles()
    mesh1_model.rotation = new BABYLON.Vector3(mesh1_modelEuler.x, mesh1_modelEuler.y, mesh1_modelEuler.z);
    // Rotation 
    undefined})
    }