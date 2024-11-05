export const changeColor = ({THREE}) => {
    // 创建一个颜色对象
    // const color = new THREE.Color();//默认是纯白色0xffffff。
    
    // 查看Color对象设置0x00ff00对应的的.r、.g、.b值
    const color = new THREE.Color(0x2e8b57);

    color.r = 0.0;
    color.b = 0.0;

    console.log('查看颜色对象结构', color); // 可以查看rgb的值

    color.setRGB(0,1,0);//RGB方式设置颜色
    color.setHex(0x00ff00);//十六进制方式设置颜色
    color.setStyle('#00ff00');//前端CSS颜色值设置颜色

    // .setHex()、.setStyle()风格的颜色值都可以作为.set()的参数
    color.set(0x00ff00);//十六进制方式设置颜色
    color.set('#00ff00');//前端CSS颜色值设置颜色

    // 模型颜色重置
    // ①
    material.color.set(0x00ffff);
    // ②
    material.color.set('#00ff00');
    // ③
    material.color.set('rgb(0,255,0)');
}