/**
 * UI HTML for the Accessibility Assistant
 */

export function getUIHTML() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Accessibility Assistant | University of Arizona</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      background: #f5f5f5;
      color: #333;
      line-height: 1.5;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 1rem;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    header {
      background: #ab0520;
      color: white;
      padding: 1rem;
      border-radius: 8px 8px 0 0;
      text-align: center;
    }

    header h1 {
      font-size: 1.25rem;
      font-weight: 600;
    }

    header p {
      font-size: 0.875rem;
      opacity: 0.9;
      margin-top: 0.25rem;
    }

    .tabs {
      display: flex;
      background: #fff;
      border-bottom: 2px solid #e0e0e0;
    }

    .tab {
      flex: 1;
      padding: 0.75rem 1rem;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      color: #666;
      transition: all 0.2s;
    }

    .tab:hover {
      background: #f0f0f0;
    }

    .tab.active {
      color: #ab0520;
      border-bottom: 2px solid #ab0520;
      margin-bottom: -2px;
    }

    .tab:focus {
      outline: 2px solid #0c234b;
      outline-offset: -2px;
    }

    .panel {
      display: none;
      flex: 1;
      flex-direction: column;
      background: #fff;
      border-radius: 0 0 8px 8px;
    }

    .panel.active {
      display: flex;
    }

    /* Chat Panel */
    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      min-height: 300px;
      max-height: 50vh;
    }

    .message {
      margin-bottom: 1rem;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      max-width: 85%;
    }

    .message.user {
      background: #0c234b;
      color: white;
      margin-left: auto;
    }

    .message.assistant {
      background: #e8e8e8;
      margin-right: auto;
    }

    .message.assistant p {
      margin-bottom: 0.5rem;
    }

    .message.assistant p:last-child {
      margin-bottom: 0;
    }

    .message.assistant ul, .message.assistant ol {
      margin: 0.5rem 0;
      padding-left: 1.5rem;
    }

    .message.assistant code {
      background: #d0d0d0;
      padding: 0.125rem 0.25rem;
      border-radius: 3px;
      font-size: 0.875em;
    }

    .chat-form {
      display: flex;
      gap: 0.5rem;
      padding: 1rem;
      border-top: 1px solid #e0e0e0;
    }

    .chat-input {
      flex: 1;
      padding: 0.75rem;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 1rem;
    }

    .chat-input:focus {
      outline: 2px solid #0c234b;
      outline-offset: 1px;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }

    .btn-primary {
      background: #ab0520;
      color: white;
    }

    .btn-primary:hover {
      background: #8b0418;
    }

    .btn-primary:focus {
      outline: 2px solid #0c234b;
      outline-offset: 2px;
    }

    .btn-primary:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    /* Alt Text Panel */
    .alt-text-panel {
      padding: 1rem;
    }

    .drop-zone {
      border: 2px dashed #ccc;
      border-radius: 8px;
      padding: 2rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
      margin-bottom: 1rem;
    }

    .drop-zone:hover, .drop-zone.dragover {
      border-color: #ab0520;
      background: #fef5f5;
    }

    .drop-zone:focus-within {
      outline: 2px solid #0c234b;
      outline-offset: 2px;
    }

    .drop-zone input[type="file"] {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }

    .drop-zone-label {
      display: block;
      cursor: pointer;
    }

    .drop-zone-icon {
      font-size: 3rem;
      margin-bottom: 0.5rem;
    }

    .preview-container {
      display: none;
      margin-bottom: 1rem;
    }

    .preview-container.visible {
      display: block;
    }

    .preview-image {
      max-width: 100%;
      max-height: 200px;
      border-radius: 8px;
      margin-bottom: 0.5rem;
    }

    .context-input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 1rem;
      margin-bottom: 1rem;
    }

    .context-input:focus {
      outline: 2px solid #0c234b;
      outline-offset: 1px;
    }

    .result-box {
      background: #f8f8f8;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 1rem;
      margin-top: 1rem;
      display: none;
    }

    .result-box.visible {
      display: block;
    }

    .result-box h3 {
      font-size: 0.875rem;
      color: #666;
      margin-bottom: 0.5rem;
    }

    .alt-text-result {
      background: #fff;
      border: 1px solid #ccc;
      padding: 0.75rem;
      border-radius: 6px;
      font-family: monospace;
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }

    .copy-btn {
      font-size: 0.875rem;
      padding: 0.5rem 1rem;
      background: #0c234b;
    }

    .copy-btn:hover {
      background: #0a1c3d;
    }

    /* Loading states */
    .loading {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 2px solid #fff;
      border-radius: 50%;
      border-top-color: transparent;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .disclaimer {
      font-size: 0.75rem;
      color: #666;
      text-align: center;
      padding: 0.75rem;
      border-top: 1px solid #e0e0e0;
    }

    .disclaimer a {
      color: #ab0520;
    }

    /* Responsive */
    @media (max-width: 600px) {
      .container {
        padding: 0;
      }
      
      header {
        border-radius: 0;
      }

      .panel {
        border-radius: 0;
      }

      .chat-messages {
        max-height: 40vh;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🎓 Accessibility Assistant</h1>
      <p>Ask questions or generate alt text for images</p>
    </header>

    <div class="tabs" role="tablist">
      <button class="tab active" role="tab" aria-selected="true" aria-controls="chat-panel" id="chat-tab">
        💬 Ask a Question
      </button>
      <button class="tab" role="tab" aria-selected="false" aria-controls="alt-panel" id="alt-tab">
        🖼️ Generate Alt Text
      </button>
    </div>

    <!-- Chat Panel -->
    <div class="panel active" id="chat-panel" role="tabpanel" aria-labelledby="chat-tab">
      <div class="chat-messages" id="chat-messages" role="log" aria-live="polite">
        <div class="message assistant">
          <p>👋 Hi! I'm here to help with accessibility questions. You can ask me about:</p>
          <ul>
            <li>WCAG guidelines and compliance</li>
            <li>Creating accessible documents</li>
            <li>Web accessibility best practices</li>
            <li>Captioning and media accessibility</li>
            <li>University of Arizona accessibility resources</li>
          </ul>
          <p>What would you like to know?</p>
        </div>
      </div>
      <form class="chat-form" id="chat-form">
        <label for="chat-input" class="visually-hidden">Your question</label>
        <input 
          type="text" 
          id="chat-input" 
          class="chat-input" 
          placeholder="Ask an accessibility question..."
          autocomplete="off"
        >
        <button type="submit" class="btn btn-primary" id="chat-submit">Send</button>
      </form>
    </div>

    <!-- Alt Text Panel -->
    <div class="panel" id="alt-panel" role="tabpanel" aria-labelledby="alt-tab">
      <div class="alt-text-panel">
        <div class="drop-zone" id="drop-zone">
          <label class="drop-zone-label" for="image-input">
            <div class="drop-zone-icon">📁</div>
            <p><strong>Drop an image here</strong> or click to browse</p>
            <p style="font-size: 0.875rem; color: #666;">Supports JPEG, PNG, GIF, WebP (max 4MB)</p>
          </label>
          <input type="file" id="image-input" accept="image/jpeg,image/png,image/gif,image/webp">
        </div>

        <div class="preview-container" id="preview-container">
          <img id="preview-image" class="preview-image" alt="Preview of uploaded image">
          <button type="button" class="btn" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;" id="clear-image">
            ✕ Clear image
          </button>
        </div>

        <label for="context-input" style="display: block; margin-bottom: 0.25rem; font-weight: 500;">
          Context (optional)
        </label>
        <input 
          type="text" 
          id="context-input" 
          class="context-input" 
          placeholder="e.g., 'This will be used on the homepage banner'"
        >

        <button type="button" class="btn btn-primary" id="generate-alt" style="width: 100%;" disabled>
          Generate Alt Text
        </button>

        <div class="result-box" id="result-box">
          <h3>Recommended Alt Text</h3>
          <div class="alt-text-result" id="alt-text-result"></div>
          <button type="button" class="btn btn-primary copy-btn" id="copy-btn">
            📋 Copy to Clipboard
          </button>
          <div id="extended-description" style="margin-top: 1rem;"></div>
        </div>
      </div>
    </div>

    <div class="disclaimer">
      AI-generated responses are for guidance only. For official policies, contact 
      <a href="mailto:accessibility@arizona.edu">accessibility@arizona.edu</a>
    </div>
  </div>

  <script>
    // Tab switching
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        panels.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        document.getElementById(tab.getAttribute('aria-controls')).classList.add('active');
      });
    });

    // Chat functionality
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const chatSubmit = document.getElementById('chat-submit');
    let chatHistory = [];

    chatForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const message = chatInput.value.trim();
      if (!message) return;

      // Add user message
      addMessage(message, 'user');
      chatInput.value = '';
      chatSubmit.disabled = true;
      chatSubmit.innerHTML = '<span class="loading"></span>';

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, history: chatHistory }),
        });

        const data = await response.json();
        
        if (data.error) {
          addMessage('Sorry, something went wrong. Please try again.', 'assistant');
        } else {
          addMessage(data.reply, 'assistant');
          chatHistory.push(
            { role: 'user', content: message },
            { role: 'assistant', content: data.reply }
          );
        }
      } catch (error) {
        addMessage('Sorry, I could not connect to the server. Please try again later.', 'assistant');
      }

      chatSubmit.disabled = false;
      chatSubmit.textContent = 'Send';
    });

    function addMessage(content, role) {
      const div = document.createElement('div');
      div.className = 'message ' + role;
      
      if (role === 'assistant') {
        // Simple markdown-like formatting
        content = content
          .replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>')
          .replace(/\\*(.+?)\\*/g, '<em>$1</em>')
          .replace(/\`(.+?)\`/g, '<code>$1</code>')
          .replace(/^- (.+)$/gm, '<li>$1</li>')
          .replace(/(<li>.*<\\/li>)/s, '<ul>$1</ul>')
          .replace(/\\n\\n/g, '</p><p>')
          .replace(/\\n/g, '<br>');
        div.innerHTML = '<p>' + content + '</p>';
      } else {
        div.textContent = content;
      }

      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Alt text functionality
    const dropZone = document.getElementById('drop-zone');
    const imageInput = document.getElementById('image-input');
    const previewContainer = document.getElementById('preview-container');
    const previewImage = document.getElementById('preview-image');
    const generateBtn = document.getElementById('generate-alt');
    const clearBtn = document.getElementById('clear-image');
    const resultBox = document.getElementById('result-box');
    const altTextResult = document.getElementById('alt-text-result');
    const extendedDescription = document.getElementById('extended-description');
    const copyBtn = document.getElementById('copy-btn');
    const contextInput = document.getElementById('context-input');

    let selectedFile = null;

    // Drag and drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
      dropZone.addEventListener(event, (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    });

    ['dragenter', 'dragover'].forEach(event => {
      dropZone.addEventListener(event, () => dropZone.classList.add('dragover'));
    });

    ['dragleave', 'drop'].forEach(event => {
      dropZone.addEventListener(event, () => dropZone.classList.remove('dragover'));
    });

    dropZone.addEventListener('drop', (e) => {
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        handleFile(file);
      }
    });

    imageInput.addEventListener('change', (e) => {
      if (e.target.files[0]) {
        handleFile(e.target.files[0]);
      }
    });

    function handleFile(file) {
      if (file.size > 4 * 1024 * 1024) {
        alert('Image too large. Maximum size is 4MB.');
        return;
      }

      selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImage.src = e.target.result;
        previewContainer.classList.add('visible');
        generateBtn.disabled = false;
        resultBox.classList.remove('visible');
      };
      reader.readAsDataURL(file);
    }

    clearBtn.addEventListener('click', () => {
      selectedFile = null;
      imageInput.value = '';
      previewContainer.classList.remove('visible');
      generateBtn.disabled = true;
      resultBox.classList.remove('visible');
    });

    generateBtn.addEventListener('click', async () => {
      if (!selectedFile) return;

      generateBtn.disabled = true;
      generateBtn.innerHTML = '<span class="loading"></span> Analyzing...';

      try {
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('context', contextInput.value);

        const response = await fetch('/api/alt-text', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (data.error) {
          alert('Error: ' + data.error);
        } else {
          // Parse the response
          const altMatch = data.altText.match(/\\*\\*Recommended alt text:\\*\\*\\s*([\\s\\S]*?)(?=\\*\\*Extended|\\*\\*Notes|$)/i);
          const extMatch = data.altText.match(/\\*\\*Extended description[^:]*:\\*\\*\\s*([\\s\\S]*?)(?=\\*\\*Notes|$)/i);
          const notesMatch = data.altText.match(/\\*\\*Notes:\\*\\*\\s*([\\s\\S]*?)$/i);

          const altText = altMatch ? altMatch[1].trim() : data.altText;
          altTextResult.textContent = altText;

          let extra = '';
          if (extMatch && !extMatch[1].toLowerCase().includes('not needed')) {
            extra += '<h3 style="margin-top: 0.5rem; font-size: 0.875rem; color: #666;">Extended Description</h3>';
            extra += '<p style="font-size: 0.875rem;">' + extMatch[1].trim() + '</p>';
          }
          if (notesMatch) {
            extra += '<h3 style="margin-top: 0.5rem; font-size: 0.875rem; color: #666;">Notes</h3>';
            extra += '<p style="font-size: 0.875rem;">' + notesMatch[1].trim() + '</p>';
          }
          extendedDescription.innerHTML = extra;

          resultBox.classList.add('visible');
        }
      } catch (error) {
        alert('Could not connect to server. Please try again.');
      }

      generateBtn.disabled = false;
      generateBtn.textContent = 'Generate Alt Text';
    });

    copyBtn.addEventListener('click', async () => {
      const text = altTextResult.textContent;
      try {
        await navigator.clipboard.writeText(text);
        copyBtn.textContent = '✓ Copied!';
        setTimeout(() => {
          copyBtn.textContent = '📋 Copy to Clipboard';
        }, 2000);
      } catch (err) {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        copyBtn.textContent = '✓ Copied!';
        setTimeout(() => {
          copyBtn.textContent = '📋 Copy to Clipboard';
        }, 2000);
      }
    });
  </script>

  <style>
    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  </style>
</body>
</html>`;
}
