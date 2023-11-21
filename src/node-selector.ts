import {
  html, css, LitElement,
} from 'lit';
import { finder } from '@medv/finder';
import {
  customElement, property, query,
} from 'lit/decorators.js';

@customElement ('swarm-node-selector')
export class SwarmNodeSelector extends LitElement {
  static styles = css`
    * {
      box-sizing: border-box;
    }

    :host {
      position: absolute;
      border: 2px solid #AA2222AA;
      font-family: monospace;
      pointer-events: none;
    }

    #tag, #path {
      position: absolute;
      left: -2px;
      background-color: #AA2222AA;
      color: #ffffff;
      line-height: 1rem;
      padding: 0;
    }

    #tag {
      top: -1rem;
    }

    #path {
      bottom: -1rem;
    }
  `;

  @query ('#tag') _tag: any;
  @query ('#path') _path: any;

  @property () node?: HTMLElement;
  @property () get tag () {
    return (
      this.node
        ? `${this.node.tagName}.${Array.from(this.node.classList.values()).join('.')}`
        : ''
    );
  }
  @property () get path () {
    return (
      this.node
        ? finder(this.node)
        : ''
    );
  };

  connectedCallback () {
    super.connectedCallback();
  }

  @property () get positionCSS () {
    if (!this.node)
      return '';

    const rect = this.node.getBoundingClientRect();

    return /*css*/`
      :host {
        top: ${rect.top + window.scrollY}px;
        left: ${rect.left + window.scrollX}px;
        height: ${rect.height}px;
        width: ${rect.width}px;
      }
    `;
  }

  render () {
    return html/*html*/`
      <style>${this.positionCSS}</style>
      <div id="tag">${this.tag}</div>
      <div id="path">${this.path}</div>
    `;
  }
}