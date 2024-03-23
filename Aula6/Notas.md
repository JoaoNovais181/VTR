# Notas

Ao desenhar objetos com transparencia, temos que os desenhar depois dos opacos

Nao temos acesso direto ao frame buffer, apenas damos a cor do objeto e os coeficientes para fazer a conta

$C = Coef1 * cp + Coef2 * cfb$

Normalmente Coef1 = alpha e Coef2 = (1-alpha)
