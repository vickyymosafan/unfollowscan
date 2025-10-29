'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { HomeIcon, BookIcon } from '@/lib/icons';

export default function Header() {
  return (
    <HeaderWrapper>
      <ButtonContainer>
        <Link href="/" className="logo-brand">
          <img src="/Logo.svg" alt="Logo" className="logo" />
          <span className="brand-text">Cek Follow Balik</span>
        </Link>

        <Link href="/">
          <button className="button" title="Beranda">
            <HomeIcon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
          </button>
        </Link>

        <Link href="/panduan">
          <button className="button" title="Panduan">
            <BookIcon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
          </button>
        </Link>
      </ButtonContainer>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  background-color: transparent;
  width: 100%;
  padding: 16px 0;

  @media (min-width: 640px) {
    padding: 20px 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  background-color: black;
  height: 45px;
  align-items: center;
  justify-content: space-around;
  padding: 0 12px;
  border-radius: 10px;
  box-shadow: rgba(34, 34, 34) 0px 5px 15px, rgb(61, 61, 61) 5px 10px 15px;
  gap: 4px;
  margin: 0 auto;
  max-width: fit-content;

  @media (min-width: 640px) {
    height: 50px;
    padding: 0 20px;
    gap: 8px;
  }

  .logo-brand {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: transform 0.3s ease;
    padding: 4px 8px;
    border-radius: 8px;
  }

  @media (min-width: 640px) {
    .logo-brand {
      gap: 10px;
      padding: 5px 10px;
    }
  }

  .logo-brand:hover {
    transform: translateY(-3px);
  }

  .logo {
    width: 28px;
    height: 28px;
  }

  @media (min-width: 640px) {
    .logo {
      width: 32px;
      height: 32px;
    }
  }

  .brand-text {
    font-size: 0.875rem;
    font-weight: 700;
    color: #fff;
    white-space: nowrap;
  }

  @media (min-width: 640px) {
    .brand-text {
      font-size: 1rem;
    }
  }

  .button {
    outline: 0 !important;
    border: 0 !important;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transition: all ease-in-out 0.3s;
    cursor: pointer;
  }

  @media (min-width: 640px) {
    .button {
      width: 40px;
      height: 40px;
    }
  }

  .button:hover {
    transform: translateY(-3px);
  }
`;
