export const normalize = ({
    THREE,
    OrbitControls,
}) => {
    // 定义画布尺寸
    const width = 1000;
    const height = 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    const material2 = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
    const material3 = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    
    const cube1 = new THREE.Mesh(geometry, material1);
    const cube2 = new THREE.Mesh(geometry, material2);
    const cube3 = new THREE.Mesh(geometry, material3);

    cube1.position.x = -3;
    cube2.position.x = 0;
    cube3.position.x = 3;

    scene.add(cube1);
    scene.add(cube2);
    scene.add(cube3);

    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    camera.position.z = 10;

    const controls = new OrbitControls(camera, renderer.domElement);

    // 定义一个非单位向量作为旋转轴
    const axis = new THREE.Vector3(1, 2, 3);
    
    // 创建归一化的轴向量
    const normalizedAxis = new THREE.Vector3(1, 2, 3).normalize();

    function animate() {
        requestAnimationFrame(animate);

        // 使用非归一化轴旋转（较快/变形）
        cube1.rotateOnAxis(axis, 0.01);

        // 使用归一化轴旋转（正常速度）
        cube2.rotateOnAxis(normalizedAxis, 0.01);

        // 在每次旋转前归一化轴（正常速度，但效率较低）
        cube3.rotateOnAxis(axis.clone().normalize(), 0.01);

        controls.update();
        renderer.render(scene, camera);
    }

    animate();
};