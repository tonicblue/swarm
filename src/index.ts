import { SwarmRoot } from './main';
import { SwarmModeSelector } from './mode-selector';
import { SwarmNodeSelector } from './node-selector';

export {
  SwarmRoot,
  SwarmModeSelector,
  SwarmNodeSelector as SwarmNodeHighlighter,
};

declare global {
  interface HTMLElementTagNameMap {
    'swarm-root': SwarmRoot;
    'swarm-mode-selector': SwarmModeSelector;
    'swarm-node-selector': SwarmNodeSelector;
  }
}