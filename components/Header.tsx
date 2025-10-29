'use client';

import Link from 'next/link';
import styled from 'styled-components';

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
            <svg className="icon" stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" />
            </svg>
          </button>
        </Link>

        <Link href="/panduan">
          <button className="button" title="Panduan">
            <svg className="icon" stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 18H6a1 1 0 0 0 0 2h15v2H6a3 3 0 0 1-3-3V4a2 2 0 0 1 2-2h16v16zM5 16.05c.16-.03.33-.05.5-.05H19V4H5v12.05zM8 8h9v2H8V8zm0 4h9v2H8v-2z" />
            </svg>
          </button>
        </Link>
      </ButtonContainer>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  background-color: rgb(246, 246, 246);
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

  .icon {
    font-size: 18px;
  }

  @media (min-width: 640px) {
    .icon {
      font-size: 20px;
    }
  }
`;
