export const createBufferGeometry = ({
    THREE,
    OrbitControls,
    GLTFLoader,
    Stats,
    GUI
}) => {
    const scene = new THREE.Scene()

    // 创建一个空的几何体对象
    const buffer = new THREE.BufferGeometry()

    // 类型数组创建顶点数据
    // const vertices = new Float32Array([
    //     5,50,-10,
    //     50,0,0,
    //     0,100,0,
    //     0,0,10,
    //     0,0,100,
    //     50,0,10,
    // ])
    // 所有顶点都是逆时针，实现一个正方形平面
    const vertices = new Float32Array([
        0, 0, 0, //顶点1坐标
        80, 0, 0, //顶点2坐标
        80, 80, 0, //顶点3坐标
    
        // 80, 80, 0, //顶点6坐标
        0, 80, 0, //顶点5坐标  和顶点3位置相同
        // 0, 0, 0, //顶点4坐标   和顶点1位置相同
    ]);

    const indexes = new Uint16Array([
        0, 1, 2, 0, 3, 2
    ])

    // 矩形平面，无索引，两个三角形，6个顶点
    // 每个顶点的法线数据和顶点位置数据一一对应
    // const normals = new Float32Array([
    //     0, 0, 1, //顶点1法线( 法向量 )
    //     0, 0, 1, //顶点2法线
    //     0, 0, 1, //顶点3法线
    //     0, 0, 1, //顶点4法线
    //     0, 0, 1, //顶点5法线
    //     0, 0, 1, //顶点6法线
    // ]);
    // 矩形平面，有索引，两个三角形，有2个顶点重合，有4个顶点
    // 每个顶点的法线数据和顶点位置数据一一对应
    const normals = new Float32Array([
        0, 0, 1, //顶点1法线( 法向量 )
        0, 0, 1, //顶点2法线
        0, 0, 1, //顶点3法线
        0, 0, 1, //顶点4法线
    ]);

    // 设置几何体的顶点法线属性.attributes.normal
    buffer.attributes.normal = new THREE.BufferAttribute(normals, 3); 

    // 创建属性缓冲区对象
    const attribute = new THREE.BufferAttribute(vertices, 3)

    // 索引数据赋值给几何体的index属性
    buffer.index = new THREE.BufferAttribute(indexes, 1)

    // 设置几何体attributes属性的位置属性
    buffer.attributes.position = attribute

    // 点渲染模式
    // const material = new THREE.PointsMaterial({
    //     color: 0xff0000,
    //     size: 10 // 点对象像素尺寸
    // })

    // const points = new THREE.Points(buffer, material)

    // scene.add(points)

    // 线材质对象
    const material = new THREE.MeshLambertMaterial({
        color: 0xff0000,
        side: THREE.DoubleSide, //两面可见
    })

    // 创建线模型对象
    const line = new THREE.Line(buffer, material) // 连续但不闭合
    // const line = new THREE.LineLoop(buffer, material) // 连续且闭合
    // const line = new THREE.LineSegments(buffer, material) // 不连续，两点相连

    scene.add(line)

    // 光照
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 150, 0);
    scene.add(directionalLight);

    // 辅助线
    // const axesHelper = new THREE.AxesHelper(300);
    // scene.add(axesHelper);


    const width = 300;
    const height = 300;

    const camera = new THREE.PerspectiveCamera()
    camera.position.set(300, 300, 300)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({
        antialias: true // 开启抗锯齿
    })
    renderer.setSize(width, height)

    renderer.render(scene, camera)

    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0); // 和lookAt设置一致

    // 添加动画后可以不再监听，动画渲染时会持续调用renderer.render
    controls.addEventListener("change", function () {
        renderer.render(scene, camera);

        // 浏览器控制台查看相机位置变化
        // console.log("camera.position", camera.position);
    });
}