const submitBtn = document.getElementById("submitBtn");
const emailTextInput = document.getElementById("emailText");
const pdfFileInput = document.getElementById("pdfFile");
const resultArea = document.getElementById("result");

// URLs da API
const API_TEXT_URL = "https://email-classifier-wuo6.onrender.com/classify/text";
const API_FILE_URL = "https://email-classifier-wuo6.onrender.com/classify/file";

submitBtn.addEventListener("click", async () => {
  resultArea.textContent = "⏳ Processando...";

  const emailText = emailTextInput.value.trim();
  const file = pdfFileInput.files[0];

  // ======================
  // VALIDAÇÕES (FRONTEND)
  // ======================
  if (!emailText && !file) {
    resultArea.textContent = "❌ Informe um texto OU envie um arquivo.";
    return;
  }

  if (emailText && file) {
    resultArea.textContent =
      "❌ Envie apenas TEXTO ou ARQUIVO, não os dois ao mesmo tempo.";
    return;
  }

  try {
    let response;

    // ======================
    // CASO 1: TEXTO
    // ======================
    if (emailText) {
      const formData = new FormData();
      formData.append("text", emailText);

      response = await fetch(API_TEXT_URL, {
        method: "POST",
        body: formData,
      });
    }

    // ======================
    // CASO 2: ARQUIVO (PDF ou TXT)
    // ======================
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      response = await fetch(API_FILE_URL, {
        method: "POST",
        body: formData,
      });
    }

    // ======================
    // TRATAMENTO DA RESPOSTA
    // ======================
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Erro ao consumir API");
    }

    const data = await response.json();

    // 🔑 AQUI ESTÁ A CORREÇÃO PRINCIPAL
    const result = data.result;

    // ======================
    // EXIBIÇÃO DO RESULTADO
    // ======================
    resultArea.innerHTML = `
      <strong>Classificação:</strong> ${result.prediction}<br><br>
      <strong>Confiança:</strong> ${result.confidence}<br><br>
      <strong>Origem:</strong> ${result.source}<br><br>

      ${
        result.reply
          ? `<strong>Resposta sugerida:</strong><br>${result.reply}<br><br>`
          : ""
      }

      ${
        result.justification
          ? `<strong>Justificativa:</strong><br>${result.justification}`
          : ""
      }
    `;
  } catch (error) {
    console.error(error);
    resultArea.textContent =
      "❌ Erro ao processar a solicitação.\n\n" + error.message;
  }
});
