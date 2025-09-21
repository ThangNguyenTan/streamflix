import styled from "styled-components";

// Main Navigation Container
export const NavContainer = styled.nav<{ isScrolled: boolean }>`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: ${({ isScrolled }) =>
    isScrolled ? "rgba(10, 10, 10, 0.92)" : "transparent"};
  backdrop-filter: ${({ isScrolled }) =>
    isScrolled ? "blur(18px)" : "saturate(140%) blur(12px)"};
  border-bottom: ${({ isScrolled }) =>
    isScrolled ? "1px solid rgba(255, 255, 255, 0.08)" : "none"};
  box-shadow: ${({ isScrolled }) =>
    isScrolled ? "0 12px 32px rgba(0, 0, 0, 0.45)" : "none"};
  transition: background 0.35s ease, backdrop-filter 0.35s ease,
    border-bottom 0.35s ease, box-shadow 0.35s ease;
  isolation: isolate;

  @supports not (backdrop-filter: blur(0)) {
    backdrop-filter: none;
    background: ${({ isScrolled }) =>
      isScrolled
        ? "rgba(10, 10, 10, 0.92)"
        : "linear-gradient(180deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.5) 55%, rgba(0, 0, 0, 0) 100%)"};
  }

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    bottom: -48px;
    height: 48px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0) 100%);
    opacity: ${({ isScrolled }) => (isScrolled ? 0 : 1)};
    transition: opacity 0.35s ease;
    pointer-events: none;
  }
`;

// Navigation Content Wrapper
export const NavContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 70px;
  max-width: 1200px;
  margin: 0 auto;
`;

// Logo Section
export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary || "#e50914"};
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  &:hover {
    color: #d70712;
    text-shadow: 0 2px 8px rgba(229, 9, 20, 0.4);
  }
`;

// Navigation Links
export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled.a`
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 4px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary || "#e50914"};
    background: rgba(255, 255, 255, 0.1);
  }
`;

// User Section (for authenticated users)
export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary || "#e50914"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
`;

export const UserName = styled.span`
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

// Auth Buttons (for unauthenticated users)
export const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const AuthButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;

  ${({ variant, theme }) => {
    if (variant === 'primary') {
      return `
        background: ${theme.colors.primary || "#e50914"};
        color: white;
        box-shadow: 0 2px 8px rgba(229, 9, 20, 0.3);
        
        &:hover {
          background: #d70712;
          box-shadow: 0 4px 12px rgba(229, 9, 20, 0.4);
        }
      `;
    } else {
      return `
        background: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.9);
        border: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        
        &:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
          color: white;
        }
      `;
    }
  }}
`;

// Mobile Menu Button
export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text || "#fff"};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

// Dropdown Menu
export const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  min-width: 200px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-10px)')};
  transition: all 0.3s ease;
  z-index: 1001;
`;

export const DropdownItem = styled.button`
  width: 100%;
  padding: 0.8rem 1rem;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.9);
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }

  &:first-child {
    border-radius: 8px 8px 0 0;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;

// Search Bar
export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const SearchInput = styled.input`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  width: 250px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary || "#e50914"};
    background: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 0 2px rgba(229, 9, 20, 0.2);
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
`;
