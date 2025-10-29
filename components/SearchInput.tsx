'use client';

import styled from 'styled-components';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const StyledWrapper = styled.div`
  .container {
    display: flex;
    flex-direction: column;
    gap: 7px;
    position: relative;
    color: var(--input-text);
  }

  .container .label {
    font-size: 15px;
    padding-left: 15px;
    position: absolute;
    top: 13px;
    left: 0;
    transition: 0.3s;
    pointer-events: none;
    color: var(--color-shark-500);
  }

  .input {
    width: 300px;
    height: 45px;
    border: none;
    outline: none;
    padding: 0px 15px;
    border-radius: 6px;
    color: var(--input-text);
    font-size: 15px;
    background-color: var(--input-bg);
    box-shadow: 3px 3px 10px var(--input-shadow-dark),
      -1px -1px 6px var(--input-shadow-light);
  }

  .input:focus {
    border: 2px solid transparent;
    color: var(--input-text);
    box-shadow: 3px 3px 10px var(--input-shadow-dark),
      -1px -1px 6px var(--input-shadow-light),
      inset 3px 3px 10px var(--input-shadow-dark),
      inset -1px -1px 6px var(--input-shadow-light);
  }

  .container .input:focus ~ .label,
  .container .input.has-value ~ .label {
    transition: 0.3s;
    padding-left: 2px;
    transform: translateY(-35px);
    color: var(--color-shark-700);
    font-size: 13px;
  }

  .container .input:focus,
  .container .input.has-value {
    box-shadow: 3px 3px 10px var(--input-shadow-dark),
      -1px -1px 6px var(--input-shadow-light),
      inset 3px 3px 10px var(--input-shadow-dark),
      inset -1px -1px 6px var(--input-shadow-light);
  }
`;

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Cari username...',
}: SearchInputProps) {
  return (
    <StyledWrapper>
      <div className="container">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`input ${value ? 'has-value' : ''}`}
        />
        <label className="label">{placeholder}</label>
      </div>
    </StyledWrapper>
  );
}
