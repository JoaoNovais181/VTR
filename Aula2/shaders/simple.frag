#version 460

uniform vec4 diffuse;
uniform float shininess = 128.0;

in vec3 n,ld, eye_cam;

out vec4 color;

void main() {

    vec3 n_normalized = normalize(n);
    float intensity = max(dot(n_normalized,ld), 0.0);  

    float specInt = 0.0;
    if (intensity > 0)
    {
        vec3 h = normalize(ld + normalize(eye_cam));
        specInt = pow(max(dot(h, n_normalized), 0.0), shininess);
    }
    
    color = diffuse * max(intensity, 0.30) + specInt * vec4(1,1,1,1);
}