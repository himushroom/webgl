export const createBase = ({THREE, OrbitControls, GLTFLoader, Stats}) => {
    // 定义画布尺寸
    const width = 300;
    const height = 300;
    
    // 创建三维场景
    const scene = new THREE.Scene();
    
    // 物体形状
    const boxGeometry = new THREE.BoxGeometry(100, 100, 100); // 长方体
    // const CylinderGeometry = new THREE.CylinderGeometry(); // 圆柱体
    // const SphereGeometry = new THREE.SphereGeometry(); // 球体
    // const ConeGeometry = new THREE.ConeGeometry(); // 圆锥
    // const PlaneGeometry = new THREE.PlaneGeometry(); // 矩形平面
    // const CircleGeometry = new THREE.CircleGeometry(); // 圆平面
    
    // 形状的一些方法
    // const WireframeGeometry = new THREE.WireframeGeometry(Geometry); // 线框
    // const EdgesGeometry = new THREE.EdgesGeometry(Geometry); // 边缘信息
    
    /** 物体外观：材质
     * MeshBasicMaterial  网络基础材质  -- 不受光照影响
     * MeshLambertMaterial  网络漫反射材质，创建一个不光滑的表面，不产生镜面高光，受光照影响，可以产生阴影效果
     * MeshStandardMaterial  MeshPhysicalMaterial 物理材质
     * PointsMaterial  点材质，用于创建点云或粒子系统（星空或宇宙模拟），可以渲染大量的点  -- 不受光照影响
     * LineBasicMaterial  线基础材质
     * SpriteMaterial  精灵材质，通常用于粒子系统（雨/雪/火花）、图标、标签，关键特性：始终面向相机（二维）  -- 不受光照影响
     * MeshPhongMaterial 高光材质，比物理材质计算量小（裹着塑料膜的感觉）
     */
    // 材质可以叠加吗？见material-overlay
    const material = new THREE.MeshLambertMaterial({
        color: 0xff0000,
        transparent: true, // 开启透明
        opacity: 0.8 // 设置透明度
    });
    
    // 物体：网格模型
    const mesh = new THREE.Mesh(boxGeometry, material);
    
    // 模型位置（基于坐标轴中心）
    mesh.position.set(0, 0, 0);
    
    // 将物体添加到场景中
    scene.add(mesh);
    
    /** 透视投影相机（类似于人眼，常用）
     * 视锥体（fov, aspect, near, far）之内的物体才会被渲染
     * fov  视场（摄像机展开的角度）  default: 50
     * aspect  宽高比=width/height  default: 1
     * near  相机视锥体近裁截面到相机的距离=最近可以看到的  default: 0.1
     * far  相机视锥体远裁截面到相机的具体=最远可以看到的  default: 2000
     */
    const camera = new THREE.PerspectiveCamera();
    
    camera.position.set(200, 300, 400);
    
    // 相机观察目标
    camera.lookAt(mesh.position);
    
    /** 光源
     * AmbientLight 环境光
     * PointLight 点光源
     * SpotLight 聚光灯光源
     * DirectionalLight 平行光
     */
    
    // 点光源：两个参数分别表示光源颜色和光照强度
    // 参数1：0xffffff是纯白光,表示光源颜色
    // 参数2：intensity  1.0,表示光照强度，可以根据需要调整
    // decay 光源衰减，默认值是2.0，0.0不衰减
    const pointLight = new THREE.PointLight(0xfff000, 2.0);
    
    //点光源位置
    pointLight.position.set(150, 150, 150);
    
    // scene.add(pointLight);
    
    // 点光源辅助观察PointLightHelper
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
    scene.add(pointLightHelper);
    
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
    
    // 平行光辅助观察DirectionalLightHelper
    const directionalLightHelper = new THREE.DirectionalLightHelper(
        directionalLight,
        5,
        0xffffff
    );
    scene.add(directionalLightHelper);
    
    // 辅助观察坐标系(坐标系坐标轴线段尺寸大小)
    // 红R、绿G、蓝B分别对应坐标系的x、y、z轴
    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);
    
    // 创建渲染器对象
    const renderer = new THREE.WebGLRenderer();
    
    // 定义渲染区域尺寸
    renderer.setSize(width, height);
    
    // 创建stats对象，查看FPS使用情况
    const stats = new Stats();
    stats.domElement.style.transform = "translate(20px, 20px)";
    //stats.domElement:web页面上输出计算结果,一个div元素，
    document.body.appendChild(stats.domElement);
    
    // 将场景渲染到画布上
    // 计算两帧渲染时间间隔和帧率
    const clock = new THREE.Clock();
    function render() {
        //requestAnimationFrame循环调用的函数中调用方法update(),来刷新时间
        stats.update();
        // const spt = clock.getDelta() * 1000; //毫秒
        // console.log("两帧渲染时间间隔(毫秒)", spt);
        // console.log("帧率FPS", 1000 / spt);
        renderer.render(scene, camera); //执行渲染操作
        mesh.rotateY(0.001); // 自转0.001弧度
        requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
    }
    render();
    document.body.appendChild(renderer.domElement);
    
    const controls = new OrbitControls(camera, renderer.domElement);
    // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
    // 添加动画后可以不再监听，动画渲染时会持续调用renderer.render
    // controls.addEventListener("change", function () {
    //     renderer.render(scene, camera);
    //     // 浏览器控制台查看相机位置变化
    //     console.log("camera.position", camera.position);
    // });
}