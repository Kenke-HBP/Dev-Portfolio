import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import UserContext from "../../store/user-context";
import Logo from "./22logo.PNG";

const HeaderComp = styled(AppBar)`
  background-color: mediumseagreen;
`;

const LogoNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  margin-right: 32px; /* Increase the margin */
`;

const LogoImg = styled("img")`
  height: 50px;
`;

const MenuItems = styled("div")`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const MenuItem = styled(NavLink)`
  text-decoration: none;
  color: #fff;
  &:hover {
    font-weight: bold;
    text-decoration: underline;
  }
  &.active {
    font-weight: bold;
    text-decoration: underline;
  }
`;

const RightAlignedItems = styled("div")`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
`;

const UserFullName = styled(Typography)`
  color: #fff;
`;

const LogoutButton = styled(Button)`
  color: #fff;
`;

const Header = () => {
  const navigate = useNavigate();

  const ctx = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <HeaderComp position="static">
      <Toolbar>
        <LogoNavLink to="/user/dashboard">
          <LogoImg src={Logo} alt="Logo" />
        </LogoNavLink>
        <MenuItems>
          <MenuItem to="/user/dashboard">Home Page</MenuItem>
          <MenuItem to="/user/favourites">Favourites</MenuItem>
          <MenuItem to="/user/products">TV Shows</MenuItem>
        </MenuItems>
        <RightAlignedItems>
          <UserFullName>
            {ctx.user.firstName} {ctx.user.lastName}
          </UserFullName>
          <MenuItem to="/user/users">Users</MenuItem>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </RightAlignedItems>
      </Toolbar>
    </HeaderComp>
  );
};

export default Header;
 