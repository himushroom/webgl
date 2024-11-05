// 创建一个立方体
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

// 默认旋转（围绕立方体中心）
cube.rotation.y = Math.PI / 4;

// 改变旋转中心（方法1：调整位置）
cube.position.x = 0.5;  // 将立方体向右移动半个单位
cube.rotation.y = Math.PI / 4;  // 现在旋转会围绕立方体的左边缘进行

// 改变旋转中心（方法2：使用Group）
const group = new THREE.Group();
group.add(cube);
cube.position.x = 0.5;  // 将立方体在组内向右移动
group.rotation.y = Math.PI / 4;  // 旋转组，立方体会围绕组的中心旋转

// 改变旋转中心（方法3：修改几何体）
geometry.translate(0.5, 0, 0);  // 将几何体向右移动，改变其中心点
cube.rotation.y = Math.PI / 4;  // 现在旋转会围绕立方体的左边缘进行


// rotateOnWorldAxis  围绕某个点旋转
// cube.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI / 4);  // 围绕世界坐标系的y轴旋转45度
// cube.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 4);  // 围绕局部坐标系的y轴旋转45度