#version 460

uniform samplerCube tex_cm;
uniform float alpha = 0.5;
uniform float etaR = 0.95, etaG = 0.99, etaB = 1.02;

in vec3 incident, n, pos; // espaço do mundo

out vec4 color;

void main() {
    
    vec3 i = normalize(incident);
    vec3 nn = normalize(n);

    vec3 refl = reflect(i, nn);

    vec4 crefl = texture(tex_cm, refl);

    vec3 refrR = refract(i, nn, etaR);
    vec3 refrG = refract(i, nn, etaG);
    vec3 refrB = refract(i, nn, etaB);

    float dot_in = dot(-i, nn);

    vec4 crefr;
    crefr.r = texture(tex_cm, refrR).r;
    crefr.g = texture(tex_cm, refrG).g;
    crefr.b = texture(tex_cm, refrB).b;
    crefr.a = 1;

    float k = 1 - etaR*etaR * (1 - dot_in*dot_in);

    color = mix(crefl, crefr, k);

    // com transparencia 
    // float opacity = 1 - dot(-i, nn);    

    // color = vec4(texture(tex_cm, refl), opacity);
}