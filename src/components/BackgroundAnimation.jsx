// src/components/CalmPremiumCore.jsx
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";

export default function CalmPremiumCore() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.max(1, window.devicePixelRatio || 1));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    mount.appendChild(renderer.domElement);

    // Scene + Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x03030a);

    const camera = new THREE.PerspectiveCamera(38, mount.clientWidth / mount.clientHeight, 0.1, 8000);
    camera.position.set(0, 28, 220);

    // Postprocessing
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(mount.clientWidth, mount.clientHeight), 0.9, 0.4, 0.12);
    bloom.threshold = 0.15;
    bloom.strength = 0.9;
    bloom.radius = 0.45;
    composer.addPass(bloom);

    const fxaaPass = new ShaderPass(FXAAShader);
    const pixelRatio = renderer.getPixelRatio();
    fxaaPass.material.uniforms["resolution"].value.x = 1 / (mount.clientWidth * pixelRatio);
    fxaaPass.material.uniforms["resolution"].value.y = 1 / (mount.clientHeight * pixelRatio);
    composer.addPass(fxaaPass);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.18);
    const keyLight = new THREE.DirectionalLight(0xdfefff, 0.7);
    keyLight.position.set(40, 60, 30);
    scene.add(ambient, keyLight);

    // Background stars
    const starCount = 420;
    const starGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const scales = new Float32Array(starCount);
    for (let i = 0; i < starCount; i++) {
      const radius = 200 + Math.random() * 900;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * 0.8;
      positions[i * 3] = Math.cos(theta) * radius * Math.cos(phi);
      positions[i * 3 + 1] = radius * Math.sin(phi) * 0.35;
      positions[i * 3 + 2] = Math.sin(theta) * radius * Math.cos(phi);
      scales[i] = 0.4 + Math.random() * 1.4;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    starGeo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

    const starMat = new THREE.PointsMaterial({
      color: 0x7fe8ff,
      size: 1.6,
      transparent: true,
      opacity: 0.88,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // --- Orb Core & Shell ---
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    const coreGeo = new THREE.SphereGeometry(10.2, 48, 48);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xeef9ff,
      emissive: 0x00d6ff,
      emissiveIntensity: 1.1,
      roughness: 0.15,
      metalness: 0.05,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(core);

    const shellGeo = new THREE.SphereGeometry(13.2, 64, 64);
    const shellMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        iTime: { value: 0 },
        colorA: { value: new THREE.Color(0x00d6ff) },
        colorB: { value: new THREE.Color(0xff8bd6) },
        mixStrength: { value: 0.6 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vView;
        void main(){
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPos = modelViewMatrix * vec4(position,1.0);
          vView = -mvPos.xyz;
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec3 colorA;
        uniform vec3 colorB;
        uniform float mixStrength;
        varying vec3 vNormal;
        varying vec3 vView;
        void main(){
          float fres = pow(1.0 - max(0.0, dot(normalize(vNormal), normalize(vView))), 1.6);
          float t = 0.5 + 0.5 * sin(iTime * 0.6);
          vec3 col = mix(colorA, colorB, t);
          float glow = fres * mixStrength;
          gl_FragColor = vec4(col * glow, clamp(glow * 0.9, 0.0, 0.95));
        }
      `,
    });
    const shell = new THREE.Mesh(shellGeo, shellMat);
    coreGroup.add(shell);

    const orbLight = new THREE.PointLight(0x99f0ff, 1.2, 520, 2);
    coreGroup.add(orbLight);

    // --- HUD Canvas ---
    const hudCanvas = document.createElement("canvas");
    hudCanvas.width = 512;
    hudCanvas.height = 128;
    const hudCtx = hudCanvas.getContext("2d");
    const hudTex = new THREE.CanvasTexture(hudCanvas);
    hudTex.encoding = THREE.sRGBEncoding;
    const hudPlane = new THREE.Mesh(new THREE.PlaneGeometry(120, 30),
      new THREE.MeshBasicMaterial({ map: hudTex, transparent: true, opacity: 0.95, depthWrite: false, blending: THREE.AdditiveBlending }));
    hudPlane.position.set(0, -26, -36);
    hudPlane.rotation.x = -0.12;
    coreGroup.add(hudPlane);

    let startTime = performance.now();
    let iteration = 0;

    function updateHUD() {
      const elapsed = Math.max(0, (performance.now() - startTime) / 1000);
      hudCtx.clearRect(0, 0, hudCanvas.width, hudCanvas.height);

      hudCtx.fillStyle = "rgba(165,220,255,0.95)";
      hudCtx.font = "700 20px Inter, system-ui, sans-serif";
      hudCtx.fillText("NEURAL CORE", 18, 34);

      hudCtx.fillStyle = "rgba(140,200,225,0.98)";
      hudCtx.font = "600 16px Inter, system-ui, sans-serif";
      hudCtx.fillText(`uptime: ${elapsed.toFixed(1)}s`, 18, 64);

      hudCtx.fillStyle = "rgba(220,160,240,0.9)";
      hudCtx.fillText(`iter: ${iteration}`, 18, 92);

      hudTex.needsUpdate = true;
    }

    // Motion System
    const state = { x: 0.5, y: 0.5, vx: 0, vy: 0, t: 1, path: [] };

    function pseudoGradient(u, v, t) {
      const nx = u * 2 - 1;
      const ny = v * 2 - 1;
      const a = Math.sin((nx * 2.2 + t * 0.0007) * 1.6) * 0.4;
      const b = Math.cos((ny * 2.8 - t * 0.0005) * 1.2) * 0.35;
      return { gx: a + b, gy: (a - b) * 0.8 };
    }

    function stepMotion(dt) {
      const scaled = dt * 0.0012;
      const grad = pseudoGradient(state.x, state.y, performance.now());
      state.vx = state.vx * 0.92 + grad.gx * 0.0025 * scaled * 60;
      state.vy = state.vy * 0.92 + grad.gy * 0.0025 * scaled * 60;
      state.x += state.vx;
      state.y += state.vy;
      state.x = Math.min(0.98, Math.max(0.02, state.x));
      state.y = Math.min(0.98, Math.max(0.02, state.y));
      state.t++;
      const wx = (state.x - 0.5) * 80;
      const wy = (state.y - 0.5) * 40;
      state.path.push(new THREE.Vector3(wx, wy, 0));
      if (state.path.length > 32) state.path.shift();
    }

    // ---- Neural Sparks System ----
    const sparksGroup = new THREE.Group();
    scene.add(sparksGroup);

    const sparks = [];
    const maxSparks = 80;

    function createSpark() {
      const geo = new THREE.SphereGeometry(0.6, 8, 8);
      const mat = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0x79f5ff : 0xff9be9,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const spark = new THREE.Mesh(geo, mat);
      spark.position.copy(coreGroup.position);
      spark.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 1.6,
        (Math.random() - 0.5) * 1.2,
        (Math.random() - 0.5) * 1.3
      );
      spark.lifetime = 0.8 + Math.random() * 0.6;
      spark.age = 0;

      sparksGroup.add(spark);
      sparks.push(spark);
    }

    // Animation
    let last = performance.now();
    function resize() {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      composer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      fxaaPass.material.uniforms["resolution"].value.x = 1 / (w * renderer.getPixelRatio());
      fxaaPass.material.uniforms["resolution"].value.y = 1 / (h * renderer.getPixelRatio());
    }
    window.addEventListener("resize", resize, { passive: true });

    let running = true;
    function frame(now) {
      if (!running) return;
      now = now || performance.now();
      const dt = now - last;
      last = now;

      const camFloatX = Math.sin(now * 0.00012) * 6;
      const camFloatY = Math.sin(now * 0.00009) * 3;
      camera.position.lerp(new THREE.Vector3(camFloatX, 28 + camFloatY, 220 + Math.cos(now * 0.00005) * 8), 0.02);
      camera.lookAt(0, 10, 0);

      stars.material.size = 1.1 + Math.sin(now * 0.0012) * 0.18;

      stepMotion(dt);
      const lastP = state.path[state.path.length - 1] || new THREE.Vector3(0, 0, 0);
      const targetPos = new THREE.Vector3(lastP.x, lastP.y + 6, -12);
      coreGroup.position.lerp(targetPos, 0.08);
      core.rotation.y += 0.0025;
      shellMat.uniforms.iTime.value = now * 0.0011;
      orbLight.position.lerp(new THREE.Vector3(targetPos.x * 0.6, targetPos.y + 6, targetPos.z + 6), 0.12);

      const motionStrength = Math.min(1, Math.hypot(state.vx, state.vy) * 60);
      coreMat.emissiveIntensity = 0.8 + motionStrength * 0.9;

      if (Math.random() < 0.008) iteration += 1;
      updateHUD();

      // ---- Neural Sparks Update ----
      if (Math.random() < 0.04 + motionStrength * 0.08 && sparks.length < maxSparks) {
        createSpark();
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.age += dt * 0.001;

        s.position.addScaledVector(s.velocity, dt * 0.018);
        s.material.opacity = Math.max(0, 1 - s.age / s.lifetime);

        if (s.age > s.lifetime) {
          sparksGroup.remove(s);
          s.geometry.dispose();
          s.material.dispose();
          sparks.splice(i, 1);
        }
      }

      composer.render();
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    resize();

    return () => {
      running = false;
      window.removeEventListener("resize", resize);
      renderer.dispose();
      composer.dispose();
      starGeo.dispose?.();
      starMat.dispose?.();
      coreGeo.dispose();
      coreMat.dispose();
      shellGeo.dispose();
      shellMat.dispose();
      hudTex.dispose();
      try { mount.removeChild(renderer.domElement); } catch {}
    };
  }, []);

  return <div ref={mountRef} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: -1 }} />;
}
