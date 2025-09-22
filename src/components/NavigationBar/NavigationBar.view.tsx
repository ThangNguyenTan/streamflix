import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  NavContainer,
  NavContent,
  NavLeft,
  NavRight,
  LogoSection,
  Logo,
  LogoMark,
  LogoText,
  NavLinks,
  NavLink,
  IconGroup,
  IconButton,
  UserSection,
  UserProfile,
  UserAvatar,
  UserName,
  UserChevron,
  AuthButtons,
  AuthButton,
  MobileMenuButton,
  DropdownMenu,
  DropdownItem,
  SearchContainer,
  SearchForm,
  SearchInput,
  SearchIcon,
} from "./NavigationBar.styled";

const NAVIGATION_LINKS = [
  { label: "Home", path: "/" },
  { label: "Movies", path: "/movies" },
  { label: "TV Shows", path: "/tvshows" },
  { label: "My List", path: "/my-list" },
] as const;

export const NavigationBar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate("/");
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Implement search functionality
      console.log("Searching for:", searchQuery);
    }
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const isPathActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <NavContainer>
      <NavContent>
        <NavLeft>
          <LogoSection>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Logo>
                <LogoMark>S</LogoMark>
                <LogoText>
                  Stream<strong>Flix</strong>
                </LogoText>
              </Logo>
            </Link>
          </LogoSection>

          {user && (
            <NavLinks>
              {NAVIGATION_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  as={Link}
                  to={link.path}
                  $isActive={isPathActive(link.path)}
                >
                  {link.label}
                </NavLink>
              ))}
            </NavLinks>
          )}
        </NavLeft>

        <NavRight>
          {user && (
            <>
              <SearchContainer>
                <SearchForm
                  onSubmit={handleSearch}
                  $isFocused={isSearchFocused || Boolean(searchQuery)}
                >
                  <SearchIcon aria-hidden="true">🔍</SearchIcon>
                  <SearchInput
                    type="text"
                    placeholder="Titles, people, genres"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    $isFocused={isSearchFocused || Boolean(searchQuery)}
                    aria-label="Search titles"
                  />
                </SearchForm>
              </SearchContainer>

              <IconGroup>
                <IconButton type="button" aria-label="Help center">
                  ?
                </IconButton>
                <IconButton type="button" aria-label="Notifications">
                  🔔
                </IconButton>
              </IconGroup>
            </>
          )}

          {user ? (
            <UserSection ref={dropdownRef}>
              <UserProfile
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                $isOpen={isDropdownOpen}
              >
                <UserAvatar>{getInitials(user.username)}</UserAvatar>
                <UserName>{user.username}</UserName>
                <UserChevron $isOpen={isDropdownOpen} aria-hidden="true">
                  ▾
                </UserChevron>
              </UserProfile>

              <DropdownMenu isOpen={isDropdownOpen}>
                <DropdownItem
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate("/profile");
                  }}
                >
                  Profile
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate("/settings");
                  }}
                >
                  Settings
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate("/my-list");
                  }}
                >
                  My List
                </DropdownItem>
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
              </DropdownMenu>
            </UserSection>
          ) : (
            <AuthButtons>
              <AuthButton as={Link} to="/login" variant="secondary">
                Sign In
              </AuthButton>
              <AuthButton as={Link} to="/signup" variant="primary">
                Sign Up
              </AuthButton>
            </AuthButtons>
          )}

          <MobileMenuButton type="button" aria-label="Open navigation">
            ☰
          </MobileMenuButton>
        </NavRight>
      </NavContent>
    </NavContainer>
  );
};
