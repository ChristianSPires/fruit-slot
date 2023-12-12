# Checklist

## 1. Montagem do Jogo

- [x] O jogo deve ser montado conforme os previews.

### Preview 1
![Win Situation.](/previews/win-situation.png "Win Situation.")

### Preview 2
![Columns Rolling.](/previews/columns-rolling.png "Columns Rolling.")

- [x] O jogador começará com a variável saldo (Balance) em 100 unidades.

- [] Quando o botão play for pressionado, o valor de 10 unidades será descontado e iniciará a animação dos símbolos, que devem correr para baixo em sequência.

- [x] Um resultado é sorteado e então mostrado na tela. Caso os 3 símbolos sorteados resultem em um premio conforme o item 3 Tabela de Pagamentos. Uma linha azul piscará, o premio é então adicionado no saldo.

- [x] Durante a animação dos símbolos o botão de Play deverá estar desabilitado e ser habilitado novamente após a finalização do giro.

## 2. Pesos dos Simbols

- [x] No Slot Machine cada símbolo possui um peso (probabilidade) de aparecer na tela. Quanto menor o seu peso, mais raro ele se torna, o que aumenta o valor pago. Quanto maior o seu peso, mais comum ele se torna, o que diminui o valor a ser pago.

O peso de cada símbolo está abaixo:

* BAR = 1
* Cherry = 4
* Lemon = 6
* Watermelon = 6
* Apple = 6
* Grape = 8
* Orange = 8
* Banana = 8

## 3. Tabela de Pagamento