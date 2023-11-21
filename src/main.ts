/**
 * TODO:
 * [ ] Code tidy
 * [ ] Start implementing actions
 * [ ] Create indicators and other UI bits
 * [ ] Generate a nicely formatted hierarchy of blocks
 * [ ] Appropriately outline/highlight current block
 * [ ] Think about repeated actions
 * [ ] Work out the myriad of other shortcut keys for showing and hiding UI elements and the likes
 * [ ] Generate forms to edit blocks `HTMLElement` properties, configs, CSS, etc
 * [ ] Block config/options panel
 */

import {
  html, css, LitElement,
} from 'lit';
import {
  customElement, property,
} from 'lit/decorators.js';

import './index';

import KEY_BINDINGS from './keybindings';
import { SwarmModeSelector } from './mode-selector';
import { SwarmNodeSelector } from './node-selector';

export enum Mode {
  NORMAL = 'NORMAL',
  EDIT = 'EDIT',
  COMMAND = 'COMMAND',
  SEARCH = 'SEARCH',
  VISUAL = 'VISUAL',
  DELETE = 'DELETE',
  INSERT = 'INSERT',
  PREVIEW = 'PREVIEW'
}

@customElement('swarm-root')
export class SwarmRoot extends LitElement {
  static styles = css`

  `;

  current: HTMLElement = this;
  modeSelector = document.createElement('swarm-mode-selector') as SwarmModeSelector;
  nodeSelector = document.createElement('swarm-node-selector') as SwarmNodeSelector;

  private _mode = Mode.NORMAL;
  get mode () {
    return this._mode;
  }
  set mode (newMode: Mode) {
    this._mode = newMode;
  }

  constructor () {
    super();

    document.body.appendChild(this.modeSelector);
    document.body.appendChild(this.nodeSelector);
  }

  connectedCallback () {
    super.connectedCallback();

    window.addEventListener('keydown', this.handleKeydown.bind(this));
    this.addEventListener('click', this.handleClick.bind(this));
  }

  render () {
    return html`<slot></slot>`;
  }

  handleKeydown (ev: KeyboardEvent) {
    const combo = ev.ctrlKey ? `Ctrl+${ev.key}` : ev.key;
    const binding = KEY_BINDINGS[this.mode][combo];

    if (!binding)
      return;

    const [
      method, ...args
    ] = binding;
    console.log('COMMAND', method, args);

    if (method === 'changeMode')
      this.changeMode(...args);
  }

  handleClick (event: MouseEvent) {
    console.log('Node selected', event.target);
    this.nodeSelector.node = event.target as HTMLElement;
  }

  changeMode (newMode: Mode, ...args: any[]) {
    console.log(`Changing mode from ${this.mode} to ${newMode}`);
    this.mode = newMode;
  }
}
