export const rotateOnWorldAxis = ({
    THREE,
    OrbitControls,
}) => {
    // 定义画布尺寸
    const width = 600;
    const height = 300;
    // 设置场景、相机和渲染器
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    // 创建两个立方体
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    const material2 = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
    const cube1 = new THREE.Mesh(geometry, material1);
    const cube2 = new THREE.Mesh(geometry, material2);

    // 将立方体放置在不同的位置
    cube1.position.x = -3;
    cube2.position.x = 3;

    scene.add(cube1);
    scene.add(cube2);

    // 添加坐标轴辅助工具
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // 设置相机位置
    camera.position.z = 10;

    // 添加轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);

    // 定义旋转轴（例如，沿着 y 轴）
    const axis = new THREE.Vector3(0, 1, 0).normalize();

    // 动画循环
    function animate() {
        requestAnimationFrame(animate);

        // 使用 rotateOnWorldAxis 旋转第一个立方体
        // 红色立方体（左侧）会始终围绕世界坐标系的 Y 轴旋转，即使它在倾斜。
        cube1.rotateOnWorldAxis(axis, 0.01);

        // 使用 rotateOnAxis 旋转第二个立方体
        // 蓝色立方体（右侧）的旋转会随着其倾斜而改变，因为它是相对于自身的局部坐标系旋转的。
        cube2.rotateOnAxis(axis, 0.01);

        // 稍微倾斜两个立方体，以显示差异
        cube1.rotation.x += 0.005;
        cube2.rotation.x += 0.005;

        controls.update();
        renderer.render(scene, camera);
    }

    animate();
}