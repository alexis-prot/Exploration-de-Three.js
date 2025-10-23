import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Experience {
    constructor(){
        this.sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
        }
        this.canvas = document.querySelector('.webgl');

        // Scene
        this.scene = new THREE.Scene();
        this.clock = new THREE.Clock();
        console.log(this.clock);
        

        this.init();
    }

    init(){
        window.addEventListener('resize', this.resize.bind(this));

        this.createCamera();

        this.createCube();
        this.createSphere();
        this.createTorus();
        this.createIsosphere();
        this.createCylindre();

        this.createRenderer();
        this.animate();
    }

    createCamera(){
        // Camera
        this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height);
        this.camera.position.x = -20;
        this.camera.position.y = -1;
        this.camera.position.z = -30;
        this.scene.add(this.camera);

        // Ajout orbit controls
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;
    }

    createCube(){
        // Cube Rouge
        const geometry = new THREE.BoxGeometry(1, 1, 1, 10, 10, 10); // Size (voir hover parametre)
        const material = new THREE.MeshMatcapMaterial({
            color: '#ff0000',
            //wireframe: true,
        });
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);
    }

    createSphere(){
        // Sphere
        const geometry = new THREE.SphereGeometry(15, 64, 64);
        const material = new THREE.MeshMatcapMaterial({
            color: '#ff00ff',
        });
        this.sphere = new THREE.Mesh(geometry, material);
        this.scene.add(this.sphere);
    }

    createTorus(){
        // Torus
        const geometry = new THREE.TorusKnotGeometry(10, 3, 48, 32);
        const material = new THREE.MeshBasicMaterial({
            color: '#ADFC92',
            wireframe: true,
        });
        this.torus = new THREE.Mesh(geometry, material);
        this.torus.position.x = -40;
        this.torus.position.y = 20;
        this.torus.position.z = 0;
        this.scene.add(this.torus);
    }

    createIsosphere(){
        // Isosphere
        const geometry = new THREE.IcosahedronGeometry(15, 1);
        const material = new THREE.MeshBasicMaterial({
            color: '#1365ff',
            wireframe: true,
        });
        this.iso = new THREE.Mesh(geometry, material);
        this.iso.position.x = 40;
        this.iso.position.y = 20;
        this.iso.position.z = 20;
        this.scene.add(this.iso);
    }

    createCylindre(){
        // Cylindre
        const geometry = new THREE.CylinderGeometry(5, 5, 60, 30);
        const material = new THREE.MeshBasicMaterial({
            color: '#ffc813',
        });
        this.cylindre = new THREE.Mesh(geometry, material);
        this.cylindre.position.x = 30;
        this.cylindre.position.y = -10;
        this.cylindre.position.z = -40;
        this.scene.add(this.cylindre);
    }

    createRenderer(){
        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
        });
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.render(this.scene, this.camera);
    }

    animate(){
        const elapsedTime = this.clock.getElapsedTime();
        this.cube.rotation.y = elapsedTime * 0.5;

        this.torus.rotation.x = elapsedTime * 0.1;
        this.torus.rotation.z = elapsedTime * 0.25;

        this.cylindre.position.y = elapsedTime * 2;

        this.controls.update

        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize(){
        // Maj sizes
        this.sizes.width = window.innerWidth;
        this.sizes.height = window.innerHeight;

        // Maj camera
        this.camera.aspect = this.sizes.width / this.sizes.height;
        this.camera.updateProjectionMatrix();

        // Maj renderer
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.render(this.scene, this.camera);
    }
}