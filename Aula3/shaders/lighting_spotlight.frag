#version 460

//uniform
uniform vec4 diffuse;
uniform vec4 l_pos; // world space
uniform vec4 l_spotdir; // world space
uniform mat4 m_view;
uniform float shininess = 128.0;
uniform float l_spotcutoff;

const float minIntensity = 0.25;

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
    vec3 sd = -normalize(vec3(m_view * l_spotdir));

    float cosTheta = dot(sd, ld);

    // float intensity = max(clamp((cosTheta - (l_spotcutoff + epsilon)) / epsilon, 0, 1), 0.33);
    float intensity = minIntensity;
    float specInt = 0.0;

    // float outer = l_spotcutoff - ((1/(1+l_spotcutoff))/5);

    if (cosTheta > l_spotcutoff)
    {
        intensity = dot(n_normalized, ld);
        // float diff = cosTheta - l_spotcutoff;
        // intensity *= (((cosTheta + diff/2) - l_spotcutoff)/(1-l_spotcutoff));
        intensity = max(intensity, minIntensity);
        // if (l_spotcutoff - cosTheta < 0.01*l_spotcutoff)
        // intensity *= (l_spotcutoff - cosTheta); 
        if (intensity > 0.0)
        {
            vec3 h = normalize(ld + eye_cam);
            specInt = pow(max(dot(n_normalized, h), 0.0), shininess);
        }
    }
    // else if (cosTheta > outer)
    // {
    //     // intensity = dot(n_normalized, ld);
    //     intensity = ((cosTheta - outer)/(l_spotcutoff-outer));
    //     intensity = max(intensity, 0.25);
    // }


    color = intensity*diffuse + vec4(1) * specInt;
}