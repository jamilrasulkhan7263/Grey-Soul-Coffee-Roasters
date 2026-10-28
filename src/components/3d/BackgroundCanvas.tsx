import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createCoffeeBeanGeometry } from './CoffeeBeanGeometry';

export const BackgroundCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x1E1E1E, 0.026);

    const camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    containerRef.current.appendChild(renderer.domElement);

    // Warm Espresso & Roasted Amber studio lighting
    const ambientLight = new THREE.AmbientLight(0x2a2a2a, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xD4A373, 1.4); // Warm Roasted Amber
    keyLight.position.set(6, 10, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xFAEDCD, 0.7); // Cream Oat
    rimLight.position.set(-6, -5, -2);
    scene.add(rimLight);

    // Master scene group for scroll/parallax transformation
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // --- 1. COFFEE BEAN MESHES (#2B2B2B with #D4A373 Crease) ---
    const beanCount = isSoftwareGl ? 24 : 48;
    const beanGeom = createCoffeeBeanGeometry(0.38);

    const beanMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.38,
      metalness: 0.18,
    });

    const beanMesh = new THREE.InstancedMesh(beanGeom, beanMat, beanCount);
    beanMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    worldGroup.add(beanMesh);

    interface BeanInstance {
      pos: THREE.Vector3;
      rot: THREE.Euler;
      rotSpeed: THREE.Vector3;
      baseDriftSpeed: number;
      swayFreq: number;
      swayAmp: number;
      scale: number;
      depthFactor: number;
    }

    const beans: BeanInstance[] = [];
    const dummy = new THREE.Object3D();

    for (let i = 0; i < beanCount; i++) {
      const zPos = (Math.random() - 0.5) * 14 - 1;
      const depthFactor = 0.5 + (zPos + 8) / 16;

      const data: BeanInstance = {
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 24,
          (Math.random() - 0.5) * 20,
          zPos
        ),
        rot: new THREE.Euler(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ),
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.3
        ),
        baseDriftSpeed: (0.15 + Math.random() * 0.25) * (0.8 + depthFactor * 0.4),
        swayFreq: 0.6 + Math.random() * 0.8,
        swayAmp: 0.2 + Math.random() * 0.3,
        scale: 0.7 + Math.random() * 0.6 * depthFactor,
        depthFactor,
      };

      beans.push(data);

      dummy.position.copy(data.pos);
      dummy.rotation.copy(data.rot);
      dummy.scale.setScalar(data.scale);
      dummy.updateMatrix();
      beanMesh.setMatrixAt(i, dummy.matrix);
    }
    beanMesh.instanceMatrix.needsUpdate = true;

    // --- 2. VAPOR / AROMA NODES (Warm Roasted Amber / Cream Oat glow) ---
    const createWarmSteamTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        grad.addColorStop(0, 'rgba(212, 163, 115, 0.4)');
        grad.addColorStop(0.35, 'rgba(250, 237, 205, 0.22)');
        grad.addColorStop(0.7, 'rgba(212, 163, 115, 0.08)');
        grad.addColorStop(1, 'rgba(212, 163, 115, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 128, 128);
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    const steamTex = createWarmSteamTexture();

    const steamNodeCount = isSoftwareGl ? 35 : 75;
    const steamGeom = new THREE.BufferGeometry();
    const steamPos = new Float32Array(steamNodeCount * 3);
    const steamSizes = new Float32Array(steamNodeCount);
    const steamDriftSpeed = new Float32Array(steamNodeCount);
    const steamWiggle = new Float32Array(steamNodeCount);
    const steamDepths = new Float32Array(steamNodeCount);

    for (let i = 0; i < steamNodeCount; i++) {
      steamPos[i * 3] = (Math.random() - 0.5) * 26;
      steamPos[i * 3 + 1] = -12 + Math.random() * 24;
      steamPos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;

      steamSizes[i] = 1.0 + Math.random() * 1.8;
      steamDriftSpeed[i] = 0.012 + Math.random() * 0.02;
      steamWiggle[i] = Math.random() * Math.PI * 2;
      steamDepths[i] = 0.6 + Math.random() * 0.8;
    }

    steamGeom.setAttribute('position', new THREE.BufferAttribute(steamPos, 3));

    const steamMat = new THREE.PointsMaterial({
      size: 1.4,
      map: steamTex,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const steamPoints = new THREE.Points(steamGeom, steamMat);
    worldGroup.add(steamPoints);

    // --- 3. SCROLL-DRIVEN PARALLAX ---
    let lastScrollY = window.scrollY;
    let targetScrollVelocity = 0;
    let scrollVelocity = 0;
    let scrollProgress = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      const clampedDelta = Math.max(-80, Math.min(80, delta));
      targetScrollVelocity += clampedDelta * 0.15;

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = docHeight > 0 ? currentScrollY / docHeight : 0;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- 4. MOUSE PARALLAX TRACKING ---
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // --- 5. RESIZE HANDLER ---
    const handleResize = () => {
      if (!renderer || !camera) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // --- 6. ANIMATION LOOP ---
    let animId = 0;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || typeof gl.fenceSync !== 'function') {
        cb();
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      if (!sync) {
        cb();
        return;
      }
      gl.flush();

      function poll() {
        if (!sync) return;
        const res = gl.clientWaitSync(sync, 0, 0);
        if (res === gl.ALREADY_SIGNALED || res === gl.CONDITION_SATISFIED) {
          gl.deleteSync(sync);
          cb();
        } else {
          requestAnimationFrame(poll);
        }
      }
      requestAnimationFrame(poll);
    }

    const render = () => {
      const dt = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Damp scroll velocity
      scrollVelocity += (targetScrollVelocity - scrollVelocity) * 0.1;
      targetScrollVelocity *= 0.85;

      // World group subtle camera drift based on mouse
      worldGroup.rotation.y = mouse.x * 0.08;
      worldGroup.rotation.x = -mouse.y * 0.05;

      // Global vertical tilt driven by scroll position
      worldGroup.position.y = scrollProgress * 5.0;

      // Animate Coffee Beans
      for (let i = 0; i < beanCount; i++) {
        const b = beans[i];

        // Tumbling rotation
        b.rot.x += (b.rotSpeed.x + scrollVelocity * 0.015) * dt;
        b.rot.y += (b.rotSpeed.y + scrollVelocity * 0.02) * dt;
        b.rot.z += b.rotSpeed.z * dt;

        // Upward floating motion with gentle horizontal sway
        const upwardSpeed = (b.baseDriftSpeed + Math.abs(scrollVelocity) * 0.1) * dt;
        b.pos.y += upwardSpeed;
        b.pos.x += Math.sin(time * b.swayFreq + i) * b.swayAmp * dt;

        // Wrap around boundaries
        if (b.pos.y > 11) {
          b.pos.y = -11;
          b.pos.x = (Math.random() - 0.5) * 24;
        }

        dummy.position.copy(b.pos);
        dummy.rotation.copy(b.rot);
        dummy.scale.setScalar(b.scale);
        dummy.updateMatrix();
        beanMesh.setMatrixAt(i, dummy.matrix);
      }
      beanMesh.instanceMatrix.needsUpdate = true;

      // Animate Vapor Nodes
      const positions = steamGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < steamNodeCount; i++) {
        const idx = i * 3;
        const drift = steamDriftSpeed[i];
        const wiggle = steamWiggle[i];

        positions[idx + 1] += drift + Math.abs(scrollVelocity) * 0.005;
        positions[idx] += Math.sin(time * 0.7 + wiggle) * 0.012;

        if (positions[idx + 1] > 12) {
          positions[idx + 1] = -12;
          positions[idx] = (Math.random() - 0.5) * 26;
        }
      }
      steamGeom.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(() => {
          animId = requestAnimationFrame(render);
        });
      } else {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      beanGeom.dispose();
      beanMat.dispose();
      steamGeom.dispose();
      steamMat.dispose();
      steamTex.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
