import {
  html, css, LitElement,
} from 'lit';
import {
  customElement, property,
} from 'lit/decorators.js';
import { Mode } from './main';

@customElement ('swarm-mode-selector')
export class SwarmModeSelector extends LitElement {
  static styles = css`
    * {
      box-sizing: border-box;
    }

    :host {
      font-family: monospace;
      position: fixed;
      left: 10px;
      bottom: 10px;
      padding: 0.5rem;
      background-color: #000000AA;
      color: #FFFFFF;
    }

    strong {

    }
  `;

  @property ()
    mode = Mode.NORMAL;

  connectedCallback () {
    super.connectedCallback();
  }

  render () {
    return html/*html*/`
      <strong>Mode:</strong> ${this.mode}
    `;
  }
}