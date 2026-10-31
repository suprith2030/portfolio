"use client";

import { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";

/*
 * Two modes:
 *   DRONE — arms extend diagonally up, rotors flat on top, compact body
 *   ROVER — arms fold down as axles, rotors tilt 90° into wheels, body stretches
 *
 * Click the canvas to morph between modes.
 */

/* ── Position / Rotation targets for each part ── */
interface PoseTarget {
  pos: THREE.Vector3;
  rot: THREE.Euler;
  scale: THREE.Vector3;
}

function pt(
  px: number, py: number, pz: number,
  rx = 0, ry = 0, rz = 0,
  sx = 1, sy = 1, sz = 1,
): PoseTarget {
  return {
    pos: new THREE.Vector3(px, py, pz),
    rot: new THREE.Euler(rx, ry, rz),
    scale: new THREE.Vector3(sx, sy, sz),
  };
}

/* ── Drone poses ── */
const dronePose = {
  body:   pt(0, 0, 0, 0, 0, 0, 1, 1, 1),
  arms: [
    pt( 0.6, 0,  0.6, 0,  Math.PI / 4, Math.PI / 2),
    pt(-0.6, 0,  0.6, 0, -Math.PI / 4, Math.PI / 2),
    pt( 0.6, 0, -0.6, 0, -Math.PI / 4, Math.PI / 2),
    pt(-0.6, 0, -0.6, 0,  Math.PI / 4, Math.PI / 2),
  ],
  rotors: [
    pt( 1.05, 0.08,  1.05, Math.PI / 2, 0, 0),
    pt(-1.05, 0.08,  1.05, Math.PI / 2, 0, 0),
    pt( 1.05, 0.08, -1.05, Math.PI / 2, 0, 0),
    pt(-1.05, 0.08, -1.05, Math.PI / 2, 0, 0),
  ],
  legs: [
    pt( 0.3, -0.25,  0.3),
    pt(-0.3, -0.25,  0.3),
    pt( 0.3, -0.25, -0.3),
    pt(-0.3, -0.25, -0.3),
  ],
  skids: [
    pt(0, -0.42,  0.3, 0, 0, Math.PI / 2),
    pt(0, -0.42, -0.3, 0, 0, Math.PI / 2),
  ],
  dome: pt(0, -0.2, 0),
};

/* ── Rover poses ── */
const roverPose = {
  body:   pt(0, 0.15, 0, 0, 0, 0, 1.3, 0.7, 1.6),
  arms: [
    pt( 0.75, -0.15,  0.7, 0, 0, 0, 1, 1, 0.6),
    pt(-0.75, -0.15,  0.7, 0, 0, 0, 1, 1, 0.6),
    pt( 0.75, -0.15, -0.7, 0, 0, 0, 1, 1, 0.6),
    pt(-0.75, -0.15, -0.7, 0, 0, 0, 1, 1, 0.6),
  ],
  rotors: [
    pt( 0.75, -0.15,  0.9,  0, 0, 0, 1.4, 1.4, 1.4),
    pt(-0.75, -0.15,  0.9,  0, 0, 0, 1.4, 1.4, 1.4),
    pt( 0.75, -0.15, -0.9,  0, 0, 0, 1.4, 1.4, 1.4),
    pt(-0.75, -0.15, -0.9,  0, 0, 0, 1.4, 1.4, 1.4),
  ],
  legs: [
    pt( 0.4, -0.05,  0.5, 0, 0, Math.PI / 2, 1, 1, 1.3),
    pt(-0.4, -0.05,  0.5, 0, 0, Math.PI / 2, 1, 1, 1.3),
    pt( 0.4, -0.05, -0.5, 0, 0, Math.PI / 2, 1, 1, 1.3),
    pt(-0.4, -0.05, -0.5, 0, 0, Math.PI / 2, 1, 1, 1.3),
  ],
  skids: [
    pt(0, 0.05,  0.7, 0, 0, Math.PI / 2, 1.8, 1, 1),
    pt(0, 0.05, -0.7, 0, 0, Math.PI / 2, 1.8, 1, 1),
  ],
  dome: pt(0, 0.35, 0.45, 0, 0, 0, 1.2, 1.2, 1.2),
};

/* ── Lerp helpers ── */
function lerpPose(
  mesh: THREE.Object3D,
  target: PoseTarget,
  t: number,
) {
  mesh.position.lerp(target.pos, t);
  mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, target.rot.x, t);
  mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, target.rot.y, t);
  mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, target.rot.z, t);
  mesh.scale.lerp(target.scale, t);
}

export default function DroneModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isRoverRef = useRef(false);
  const morphProgressRef = useRef(0); // 0 = drone, 1 = rover
  const morphTargetRef = useRef(0);

  // We use a ref for the click handler flag so we can attach it inside useEffect
  const handleCanvasClick = useCallback(() => {
    isRoverRef.current = !isRoverRef.current;
    morphTargetRef.current = isRoverRef.current ? 1 : 0;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /* ── Scene Setup ── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 1.2, 4.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    /* ── Materials ── */
    const cyanMat = new THREE.MeshBasicMaterial({
      color: 0x00f3ff, wireframe: true, transparent: true, opacity: 0.7,
    });
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x00f3ff, wireframe: true, transparent: true, opacity: 0.25,
    });


    /* ── Build Drone Group ── */
    const drone = new THREE.Group();
    scene.add(drone);

    // Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.25, 0.8), cyanMat);
    drone.add(body);
    const bodyGlow = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.275, 0.88), glowMat);
    drone.add(bodyGlow);

    // Arms
    const arms: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.1, 6), cyanMat);
      const d = dronePose.arms[i];
      arm.position.copy(d.pos);
      arm.rotation.copy(d.rot);
      arm.scale.copy(d.scale);
      drone.add(arm);
      arms.push(arm);
    }

    // Rotors (each in a parent group: group = pose, mesh = spin)
    const rotorGroups: THREE.Group[] = [];
    const rotorMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const group = new THREE.Group();
      const d = dronePose.rotors[i];
      group.position.copy(d.pos);
      group.rotation.copy(d.rot);
      group.scale.copy(d.scale);

      const rotor = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.04, 8, 20), cyanMat);
      group.add(rotor);
      drone.add(group);
      rotorGroups.push(group);
      rotorMeshes.push(rotor);
    }

    // Legs
    const legs: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.35, 4), cyanMat);
      const d = dronePose.legs[i];
      leg.position.copy(d.pos);
      leg.rotation.copy(d.rot);
      leg.scale.copy(d.scale);
      drone.add(leg);
      legs.push(leg);
    }

    // Skids
    const skids: THREE.Mesh[] = [];
    for (let i = 0; i < 2; i++) {
      const skid = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.7, 4), cyanMat);
      const d = dronePose.skids[i];
      skid.position.copy(d.pos);
      skid.rotation.copy(d.rot);
      skid.scale.copy(d.scale);
      drone.add(skid);
      skids.push(skid);
    }

    // Dome
    const dome = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), glowMat);
    dome.position.copy(dronePose.dome.pos);
    drone.add(dome);



    /* ── Morph flash ring ── */
    const flashRing = new THREE.Mesh(
      new THREE.RingGeometry(0.5, 0.6, 32),
      new THREE.MeshBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0, side: THREE.DoubleSide }),
    );
    flashRing.rotation.x = -Math.PI / 2;
    drone.add(flashRing);
    let flashScale = 0;
    let flashOpacity = 0;

    /* ── Particles ── */
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00f3ff, size: 0.015, transparent: true, opacity: 0.5, sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    /* ── Mouse Tracking ── */
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    /* ── Click to morph ── */
    let prevMorphTarget = 0;
    const onClick = () => {
      handleCanvasClick();
      // Trigger flash
      flashScale = 1;
      flashOpacity = 0.7;
    };
    renderer.domElement.addEventListener("click", onClick);
    renderer.domElement.style.cursor = "pointer";

    /* ── Animation Loop ── */
    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Morph progress
      const target = morphTargetRef.current;
      morphProgressRef.current = THREE.MathUtils.lerp(morphProgressRef.current, target, delta * 2.5);
      const p = morphProgressRef.current;

      // Pick pose set
      const currentPose = {
        body:   p < 0.5 ? dronePose.body   : roverPose.body,
        arms:   p < 0.5 ? dronePose.arms   : roverPose.arms,
        rotors: p < 0.5 ? dronePose.rotors : roverPose.rotors,
        legs:   p < 0.5 ? dronePose.legs   : roverPose.legs,
        skids:  p < 0.5 ? dronePose.skids  : roverPose.skids,
        dome:   p < 0.5 ? dronePose.dome   : roverPose.dome,
      };

      // Smoother: always lerp toward the target pose
      const lerpSpeed = delta * 4;
      const tBody = p < 0.5 ? dronePose.body : roverPose.body;
      lerpPose(body, tBody, lerpSpeed);
      bodyGlow.position.copy(body.position);
      bodyGlow.rotation.copy(body.rotation);
      bodyGlow.scale.copy(body.scale).multiplyScalar(1.1);

      for (let i = 0; i < 4; i++) {
        const tArm = p < 0.5 ? dronePose.arms[i] : roverPose.arms[i];
        lerpPose(arms[i], tArm, lerpSpeed);

        const tRotor = p < 0.5 ? dronePose.rotors[i] : roverPose.rotors[i];
        lerpPose(rotorGroups[i], tRotor, lerpSpeed);

        const tLeg = p < 0.5 ? dronePose.legs[i] : roverPose.legs[i];
        lerpPose(legs[i], tLeg, lerpSpeed);
      }

      for (let i = 0; i < 2; i++) {
        const tSkid = p < 0.5 ? dronePose.skids[i] : roverPose.skids[i];
        lerpPose(skids[i], tSkid, lerpSpeed);
      }

      const tDome = p < 0.5 ? dronePose.dome : roverPose.dome;
      lerpPose(dome, tDome, lerpSpeed);



      // Rotor spin (fast in drone mode, slow "wheel roll" in rover mode)
      const spinSpeed = p < 0.5 ? 3 : 0.8;
      rotorMeshes.forEach((r) => { r.rotation.z += delta * spinSpeed; });

      // Flash ring
      if (flashOpacity > 0.01) {
        flashOpacity *= 0.92;
        flashScale += delta * 8;
        flashRing.scale.set(flashScale, flashScale, 1);
        (flashRing.material as THREE.MeshBasicMaterial).opacity = flashOpacity;
      } else {
        (flashRing.material as THREE.MeshBasicMaterial).opacity = 0;
        flashScale = 0;
      }

      // Auto-rotation (slower in rover mode)
      const rotSpeed = p < 0.5 ? 0.3 : 0.2;
      drone.rotation.y += delta * rotSpeed;

      // Mouse tilt
      drone.rotation.x = THREE.MathUtils.lerp(drone.rotation.x, mouse.y * 0.25, 0.05);
      drone.rotation.z = THREE.MathUtils.lerp(drone.rotation.z, -mouse.x * 0.15, 0.05);

      // Particles
      particles.rotation.y += delta * 0.02;

      // Material color shift (cyan in drone, green-cyan in rover)
      const hue = THREE.MathUtils.lerp(0.52, 0.45, p);
      cyanMat.color.setHSL(hue, 1, 0.5);
      glowMat.color.setHSL(hue, 1, 0.5);
      particleMat.color.setHSL(hue, 1, 0.5);

      renderer.render(scene, camera);
    };
    animate();

    /* ── Resize ── */
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("click", onClick);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [handleCanvasClick]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", position: "relative" }}
    />
  );
}
