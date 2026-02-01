const submitBtn = document.getElementById("submitBtn");
const emailTextInput = document.getElementById("emailText");
const pdfFileInput = document.getElementById("pdfFile");
const resultArea = document.getElementById("result");

const API_TEXT_URL = "https://email-classifier-wuo6.onrender.com/classify/text";
const API_FILE_URL = "https://email-classifier-wuo6.onrender.com/classify/file";

submitBtn.addEventListener("click", async () => {
  submitBtn.disabled = true;
  submitBtn.textContent = "Processando...";
  resultArea.innerHTML = "<p>⏳ Processando...</p>";

  const emailText = emailTextInput.value.trim();
  const file = pdfFileInput.files[0];

  if (!emailText && !file) {
    resultArea.innerHTML =
      "<p class='error'>❌ Informe um texto OU envie um arquivo.</p>";
    submitBtn.disabled = false;
    submitBtn.textContent = "Classificar Email";
    return;
  }

  if (emailText && file) {
    resultArea.innerHTML =
      "<p class='error'>❌ Envie apenas TEXTO ou ARQUIVO.</p>";
    submitBtn.disabled = false;
    submitBtn.textContent = "Classificar Email";
    return;
  }

  try {
    let response;

    if (emailText) {
      const formData = new FormData();
      formData.append("text", emailText);

      response = await fetch(API_TEXT_URL, { method: "POST", body: formData });
    }

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      response = await fetch(API_FILE_URL, { method: "POST", body: formData });
    }

    if (!response.ok) throw new Error("Erro ao consumir API");

    const data = await response.json();
    const result = data.result;

    resultArea.innerHTML = `
      <div class="result-content">
        <div class="badge ${result.prediction === "Produtivo" ? "produtivo" : "improdutivo"}">
          ${result.prediction}
        </div>

        ${
          result.reply
            ? `
          <div class="reply-box">
            <h4>Resposta sugerida</h4>
            <p>${result.reply}</p>
          </div>
        `
            : `
          <p class="muted">Nenhuma resposta sugerida para este caso.</p>
        `
        }
      </div>
    `;
  } catch (error) {
    resultArea.innerHTML =
      "<p class='error'>❌ Erro ao processar a solicitação.</p>";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Classificar Email";
  }
});

// ============================
// DARK MODE TOGGLE
// ============================

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  // Recupera preferência salva
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

const fileNameLabel = document.getElementById("fileName");
const uploadText = document.getElementById("uploadText");

pdfFileInput.addEventListener("change", () => {
  if (pdfFileInput.files.length > 0) {
    fileNameLabel.textContent = pdfFileInput.files[0].name;
    uploadText.textContent = "Arquivo selecionado:";
  } else {
    fileNameLabel.textContent = "Nenhum arquivo selecionado";
    uploadText.textContent =
      "Clique Aqui para Selecionar o seu Arquivo e Anexar.";
  }
});
