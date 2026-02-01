📧 Classifier.IA — Frontend

Interface web para classificação automática de e-mails utilizando Inteligência Artificial.
O usuário pode enviar um arquivo ou colar o texto do e-mail e receber a classificação (Produtivo/Improdutivo) junto de uma resposta sugerida, tudo em tempo real.

✨ Funcionalidades

📂 Upload de arquivos (.pdf ou .txt)

📝 Inserção manual de texto do e-mail

🤖 Classificação automática com IA

💬 Geração de resposta sugerida

🎨 Layout moderno e responsivo

🌙 Modo escuro (Dark Mode)

📱 Totalmente responsivo para mobile

🧩 Componentização de Header e Footer

🧱 Estrutura do Projeto
frontend/
├── index.html
├── script.js
├── styles/
│   ├── global.css
│   └── homepage.css
└── components/
    ├── header/
    │   ├── header.html
    │   └── header.css
    └── footer/
        ├── footer.html
        └── footer.css

🚀 Como executar o projeto
1️⃣ Clonar o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git

2️⃣ Abrir o projeto

Você pode abrir o index.html diretamente no navegador
ou usar um servidor local (recomendado):

# Exemplo com Live Server no VSCode
Clique com botão direito no index.html → Open with Live Server

🔌 Integração com o Backend

O frontend consome uma API para:

Classificar o e-mail

Gerar a resposta sugerida

O arquivo responsável pela integração é:

script.js
