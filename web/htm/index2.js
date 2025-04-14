function evaluateExpression(expr) {
    // Step 1: Tokenize the input
    const tokens = expr.match(/\d+|\+|\-|\*|\//g);

    // Step 2: Convert to Reverse Polish Notation using the Shunting Yard Algorithm
    const outputQueue = [];
    const operatorStack = [];

    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };

    tokens.forEach(token => {
        if (!isNaN(token)) {
            outputQueue.push(Number(token));
        } else if (['+', '-', '*', '/'].includes(token)) {
            while (
                operatorStack.length &&
                precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
            ) {
                outputQueue.push(operatorStack.pop());
            }
            operatorStack.push(token);
        }
    });

    while (operatorStack.length) {
        outputQueue.push(operatorStack.pop());
    }

    // Step 3: Evaluate RPN
    const stack = [];

    outputQueue.forEach(token => {
        if (typeof token === 'number') {
            stack.push(token);
        } else {
            const b = stack.pop();
            const a = stack.pop();
            switch (token) {
                case '+': stack.push(a + b); break;
                case '-': stack.push(a - b); break;
                case '*': stack.push(a * b); break;
                case '/': stack.push(a / b); break;
            }
        }
    });

    return stack[0];
}

// Example:
console.log(evaluateExpression("10 + 20 * 3")); // 70