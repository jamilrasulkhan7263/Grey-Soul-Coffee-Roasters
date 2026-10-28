import * as THREE from 'three';

/**
 * Creates a procedural 3D coffee bean geometry:
 * An ellipsoid with a flattened ventral surface and a distinct curved central cleft.
 * Applies vertex colors: Deep Espresso #2B2B2B on outer shell with warm roasted amber
 * #D4A373 highlights through the inner crease groove.
 */
export function createCoffeeBeanGeometry(scale = 1): THREE.BufferGeometry {
  const widthSegments = 24;
  const heightSegments = 16;
  const sphereGeom = new THREE.SphereGeometry(1, widthSegments, heightSegments);
  const position = sphereGeom.attributes.position;
  const v = new THREE.Vector3();

  const colors = new Float32Array(position.count * 3);
  const espressoColor = new THREE.Color(0x2B2B2B); // Deep Espresso
  const roastedAmberColor = new THREE.Color(0xD4A373); // Warm Roasted Amber

  for (let i = 0; i < position.count; i++) {
    v.fromBufferAttribute(position, i);

    // Elongate along Z (length), wider along X, slightly flatter along Y
    v.x *= 0.65;
    v.y *= 0.45;
    v.z *= 0.95;

    let isCrease = false;
    let creaseIntensity = 0;

    // Ventral face crease (when y < 0.05)
    if (v.y < 0.05) {
      v.y *= 0.7;
      const distFromCenter = Math.abs(v.x);
      if (distFromCenter < 0.22) {
        isCrease = true;
        creaseIntensity = Math.pow(1 - distFromCenter / 0.22, 1.4);
        const depth = (0.22 - distFromCenter) * 0.75;
        const wave = Math.sin(v.z * 3.5) * 0.04;
        v.y += depth;
        v.x += wave;
      }
    } else {
      v.y *= 1.15;
    }

    if (isCrease && creaseIntensity > 0) {
      const blendColor = espressoColor.clone().lerp(roastedAmberColor, creaseIntensity * 0.95);
      colors[i * 3] = blendColor.r;
      colors[i * 3 + 1] = blendColor.g;
      colors[i * 3 + 2] = blendColor.b;
    } else {
      colors[i * 3] = espressoColor.r;
      colors[i * 3 + 1] = espressoColor.g;
      colors[i * 3 + 2] = espressoColor.b;
    }

    v.multiplyScalar(scale);
    position.setXYZ(i, v.x, v.y, v.z);
  }

  sphereGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  sphereGeom.computeVertexNormals();
  return sphereGeom;
}
