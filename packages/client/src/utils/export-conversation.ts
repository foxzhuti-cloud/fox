import type { HermesMessage } from '@/api/hermes/sessions'
import type { ConversationMessage } from '@/api/hermes/conversations'

function formatTimestamp(ts: number): string {
  const d = new Date(ts)
  return d.toLocaleString()
}

function cleanContent(content: string): string {
  try {
    const parsed = JSON.parse(content)
    if (Array.isArray(parsed) && parsed.length > 0 && 'type' in parsed[0]) {
      return parsed
        .filter((block: { type: string; text?: string }) => block.type === 'text')
        .map((block: { type: string; text?: string }) => block.text || '')
        .join('\n')
    }
  } catch {}
  return content || ''
}

function roleLabel(role: string): string {
  switch (role) {
    case 'user': return 'User'
    case 'assistant': return 'Assistant'
    case 'system': return 'System'
    case 'tool': return 'Tool'
    case 'command': return 'Command'
    default: return role
  }
}

export type ExportableMessage = HermesMessage | ConversationMessage

export interface ExportSessionInfo {
  title: string
  model?: string
  source?: string
}

function isHermesMessage(msg: ExportableMessage): msg is HermesMessage {
  return 'tool_name' in msg || 'tool_calls' in msg || 'reasoning' in msg || 'token_count' in msg
}

export function messagesToMarkdown(
  messages: ExportableMessage[],
  sessionInfo: ExportSessionInfo
): string {
  const lines: string[] = []

  lines.push(`# ${sessionInfo.title || 'Conversation'}`)
  lines.push('')

  if (sessionInfo.model) {
    lines.push(`**Model:** ${sessionInfo.model}`)
  }
  if (sessionInfo.source) {
    lines.push(`**Source:** ${sessionInfo.source}`)
  }
  lines.push(`**Date:** ${new Date().toLocaleString()}`)
  lines.push(`**Messages:** ${messages.length}`)
  lines.push('')
  lines.push('---')
  lines.push('')

  for (const msg of messages) {
    const role = msg.role
    const content = cleanContent(msg.content || '')
    const timestamp = formatTimestamp(msg.timestamp)

    lines.push(`### ${roleLabel(role)}`)
    lines.push(`*${timestamp}*`)
    lines.push('')

    if (isHermesMessage(msg) && msg.tool_name) {
      lines.push(`> **Tool:** \`${msg.tool_name}\``)
      lines.push('')
    }

    if (isHermesMessage(msg) && msg.reasoning) {
      lines.push('<details>')
      lines.push('<summary>💭 Thinking</summary>')
      lines.push('')
      lines.push(msg.reasoning)
      lines.push('')
      lines.push('</details>')
      lines.push('')
    }

    if (content) {
      lines.push(content)
      lines.push('')
    } else if (isHermesMessage(msg) && msg.tool_calls && msg.tool_calls.length > 0) {
      lines.push('```json')
      lines.push(JSON.stringify(msg.tool_calls, null, 2))
      lines.push('```')
      lines.push('')
    }

    lines.push('---')
    lines.push('')
  }

  return lines.join('\n')
}

export function downloadMarkdown(markdown: string, filename: string): void {
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function generatePdfHtml(markdown: string, title: string): string {
  const escapedContent = markdown
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: HarmonyOS_Regular, 'PingFang SC', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Hiragino Sans GB', 'Microsoft YaHei', 'Arial', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji', sans-serif;
      font-size: 14px;
      line-height: 1.7;
      color: #1a1a1a;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 32px;
    }
    h1 { font-size: 24px; margin-bottom: 12px; color: #111; }
    h3 { font-size: 16px; margin: 24px 0 8px; color: #333; }
    p { margin: 4px 0 8px; }
    em { color: #888; font-size: 12px; }
    hr { border: none; border-top: 1px solid #e5e5e5; margin: 16px 0; }
    blockquote {
      border-left: 3px solid #d0d0d0;
      padding-left: 12px;
      color: #555;
      margin: 8px 0;
    }
    pre {
      background: #f5f5f5;
      padding: 12px;
      border-radius: 6px;
      overflow-x: auto;
      font-size: 12px;
      line-height: 1.5;
    }
    code {
      background: #f0f0f0;
      padding: 1px 5px;
      border-radius: 3px;
      font-size: 13px;
    }
    pre code {
      background: none;
      padding: 0;
    }
    details {
      margin: 8px 0;
      padding: 8px 12px;
      background: #fafafa;
      border: 1px solid #e5e5e5;
      border-radius: 6px;
    }
    details summary {
      cursor: pointer;
      font-weight: 500;
    }
    @media print {
      body { max-width: 100%; padding: 20px; }
      @page { margin: 20mm; }
    }
  </style>
</head>
<body>
  <div id="content" style="white-space: pre-wrap;">${escapedContent}</div>
  <script>
    // Simple markdown-to-HTML renderer for print
    (function() {
      var md = document.getElementById('content').textContent || '';
      // Unescape
      md = md.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

      // Headers
      md = md.replace(/^### (.+)$/gm, '<h3>$1</h3>');
      md = md.replace(/^## (.+)$/gm, '<h2>$1</h2>');
      md = md.replace(/^# (.+)$/gm, '<h1>$1</h1>');

      // Bold and italic
      md = md.replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>');
      md = md.replace(/(?<!\\*)\\*(.+?)(?<!\\*)\\*(?!\\*)/g, '<em>$1</em>');

      // Inline code
      md = md.replace(new RegExp('\x60([^\x60]+)\x60', 'g'), '<code>$1</code>');

      // Code blocks
      md = md.replace(new RegExp('\x60\x60\x60(\\w*)\\n([\\s\\S]*?)\x60\x60\x60', 'g'), function(m, lang, code) {
        return '<pre><code>' + code + '</code></pre>';
      });

      // Blockquotes
      md = md.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

      // Horizontal rules
      md = md.replace(/^---$/gm, '<hr>');

      // Details (simple)
      md = md.replace(/<details>\\n<summary>(.+?)<\\/summary>\\n\\n([\\s\\S]*?)\\n<\\/details>/g,
        '<details><summary>$1</summary><div>$2</div></details>');

      // Paragraphs - wrap text blocks
      var lines = md.split('\\n');
      var result = [];
      var inBlock = false;
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (/^<(h[1-6]|pre|blockquote|hr|details|ul|ol|li)/.test(line) || /^<\\/.*>$/.test(line)) {
          if (!inBlock) { result.push(line); }
          else { result.push(line); }
          inBlock = /^<(pre|blockquote|details|ul|ol)>/.test(line);
        } else if (line.trim() === '') {
          result.push('<br>');
        } else {
          result.push('<p>' + line + '</p>');
        }
      }
      document.getElementById('content').innerHTML = result.join('\\n');
    })();
  </script>
</body>
</html>`
}

export function openPdfPrint(markdown: string, title: string): void {
  const html = generatePdfHtml(markdown, title)
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const win = window.open(url, '_blank')
  if (win) {
    win.onload = () => {
      win.print()
    }
  }
}
