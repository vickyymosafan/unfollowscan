import type { ReactNode } from 'react';
import styled from 'styled-components';

interface SwapButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
  ariaLabel?: string;
}

const SwapButton = ({ onClick, disabled, children, ariaLabel }: SwapButtonProps) => {
  return (
    <StyledWrapper>
      <button onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
        <span className="button-content">{children}</span>
        <span className="hover-text">{children}</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    margin: 0;
    height: auto;
    background: transparent;
    padding: 0.8em 2em;
    border: none;
    cursor: pointer;
    position: relative;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
  }

  .button-content {
    color: transparent;
    -webkit-text-stroke: 1px rgba(93, 93, 93, 0.6);
    display: flex;
    align-items: center;
    gap: 0.5em;
  }

  .hover-text {
    position: absolute;
    box-sizing: border-box;
    color: #5d5d5d;
    width: 0%;
    inset: 0;
    border-right: 6px solid #5d5d5d;
    overflow: hidden;
    transition: 0.5s;
    -webkit-text-stroke: 1px #5d5d5d;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
  }

  button:hover:not(:disabled) .hover-text {
    width: 100%;
    filter: drop-shadow(0 0 23px #888888);
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    filter: grayscale(0.5);
  }

  button:disabled .hover-text {
    width: 0%;
  }
`;

export default SwapButton;
