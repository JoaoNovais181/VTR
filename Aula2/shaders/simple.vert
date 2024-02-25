#version 460

uniform mat4 m_pvm;
uniform mat4 m_view;
uniform mat3 m_normal;
uniform mat4 m_viewmodel;
uniform vec4 ldir;

in vec4 position; // model space
in vec3 normal; // model space

out vec3 n, ld, eye_cam;

void main() {

    n = normalize(m_normal * normal); // camera space
    ld = normalize(vec3(m_view * ldir)); // camera space

    eye_cam = -vec3(m_viewmodel * position);

    gl_Position = m_pvm * position;
}