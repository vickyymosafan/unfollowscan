'use client';

import styled from 'styled-components';
import { LockIcon } from '@/lib/icons';

export default function PrivacyBadge() {
  return (
    <StyledWrapper>
      <button className="button">
        <LockIcon className="icon" />
        100% Privasi Terjamin
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: inline-block;

  .button {
    width: fit-content;
    display: flex;
    align-items: center;
    padding: 0.6em 1.2em;
    gap: 0.5rem;
    border: none;
    font-weight: 600;
    font-size: 0.75rem;
    border-radius: 30px;
    cursor: pointer;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    background: linear-gradient(
        15deg,
        #2c2c2c,
        #3d3d3d,
        #4a4a4a,
        #5d5d5d,
        #6d6d6d,
        #5d5d5d,
        #4a4a4a,
        #3d3d3d,
        #2c2c2c
      )
      no-repeat;
    background-size: 300%;
    background-position: left center;
    transition: all 0.3s ease;
    color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  @media (min-width: 640px) {
    .button {
      font-size: 0.875rem;
      padding: 0.7em 1.4em;
    }
  }

  .button:hover {
    background-size: 320%;
    background-position: right center;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .button:hover .icon {
    transform: scale(1.1);
  }

  .button .icon {
    width: 16px;
    height: 16px;
    transition: transform 0.3s ease;
  }

  @media (min-width: 640px) {
    .button .icon {
      width: 18px;
      height: 18px;
    }
  }
`;
