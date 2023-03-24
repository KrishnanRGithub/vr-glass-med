window.addEventListener('DOMContentLoaded', async () => {
    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });

    // const resizeGLTF = async (mesh, size) => {
    //     for (i = 0; i < mesh.length; i++) {
    //         mesh[i].scaling = new BABYLON.Vector3(size, size, size);
    //     }
    // }
    const createScene = async () => {
        const scene = new BABYLON.Scene(engine);
        const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 4, 3, new BABYLON.Vector3(0, 1, 0), scene);
        camera.attachControl(canvas, true);
        camera.lowerRadiusLimit = 2;
        camera.upperRadiusLimit = 10;
        camera.wheelPrecision = 100;

        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        // Load glTF model
        const modelPath = 'gun/';
        const modelFile = 'scene.gltf';
        const modelTask = BABYLON.SceneLoader.AppendAsync(modelPath, modelFile, scene);
        const modelList = await modelTask
        const model = modelList.meshes[0];
        model.position = new BABYLON.Vector3(0, 0, 0);
        model.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2);

        // Enable WebXR
        const xrHelper = await scene.createDefaultXRExperienceAsync({});

        return scene;
    };

    const scene = await createScene();

    engine.runRenderLoop(() => {
        scene.render();
    });

    window.addEventListener('resize', () => {
        engine.resize();
    });
});