import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"; 
import {FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";




// scene
const scene = new THREE.Scene();


// camera
const camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(-2.78,1.044,1.425);
camera.rotation.set(0.016,-0.629,0.009);

scene.add(camera);

// axes helper
const axesHelper = new THREE.AxesHelper( 5 );
//scene.add( axesHelper );



//lights

const light = new THREE.PointLight( 0xffffff,1, 100 );
light.position.set( 5,0.5,5 );
scene.add( light );

const light1 = new THREE.PointLight( 0xffffff,1, 100 );
light1.position.set( 5,0.5,5 );
scene.add( light1 );


const sphereSize = 0.1;
const pointLightHelper = new THREE.PointLightHelper( light, sphereSize );
//scene.add( pointLightHelper );

const sphereSize2 = 0.1;
const pointLightHelper1 = new THREE.PointLightHelper( light1, sphereSize2 );
//scene.add( pointLightHelper1 );

const dl = new THREE.DirectionalLight(0xffffff, 1)
dl.position.set(5,0,0);
scene.add( dl );

const dl2 = new THREE.DirectionalLight(0xffffff, 1)
dl2.position.set(-5,0,0);
scene.add( dl2 );


//model loader


const loadingmanager = new THREE.LoadingManager();
let obj = new THREE.Object3D();

const loader = new FBXLoader(loadingmanager);
loader.load('data/pp5.fbx',(fbx)=> {
  
  fbx.rotation.y = -Math.PI/2;
  fbx.scale.multiplyScalar(0.02); 
  console.log(obj);
  fbx.position.set(0,0,0);
  obj = fbx;
  

});

// materials for model 

// back
const texture = new THREE.TextureLoader().load( 'data/noise.png' , function(tex) {
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
});

const materialb = new THREE.MeshStandardMaterial({
  
  side:THREE.DoubleSide,
  
  map:texture,
  
  
  flatShading : true
  
})

// frame
const materialp = new THREE.MeshStandardMaterial({
  side:THREE.DoubleSide,
  roughness:0.224,
  metalness:0.7,

  

})


// cam module
const texturecmf = new THREE.TextureLoader().load('data/noise.png' , (tex)=>{
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
});
const materialcmf = new THREE.MeshStandardMaterial({
  side:THREE.DoubleSide,
  map:texturecmf,
  roughness:0.4,
  metalness:0.3,
  

})

// cam lens borders
const materialcm = new THREE.MeshStandardMaterial({
  map: texturecmf,

  side:THREE.DoubleSide,
  roughness:0.5,
  metalness:0,
  

})

// logo at back
const materiallogo = new THREE.MeshStandardMaterial({
  side:THREE.DoubleSide,
  metalness:1,
  roughness:0,
  color:0xffffff
  
});


  // camera 3

  
  const materialcam3 = new THREE.MeshStandardMaterial({
    side:THREE.DoubleSide,
    color:0x000000,
    roughness:0.3,
    
    metalness:1
  
  });

// screen material

const textscreen = new THREE.TextureLoader().load('data/wallpaper.png',function(tex){
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
});
const materialscreen = new THREE.MeshStandardMaterial({
  side : THREE.DoubleSide,
  roughness : 0.6,
  metalness: 1,
  
  
  map:textscreen
})


const textfcam = new THREE.TextureLoader().load('data/cam2.png',function(tex){
  
});
const materialcamfront = new THREE.MeshStandardMaterial({
  side : THREE.DoubleSide,
  map :textfcam,
  roughness : 0,
  metalness:1,

})

loadingmanager.onLoad =function ( ) {
  
 obj.traverse(function (child){
if(child.isMesh){
  console.log(child.name);
    if(child.name == 'Back'){
      child.material = materialb;
    }
    if(child.name === 'S21ULTRA'){
      child.material = materialp;
    }
    if(child.name === 'CamModuleFrame'){
      child.material = materialcmf;
    }
    if(child.name === 'CamModule'){
      child.material = materialcm;
    }
    if(child.name === 'Logo'){
      child.material = materiallogo;

    }
    if(child.name === 'Camera3'){
      child.material = materialcam3;
    }
    if(child.name === 'Screen'){
      child.material = materialscreen;
      
      
    }
    if(child.name === 'ScreenBezel'){
      child.material = materialcmf;
      
      
    }
    if(child.name === 'PowerButton'){
      child.material = materialcmf;
      
      
    }
    if(child.name === 'FrontCamera'){
      child.material = materialcamfront;
      
      
    }
    if(child.name === 'LensFC'){
      child.material = materialcamfront;
      
      
    }
}


 })
 scene.add(obj);
	console.log( 'Loading complete!');

}





// renderer
const canvas = document.getElementById('web');
const controller = new OrbitControls(camera,canvas);



const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias : true
  

});

renderer.setSize( window.innerWidth, window.innerHeight );
window.addEventListener( 'resize', onWindowResize, false );

animate();



function animate() {
  
  requestAnimationFrame( animate );
  
  light.position.x = 2 * Math.cos(Date.now() * 0.0002);
  light.position.z = 2 * Math.sin(Date.now() * 0.0002);
  light1.position.x = -2 * Math.sin(Date.now() * 0.0002);
  light1.position.z = -2 * Math.cos(Date.now() * 0.0002);
  
  renderer.render( scene, camera );

	
}



function onWindowResize(){

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  
  renderer.setSize( window.innerWidth, window.innerHeight );

}


