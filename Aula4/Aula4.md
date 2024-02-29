# Aula4

Coordenadas de textura entre 0 e 1

Coordenadas de textura fazem parte dos atributos de um vértice

Agora temos position, normal e texCoordX, em que X pode ir de 0 a 7 (pode ter 8 texturas)

Texturas não precisam de ser necessariamente uma imagem para colocar sobre o modelo, pode ser informação

No fragment shader vamos ter uma funcao para obter a cor da textura para um dado pixel (dadas as coordenadas)

Pode devolver a média das cores entre varios pontos

Sampling: nearest ou Linear -> interpolação linear

a textura no shader é do tipo SamplerXD (X=2 se for 2D, X=3 se for 3D, etc.)

As coordenadas de textura **não são** transformadas no Vertex Shader

Quando estamos a correr o codigo, ao chegar a instrucoes de ir buscar coisas a memoria, essa thread fica em standby enquanto faz isso
mas há threads que vão trabalhando

