#version 460

uniform  mat4 m_pvm, m_m;
uniform vec3 cam_pos; // espaço do mundo

in vec4 position; // espaço local
in vec4 normal;   // espaço local

out vec3 incident, n, pos;  // espaço do mundo

void main() {

    mat4 m = inverse(transpose(m_m));

    n = normalize(vec3(m * normal));

    pos = vec3(m_m * position); // espaço do mundo

    incident = pos - cam_pos;

    gl_Position = m_pvm * position;
}