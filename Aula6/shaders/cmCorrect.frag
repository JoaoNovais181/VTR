#version 460

uniform samplerCube tex_cm;

in vec3 incident, n, pos; // espaço do mundo

out vec4 color;

void main() {
    
    vec3 refl = reflect(normalize(incident), normalize(n));

    // // box max abs coord
    float d = 10;

    vec3 l1 = (d - pos) / refl;
    vec3 l2 = (-d - pos) / refl;

    vec3 furthest = max(l1, l2);

    float k = min(min(furthest.x, furthest.y), furthest.z);

    vec3 dir = pos + k * refl;

    color = texture(tex_cm, dir);
    // color = texture(tex_cm, refl);
}