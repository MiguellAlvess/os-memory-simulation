# Simulação de gerenciador de memória

Este projeto foi desenvolvido como exercício prático da disciplina de Sistemas Operacionais.
O objetivo é simular quatro algoritmos clássicos de alocação de memória:

- **First-Fit (FF)** – Aloca no primeiro espaço livre encontrado que seja suficiente.

- **Best-Fit (BF)** – Aloca no menor espaço livre que comporte o processo.

- **Worst-Fit (WF)** – Aloca no maior espaço livre disponível.

- **Next-Fit (NF)** – Variante do First-Fit que continua a busca a partir da última posição alocada.

## Como rodar o projeto

**Instale as dependências:**

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

**Rode as simulações:**

```bash
npm run dev
```
