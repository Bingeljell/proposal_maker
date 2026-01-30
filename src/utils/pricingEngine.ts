import { CostItem, PricingVariable } from '../types';

export interface FormulaResult {
  value: number;
  error?: string;
  usedVariables: string[];
}

/**
 * Safely evaluates a formula string with variable substitution
 * Supports: +, -, *, /, parentheses, and decimal numbers
 * Variables are referenced as {variableName}
 * 
 * @param formula - The formula string (e.g., "{videos} * 5000 + {posts} * 1000")
 * @param variables - Object containing variable values
 * @returns FormulaResult with calculated value, error (if any), and used variables
 */
export function calculateFormula(
  formula: string,
  variables: Record<string, number>
): FormulaResult {
  const usedVariables: string[] = [];

  if (!formula || formula.trim() === '') {
    return { value: 0, error: 'Formula is empty', usedVariables };
  }

  try {
    // Extract variable names from formula
    const variableRegex = /\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g;
    let match: RegExpExecArray | null;
    const foundVariables = new Set<string>();

    while ((match = variableRegex.exec(formula)) !== null) {
      foundVariables.add(match[1]);
    }

    // Replace variables with their values
    let processedFormula = formula;
    for (const varName of foundVariables) {
      usedVariables.push(varName);
      
      if (!(varName in variables)) {
        return { 
          value: 0, 
          error: `Variable "${varName}" is not defined`,
          usedVariables: Array.from(foundVariables)
        };
      }

      const value = variables[varName];
      if (typeof value !== 'number' || isNaN(value)) {
        return { 
          value: 0, 
          error: `Variable "${varName}" has invalid value`,
          usedVariables: Array.from(foundVariables)
        };
      }

      // Replace {variableName} with the numeric value
      processedFormula = processedFormula.replace(
        new RegExp(`\\{${varName}\\}`, 'g'),
        value.toString()
      );
    }

    // Validate the formula only contains safe characters
    // Allow: digits, operators, parentheses, decimal points, spaces
    const safePattern = /^[0-9+\-*/().\s]+$/;
    if (!safePattern.test(processedFormula)) {
      return { 
        value: 0, 
        error: 'Formula contains invalid characters',
        usedVariables: Array.from(foundVariables)
      };
    }

    // Validate parentheses are balanced
    if (!areParenthesesBalanced(processedFormula)) {
      return { 
        value: 0, 
        error: 'Unbalanced parentheses in formula',
        usedVariables: Array.from(foundVariables)
      };
    }

    // Evaluate the formula safely
    const result = safeEvaluate(processedFormula);
    
    if (isNaN(result) || !isFinite(result)) {
      return { 
        value: 0, 
        error: 'Formula resulted in an invalid number',
        usedVariables: Array.from(foundVariables)
      };
    }

    return { 
      value: Math.round(result), 
      usedVariables: Array.from(foundVariables)
    };

  } catch (err) {
    return { 
      value: 0, 
      error: err instanceof Error ? err.message : 'Invalid formula',
      usedVariables
    };
  }
}

/**
 * Check if parentheses are balanced in the formula
 */
function areParenthesesBalanced(formula: string): boolean {
  let count = 0;
  for (const char of formula) {
    if (char === '(') count++;
    if (char === ')') count--;
    if (count < 0) return false;
  }
  return count === 0;
}

/**
 * Safely evaluate a mathematical expression
 * Uses a recursive descent parser for basic arithmetic
 */
function safeEvaluate(expression: string): number {
  // Remove all whitespace
  const expr = expression.replace(/\s/g, '');
  
  if (expr === '') {
    throw new Error('Empty expression');
  }

  // Tokenize
  const tokens = tokenize(expr);
  
  // Parse and evaluate
  const { result } = parseExpression(tokens, 0);
  
  return result;
}

interface Token {
  type: 'number' | 'operator' | 'paren';
  value: string;
}

function tokenize(expr: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < expr.length) {
    const char = expr[i];

    if (/[0-9.]/.test(char)) {
      // Parse number
      let num = '';
      while (i < expr.length && /[0-9.]/.test(expr[i])) {
        num += expr[i];
        i++;
      }
      // Validate number format
      if (num.split('.').length > 2) {
        throw new Error('Invalid number format');
      }
      tokens.push({ type: 'number', value: num });
    } else if (/[+\-*/]/.test(char)) {
      tokens.push({ type: 'operator', value: char });
      i++;
    } else if (char === '(' || char === ')') {
      tokens.push({ type: 'paren', value: char });
      i++;
    } else {
      throw new Error(`Unexpected character: ${char}`);
    }
  }

  return tokens;
}

// Grammar:
// expression = term { ('+' | '-') term }
// term = factor { ('*' | '/') factor }
// factor = number | '(' expression ')'

function parseExpression(tokens: Token[], pos: number): { result: number; nextPos: number } {
  let { result, nextPos } = parseTerm(tokens, pos);

  while (nextPos < tokens.length && 
         tokens[nextPos].type === 'operator' && 
         (tokens[nextPos].value === '+' || tokens[nextPos].value === '-')) {
    const op = tokens[nextPos].value;
    const rightResult = parseTerm(tokens, nextPos + 1);
    
    if (op === '+') {
      result = result + rightResult.result;
    } else {
      result = result - rightResult.result;
    }
    nextPos = rightResult.nextPos;
  }

  return { result, nextPos };
}

function parseTerm(tokens: Token[], pos: number): { result: number; nextPos: number } {
  let { result, nextPos } = parseFactor(tokens, pos);

  while (nextPos < tokens.length && 
         tokens[nextPos].type === 'operator' && 
         (tokens[nextPos].value === '*' || tokens[nextPos].value === '/')) {
    const op = tokens[nextPos].value;
    const rightResult = parseFactor(tokens, nextPos + 1);
    
    if (op === '*') {
      result = result * rightResult.result;
    } else {
      if (rightResult.result === 0) {
        throw new Error('Division by zero');
      }
      result = result / rightResult.result;
    }
    nextPos = rightResult.nextPos;
  }

  return { result, nextPos };
}

function parseFactor(tokens: Token[], pos: number): { result: number; nextPos: number } {
  if (pos >= tokens.length) {
    throw new Error('Unexpected end of expression');
  }

  const token = tokens[pos];

  if (token.type === 'number') {
    return { result: parseFloat(token.value), nextPos: pos + 1 };
  }

  if (token.type === 'paren' && token.value === '(') {
    const { result, nextPos } = parseExpression(tokens, pos + 1);
    
    if (nextPos >= tokens.length || 
        tokens[nextPos].type !== 'paren' || 
        tokens[nextPos].value !== ')') {
      throw new Error('Missing closing parenthesis');
    }
    
    return { result, nextPos: nextPos + 1 };
  }

  throw new Error(`Unexpected token: ${token.value}`);
}

/**
 * Build a variables map from pricing variables array
 */
export function buildVariablesMap(
  globalVariables: PricingVariable[],
  localVariables?: Record<string, number>
): Record<string, number> {
  const map: Record<string, number> = {};
  
  // Add global variables
  for (const variable of globalVariables) {
    map[variable.key] = variable.value;
  }
  
  // Override with local variables if provided
  if (localVariables) {
    Object.assign(map, localVariables);
  }
  
  return map;
}

/**
 * Calculate the effective rate for a cost item
 * Returns the calculated rate if formula mode is on, otherwise returns the manual rate
 */
export function calculateItemRate(
  item: CostItem,
  globalVariables: PricingVariable[]
): { rate: number; error?: string; usedVariables: string[] } {
  if (!item.useFormula || !item.formula) {
    return { rate: item.rate, usedVariables: [] };
  }

  const variables = buildVariablesMap(globalVariables, item.variables);
  const result = calculateFormula(item.formula, variables);

  return {
    rate: result.value,
    error: result.error,
    usedVariables: result.usedVariables
  };
}

/**
 * Get a breakdown explanation of how the formula was calculated
 */
export function getFormulaBreakdown(
  formula: string,
  globalVariables: PricingVariable[],
  localVariables?: Record<string, number>
): { formula: string; substituted: string; result: number; error?: string } {
  const variables = buildVariablesMap(globalVariables, localVariables);
  
  // Replace variables with their values for display
  let substituted = formula;
  const variableRegex = /\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g;
  
  substituted = substituted.replace(variableRegex, (match, varName) => {
    if (varName in variables) {
      return variables[varName].toString();
    }
    return match;
  });

  const result = calculateFormula(formula, variables);

  return {
    formula,
    substituted,
    result: result.value,
    error: result.error
  };
}

/**
 * Validate a formula syntax without executing it
 */
export function validateFormulaSyntax(formula: string): { valid: boolean; error?: string } {
  if (!formula || formula.trim() === '') {
    return { valid: false, error: 'Formula is empty' };
  }

  // Check for valid characters
  const validPattern = /^[a-zA-Z0-9_+\-*/().\s{}]+$/;
  if (!validPattern.test(formula)) {
    return { valid: false, error: 'Formula contains invalid characters' };
  }

  // Check variable syntax
  const variableRegex = /\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g;
  const processedFormula = formula.replace(variableRegex, '1');

  // Check remaining characters are valid math
  const mathPattern = /^[0-9+\-*/().\s]+$/;
  if (!mathPattern.test(processedFormula)) {
    return { valid: false, error: 'Invalid variable syntax or characters' };
  }

  // Check parentheses balance
  if (!areParenthesesBalanced(processedFormula)) {
    return { valid: false, error: 'Unbalanced parentheses' };
  }

  return { valid: true };
}

/**
 * Extract all variable names used in a formula
 */
export function extractFormulaVariables(formula: string): string[] {
  const variables: string[] = [];
  const variableRegex = /\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g;
  let match: RegExpExecArray | null;

  while ((match = variableRegex.exec(formula)) !== null) {
    if (!variables.includes(match[1])) {
      variables.push(match[1]);
    }
  }

  return variables;
}
