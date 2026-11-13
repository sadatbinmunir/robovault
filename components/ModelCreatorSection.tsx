"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface ModelItem {
  id: string;
  name: string;
  poly: string;
  type: string;
  description: string;
  accentColor: string;
  glbUrl?: string;
}

const modelList: ModelItem[] = [
  {
    id: "focusbot-3d",
    name: "FocusBot 3D",
    poly: "68k Poly",
    type: "GLB Master",
    description: "Our primary 3D physical desk companion. Fully articulated embodied robotics chassis with expressive digital visor, silent dual-axis servos, and aerospace-grade aluminum unibody.",
    accentColor: "#8B5CF6",
    glbUrl: "/models/bot-3d.glb",
  },
  {
    id: "anki-vector-bot",
    name: "Anki Vector Bot",
    poly: "82k Poly",
    type: "GLB Master",
    description: "Anki Vector desk companion robot. High-traction crawler treads, expressive digital IPS display, 4-DOF forklift arm, and emotive capacitive touch sensors.",
    accentColor: "#06B6D4",
    glbUrl: "/models/anki-vector-bot.glb",
  },
];

const colorSwatches = [
  { id: "amber", color: "#FDE68A", label: "DIFFUSE", name: "Warm Diffuse" },
  { id: "gold", color: "#F59E0B", label: "GOLD", name: "Studio Gold" },
  { id: "orange", color: "#FF5E0E", label: "SUNSET", name: "Sunset Orange" },
  { id: "pink", color: "#F43F5E", label: "RAY", name: "Neon Ray" },
  { id: "violet", color: "#8B5CF6", label: "VIOLET", name: "Electric Violet" },
  { id: "cyan", color: "#06B6D4", label: "CYBER", name: "Cyber Cyan" },
  { id: "white", color: "#FFFFFF", label: "DAYLIGHT", name: "Studio Daylight" },
  { id: "slate", color: "#64748B", label: "SHADOW", name: "Slate Shadow" },
];

export default function ModelCreatorSection() {
  // Studio Interactive State
  const [selectedModel, setSelectedModel] = useState<ModelItem>(modelList[0]); // Default to FocusBot 3D GLB
  const [lumen, setLumen] = useState<number>(75);
  const [lightAngle, setLightAngle] = useState<number>(45);
  const [lightingRig, setLightingRig] = useState<"studio" | "cinematic" | "neon">("studio");
  const [activeColor, setActiveColor] = useState<string>("#FF5E0E");
  
  // Turntable & Kinetic Controls (Auto-Rotate, Direction, Speed)
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [rotateDirection, setRotateDirection] = useState<"cw" | "ccw">("cw");
  const [rotateSpeed, setRotateSpeed] = useState<number>(1.0);

  const [renderMode, setRenderMode] = useState<"pbr" | "wireframe">("pbr");
  const [activeTab, setActiveTab] = useState<"models" | "textures">("models");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoadingModel, setIsLoadingModel] = useState<boolean>(false);

  // Three.js References
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const pointLightRef = useRef<THREE.PointLight | null>(null);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const rimLightRef = useRef<THREE.DirectionalLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const autoRotateRef = useRef<boolean>(autoRotate);
  const rotateDirectionRef = useRef<"cw" | "ccw">(rotateDirection);
  const rotateSpeedRef = useRef<number>(rotateSpeed);
  const dialRef = useRef<HTMLDivElement>(null);
  const cachedGltfRef = useRef<{ [url: string]: THREE.Group }>({});

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    rotateDirectionRef.current = rotateDirection;
  }, [rotateDirection]);

  useEffect(() => {
    rotateSpeedRef.current = rotateSpeed;
  }, [rotateSpeed]);

  // Rotatable Speed Dial Pointer Interaction
  const handleDialPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updateDialSpeed(e.clientX, e.clientY);
  };

  const handleDialPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons > 0) {
      updateDialSpeed(e.clientX, e.clientY);
    }
  };

  const updateDialSpeed = (clientX: number, clientY: number) => {
    if (!dialRef.current) return;
    const rect = dialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    let deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (deg > 180) deg -= 360;
    const clamped = Math.max(-120, Math.min(120, deg));
    const speed = 0.2 + ((clamped + 120) / 240) * 2.8;
    setRotateSpeed(Number(speed.toFixed(1)));
  };

  const dialAngle = Math.max(-120, Math.min(120, ((rotateSpeed - 0.2) / 2.8) * 240 - 120));

  // Update Three.js lights when lumen, color swatch, angle, or rig mode changes
  useEffect(() => {
    if (pointLightRef.current && dirLightRef.current) {
      const col = new THREE.Color(activeColor);
      pointLightRef.current.color = col;

      // Orbiting light positions around 3D model based on lightAngle (0 - 360 deg)
      const rad = (lightAngle * Math.PI) / 180;
      const radius = 8;

      dirLightRef.current.position.set(
        Math.sin(rad) * radius,
        7,
        Math.cos(rad) * radius
      );

      pointLightRef.current.position.set(
        Math.sin(rad + 0.35) * (radius * 0.65),
        4.2,
        Math.cos(rad + 0.35) * (radius * 0.65)
      );

      if (rimLightRef.current) {
        const rimRad = rad + Math.PI;
        rimLightRef.current.position.set(
          Math.sin(rimRad) * radius,
          5.5,
          Math.cos(rimRad) * radius
        );
      }

      // Lighting Rig intensity profiles
      const mult = lumen / 100;
      if (lightingRig === "studio") {
        dirLightRef.current.intensity = mult * 1.8;
        pointLightRef.current.intensity = mult * 32;
        if (rimLightRef.current) rimLightRef.current.intensity = mult * 1.4;
        if (hemiLightRef.current) hemiLightRef.current.intensity = 1.3;
      } else if (lightingRig === "cinematic") {
        dirLightRef.current.intensity = mult * 0.9;
        pointLightRef.current.intensity = mult * 20;
        if (rimLightRef.current) rimLightRef.current.intensity = mult * 4.5;
        if (hemiLightRef.current) hemiLightRef.current.intensity = 0.55;
      } else if (lightingRig === "neon") {
        dirLightRef.current.intensity = mult * 1.1;
        pointLightRef.current.intensity = mult * 65;
        if (rimLightRef.current) rimLightRef.current.intensity = mult * 2.8;
        if (hemiLightRef.current) hemiLightRef.current.intensity = 0.85;
      }
    }
  }, [lumen, activeColor, lightAngle, lightingRig]);

  // Update wireframe / PBR material when renderMode changes
  useEffect(() => {
    if (!modelGroupRef.current) return;
    const isWire = renderMode === "wireframe";
    modelGroupRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const applyWire = (m: THREE.Material) => {
          if ("wireframe" in m) {
            (m as any).wireframe = isWire;
            m.needsUpdate = true;
          }
        };
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(applyWire);
        } else if (mesh.material) {
          applyWire(mesh.material);
        }
      }
    });
  }, [renderMode]);

  // Load GLTF / GLB model or build procedural geometry
  const loadOrBuildModel = (model: ModelItem, isWire: boolean) => {
    if (!modelGroupRef.current) return;
    const group = modelGroupRef.current;

    // Check if it's the GLB model
    const glbUrl = model.glbUrl;
    if (glbUrl) {
      setIsLoadingModel(true);

      // Check cache first
      if (cachedGltfRef.current[glbUrl]) {
        while (group.children.length > 0) {
          const obj = group.children[0];
          group.remove(obj);
        }
        const cloned = cachedGltfRef.current[glbUrl].clone(true);
        cloned.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const applyWire = (m: THREE.Material) => {
              if ("wireframe" in m) {
                (m as any).wireframe = isWire;
              }
            };
            if (mesh.material) {
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach(applyWire);
              } else {
                applyWire(mesh.material);
              }
            }
          }
        });
        group.add(cloned);
        setIsLoadingModel(false);
        return;
      }

      const loader = new GLTFLoader();
      loader.load(
        glbUrl,
        (gltf) => {
          while (group.children.length > 0) {
            const obj = group.children[0];
            group.remove(obj);
          }

          const sceneObj = gltf.scene;

          // Compute bounding box and normalize scale & center
          const box = new THREE.Box3().setFromObject(sceneObj);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z) || 1;
          const targetScale = 3.6 / maxDim;

          sceneObj.scale.setScalar(targetScale);
          sceneObj.position.x = -center.x * targetScale;
          sceneObj.position.y = -center.y * targetScale;
          sceneObj.position.z = -center.z * targetScale;

          // Ensure proper material rendering & shadows
          sceneObj.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              const setupMat = (mat: THREE.Material) => {
                if ("wireframe" in mat) {
                  (mat as any).wireframe = isWire;
                }
                if (mat instanceof THREE.MeshStandardMaterial) {
                  mat.roughness = Math.min(mat.roughness, 0.45);
                  mat.metalness = Math.max(mat.metalness, 0.4);
                }
              };
              if (mesh.material) {
                if (Array.isArray(mesh.material)) {
                  mesh.material.forEach(setupMat);
                } else {
                  setupMat(mesh.material);
                }
              }
            }
          });

          // Cache root for instant switching
          cachedGltfRef.current[glbUrl] = sceneObj.clone(true);

          group.add(sceneObj);
          setIsLoadingModel(false);
        },
        undefined,
        (err) => {
          console.error("Error loading GLB model:", err);
          setIsLoadingModel(false);
        }
      );
      return;
    }

    // Procedural Fallback Geometry for other library items
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
    }

    const accentColor = new THREE.Color(model.accentColor);

    // Procedural drone fallback for secondary model
    const bodyGeo = new THREE.CylinderGeometry(1.3, 1.1, 0.65, 32);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xE2E8F0,
      metalness: 0.8,
      roughness: 0.25,
      wireframe: isWire,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    group.add(body);

    const domeGeo = new THREE.SphereGeometry(0.75, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: isWire,
    });
    const dome = new THREE.Mesh(domeGeo, domeMat);
    dome.position.y = 0.32;
    group.add(dome);

    const visorGeo = new THREE.RingGeometry(0.2, 0.45, 32);
    const visorMat = new THREE.MeshBasicMaterial({ color: accentColor, side: THREE.DoubleSide });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.rotation.x = Math.PI / 2.3;
    visor.position.set(0, 0.72, 0.38);
    group.add(visor);

    const ringAngles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];
    ringAngles.forEach((angle) => {
      const ringGeo = new THREE.TorusGeometry(0.85, 0.15, 24, 48);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0x7DD3FC,
        metalness: 0.35,
        roughness: 0.2,
        wireframe: isWire,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(Math.cos(angle) * 2.2, -0.05, Math.sin(angle) * 2.2);
      group.add(ring);

      const armGeo = new THREE.BoxGeometry(1.1, 0.1, 0.22);
      const armMat = new THREE.MeshStandardMaterial({
        color: 0x1E293B,
        metalness: 0.9,
        roughness: 0.3,
        wireframe: isWire,
      });
      const arm = new THREE.Mesh(armGeo, armMat);
      arm.position.set(Math.cos(angle) * 1.25, -0.05, Math.sin(angle) * 1.25);
      arm.rotation.y = -angle;
      group.add(arm);
    });
  };

  // Re-run when model or renderMode changes
  useEffect(() => {
    loadOrBuildModel(selectedModel, renderMode === "wireframe");
  }, [selectedModel, renderMode]);

  // Initial Scene Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.clientWidth || 600;
    const height = canvas.clientHeight || 400;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 2.0, 5.8);
    camera.lookAt(0, 0, 0);

    // 3. Renderer with anti-aliasing & transparent background
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;

    // 4. Studio Lighting
    const hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0xC4B5FD, 1.3);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    const rad = (lightAngle * Math.PI) / 180;
    const radius = 8;

    const dirLight = new THREE.DirectionalLight(0xFFFFFF, 1.8);
    dirLight.position.set(Math.sin(rad) * radius, 7, Math.cos(rad) * radius);
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    const pointLight = new THREE.PointLight(new THREE.Color(activeColor), 32, 25);
    pointLight.position.set(
      Math.sin(rad + 0.35) * (radius * 0.65),
      4.2,
      Math.cos(rad + 0.35) * (radius * 0.65)
    );
    scene.add(pointLight);
    pointLightRef.current = pointLight;

    const rimLight = new THREE.DirectionalLight(0xC4B5FD, 1.4);
    const rimRad = rad + Math.PI;
    rimLight.position.set(Math.sin(rimRad) * radius, 5.5, Math.cos(rimRad) * radius);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    // 5. Model Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Soft Contact Shadow Plane beneath the 3D model
    const shadowGeo = new THREE.PlaneGeometry(6, 6);
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext("2d");
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, "rgba(0,0,0,0.22)");
      grad.addColorStop(0.4, "rgba(0,0,0,0.08)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.15;
    scene.add(shadowPlane);

    // Initial load of FocusBot 3D GLB
    loadOrBuildModel(modelList[0], renderMode === "wireframe");

    // 6. Interactive Mouse Drag / Orbit
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !modelGroupRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      modelGroupRef.current.rotation.y += deltaX * 0.008;
      modelGroupRef.current.rotation.x += deltaY * 0.008;

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // 7. Responsive Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!canvas || !renderer) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    });
    resizeObserver.observe(canvas);

    // 8. Animation Render Loop (with dynamic auto-rotate, direction & speed)
    let animationFrameId: number;
    const animate = () => {
      if (modelGroupRef.current && autoRotateRef.current && !isDraggingRef.current) {
        const dir = rotateDirectionRef.current === "cw" ? 1 : -1;
        modelGroupRef.current.rotation.y += 0.006 * rotateSpeedRef.current * dir;
      }
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      renderer.dispose();
    };
  }, []);

  const resetCamera = () => {
    if (modelGroupRef.current) {
      modelGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  const filteredModels = modelList.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="relative w-full py-20 sm:py-28 text-zinc-900 overflow-hidden z-20 border-t border-white/10">
      {/* Fit-Covered Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: "url('/images/studio-bg.jpg')" }}
      />

      {/* Dark Vignette / Overlay for High Contrast & Element Visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07080D]/78 via-[#0C0E18]/65 to-[#05060A]/82 backdrop-blur-[1px] pointer-events-none" />

      {/* Soft Ambient Pastel Violet Glows */}
      <div className="absolute top-1/4 -left-48 w-[650px] h-[650px] bg-violet-600/20 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-[650px] h-[650px] bg-indigo-600/20 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-violet-100 to-slate-200 bg-clip-text text-transparent leading-tight drop-shadow-sm">
            3D Project Visuals
          </h2>
        </div>

        {/* 
          3-COLUMN STUDIO INTERFACE
          Exact Layout Reference matching the design:
          - Left Column: Customizable Ambience (Top) & Set Temperature (Bottom)
          - Center Column: Large Studio Viewport with 3D model canvas & bottom controls
          - Right Column: Search + Avatar, 3D Model Library Card, Playback Controller
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* ================= LEFT COLUMN (~25% / 3 cols) ================= */}
          <div className="lg:col-span-3 flex flex-col gap-5 sm:gap-6">
            
            {/* Card 1: Customizable Ambience */}
            <div className="rounded-[30px] bg-gradient-to-br from-[#EDE9FE]/50 via-[#F5F3FF]/40 to-[#E2E8F0]/35 backdrop-blur-2xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.7)] border border-white/60 flex flex-col justify-between gap-4">
              
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-zinc-900 tracking-tight">
                  Customizable Ambience
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-violet-200/60 text-violet-900 border border-violet-300/60 font-semibold">
                  PBR LIGHT
                </span>
              </div>

              {/* Arc Dial / Radial Slider */}
              <div className="relative py-1 flex flex-col items-center justify-center">
                <div className="relative w-36 h-24 flex items-center justify-center">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 160 110">
                    <path
                      d="M 20 95 A 60 60 0 0 1 140 95"
                      fill="none"
                      stroke="#CBD5E1"
                      strokeWidth="12"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 20 95 A 60 60 0 0 1 140 95"
                      fill="none"
                      stroke="url(#lumenGradient)"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray="188.5"
                      strokeDashoffset={188.5 - (188.5 * lumen) / 100}
                    />
                    <defs>
                      <linearGradient id="lumenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#818CF8" />
                        <stop offset="50%" stopColor="#A78BFA" />
                        <stop offset="100%" stopColor="#FF5E0E" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Center Value Badge */}
                  <div className="absolute bottom-0 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-black text-zinc-900 tracking-tight">
                      {lumen}%
                    </span>
                    <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-500 font-bold -mt-0.5">
                      LUMEN
                    </span>
                  </div>
                </div>

                <input
                  type="range"
                  min="20"
                  max="100"
                  value={lumen}
                  onChange={(e) => setLumen(Number(e.target.value))}
                  className="w-4/5 mt-2 accent-violet-600 cursor-pointer h-1.5 bg-violet-200/60 rounded-lg"
                />
              </div>

              {/* Light Angle Slider & Direction Controls */}
              <div className="pt-3 border-t border-violet-200/60 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-violet-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                    </svg>
                    <span className="text-xs font-bold text-zinc-900 tracking-tight">
                      Light Angle
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-violet-200/70 text-violet-900 border border-violet-300/60">
                    {lightAngle}° AZIMUTH
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="360"
                  value={lightAngle}
                  onChange={(e) => setLightAngle(Number(e.target.value))}
                  className="w-full accent-violet-600 cursor-pointer h-1.5 bg-violet-200/60 rounded-lg"
                />

                {/* Quick Angle Preset Chips */}
                <div className="grid grid-cols-4 gap-1 mt-1">
                  {[
                    { label: "Front", angle: 0 },
                    { label: "Studio", angle: 45 },
                    { label: "Rim", angle: 180 },
                    { label: "Side", angle: 270 },
                  ].map((p) => (
                    <button
                      key={p.label}
                      onClick={() => setLightAngle(p.angle)}
                      className={`py-1 rounded-lg text-[9px] font-mono font-bold transition-all ${
                        Math.abs(lightAngle - p.angle) < 15
                          ? "bg-violet-600 text-white shadow-sm"
                          : "bg-white/50 hover:bg-white/80 text-zinc-900 border border-white/60"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lighting Rig Presets */}
              <div className="pt-3 border-t border-violet-200/60 flex flex-col gap-1.5">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-zinc-800">
                    RIG PRESET
                  </span>
                  <span className="text-[9px] font-mono text-violet-800 font-bold uppercase">
                    {lightingRig === "studio" ? "Balanced 3P" : lightingRig === "cinematic" ? "High Drama" : "Punchy Neon"}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: "studio", label: "3-Point", icon: "✦" },
                    { id: "cinematic", label: "Rim Edge", icon: "☽" },
                    { id: "neon", label: "Neon High", icon: "⚡" },
                  ].map((rig) => (
                    <button
                      key={rig.id}
                      onClick={() => setLightingRig(rig.id as any)}
                      className={`py-1.5 px-1 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1 transition-all ${
                        lightingRig === rig.id
                          ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/25 scale-[1.02]"
                          : "bg-white/50 hover:bg-white/80 text-zinc-900 border border-white/60 font-semibold"
                      }`}
                    >
                      <span className="text-xs">{rig.icon}</span>
                      <span>{rig.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 8 Studio Color Lighting Swatches */}
              <div className="pt-3 border-t border-violet-200/60 flex flex-col items-center gap-2">
                <div className="flex items-center justify-between w-full px-0.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-zinc-800">
                    STUDIO TONE
                  </span>
                  <span className="text-[9px] font-mono text-zinc-800 font-bold uppercase">
                    {colorSwatches.find((s) => s.color === activeColor)?.name || "CUSTOM"}
                  </span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 w-full justify-items-center">
                  {colorSwatches.map((swatch) => (
                    <button
                      key={swatch.id}
                      onClick={() => setActiveColor(swatch.color)}
                      style={{ backgroundColor: swatch.color }}
                      className={`w-6 h-6 rounded-full transition-all duration-200 relative flex items-center justify-center ${
                        activeColor === swatch.color
                          ? "ring-2 ring-offset-2 ring-violet-700 scale-125 shadow-md"
                          : "hover:scale-110 opacity-80 hover:opacity-100 shadow-sm"
                      }`}
                      title={swatch.name}
                    >
                      {activeColor === swatch.color && (
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 shadow" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Card 2: Turntable Kinetics & Auto-Rotate Controls */}
            <div className="rounded-[26px] bg-gradient-to-br from-[#EDE9FE]/50 via-[#F5F3FF]/40 to-[#E2E8F0]/35 backdrop-blur-2xl p-4 sm:p-4.5 shadow-[0_20px_50px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.7)] border border-white/60 flex flex-col justify-between gap-3">
              
              {/* Header with Auto Rotate Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold text-zinc-900 tracking-tight">
                    Turntable Dynamics
                  </span>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                    Auto-Rotate Control
                  </span>
                </div>

                {/* Animated Auto-Rotate Toggle Switch */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-mono font-bold uppercase text-violet-900">
                    {autoRotate ? "ON" : "OFF"}
                  </span>
                  <button
                    onClick={() => setAutoRotate(!autoRotate)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none items-center ${
                      autoRotate ? "bg-violet-600 shadow-sm shadow-violet-500/30" : "bg-zinc-300"
                    }`}
                    title="Toggle Auto Rotate"
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        autoRotate ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Rotatable Circular Speed Dial Knob */}
              <div className="relative py-1 flex flex-col items-center justify-center">
                <div
                  ref={dialRef}
                  onPointerDown={handleDialPointerDown}
                  onPointerMove={handleDialPointerMove}
                  className="relative w-28 h-28 rounded-full border-2 border-violet-200/90 flex items-center justify-center p-1.5 bg-gradient-to-b from-violet-100/70 via-white/80 to-slate-200/70 shadow-inner cursor-grab active:cursor-grabbing select-none"
                  title="Drag knob in a circle to adjust speed"
                >
                  {/* Rotating Indicator Dot on Perimeter */}
                  <div
                    style={{
                      transform: `rotate(${dialAngle}deg) translateY(-46px)`,
                    }}
                    className="absolute w-3.5 h-3.5 rounded-full bg-violet-600 shadow-[0_0_10px_rgba(139,92,246,0.9)] transition-transform duration-75 pointer-events-none ring-2 ring-white"
                  />

                  {/* Inner Dial Face */}
                  <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-b from-white to-violet-50/95 shadow-[0_6px_18px_rgba(0,0,0,0.08)] border border-white/90 flex flex-col items-center justify-center text-center pointer-events-none">
                    <div className="flex gap-0.5 text-violet-400 text-[7px] -mt-0.5 mb-0.5">
                      <span>•</span>
                      <span>•</span>
                      <span>•</span>
                    </div>
                    <span className="text-xl font-black text-zinc-900 leading-none">
                      {rotateSpeed.toFixed(1)}x
                    </span>
                    <span className="text-[7px] font-mono uppercase tracking-widest text-zinc-500 font-bold mt-0.5">
                      SPEED
                    </span>
                  </div>
                </div>

                {/* Step Adjust Buttons & Speed Label */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => setRotateSpeed((s) => Number(Math.max(0.2, s - 0.2).toFixed(1)))}
                    className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-100/80 to-slate-200/80 hover:from-violet-200 hover:to-slate-300 text-zinc-700 font-bold text-xs flex items-center justify-center transition-colors border border-white/60 shadow-sm"
                    title="Decrease Speed"
                  >
                    -
                  </button>
                  <span className="text-[11px] font-mono font-bold text-zinc-800">
                    Drag dial to tune
                  </span>
                  <button
                    onClick={() => setRotateSpeed((s) => Number(Math.min(3.0, s + 0.2).toFixed(1)))}
                    className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-100/80 to-slate-200/80 hover:from-violet-200 hover:to-slate-300 text-zinc-700 font-bold text-xs flex items-center justify-center transition-colors border border-white/60 shadow-sm"
                    title="Increase Speed"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Rotation Direction Toggle */}
              <div className="pt-2.5 border-t border-violet-200/60 flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase tracking-wider font-bold text-zinc-800">
                  DIRECTION
                </span>
                <div className="inline-flex items-center p-0.5 rounded-xl bg-white/40 border border-white/60 shadow-inner">
                  <button
                    onClick={() => setRotateDirection("ccw")}
                    className={`px-2.5 py-0.5 rounded-lg text-[9px] font-mono font-bold flex items-center gap-1 transition-all ${
                      rotateDirection === "ccw"
                        ? "bg-violet-600 text-white shadow-sm"
                        : "text-zinc-800 hover:text-zinc-950 font-bold"
                    }`}
                    title="Rotate Counter-Clockwise"
                  >
                    <span>↺</span>
                    <span>CCW</span>
                  </button>
                  <button
                    onClick={() => setRotateDirection("cw")}
                    className={`px-2.5 py-0.5 rounded-lg text-[9px] font-mono font-bold flex items-center gap-1 transition-all ${
                      rotateDirection === "cw"
                        ? "bg-violet-600 text-white shadow-sm"
                        : "text-zinc-800 hover:text-zinc-950 font-bold"
                    }`}
                    title="Rotate Clockwise"
                  >
                    <span>CW</span>
                    <span>↻</span>
                  </button>
                </div>
              </div>

              {/* Speed Preset Buttons */}
              <div className="grid grid-cols-3 gap-1.5 pt-2.5 border-t border-violet-200/60">
                {[
                  { speed: 0.5, label: "0.5x SLOW", icon: "🐢" },
                  { speed: 1.0, label: "1.0x NORMAL", icon: "⚙️" },
                  { speed: 2.5, label: "2.5x TURBO", icon: "⚡" },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setRotateSpeed(preset.speed)}
                    className={`py-1.5 px-1 rounded-lg flex flex-col items-center justify-center text-[9px] font-bold transition-all ${
                      Math.abs(rotateSpeed - preset.speed) < 0.15
                        ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/25 scale-[1.02]"
                        : "bg-white/50 hover:bg-white/80 text-zinc-900 border border-white/60 font-bold shadow-xs"
                    }`}
                  >
                    <span className="text-[11px]">{preset.icon}</span>
                    <span className="tracking-wider mt-0.5">{preset.label}</span>
                  </button>
                ))}
              </div>

            </div>

          </div>

          {/* ================= CENTER COLUMN (~50% / 6 cols) ================= */}
          <div className="lg:col-span-6 flex flex-col gap-5 sm:gap-6">
            
            <div className="rounded-[32px] bg-gradient-to-br from-[#EDE9FE]/50 via-[#F5F3FF]/40 to-[#E2E8F0]/35 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.7)] border border-white/60 flex flex-col justify-between min-h-[640px] relative overflow-hidden">
              
              {/* Top Bezel Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-2 bg-gradient-to-r from-violet-300/70 via-purple-300/70 to-slate-300/70 rounded-b-lg" />

              {/* Viewport Top Bar */}
              <div className="flex items-center justify-between mb-4 relative z-10 pt-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-600 animate-pulse shadow-[0_0_6px_rgba(139,92,246,0.8)]" />
                  <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-zinc-700 font-bold">
                    NEURAL 3D RUNTIME
                  </span>
                </div>

                <div className="text-sm font-black tracking-[0.25em] uppercase text-zinc-900">
                  3D View
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-300/60">
                    60 FPS
                  </span>
                  <button
                    onClick={() => setAutoRotate(!autoRotate)}
                    className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-gradient-to-r from-violet-100/80 to-slate-200/80 hover:from-violet-200 hover:to-slate-300 text-zinc-700 border border-white/60 transition-colors shadow-sm"
                  >
                    <span className="text-xs">↻</span>
                    <span>360° ORBIT {autoRotate ? "ACTIVE" : "PAUSED"}</span>
                  </button>
                </div>
              </div>

              {/* Center Interactive WebGL Canvas */}
              <div className="relative w-full h-[360px] sm:h-[400px] flex items-center justify-center my-2 cursor-grab active:cursor-grabbing">
                <canvas
                  ref={canvasRef}
                  className="w-full h-full block focus:outline-none"
                />

                {/* Loading Spinner */}
                {isLoadingModel && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-violet-50/70 backdrop-blur-sm z-30">
                    <div className="w-8 h-8 rounded-full border-2 border-violet-600 border-t-transparent animate-spin mb-2" />
                    <span className="text-xs font-mono font-semibold text-zinc-700 uppercase tracking-wider">
                      Streaming 3D GLB...
                    </span>
                  </div>
                )}

                {/* Floating Viewport Pill Controls (Wireframe, PBR, Reset) */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 p-1 rounded-full bg-gradient-to-r from-[#EDE9FE]/95 via-white/95 to-[#E2E8F0]/95 backdrop-blur-xl border border-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.14)] z-20">
                  <button
                    onClick={() => setRenderMode("wireframe")}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      renderMode === "wireframe"
                        ? "bg-zinc-900 text-white shadow-sm"
                        : "text-zinc-700 hover:text-zinc-950 hover:bg-white/60"
                    }`}
                  >
                    ◫ Wireframe
                  </button>
                  <button
                    onClick={() => setRenderMode("pbr")}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      renderMode === "pbr"
                        ? "bg-zinc-900 text-white shadow-sm"
                        : "text-zinc-700 hover:text-zinc-950 hover:bg-white/60"
                    }`}
                  >
                    ✦ PBR
                  </button>
                  <button
                    onClick={resetCamera}
                    className="w-7 h-7 rounded-full text-zinc-500 hover:text-zinc-950 hover:bg-white/60 flex items-center justify-center text-xs transition-colors"
                    title="Reset Camera View"
                  >
                    ↻
                  </button>
                </div>
              </div>

              {/* Bottom Display Headline & Description */}
              <div className="text-center pt-2 pb-1 relative z-10">
                <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-zinc-900 uppercase mb-2">
                  {selectedModel.name}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed max-w-lg mx-auto font-medium">
                  {selectedModel.description}
                </p>
              </div>

            </div>

          </div>

          {/* ================= RIGHT COLUMN (~25% / 3 cols) ================= */}
          <div className="lg:col-span-3 flex flex-col gap-5 sm:gap-6">
            
            {/* Top Search & User Profile Bar */}
            <div className="flex items-center gap-2.5">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search 3D models..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full bg-gradient-to-r from-[#EDE9FE]/50 via-[#F5F3FF]/40 to-[#E2E8F0]/35 backdrop-blur-2xl px-4 py-2 text-xs text-zinc-900 placeholder-zinc-500 shadow-[0_4px_12px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.6)] border border-white/60 focus:outline-none focus:ring-2 focus:ring-violet-400"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">
                  🔍
                </span>
              </div>

              {/* 3D Cube Icon Button */}
              <button className="w-8 h-8 rounded-full bg-gradient-to-br from-[#EDE9FE]/50 to-[#E2E8F0]/40 backdrop-blur-2xl shadow-sm border border-white/60 flex items-center justify-center text-zinc-700 hover:text-zinc-950 transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </button>

              {/* Circular Avatar */}
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 text-white font-bold text-xs flex items-center justify-center shadow-md ring-2 ring-white">
                <span>FB</span>
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-white" />
              </div>
            </div>

            {/* Upper Card: 3D Models / Textures Library */}
            <div className="rounded-[30px] bg-gradient-to-br from-[#EDE9FE]/50 via-[#F5F3FF]/40 to-[#E2E8F0]/35 backdrop-blur-2xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.7)] border border-white/60 flex flex-col justify-between">
              
              {/* Tabs */}
              <div className="flex items-center gap-4 border-b border-violet-200/60 pb-3 mb-3">
                <button
                  onClick={() => setActiveTab("models")}
                  className={`text-xs font-bold pb-1 transition-colors flex items-center gap-1.5 ${
                    activeTab === "models"
                      ? "text-zinc-900 border-b-2 border-violet-600"
                      : "text-zinc-700 hover:text-zinc-950 font-semibold"
                  }`}
                >
                  <span>◫</span>
                  <span>3D Models</span>
                </button>
                <button
                  onClick={() => setActiveTab("textures")}
                  className={`text-xs font-bold pb-1 transition-colors flex items-center gap-1.5 ${
                    activeTab === "textures"
                      ? "text-zinc-900 border-b-2 border-violet-600"
                      : "text-zinc-700 hover:text-zinc-950 font-semibold"
                  }`}
                >
                  <span>⊞</span>
                  <span>Textures</span>
                </button>
              </div>

              {/* Model List Items */}
              <div className="space-y-2">
                {filteredModels.map((item) => {
                  const isSelected = selectedModel.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedModel(item)}
                      className={`flex items-center justify-between p-2.5 rounded-2xl cursor-pointer transition-all ${
                        isSelected
                          ? "bg-gradient-to-r from-white/75 via-violet-100/60 to-white/60 shadow-sm border border-violet-300/60 backdrop-blur-md"
                          : "hover:bg-white/40 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Mini Thumbnail Icon */}
                        <div
                          style={{ backgroundColor: `${item.accentColor}18` }}
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-sm shrink-0 border border-black/[0.04]"
                        >
                          <span style={{ color: item.accentColor }} className="font-bold text-xs">
                            3D
                          </span>
                        </div>

                        <div className="flex flex-col text-left">
                          <span className="text-xs font-bold text-zinc-900 tracking-tight">
                            {item.name}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-700 font-medium">
                            {item.poly} • {item.type}
                          </span>
                        </div>
                      </div>

                      {/* Active Indicator Violet Dot */}
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-violet-600 shadow-[0_0_6px_rgba(139,92,246,0.8)]" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Pagination Dots at Bottom */}
              <div className="flex items-center justify-center gap-1.5 mt-5 pt-2 border-t border-violet-200/60">
                {modelList.map((m) => {
                  const isActive = m.id === selectedModel.id;
                  return (
                    <span
                      key={m.id}
                      className={`transition-all duration-300 rounded-full ${
                        isActive
                          ? "w-4 h-1.5 bg-violet-700 shadow-[0_0_6px_rgba(109,40,217,0.4)]"
                          : "w-1.5 h-1.5 bg-violet-300"
                      }`}
                    />
                  );
                })}
              </div>

            </div>

            {/* Bottom Card: Playback / Turntable Controller */}
            <div className="rounded-[30px] bg-gradient-to-br from-[#EDE9FE]/50 via-[#F5F3FF]/40 to-[#E2E8F0]/35 backdrop-blur-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.7)] border border-white/60 flex flex-col justify-between">
              <div className="text-center mb-2">
                <span className="text-xs font-bold text-zinc-900 tracking-tight">
                  {selectedModel.name}
                </span>
              </div>

              {/* Dotted Timeline Track */}
              <div className="flex items-center justify-between px-2 py-1 text-zinc-400 text-xs select-none">
                {Array.from({ length: 16 }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-1 h-1 rounded-full ${
                      i === 6 ? "bg-violet-600 scale-150 shadow-[0_0_8px_rgba(139,92,246,0.8)]" : "bg-violet-300/70"
                    }`}
                  />
                ))}
              </div>

              {/* Turntable Control Buttons */}
              <div className="flex items-center justify-center gap-4 mt-3">
                <button
                  onClick={() => {
                    const idx = modelList.findIndex((m) => m.id === selectedModel.id);
                    const prev = (idx - 1 + modelList.length) % modelList.length;
                    setSelectedModel(modelList[prev]);
                  }}
                  className="text-zinc-600 hover:text-zinc-950 transition-colors text-sm"
                  title="Previous Model"
                >
                  |◁
                </button>

                <button
                  onClick={() => {
                    if (modelGroupRef.current) modelGroupRef.current.rotation.y -= 0.3;
                  }}
                  className="text-zinc-600 hover:text-zinc-950 transition-colors text-sm"
                  title="Step Backward"
                >
                  ↺
                </button>

                {/* Main Play / Pause Circle */}
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white flex items-center justify-center shadow-md shadow-violet-500/30 hover:scale-105 transition-all text-xs"
                  title={autoRotate ? "Pause Turntable" : "Play Turntable"}
                >
                  {autoRotate ? "❚❚" : "▶"}
                </button>

                <button
                  onClick={() => {
                    if (modelGroupRef.current) modelGroupRef.current.rotation.y += 0.3;
                  }}
                  className="text-zinc-600 hover:text-zinc-950 transition-colors text-sm"
                  title="Step Forward"
                >
                  ↻
                </button>

                <button
                  onClick={() => {
                    const idx = modelList.findIndex((m) => m.id === selectedModel.id);
                    const next = (idx + 1) % modelList.length;
                    setSelectedModel(modelList[next]);
                  }}
                  className="text-zinc-600 hover:text-zinc-950 transition-colors text-sm"
                  title="Next Model"
                >
                  ▷|
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}