# Meu Conversor

## Descrição

Meu Conversor é um aplicativo web desenvolvido em Angular para conversão de unidades de medida. Este projeto serve como portfólio para demonstrar habilidades em desenvolvimento front-end com Angular, incluindo o uso de componentes standalone, serviços e integração com APIs externas.

O aplicativo permite conversões em tempo real entre diferentes unidades de:
- **Moedas**: Conversão entre diversas moedas usando taxas de câmbio atualizadas.
- **Comprimento**: Metros, quilômetros, pés, polegadas, etc.
- **Temperatura**: Celsius, Fahrenheit, Kelvin.
- **Volume**: Litros, mililitros, galões, etc.
- **Peso**: Quilogramas, gramas, libras, onças, etc.

Acesse o projeto em produção: [https://meuconversor.com.br](https://meuconversor.com.br)

## Tecnologias Utilizadas

- **Angular**: Framework principal para desenvolvimento da aplicação.
- **Tailwind CSS**: Para estilização responsiva e moderna.
- **TypeScript**: Linguagem de programação.
- **RxJS**: Para gerenciamento de estado reativo.
- **Vitest**: Para testes unitários.

## Como Rodar o Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd meuconversor
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

### Executando em Desenvolvimento

Para iniciar o servidor de desenvolvimento:
```bash
npm start
```

Ou usando Angular CLI:
```bash
ng serve
```

A aplicação estará disponível em `http://localhost:4200/`. O servidor suporta hot reload, então as mudanças serão refletidas automaticamente no navegador.

### Build para Produção

Para gerar os arquivos de produção:
```bash
ng build
```

Os arquivos serão gerados na pasta `dist/`.

### Testes

Para executar os testes unitários:
```bash
npm test
```

## Principais Funcionalidades

- **Interface Responsiva**: Design adaptável para desktop e mobile.
- **Conversões em Tempo Real**: Atualização instantânea dos resultados.
- **Histórico de Conversões**: Armazenamento local das conversões realizadas.
- **Troca Rápida de Unidades**: Botão para inverter unidades de origem e destino.
- **Validação de Entrada**: Verificação de valores numéricos válidos.
- **Integração com API de Moedas**: Taxas de câmbio atualizadas via serviço externo.

## Estrutura do Projeto

- `src/app/core/`: Serviços e modelos de dados.
- `src/app/features/`: Componentes específicos para cada tipo de conversão.
- `src/app/shared/`: Componentes reutilizáveis.
- `src/app/layout/`: Layout da aplicação (header, footer).

## Contribuição

Este é um projeto de portfólio. Para sugestões ou melhorias, entre em contato.

## Licença

Este projeto é de uso pessoal e educacional.
