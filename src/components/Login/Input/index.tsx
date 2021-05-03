/* eslint-disable no-nested-ternary */
import React, {
  InputHTMLAttributes,
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';

import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  isPassword?: boolean;
}

const Input: React.FC<InputProps> = ({
  name,
  isPassword,

  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField, error]);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const [inputType] = useState('password');

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <Container
      data-testid="input-container"
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
    >
      {!isPassword ? (
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          title={name}
          role={name}
          {...rest}
          defaultValue={defaultValue}
          ref={inputRef}
        />
      ) : (
        <input
          title={name}
          role={name}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          {...rest}
          type={inputType}
          defaultValue={defaultValue}
          ref={inputRef}
        />
      )}
    </Container>
  );
};

export default Input;
