# 🎬 Botflix

Um projeto divertido e técnico que combina **Front-end em JavaScript** com **automação no n8n** para gerar recomendações de filmes baseadas no **humor do usuário**.  
A ideia é simples: você digita como está se sentindo e o Botflix retorna sugestões de filmes da API do [TheMovieDB](https://www.themoviedb.org/).

---

## 🚀 Tecnologias Utilizadas

- **Front-end:**  
  - HTML, CSS e JavaScript puro (sem frameworks)  
  - Consumo de API com `fetch`  

- **Automação:**  
  - [n8n](https://n8n.io/) → responsável por receber a requisição do front via Webhook, processar o prompt e retornar a resposta formatada.  

- **API Externa:**  
  - [TheMovieDB (TMDB)](https://developer.themoviedb.org/reference/intro/getting-started) → catálogo de filmes e séries usado para as recomendações.  

---

## ⚙️ Como Funciona

1. O usuário digita o **humor** no campo de texto e clica em **buscar**.  
2. O front envia uma requisição `POST` para um **Webhook no n8n**.  
3. O n8n recebe o dado, passa por um **Agente de IA** que traduz o humor em palavras-chave e consulta a **API do TMDB**.  
4. O **Respond to Webhook** devolve para o front um JSON com os resultados de filmes.  
5. O front renderiza os dados em cards, mostrando pôster, título, descrição e nota.  

---

## 📂 Estrutura do Projeto

```
📦 botflix
 ┣ 📜 index.html       # Estrutura da página
 ┣ 📜 styles.css       # Estilo da interface
 ┣ 📜 index.js         # Lógica do front-end (fetch + renderização)
 ┗ 📜 README.md        # Documentação do projeto
```

---

## 🖥️ Front-End (index.js)

```js
const response = await fetch("https://pamellabinotto.app.n8n.cloud/webhook/botflix", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ userPrompt: mood }),
});
```

➡️ O `fetch` envia o **humor digitado** para o webhook no n8n.  
➡️ O front recebe a resposta e renderiza os cards de filmes.  

---

## 🔄 Automação no n8n

### Fluxo resumido:

```
Webhook → Agente de IA → HTTP Request (TMDB) → Respond to Webhook
```

- **Webhook** → Recebe o texto do usuário (`userPrompt`).  
- **Agente de IA** → Interpreta o humor e gera termos de busca coerentes.  
- **HTTP Request** → Consulta a API do TMDB com esses termos.  
- **Respond to Webhook** → Retorna a lista de filmes para o front.  

### Configurações importantes:
- **CORS** habilitado no `Respond to Webhook`:
  ```text
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: POST, OPTIONS
  Access-Control-Allow-Headers: Content-Type
  ```
- **Webhook** configurado no modo:  
  **Response Mode → Using Respond to Webhook Node**  

---

## 📸 Demonstração

> Digite: **'Filmes de comédia romântica estilo anos 2000'**  
> Resultado: o Botflix retorna filmes relacionados ao gênero, como *Como perder um homem em 10 dias*.  

![Preview da Aplicação](src/images/prompt%20botflix.png)

![Filme Selecionado ](src/images/result%20botflix.png)

---

## 📌 Aprendizados

- Diferença entre **URL de teste** e **URL de produção** no n8n.  
- Importância de configurar **CORS** corretamente no `Respond to Webhook`.  
- Como usar `fetch` no front-end sem `no-cors`.  
- Testar APIs primeiro com **curl** para separar problemas de servidor x navegador.  

---


## ✨ Autor

Feito com ❤️ por **Pamella Binotto**  
🔗 [GitHub](https://github.com/pamella-binotto)
