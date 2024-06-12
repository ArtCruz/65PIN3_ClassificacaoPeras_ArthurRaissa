## Guia de Utilização - Classificação de Peras

Este guia explica como executar e utilizar a aplicação de Classificação de Peras, que consiste em um sistema para classificar peras como *"boa"* ou *"ruim"* com base em diferentes modelos de machine learning.

### Requisitos

- **Python 3.x**
- **Node.js**
- **npm**

### Instalação e Configuração

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/your_username/65PIN3_ClassificacaoPeras_ArthurRaissa.git
   ```

2. **Navegue até o diretório do backend e inicie o servidor**:

   ```bash
   cd 65PIN3_ClassificacaoPeras_ArthurRaissa/back-end
   python api.py
   ```

3. **Em um segundo terminal, vá para o diretório do frontend e inicie a aplicação**:

   ```bash
   cd 65PIN3_ClassificacaoPeras_ArthurRaissa/front-end
   npm start
   ```

### Utilização

#### Escolha do Modelo

Antes de prosseguir para a classificação das peras, é necessário selecionar o modelo a ser utilizado. Isso pode ser feito escolhendo entre **Regressão Logística** ou **Árvore de Decisão**.

#### Importação de Dados

Se deseja classificar múltiplas peras, pode-se importar um arquivo CSV. Certifique-se de selecionar um arquivo localizado em `65PIN3_ClassificacaoPeras_ArthurRaissa/back-end/dados/`.

#### Classificação

- **Para calcular múltiplas peras**: A tabela de *"Somente Uma Pera"* deve estar vazia.
- **Para calcular somente uma pera**: Nenhum arquivo CSV deve ser selecionado.

Após a execução dos cálculos pelo backend, uma nova coluna denominada *"resultado"* será adicionada ao arquivo CSV, indicando se cada pera é boa ou ruim.

### Visualização dos Resultados

Após os cálculos, é possível visualizar os resultados clicando no botão *"Visualizar CSV"* e selecionando o mesmo arquivo utilizado para o cálculo.

Para calcular uma única pera, um diálogo será exibido com os dados e o resultado da classificação.
