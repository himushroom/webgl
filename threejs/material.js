export const createMaterial = ({ THREE, OrbitControls }) => {
    // 定义画布尺寸
    const width = 1000;
    const height = 500;

    const scene = new THREE.Scene();

    const material = new THREE.MeshLambertMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0.7,
        // 以下仅针对平面图形，默认正面可见
        // side: THREE.FrontSide, // 渲染正面
        // side: THREE.BackSide, // 渲染反面
        side: THREE.DoubleSide // 渲染正反面
    });

    // 长方体、圆柱体、球体、平面、圆环、圆锥
    const geometryTypes = [
        "BoxGeometry",
        "CylinderGeometry",
        "SphereGeometry",
        "PlaneGeometry",
        "CircleGeometry",
        "ConeGeometry"
    ];
    const materialTypes = [
        {
            type: "MeshBasicMaterial",
            params: {
                color: 0xff0000,
                side: THREE.DoubleSide,
                wireframe:true,//线条模式渲染mesh对应的三角形数据
            }
        },
        {
            // 镜面反射
            type: "MeshPhongMaterial",
            params: {
                color: 0xff0000,
                // 另外两个材质不支持shininess和specular属性
                shininess: 25, // 高光部分的亮度，默认30
                specular: 0x444444, // 高光部分的颜色
                side: THREE.DoubleSide,
                wireframe:true,//线条模式渲染mesh对应的三角形数据
            }
        },
        {
            // 漫反射
            type: "MeshLambertMaterial",
            params: {
                color: 0x00ff00,
                side: THREE.DoubleSide,
                wireframe:true,//线条模式渲染mesh对应的三角形数据
            }
        },
    ];

    for (let x = 0; x < materialTypes.length; x++) {
        const material = new THREE[materialTypes[x].type](
            materialTypes[x].params
        );

        for (let i = 0; i < geometryTypes.length; i++) {
            const geometry = new THREE[geometryTypes[i]](50, 50, 100); // 几何体的参数数量不相同，但是-无所谓HH

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(120 * (i - 3) + 50, 50, 200 * (x - 1.5));
            scene.add(mesh);
        }
    }

    // 辅助观察坐标系(坐标系坐标轴线段尺寸大小)
    // 红R、绿G、蓝B分别对应坐标系的x、y、z轴
    const axesHelper = new THREE.AxesHelper(1000);
    scene.add(axesHelper);

    // 环境光
    // 没有特定的方向，整体改变场景的光照明暗
    const ambient = new THREE.AmbientLight(0xffffff, 0);

    scene.add(ambient);

    // 平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // 设置光源方向
    directionalLight.position.set(0, -100, 150);
    // 方向光的指向对象，不设置时默认位置为(0, 0, 0)
    // directionalLight.target = mesh;
    scene.add(directionalLight);

    // 远小近大，fov越大视角越远，fov越小视角越近
    // 视锥体（fov, aspect, near, far）之内的物体才会被渲染
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    camera.position.set(0, 400, 400);

    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
        antialias:true, // 开启抗锯齿
    });

    // 不同硬件设备的屏幕的设备像素比window.devicePixelRatio值可能不同
    console.log('查看当前屏幕设备像素比',window.devicePixelRatio);
    // 获取屏幕对应的设备像素比.devicePixelRatio告诉threejs，以免渲染模糊问题
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.setClearColor(0x444444, 1); //设置背景颜色

    renderer.setSize(width, height);
    renderer.render(scene, camera);

    document.body.appendChild(renderer.domElement);

    // 相机控件OrbitControls会影响lookAt设置！！（重要！！）
    // 需要手动设置OrbitControls的目标参数
    // 默认的目标是(0, 0, 0)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0); // 和lookAt设置一致

    // 添加动画后可以不再监听，动画渲染时会持续调用renderer.render
    controls.addEventListener("change", function () {
        renderer.render(scene, camera);

        // 浏览器控制台查看相机位置变化
        // console.log("camera.position", camera.position);
    });
};
