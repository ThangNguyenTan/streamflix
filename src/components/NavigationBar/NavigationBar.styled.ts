import styled from "styled-components";

// Main Navigation Container
export const NavContainer = styled.nav`
  position: relative;
  width: 100%;
  z-index: 1000;
  background: transparent;
`;

// Navigation Content Wrapper
export const NavContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 0 3rem;
  height: 76px;
  max-width: 1680px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 1024px) {
    padding: 0 2rem;
    height: 72px;
  }

  @media (max-width: 768px) {
    padding: 0 1.25rem;
    height: 64px;
    gap: 1.25rem;
  }
`;

export const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  flex: 1;
  min-width: 0;

  @media (max-width: 1024px) {
    gap: 1.75rem;
  }
`;

export const NavRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.5rem;
  flex: 1;
  min-width: 0;

  @media (max-width: 1024px) {
    gap: 1.25rem;
  }

  @media (max-width: 768px) {
    gap: 0.75rem;
    flex: initial;
  }
`;

// Logo Section
export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.3s ease;

  &:hover {
    transform: translateY(-1px);
    opacity: 0.95;
  }
`;

export const LogoMark = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: linear-gradient(135deg, #ff5a63 0%, #e50914 60%, #b20710 100%);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  box-shadow: 0 12px 26px rgba(229, 9, 20, 0.4);
`;

export const LogoText = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: inherit;

  strong {
    color: ${({ theme }) => theme.colors.primary || "#e50914"};
    font-weight: inherit;
  }
`;

// Navigation Links
export const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 1024px) {
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled.a<{ $isActive?: boolean }>`
  position: relative;
  color: ${({ $isActive }) =>
    $isActive ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.72)"};
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  transition: color 0.3s ease;

  &:hover,
  &:focus-visible {
    color: #ffffff;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -0.55rem;
    width: 100%;
    height: 2px;
    border-radius: 999px;
    background: linear-gradient(90deg, #ff5a63 0%, #e50914 100%);
    transform: ${({ $isActive }) => ($isActive ? "scaleX(1)" : "scaleX(0)")};
    opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
    transform-origin: left center;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  &:hover::after,
  &:focus-visible::after {
    transform: scaleX(1);
    opacity: 1;
  }
`;

export const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.8);

  @media (max-width: 768px) {
    display: none;
  }
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  font-size: 1.05rem;
  cursor: pointer;
  padding: 0.35rem;
  border-radius: 999px;
  transition: color 0.3s ease, background-color 0.3s ease, transform 0.3s ease;

  &:hover,
  &:focus-visible {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.14);
    transform: translateY(-1px);
  }
`;

// User Section (for authenticated users)
export const UserSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const UserProfile = styled.button<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  cursor: pointer;
  padding: 0.3rem 0.75rem 0.3rem 0.35rem;
  border-radius: 999px;
  border: 1px solid
    ${({ $isOpen }) =>
      $isOpen ? "rgba(255, 255, 255, 0.32)" : "rgba(255, 255, 255, 0.18)"};
  background: ${({ $isOpen }) =>
    $isOpen ? "rgba(255, 255, 255, 0.16)" : "rgba(255, 255, 255, 0.1)"};
  transition: background-color 0.3s ease, border-color 0.3s ease,
    box-shadow 0.3s ease, transform 0.3s ease;
  color: inherit;

  &:hover,
  &:focus-visible {
    background: rgba(255, 255, 255, 0.18);
    border-color: rgba(255, 255, 255, 0.32);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
  }
`;

export const UserAvatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff5a63 0%, #e50914 60%, #b20710 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 0.85rem;
  box-shadow: 0 8px 20px rgba(229, 9, 20, 0.35);
`;

export const UserName = styled.span`
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const UserChevron = styled.span<{ $isOpen: boolean }>`
  font-size: 0.7rem;
  color: ${({ $isOpen }) =>
    $isOpen ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.65)"};
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s ease, color 0.3s ease;

  @media (max-width: 768px) {
    display: none;
  }
`;

// Auth Buttons (for unauthenticated users)
export const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
`;

export const AuthButton = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 0.55rem 1.4rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  color: white;

  ${({ variant, theme }) => {
    if (variant === "primary") {
      return `
        background: linear-gradient(135deg, #ff5a63 0%, ${
          theme.colors.primary || "#e50914"
        } 55%, #b20710 100%);
        box-shadow: 0 14px 30px rgba(229, 9, 20, 0.35);

        &:hover,
        &:focus-visible {
          background: linear-gradient(135deg, #ff6b74 0%, ${
            theme.colors.primary || "#e50914"
          } 50%, #b20710 100%);
          box-shadow: 0 18px 36px rgba(229, 9, 20, 0.45);
          transform: translateY(-1px);
        }
      `;
    }

    return `
      background: rgba(255, 255, 255, 0.12);
      color: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.22);

      &:hover,
      &:focus-visible {
        background: rgba(255, 255, 255, 0.18);
        border-color: rgba(255, 255, 255, 0.32);
        color: #ffffff;
      }
    `;
  }}

  @media (max-width: 480px) {
    padding: 0.5rem 1.15rem;
  }
`;

// Mobile Menu Button
export const MobileMenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.text || "#fff"};
  font-size: 1.35rem;
  cursor: pointer;
  transition: background 0.3s ease, border-color 0.3s ease, transform 0.3s ease;

  &:hover,
  &:focus-visible {
    background: rgba(255, 255, 255, 0.18);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

// Dropdown Menu
export const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 0.6rem);
  right: 0;
  background: rgba(12, 12, 12, 0.96);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  min-width: 220px;
  box-shadow: 0 18px 38px rgba(0, 0, 0, 0.45);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  transform: ${({ isOpen }) =>
    isOpen ? "translateY(0)" : "translateY(-12px)"};
  transition: all 0.3s ease;
  z-index: 1001;
  padding: 0.5rem;
`;

export const DropdownItem = styled.button`
  width: 100%;
  padding: 0.75rem 0.9rem;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.85);
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.92rem;
  border-radius: 12px;

  &:hover,
  &:focus-visible {
    background: rgba(255, 255, 255, 0.12);
    color: #ffffff;
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

export const SearchForm = styled.form<{ $isFocused: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  border-radius: 999px;
  padding: 0.4rem 0.75rem 0.4rem 0.9rem;
  background: ${({ $isFocused }) =>
    $isFocused ? "rgba(255, 255, 255, 0.18)" : "rgba(255, 255, 255, 0.12)"};
  border: 1px solid
    ${({ $isFocused }) =>
      $isFocused ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.18)"};
  box-shadow: ${({ $isFocused }) =>
    $isFocused ? "0 16px 34px rgba(0, 0, 0, 0.35)" : "none"};
  transition: all 0.3s ease;
`;

export const SearchInput = styled.input<{ $isFocused: boolean }>`
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.95);
  font-size: 0.95rem;
  width: ${({ $isFocused }) => ($isFocused ? "220px" : "140px")};
  transition: width 0.3s ease, color 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
  }
`;

export const SearchIcon = styled.span`
  color: rgba(255, 255, 255, 0.75);
  font-size: 1rem;
  line-height: 1;
`;
