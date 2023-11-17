import { Mode } from './main';

type Binding = [action: string, ...args: any[]];
type ModeBindings = {
  [mode in Mode]: {
    [combo: string]: Binding
  }
};

export default {
  "NORMAL": {
    ":": ["changeMode", "COMMAND"],
    "/": ["changeMode", "SEARCH"],
    "Enter": ["changeMode", "EDIT"],
    "d": ["changeMode", "DELETE"],
    "Escape": ["changeMode", "PREVIEW"],
    "i": ["changeMode", "INSERT", "afterbegin"],
    "I": ["changeMode", "INSERT", "beforebegin"],
    "a": ["changeMode", "INSERT", "beforeend"],
    "A": ["changeMode", "INSERT", "afterend"],
    "0": ["moveCursor", "up", "recursive"],
    "$": ["moveCursor", "down", "recursive"],
    "h": ["moveCursor", "parent"],
    "j": ["moveCursor", "down", "next"],
    "k": ["moveCursor", "up", "parent"],
    "l": ["moveCursor", "next"],
    "n": ["moveCursor", "up", "match"],
    "N": ["moveCursor", "down", "match"],
    "ArrowLeft": ["moveCursor", "parent"],
    "ArrowDown": ["moveCursor", "down", "next"],
    "ArrowUp": ["moveCursor", "up", "parent"],
    "ArrowRight": ["moveCursor", "next"],
    "x": ["deleteBlock"],
    "X": ["deleteBlock", "up", "parent"],
    "D": ["deleteBlock", "down", "recursive"],
    "Delete": ["deleteBlock"],
    "y": ["copy"],
    "p": ["paste", "down"],
    "P": ["paste", "up"],
    "u": ["undo"]
  },
  "COMMAND": {
    "Escape": ["changeMode", "NORMAL"]
  },
  "SEARCH": {
    "Escape": ["changeMode", "NORMAL"]
  },
  "INSERT": {
    "Escape": ["changeMode", "NORMAL"]
  },
  "EDIT": {
    "Escape": ["changeMode", "NORMAL"]
  },
  "VISUAL": {
    "Escape": ["changeMode", "NORMAL"]
  },
  "PREVIEW": {
    "Escape": ["changeMode", "NORMAL"],
    "h": ["scroll", "left"],
    "j": ["scroll", "down"],
    "k": ["scroll", "up"],
    "l": ["scroll", "right"],
    "0": ["scroll", "top"],
    "$": ["scroll", "bottom"],
    "/": ["changeMode", "SEARCH"]
  },
  "DELETE": {
    "Escape": ["changeMode", "NORMAL"],
    "0": ["counterPush", "up", "recursive"],
    "$": ["counterPush", "down", "recursive"],
    "h": ["deleteBlock", "parent"],
    "j": ["deleteBlock", "down", "next"],
    "k": ["deleteBlock", "up", "parent"],
    "l": ["deleteBlock", "next"],
    "ArrowLeft": ["deleteBlock", "parent"],
    "ArrowDown": ["deleteBlock", "down", "next"],
    "ArrowUp": ["deleteBlock", "up", "parent"],
    "ArrowRight": ["deleteBlock", "next"]
  }
} as ModeBindings;