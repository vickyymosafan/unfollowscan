import type { ReactNode } from 'react';
import styled from 'styled-components';

interface GlowButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    children: ReactNode;
    ariaLabel?: string;
}

const GlowButton = ({ onClick, disabled, children, ariaLabel }: GlowButtonProps) => {
    return (
        <StyledWrapper>
            <button onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
                {children}
            </button>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  button {
    --glow-color: #d1d1d1;
    --glow-spread-color: rgba(177, 177, 177, 0.5);
    --btn-color: #5d5d5d;
    border: .25em solid var(--glow-color);
    padding: 1em 3em;
    color: #f6f6f6;
    font-size: 15px;
    font-weight: bold;
    background-color: var(--btn-color);
    border-radius: 1em;
    outline: none;
    box-shadow: 0 0 1em .25em var(--glow-color),
      0 0 4em 1em var(--glow-spread-color),
      inset 0 0 .75em .25em var(--glow-color);
    text-shadow: 0 0 .5em var(--glow-color);
    position: relative;
    transition: all 0.3s;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5em;
  }

  button::after {
    pointer-events: none;
    content: "";
    position: absolute;
    top: 120%;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: var(--glow-spread-color);
    filter: blur(2em);
    opacity: .7;
    transform: perspective(1.5em) rotateX(35deg) scale(1, .6);
  }

  button:hover:not(:disabled) {
    color: #222222;
    background-color: var(--glow-color);
    box-shadow: 0 0 1em .25em var(--glow-color),
      0 0 4em 2em var(--glow-spread-color),
      inset 0 0 .75em .25em var(--glow-color);
  }

  button:active:not(:disabled) {
    box-shadow: 0 0 0.6em .25em var(--glow-color),
      0 0 2.5em 2em var(--glow-spread-color),
      inset 0 0 .5em .25em var(--glow-color);
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    filter: grayscale(0.5);
  }
`;

export default GlowButton;
