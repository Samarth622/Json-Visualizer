import { useState, useCallback } from 'react';

export interface ParseResult {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any | null;
  error: string | null;
  isValid: boolean;
}

export function useJsonParser() {
  const [result, setResult] = useState<ParseResult>({
    data: null,
    error: null,
    isValid: false,
  });

  const parseJson = useCallback((input: string): ParseResult => {
    if (!input.trim()) {
      const emptyResult = {
        data: null,
        error: 'Input is empty',
        isValid: false,
      };
      setResult(emptyResult);
      return emptyResult;
    }

    try {
      const parsed = JSON.parse(input);
      const validResult = {
        data: parsed,
        error: null,
        isValid: true,
      };
      setResult(validResult);
      return validResult;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid JSON format';
      const errorResult = {
        data: null,
        error: errorMessage,
        isValid: false,
      };
      setResult(errorResult);
      return errorResult;
    }
  }, []);

  const reset = useCallback(() => {
    setResult({
      data: null,
      error: null,
      isValid: false,
    });
  }, []);

  return { result, parseJson, reset };
}
