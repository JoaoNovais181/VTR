#version 460

//uniform
uniform vec4 diffuse;
uniform vec4 l_pos; // world space
uniform mat4 m_view;
uniform float shininess = 128.0;

// input
in vec3 n,       // camera space
        eye_cam, // camera space
        pos;     // camera space

// output
out vec4 color;

void main() {

    vec3 n_normalized = normalize(n); // camera space
    vec3 lp = vec3(m_view * l_pos); // camera space

    vec3 ld = normalize(lp - pos);

    float intensity = max(dot(n_normalized, ld), 0.0);

    float specInt = 0.0;
    if (intensity > 0.0)
    {
        vec3 h = normalize(ld + eye_cam);
        specInt = pow(max(dot(n_normalized, h), 0.0), shininess);
    }

    color = intensity*diffuse + vec4(1) * specInt;
}