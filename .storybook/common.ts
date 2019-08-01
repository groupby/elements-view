import { XmlEntities } from 'html-entities';

const entities = new XmlEntities();

export function getDisplayCode(code: string): string {
    return `
      <style>
        pre.code-output {
          padding: 15px;
          background-color: #EEEEEE;
        }
      </style>
      <h3>The code</h3>
      <pre class="code-output"><code>${entities.encode(code)}</code></pre>
    `
  }
