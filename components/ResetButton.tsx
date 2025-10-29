import styled from 'styled-components';
import { TrashIcon } from '@/lib/icons';

interface ResetButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const ResetButton = ({ onClick, disabled = false }: ResetButtonProps) => {
  return (
    <StyledWrapper>
      <button 
        className="button" 
        onClick={onClick} 
        disabled={disabled}
        aria-label="Reset semua file"
      >
        <TrashIcon className="svgIcon" />
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #222222;
    border: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.164);
    cursor: pointer;
    transition-duration: .3s;
    overflow: hidden;
    position: relative;
  }

  .button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .svgIcon {
    width: 12px;
    transition-duration: .3s;
  }

  .svgIcon path {
    fill: #f6f6f6;
  }

  .button:hover:not(:disabled) {
    width: 140px;
    border-radius: 50px;
    transition-duration: .3s;
    background-color: #6d6d6d;
    align-items: center;
  }

  .button:hover:not(:disabled) .svgIcon {
    width: 50px;
    transition-duration: .3s;
    transform: translateY(60%);
  }

  .button::before {
    position: absolute;
    top: -20px;
    content: "Delete";
    color: #f6f6f6;
    transition-duration: .3s;
    font-size: 2px;
  }

  .button:hover:not(:disabled)::before {
    font-size: 13px;
    opacity: 1;
    transform: translateY(30px);
    transition-duration: .3s;
  }
`;

export default ResetButton;
