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

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  PARENT = 'PARENT',
  NEXT = 'NEXT',
  FIRST = 'FIRST',
  LAST = 'LAST'
}

type Commands = { [name: string]: (...args: any[]) => any };

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
      commandName, ...args
    ] = binding;
    console.log('COMMAND', commandName, args);

    const command = this.commands[commandName];

    if (!command)
      throw Error (`Invalid command ${commandName}`);

    command(...args);
  }

  handleClick (event: MouseEvent) {
    const target = event.target as HTMLElement | null;

    if (target)
      this.selectNode(target);
  }

  commands: Commands = {
    changeMode: (newMode: Mode, ...args: any[]) => {
      console.log(`Changing mode from ${this.mode} to ${newMode}`, args);
      this.mode = newMode;
    },

    moveCursor: (...directions: Direction[]) => {
      console.log(`Move cursor ${directions}`);

      // TODO: Rethink these directions to match how something like neo-tree does it.
      //       Need to think more in terms of collapsing and expanding branches as well as the below
      //       as well as how down can also mean step into first child if the parent branch is
      //       expanded. This all stinks of having these motions actually control a tree-view
      //       component.
      for (const direction of directions) {
        switch (direction) {
          case (Direction.UP):
            if (this.current.previousSibling)
              return this.selectNode(this.current.previousSibling as HTMLElement);
            break;
          case (Direction.DOWN):
            if (this.current.nextSibling)
              return this.selectNode(this.current.nextSibling as HTMLElement);
            break;
          case (Direction.PARENT):
            if (this.current.parentNode)
              return this.selectNode(this.current.parentNode as HTMLElement);
            break;
          case (Direction.NEXT):
            // TODO: This needs to recursively go up a level and look for the `nextSibling`
            if (this.current.parentNode?.nextSibling)
              return this.selectNode(this.current.parentNode.nextSibling as HTMLElement);
            break;
          case (Direction.FIRST):
            if (this.current.parentNode?.firstChild)
              return this.selectNode(this.current.parentNode.firstChild as HTMLElement);
            break;
          case (Direction.LAST):
            if (this.current.parentNode?.lastChild)
              return this.selectNode(this.current.parentNode.lastChild as HTMLElement);
            break;
          default:
            throw new Error (`How TF am i supposed to go "${direction}"?`);
        }
      }
    },
  };

  selectNode (node: HTMLElement) {
    console.log('Node selected', node);
    this.current = node;
    this.nodeSelector.node = node;
  }
}
