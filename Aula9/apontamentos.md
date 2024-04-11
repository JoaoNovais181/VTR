# Geometry Shader

"Canivete suíço dos shaders"

Podemos desenhar para diferentes viewports num GS

Podemos desenhar para diferentes texturas num GS

Entra alguma coisa e sai outra coisa

Podem entrar pontos e sair triangulos

```txt
   Vertex Shader
        |
        v
Primitive Assembly
        |   points;lines;triangles
        v
  Geometry Shader
        |   points;lineStrips;triangleStrips
        v
   Rasterization
  & Interpolation
        |
        v
  Fragment Shader
```

Podemos dar informação de adjacencia, mas tem que ser programado "por nos"
