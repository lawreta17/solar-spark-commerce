
import { useEffect, useRef } from "react";
import * as THREE from "three";
// Update the import path for OrbitControls
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface SolarPanelAnimationProps {
  className?: string;
}

const SolarPanelAnimation = ({ className }: SolarPanelAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initial setup
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);
    
    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Create solar panel model
    const createSolarPanel = () => {
      const group = new THREE.Group();
      
      // Panel frame
      const frameGeometry = new THREE.BoxGeometry(3, 2, 0.1);
      const frameMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
      const frame = new THREE.Mesh(frameGeometry, frameMaterial);
      group.add(frame);
      
      // Glass panel
      const glassGeometry = new THREE.BoxGeometry(2.9, 1.9, 0.05);
      const glassMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x2c3e50,
        shininess: 100,
        specular: 0x111111
      });
      const glass = new THREE.Mesh(glassGeometry, glassMaterial);
      glass.position.z = 0.075;
      group.add(glass);
      
      // Solar cells
      const cellSize = 0.45;
      const cellGeometry = new THREE.BoxGeometry(cellSize, cellSize, 0.01);
      const cellMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x0c4a6e,
        shininess: 30
      });
      
      const rows = 3;
      const cols = 5;
      const cellSpacing = 0.1;
      
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const cell = new THREE.Mesh(cellGeometry, cellMaterial);
          const xPos = -1.2 + j * (cellSize + cellSpacing);
          const yPos = -0.75 + i * (cellSize + cellSpacing);
          cell.position.set(xPos, yPos, 0.11);
          group.add(cell);
        }
      }
      
      // Support structure
      const supportGeometry = new THREE.BoxGeometry(2, 0.1, 0.5);
      const supportMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
      const support = new THREE.Mesh(supportGeometry, supportMaterial);
      support.position.set(0, -1, -0.2);
      support.rotation.x = Math.PI / 8;
      group.add(support);
      
      return group;
    };
    
    const solarPanel = createSolarPanel();
    scene.add(solarPanel);
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-full min-h-[300px] ${className || ""}`}
    />
  );
};

export default SolarPanelAnimation;
