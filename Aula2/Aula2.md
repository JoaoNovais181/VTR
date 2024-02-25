# Luzes??

Quanto mais o vetor da luz coincidir com a normal mais intensidade tem a cor

Lei de Lambert - sendo θ o angulo entre a normal e a luz

I = cos(θ) * diff

## Atributos dos vertices agora

position
normal

## Uniforms

vec4 lightdir;
mat4 view;
mat3 normal_M;

## Calculo do I

```glsl
// da asneira
I = dot(lightdir, normal)
```

Temos que transformar primeiro os vetores para o espaço onde estamos a trabalhar

Se for no espaço camara multiplicamos pela matriz view

```glsl
// para o espaço câmara (podia ser noutro)
ldirCam = view * lightdir;
normalCam = model * view * normal;
```

Quase da certo mas ainda não

A normal depende da superfície, se transformamos a normal como um ponto podemos deixar de ter
uma normal que é perpendicular a superficie

Casos em que isso nao funciona:

Ao escalar num so eixo podemos ficar com uma normal errada

### Como transformar

Utilizar uma tangente (ao transformar nao fica errada), e sabemos que o produto escalar entre
a tangente e a normal dá 0

(M \* t) dot (G \* n) = 0

(M\*t)ᵀ × (G\*n) = 0

t = Mᵀ × G × n

Mᵀ *G = I ⟹  G = (Mᵀ)⁻¹

G -> matriz normal

```glsl
// fica correto assim, mesmo que tenhamos escalas nao uniformes
normalCam = normalMatrix*normal;
```

## Luz especular

Depende do observador

Componente imediatamente refletida

Se a superficie for completamente lisa temos um espelho

Plastico -> superficie lisa

Maçã -> rugosa

Maior parte dos objetos têm luz especular branca, alguns metais tem cores
meio azuladas mas a esmagadora maioria dos objetos tem luz especular branca

## Modelo de Blinn

pegamos no vetor da luz emissiva e da luz e juntamos, e utilizamos o angulo desse
vetor com a normal

Is = cos(alfa)^S

S = shininess

