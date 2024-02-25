# Revisoes??

Espaço local para Global -> Matriz M

Espaço global para câmara -> Matriz V (view)

Projeção -> colocar tudo no clip space -> Matriz P (projecao)

# Pipeline Gráfico

Rasterização -> Pintar os triângulos

Durante a rasterização fazemos a interpolação de cores

## Vertex Shader

Programável

Fazemos a multiplicação pelas matrizes

Temos como input a posição dos vértices, normais, coordenadas de textura, tangentes, ...

Só a posição é obrigatória

O input é dado numa stream

É executado 1 vez para cada vértice

A PVM é dada também

Um vértice é processado independentemente dos outros

## Primitive Assembly

No  Vertex Shader não sabemos se um vertice faz parte de um triangulo, etc

É feito aqui a parte de dar "Assembly" nas formas

## Rasterização e Interpolação

Feito automaticamente

Output de pixeis

## Fragment Shader

Entram pixeis

Chama-se fragment shader e não pixel shader porque não entram pixeis

Se fossem pixeis so tinhamos valores RGBA, entram mais que cores

Entram as coordenadas no ecrã, as normais, coordenadas de textura, ....

Processa 1 píxel de cada vez

# Em OpenGL

## Erros de linking

Ter num shader uma variavel com um nome e noutro shader com o nome diferente


# Trabalho

Fazer um estado da arte em relação a algum tema
