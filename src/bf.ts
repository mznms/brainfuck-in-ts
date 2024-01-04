class BrainfuckInterpreter {
  private tape: number[];
  private pointer: number;
  private output: string;
  private readonly MIN_REPEAT_COUNT: number = 10;

  constructor() {
    this.tape = new Array(30000).fill(0);
    this.pointer = 0;
    this.output = "";
  }

  formatCode(code: string): string {
    let formattedCode = "";
    let count = 1;

    for (let i = 0; i < code.length; i++) {
      if (code[i] === code[i + 1]) {
        count++;
      } else {
        if (count >= this.MIN_REPEAT_COUNT) {
          formattedCode += `${code[i]}(${count})`;
        } else {
          for (let j = 0; j < count; j++) {
            formattedCode += code[i];
          }
        }
        count = 1;
      }
    }

    return formattedCode;
  }

  interpret(code: string): string {
    let codePointer = 0;

    while (codePointer < code.length) {
      const command = code.charAt(codePointer);

      switch (command) {
        case ">":
          this.pointer++;
          break;

        case "<":
          this.pointer--;
          break;

        case "+":
          this.tape[this.pointer]++;
          break;

        case "-":
          this.tape[this.pointer]--;
          break;

        case ".":
          this.output += String.fromCharCode(this.tape[this.pointer]);
          break;

        case ",":
          // TODO: input
          break;

        case "[":
          if (this.tape[this.pointer] === 0) {
            let loopDepth = 1;

            while (loopDepth > 0) {
              codePointer++;

              if (code.charAt(codePointer) === "[") {
                loopDepth++;
              } else if (code.charAt(codePointer) === "]") {
                loopDepth--;
              }
            }
          }
          break;

        case "]":
          if (this.tape[this.pointer] !== 0) {
            let loopDepth = 1;

            while (loopDepth > 0) {
              codePointer--;

              if (code.charAt(codePointer) === "]") {
                loopDepth++;
              } else if (code.charAt(codePointer) === "[") {
                loopDepth--;
              }
            }
          }
          break;

        default:
          // 無視する他の文字はここに追加
          break;
      }

      codePointer++;
    }

    return this.output;
  }
}

// 使用例
const code =
  "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+++++++++++++++++++++++++++++.+++++++..+++.-------------------------------------------------------------------.------------.+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.--------.+++.------.--------.-------------------------------------------------------------------.";
const interpreter = new BrainfuckInterpreter();
const formattedCode = interpreter.formatCode(code);
const result = interpreter.interpret(code);
console.log("orig:\n" + code);
console.log("formatted:\n" + formattedCode);
console.log("result:\n" + result);
