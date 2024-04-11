#version 150

uniform sampler2D diffuse, normalMap;

uniform float bumpScale = 0.05;

uniform int linSteps = 32;
uniform int binSteps = 8;

uniform int shadowLinSteps = 32;

in vec3 ld, eye, n; // tangent space
in vec2 tc;

out vec4 colorOut;

void main() {

    float height = 1.0;

    float h = texture(normalMap, tc).a;
    vec3 eye_n = normalize(eye);

    float step = 1.0 / linSteps;
    vec2 delta = bumpScale * eye_n.xy * step / abs(eye.z);

    vec2 offset = tc;

    while(h < height) {
        height -= step;
        offset += delta;
        h = texture(normalMap, offset).a;
    }

    height = h;

    vec4 color = texture(diffuse, offset);
    vec3 ldn = normalize(ld);

    vec3 nn = normalize(texture(normalMap, offset).xyz * 2.0 - 1.0);
    float intensity = max(0.0, dot(nn, ldn));

    float selfShadow = 0.0;

    // precisaria da luz no espaço do mundo
    // float int2 = max(0.0, dot(n, ldw_n));
    // if (int2 == 0) intensity = 0;

    if(intensity > 0) {
        step = 1.0 / shadowLinSteps;
        delta = bumpScale * ldn.xy * step / abs(ldn.z);

        do {
            height += step;
            offset += delta;
            h = texture(normalMap, offset).a;
        } while(h <= height && height < 1.0);

        if(height <= 1.0) {
            selfShadow = 1;
        }
    }



    colorOut = color * (intensity * (1 - selfShadow) + 0.4);
}