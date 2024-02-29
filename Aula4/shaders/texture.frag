#version 460

// uniforms
uniform sampler2D tex;

uniform int div;
uniform float width;
uniform float gap;
uniform float factor = 0.5;

uniform vec4 diffuse;
uniform vec4 secondaryDiffuse;

// interpolated inputs
in vec2 tc;

// output
out vec4 color;

void main() {

    vec2 fr = fract(tc * div);
    
    vec2  deriv = vec2(dFdx(tc.s * div), dFdy(tc.s * div));
    float len = length(deriv);

    float actualGap = len * factor;
    float f = smoothstep(width-actualGap, width, fr.s) -
              smoothstep(1-actualGap, 1, fr.s);

    color = mix(diffuse, secondaryDiffuse, f);

}