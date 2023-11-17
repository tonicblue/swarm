import KEY_BINDINGS from './keybindings';

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

customElements.define('swarm-root',
  class extends HTMLElement {
    current: HTMLElement;
    mode = Mode.NORMAL;

    constructor () {
      super();

      this.current = this;
      this.registerKeyboardEvents();
    }

    find (selector: string) {
      return Array.from(this.querySelectorAll(selector));
    }

    registerKeyboardEvents () {
      window.addEventListener('keydown', (ev) => {
        const combo = (
          ev.ctrlKey
            ? `Ctrl+${ev.key}`
            : ev.key
        );

        const binding = KEY_BINDINGS[this.mode][combo];

        if (!binding) return;

        const [method, ...args] = binding;
        console.log('COMMAND', method, args);

        if (method === 'changeMode') this.changeMode.apply(this, args);
      });
    }

    changeMode (newMode: Mode, ...args: any[]) {
      console.log(`Changing mode from ${this.mode} to ${newMode}`);
      this.mode = newMode;
    }
  }
)