#version 420

layout(triangles) in;
layout(triangle_strip, max_vertices = 4) out;

uniform mat4 m_pvm;

void main() {

    gl_Position = m_pvm * gl_in[1].gl_Position;
    EmitVertex();

    gl_Position = m_pvm * gl_in[0].gl_Position;
    EmitVertex();

    gl_Position = m_pvm * (gl_in[1].gl_Position + gl_in[2].gl_Position);
    EmitVertex();

    gl_Position = m_pvm * gl_in[2].gl_Position;
    EmitVertex();
}