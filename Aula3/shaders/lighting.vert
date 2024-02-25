#version 460

// uniforms
uniform mat4 m_pvm;
uniform mat4 m_viewmodel;
uniform mat3 m_normal;

// input streams - local space
in vec4 position;
in vec3 normal;

//output
out vec3 n,      // normal in camera space
         eye_cam; // camera space

void main() {

    n = normalize(m_normal * normal); // camera space
    eye_cam = -vec3(m_viewmodel * position); // camera space
    gl_Position = m_pvm * position;
}