import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "../xterm.css";

export default function TerminalComponent() {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const terminal = new Terminal({
      fontFamily: "Menlo, Monaco, monospace",
      cursorBlink: true,
      theme: {
        background: "#000000",
        foreground: "#f0f0f0",
      },
    });

    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.open(terminalRef.current);
    fitAddon.fit();
    terminal.write("# ");

    const disposable = terminal.onData((data) => {
      if (data === "\r") {
        terminal.write("\r\n");
      } else if (data === "\u007f") {
        terminal.write("\b \b");
      } else {
        terminal.write(data);
      }
    });

    return () => {
      disposable.dispose();
      terminal.dispose();
    };
  }, []);

  return <div ref={terminalRef} id="terminal"></div>;
}
