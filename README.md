# Teste eSapiens

## 📌 Sobre o projeto
Este projeto é uma aplicação em React utilizando **Vite** como bundler e **Zustand** para gerenciamento de estado. Além disso, possui suporte a **JSON Server** para mock de API e está configurado com **Jest** para testes automatizados.

> **Nota:** Estou um pouco enferrujado com **Jest** e **PWA**, já que não atuo diariamente com essas tecnologias. 

---

## 🚀 Tecnologias Utilizadas
- **React 19**
- **Vite**
- **Zustand** (Gerenciamento de estado)
- **Tailwind CSS**
- **Axios** (Requisições HTTP)
- **JSON Server** (Mock de API)
- **Jest** + **Testing Library** (Testes automatizados)
- **ESLint** + **Prettier** (Padronização de código)
- **Husky** + **Lint-Staged** (Pré-commit hooks)
- **Vite Plugin PWA** (Progressive Web App)

---

## 🔧 Instalação e Execução
Siga os passos abaixo para rodar o projeto localmente:

### 1️⃣ Clonar o repositório
```sh
git clone https://github.com/roliveirajr01/esapiens.git
cd esapiens
```

### 2️⃣ Instalar as dependências
```sh
nvm use
npm install
```
> **Nota:** Caso não tenha o nvm configurado, o ideal será a v20 do node.

### 3️⃣ Rodar o projeto em ambiente de desenvolvimento
```sh
npm run dev
```
Isso irá iniciar o Vite na porta `3000` e o JSON Server na porta `3001`.

### 4️⃣ Executar os testes
```sh
npm test
```

### 5️⃣ Gerar o build para produção
```sh
npm run build
```

### 6️⃣ Rodar a prévia do build com a API mock
```sh
npm run preview
```

---

## 🧪 Testes Automatizados
O projeto usa **Jest** e **Testing Library** para testes unitários e de integração. Como estou um pouco enferrujado com Jest, podem haver ajustes necessários na cobertura de testes.

Para rodar os testes, basta usar:
```sh
npm test
```

---

## 🌐 Suporte a PWA
O projeto possui suporte básico a PWA utilizando o plugin **Vite Plugin PWA**. Se precisar de ajustes, provavelmente precisarei revisar melhor essa parte, já que não utilizo PWA com frequência.

## 🧑🏽‍💻 Outros Projetos
Fiquem vontade para acompanhar meu projeto pessoal de estudos: [eCommerce](https://github.com/roliveirajr01/ecommerce)