#version 460

uniform sampler2D diffuseY, diffuseB, diffuseG, diffuseR, diffuseBl, rust, specularMap, normalMap, normal, tangent, texCoord, pos;
uniform mat4 m_view;

in vec2 tc;
in vec3 ld;

out vec4 colorOut;

float perlinNoise(vec3 pos);

void main() {

    vec3 n = texture(normal, tc).xyz;

    if(n == vec3(0.0)) {// nao se pintou nada neste pixel
        discard;
        return;
    }

    n = normalize(n * 2 - 1);
    vec3 t = normalize(texture(tangent, tc).xyz * 2 - 1);

    vec4 p = texture(pos, tc);

    vec4 pos_cam = m_view * vec4(p.xyz, 1);

    vec2 tc_obj = texture(texCoord, tc).st;

    // como tbn sao eixos de coordenadas tem que ser normalizado
    vec3 b = normalize(cross(n, t));

    mat3 tbn = mat3(t, b, n);

    vec3 eye = normalize(-pos_cam.xyz);

    vec3 nMap = normalize(texture(normalMap, tc_obj).xyz * 2 - 1);

    nMap = normalize(tbn * nMap); // nao e necessario normalizar

    vec3 ldn = normalize(ld);
    int cr = int(p.w);

    vec4 color;
    if(cr == 0)
        color = texture(diffuseY, tc_obj);
    else if(cr == 1)
        color = texture(diffuseB, tc_obj);
    else if(cr == 2)
        color = texture(diffuseG, tc_obj);
    else if(cr == 3)
        color = texture(diffuseR, tc_obj);
    else //if (cr == 4)
        color = texture(diffuseBl, tc_obj);

    vec4 texRust = texture(rust, tc_obj);
    float specMap = texture(specularMap, tc_obj).r;

    float noise = clamp(pow(perlinNoise(vec3(p.xyz) + 0.5) * specMap * 1.5, 4), 0, 1);

    color = mix(color, texRust, noise);

    float intensity = max(0.0, dot(nMap, ldn));
    vec4 spec = vec4(0);

    if(intensity > 0) {
        vec3 h = normalize(ldn + eye);
        float specInt = max(0.0, dot(nMap, h));
        vec4 specMap = texture(specularMap, tc_obj);
        spec = specMap * pow(specInt, 80);
    }

    colorOut = intensity * color + spec * (1-noise) + color * 0.5;

}

//---------------------------------------------------------------------------------------
//
// Description : Array and textureless GLSL 2D/3D/4D simplex 
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : ijm
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
// 

float snoise(vec3 v);

vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
    return mod289(((x * 34.0) + 1.0) * x);
}

vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}

float perlinNoise(vec3 pos) {

    return snoise(pos) + 0.5 * snoise(pos * 2) + 0.25 * snoise(pos * 4) + 0.125 * snoise(pos * 8);
}

float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

// Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
    vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

// Permutations
    i = mod289(i);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));

// Gradients: 7x7 points over a square, mapped onto an octahedron.
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
    float n_ = 0.142857142857; // 1.0/7.0
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);    // mod(j,N)

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

//Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

// Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

//-------------------------------------------------------------------------------
