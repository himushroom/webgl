export const createMultiple = ({THREE, OrbitControls}) => {
    // 定义画布尺寸
    const width = 1000;
    const height = 300;

    const scene = new THREE.Scene()

    const geometry = new THREE.BoxGeometry(100, 100, 100)
    const material = new THREE.MeshLambertMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0.7
    })

    // for(let i = 0; i < 7; i++){
    //     const mesh = new THREE.Mesh(geometry, material);
    //     mesh.position.set(120 * (i - 3), 50, 0)
    //     scene.add(mesh)
    // }
    // 阵列
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
            // 在XOZ平面上分布
            mesh.position.set((i - 4) * 120, 50, (j - 4) * 120);
            scene.add(mesh); //网格模型添加到场景中  
        }
    }

    // 辅助观察坐标系(坐标系坐标轴线段尺寸大小)
    // 红R、绿G、蓝B分别对应坐标系的x、y、z轴
    const axesHelper = new THREE.AxesHelper(1000);
    scene.add(axesHelper);

    // 环境光
    // 没有特定的方向，整体改变场景的光照明暗
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    // 平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // 设置光源方向
    directionalLight.position.set(0, 150, 0);
    // 方向光的指向对象，不设置时默认位置为(0, 0, 0)
    // directionalLight.target = mesh;
    scene.add(directionalLight);

    // 远小近大，fov越大视角越远，fov越小视角越近
    // 视锥体（fov, aspect, near, far）之内的物体才会被渲染
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000)
    camera.position.set(300, 1500, 800)

    camera.lookAt(360, 0, 0)
    
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(width, height)
    renderer.render(scene, camera)

    document.body.appendChild(renderer.domElement)

    // 相机控件OrbitControls会影响lookAt设置！！（重要！！）
    // 需要手动设置OrbitControls的目标参数
    // 默认的目标是(0, 0, 0)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(360, 0, 0); // 和lookAt设置一致

    // 添加动画后可以不再监听，动画渲染时会持续调用renderer.render
    controls.addEventListener("change", function () {
        renderer.render(scene, camera);

        // 浏览器控制台查看相机位置变化
        // console.log("camera.position", camera.position);
    });
}
