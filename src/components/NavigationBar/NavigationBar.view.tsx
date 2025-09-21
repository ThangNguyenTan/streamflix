import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  NavContainer,
  NavContent,
  LogoSection,
  Logo,
  NavLinks,
  NavLink,
  UserSection,
  UserProfile,
  UserAvatar,
  UserName,
  AuthButtons,
  AuthButton,
  MobileMenuButton,
  DropdownMenu,
  DropdownItem,
  SearchContainer,
  SearchInput,
  SearchIcon,
} from "./NavigationBar.styled";

export const NavigationBar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);\r\n\r\n  useEffect(() => {\r\n    if (typeof window === "undefined") {\r\n      return;\r\n    }\r\n\r\n    const handleScroll = () => {\r\n      setIsScrolled(window.scrollY > 40);\r\n    };\r\n\r\n    handleScroll();\r\n\r\n    window.addEventListener("scroll", handleScroll);\r\n    return () => {\r\n      window.removeEventListener("scroll", handleScroll);\r\n    };\r\n  }, []);\r\n\r\n  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Implement search functionality
      console.log("Searching for:", searchQuery);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <NavContainer isScrolled={isScrolled}>
      <NavContent>
        {/* Logo Section */}
        <LogoSection>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Logo>StreamFlix</Logo>
          </Link>
        </LogoSection>

        {/* Navigation Links - Only show for authenticated users */}
        {user && (
          <NavLinks>
            <NavLink as={Link} to="/">
              Home
            </NavLink>
            <NavLink as={Link} to="/movies">
              Movies
            </NavLink>
            <NavLink as={Link} to="/tvshows">
              TV Shows
            </NavLink>
            <NavLink as={Link} to="/my-list">
              My List
            </NavLink>
          </NavLinks>
        )}

        {/* Search Bar - Only show for authenticated users */}
        {user && (
          <SearchContainer>
            <form onSubmit={handleSearch}>
              <SearchIcon>🔍</SearchIcon>
              <SearchInput
                type="text"
                placeholder="Search movies, TV shows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </SearchContainer>
        )}

        {/* User Section or Auth Buttons */}
        {user ? (
          <UserSection>
            <UserProfile
              ref={dropdownRef}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <UserAvatar>{getInitials(user.username)}</UserAvatar>
              <UserName>{user.username}</UserName>
            </UserProfile>

            <DropdownMenu isOpen={isDropdownOpen}>
              <DropdownItem onClick={() => navigate("/profile")}>
                Profile
              </DropdownItem>
              <DropdownItem onClick={() => navigate("/settings")}>
                Settings
              </DropdownItem>
              <DropdownItem onClick={() => navigate("/my-list")}>
                My List
              </DropdownItem>
              <DropdownItem onClick={handleLogout}>
                Logout
              </DropdownItem>
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

        {/* Mobile Menu Button */}
        <MobileMenuButton>
          ☰
        </MobileMenuButton>
      </NavContent>
    </NavContainer>
  );
};
