import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const PARTICLE_COUNT_DESKTOP = 800
const PARTICLE_COUNT_MOBILE = 400

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPixelRatio;
  uniform float uParticleScale;

  attribute float vertexIndex;

  varying float vAlpha;
  varying vec3 vColor;

  // Simple noise function
  float hash(float n) {
    return fract(sin(n) * 43758.5453123);
  }

  float noise(vec3 x) {
    vec3 p = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    float n = p.x + p.y * 57.0 + p.z * 113.0;
    return mix(
      mix(mix(hash(n + 0.0), hash(n + 1.0), f.x),
          mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y),
      mix(mix(hash(n + 113.0), hash(n + 114.0), f.x),
          mix(hash(n + 170.0), hash(n + 171.0), f.x), f.y),
      f.z
    );
  }

  void main() {
    vec3 pos = position;

    // 1. Drift: Perlin-style noise fields
    float driftSpeed = 0.12;
    float driftAmp = 8.0;
    float n1 = noise(vec3(pos.x * 0.02, pos.y * 0.02, uTime * driftSpeed + vertexIndex * 0.01));
    float n2 = noise(vec3(pos.y * 0.02, pos.z * 0.02, uTime * driftSpeed + vertexIndex * 0.01 + 100.0));
    float n3 = noise(vec3(pos.z * 0.02, pos.x * 0.02, uTime * driftSpeed + vertexIndex * 0.01 + 200.0));
    pos.x += (n1 - 0.5) * driftAmp;
    pos.y += (n2 - 0.5) * driftAmp;
    pos.z += (n3 - 0.5) * driftAmp * 0.5;

    // 2. Global flow: Slow horizontal translation
    pos.x += sin(uTime * 0.05) * 10.0;

    // 3. Mouse displacement
    vec2 toMouse = pos.xy - uMouse;
    float dist = length(toMouse);
    float mouseRadius = 30.0;
    if (dist < mouseRadius && dist > 0.01) {
      float strength = (1.0 - dist / mouseRadius) * 8.0;
      pos.xy += normalize(toMouse) * strength;
    }

    // 4. Rotation: Entire point cloud slowly rotates on Y-axis
    float rotSpeed = 0.005;
    float angle = uTime * rotSpeed;
    float cosA = cos(angle);
    float sinA = sin(angle);
    float x = pos.x * cosA - pos.z * sinA;
    float z = pos.x * sinA + pos.z * cosA;
    pos.x = x;
    pos.z = z;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Point size based on depth
    gl_PointSize = uPixelRatio * uParticleScale * (60.0 / -mvPosition.z);

    // Distance-based alpha
    float cameraDist = length(mvPosition.xyz);
    vAlpha = smoothstep(100.0, 20.0, cameraDist);

    // Per-particle hash for color variation
    float h = hash(vertexIndex * 17.31);
    vColor = vec3(h);
  }
`

const fragmentShader = `
  varying float vAlpha;
  varying vec3 vColor;

  vec3 palette(float t) {
    vec3 a = vec3(0.75, 0.50, 0.35);
    vec3 b = vec3(0.30, 0.25, 0.25);
    vec3 c = vec3(1.0, 0.9, 0.7);
    vec3 d = vec3(0.0, 0.15, 0.35);
    return a + b * cos(6.28318 * (c * t + d));
  }

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;

    // Smooth radial falloff
    float alpha = pow(1.0 - dist * 2.0, 1.5);

    // Multicolored palette based on particle hash
    vec3 color = palette(vColor.x);

    gl_FragColor = vec4(color, alpha * vAlpha);
  }
`

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)

    // Scene
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0xF5F0EB, 0.008)

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 50)

    // Geometry
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const vertexIndices = new Float32Array(particleCount)

    const rand = seededRandom(42)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (rand() - 0.5) * 120
      positions[i * 3 + 1] = (rand() - 0.5) * 70
      positions[i * 3 + 2] = (rand() - 0.5) * 40
      vertexIndices[i] = i
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('vertexIndex', new THREE.BufferAttribute(vertexIndices, 1))

    // Material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0.0 },
        uMouse: { value: new THREE.Vector2(0.0, 0.0) },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uParticleScale: { value: 3.75 },
      },
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // Mouse tracking
    const mouseTarget = new THREE.Vector2(0, 0)
    const raycaster = new THREE.Raycaster()
    const mouseNDC = new THREE.Vector2()
    const hitPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    const hitPoint = new THREE.Vector3()

    const onMouseMove = (e: MouseEvent) => {
      mouseNDC.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseNDC.y = -(e.clientY / window.innerHeight) * 2 + 1
      raycaster.setFromCamera(mouseNDC, camera)
      raycaster.ray.intersectPlane(hitPlane, hitPoint)
      if (hitPoint) {
        mouseTarget.set(hitPoint.x, hitPoint.y)
      }
    }

    window.addEventListener('mousemove', onMouseMove)

    // Visibility
    let isVisible = true
    let animationId: number
    const clock = new THREE.Clock()

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
      },
      { threshold: 0.1 }
    )

    // Observe a sentinel element near the hero
    const sentinel = document.getElementById('home')
    if (sentinel) observer.observe(sentinel)

    // Animation loop
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      if (!isVisible) return

      const elapsed = clock.getElapsedTime()
      material.uniforms.uTime.value = elapsed

      // Lerp mouse
      const current = material.uniforms.uMouse.value as THREE.Vector2
      current.x += (mouseTarget.x - current.x) * 0.08
      current.y += (mouseTarget.y - current.y) * 0.08

      renderer.render(scene, camera)
    }

    animate()

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      observer.disconnect()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full"
      style={{ zIndex: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    />
  )
}
