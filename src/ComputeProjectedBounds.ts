import * as THREE from "three";

// NOTE: this is a computationally cheap way to get a kinda accurate bounding box for a 3d model,
// I found the concept in the dragon demo for pretext, it functions by projecting 3d Model into
// The screen space then dividing it into horizontal bands and for each band check the left most and right most
// verticies to get the boundaries

export function computeProjectedBounds(object3D, camera, size) {
  // Get vertex postions
  const verteciesPostions = object3D.geometry.attributes.position;

  const vertexStep = Math.ceil(verteciesPostions.count / 2000);

  // Project from 3D to screen space
  const projectedPoints = [];
  const vertex = new THREE.Vector3();

  for (let index = 0; index < verteciesPostions.count; index += vertexStep) {
    vertex.fromBufferAttribute(verteciesPostions, index);
    vertex.applyMatrix4(object3D.matrixWorld);
    vertex.project(camera);
    projectedPoints.push({
      x: ((vertex.x + 1) / 2) * size.width,
      y: ((1 - vertex.y) / 2) * size.height,
    });
  }

  // compute bound bands (divide the model into horizontal bands and get the left and right boundaries for them
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  const padding = Math.max(8, Math.min(size.width, size.height) * 0.01);
  const bandSize = 20;
  const bands = {};

  for (const p of projectedPoints) {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);

    const bandY = Math.floor(p.y / bandSize) * bandSize;

    if (!bands[bandY])
      bands[bandY] = { left: p.x - padding, right: p.x + padding };
    else {
      // NOTE: update the left with the min x value for what we have and new for this band and right with max
      bands[bandY].left = Math.min(bands[bandY].left, p.x - padding);
      bands[bandY].right = Math.max(bands[bandY].right, p.x + padding);
    }
  }

  return {
    bands,
    bandSize,
    left: Math.max(0, minX - padding),
    top: Math.max(0, minY - padding),
    right: Math.min(size.width, maxX + padding),
    bottom: Math.min(size.height, maxY + padding),
  };
}
