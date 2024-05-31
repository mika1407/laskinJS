// CALCULATOR PROGRAM

const display = document.getElementById("display");

        function appendToDisplay(input) {
            display.value += input;
            display.scrollLeft = display.scrollWidth; // Scroll to the right
        }

        function clearDisplay() {
            display.value = "";
        }

        function delete1() {
            display.value = display.value.slice(0, -1);
            display.scrollLeft = display.scrollWidth; // Scroll to the right
        }

        function calculate() {
            try {
                display.value = evaluateExpression(display.value);
                display.scrollLeft = display.scrollWidth; // Scroll to the right after calculation
            } catch (error) {
                display.value = "Error";
                display.scrollLeft = display.scrollWidth; // Scroll to the right
            }
        }

        function evaluateExpression(expression) {
            const tokens = expression.split(/(\d+\.?\d*|\+|\-|\*|\/|\(|\))/).filter(token => token.trim() !== "");
            const outputQueue = [];
            const operatorStack = [];

            const precedence = {
                '+': 1,
                '-': 1,
                '*': 2,
                '/': 2,
            };

            const associativity = {
                '+': 'L',
                '-': 'L',
                '*': 'L',
                '/': 'L',
            };

            for (const token of tokens) {
                if (!isNaN(token)) {
                    outputQueue.push(parseFloat(token));
                } else if ("+-*/".includes(token)) {
                    while (operatorStack.length &&
                        precedence[operatorStack[operatorStack.length - 1]] >= precedence[token] &&
                        associativity[token] === 'L') {
                        outputQueue.push(operatorStack.pop());
                    }
                    operatorStack.push(token);
                } else if (token === '(') {
                    operatorStack.push(token);
                } else if (token === ')') {
                    while (operatorStack[operatorStack.length - 1] !== '(') {
                        outputQueue.push(operatorStack.pop());
                    }
                    operatorStack.pop();
                }
            }

            while (operatorStack.length) {
                outputQueue.push(operatorStack.pop());
            }

            const resultStack = [];

            for (const token of outputQueue) {
                if (!isNaN(token)) {
                    resultStack.push(token);
                } else {
                    const b = resultStack.pop();
                    const a = resultStack.pop();
                    switch (token) {
                        case '+':
                            resultStack.push(a + b);
                            break;
                        case '-':
                            resultStack.push(a - b);
                            break;
                        case '*':
                            resultStack.push(a * b);
                            break;
                        case '/':
                            resultStack.push(a / b);
                            break;
                    }
                }
            }

            return resultStack[0];
        }