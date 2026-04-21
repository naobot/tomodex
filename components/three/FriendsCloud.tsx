"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import styles from "./FriendsCloud.module.css";

type Friend = { id: string; displayName: string };

type Props = {
  friends: Friend[];
};

// Each name drifts along a unique Lissajous-style path in 3D space.
// Think of it like each name is a pendulum with slightly different
// frequencies on each axis — they never quite repeat the same path.
type ParticleState = {
  object: CSS3DObject;
  // Phase offsets so names don't all move in sync
  phaseX: number;
  phaseY: number;
  phaseZ: number;
  // Amplitude of drift per axis
  ampX: number;
  ampY: number;
  ampZ: number;
  // Drift speed (very slow)
  freqX: number;
  freqY: number;
  freqZ: number;
};

export default function FriendsCloud({ friends }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current || friends.length === 0) return;

    const mount = mountRef.current;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 5000);
    camera.position.z = 1000;

    const renderer = new CSS3DRenderer();
    renderer.setSize(width, height);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    // renderer.domElement.style.pointerEvents = "none"; // let clicks pass through to canvas
    mount.appendChild(renderer.domElement);

    const particles: ParticleState[] = [];

    friends.forEach((friend) => {
      // Build a real anchor element — CSS3DRenderer will position it in 3D
      const anchor = document.createElement("a");
      anchor.href = `/people/${friend.id}`;
      anchor.textContent = friend.displayName;
      anchor.className = styles.nameLabel;
      anchor.style.pointerEvents = "auto"; // re-enable just for the labels

      const object = new CSS3DObject(anchor);

      // Scatter names across a wide 3D volume
      object.position.set(
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 1200,
        (Math.random() - 0.5) * 1200
      );

      // Slight random rotation so they don't all face perfectly flat
      object.rotation.x = (Math.random() - 0.5) * 0.2;
      object.rotation.y = (Math.random() - 0.5) * 0.2;

      scene.add(object);

      particles.push({
        object,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        phaseZ: Math.random() * Math.PI * 2,
        ampX: 80 + Math.random() * 120,
        ampY: 60 + Math.random() * 80,
        ampZ: 100 + Math.random() * 200,
        freqX: 0.0002 + Math.random() * 0.0003,
        freqY: 0.0001 + Math.random() * 0.0002,
        freqZ: 0.00015 + Math.random() * 0.00025,
      });
    });

    // Base positions — the drift oscillates around these
    const basePositions = particles.map((p) => ({ ...p.object.position }));

    let animFrameId: number;
    let startTime = performance.now();

    function animate() {
      animFrameId = requestAnimationFrame(animate);
      const elapsed = performance.now() - startTime;

      particles.forEach((p, i) => {
        const base = basePositions[i];
        p.object.position.x = base.x + Math.sin(elapsed * p.freqX + p.phaseX) * p.ampX;
        p.object.position.y = base.y + Math.sin(elapsed * p.freqY + p.phaseY) * p.ampY;
        p.object.position.z = base.z + Math.sin(elapsed * p.freqZ + p.phaseZ) * p.ampZ;

        // Depth cueing: map Z to opacity. Closer = more visible.
        // Z range is roughly -800 to +800; camera is at z=1000.
        const zNorm = (p.object.position.z + 800) / 1600; // 0..1
        const opacity = 0.15 + zNorm * 0.55; // 0.15 (back) to 0.7 (front)
        const scale = 0.4 + zNorm * 0.8; // smaller in back
        (p.object.element as HTMLElement).style.opacity = String(opacity);
        p.object.scale.setScalar(scale);
      });

      renderer.render(scene, camera);
    }

    animate();

    function handleResize() {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
    };
  }, [friends]);

  return (
    <div
      ref={mountRef}
      className={styles.cloudContainer}
      aria-hidden="true"
    />
  );
}