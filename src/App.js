import "./App.css";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
import { useHistory } from "react-router-dom"
import About from "./compo/about"
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Profile from "./compo/verification"
import HighlightIcon from "@material-ui/icons/Highlight";

import { useState } from "react"
import Kepper from "./compo/Kepper"
const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Nav = styled.nav`
  padding: 0 20px;
  min-height: 9vh;
  background:rgba(241,196,15,1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 25px;
  color: white;
`;


const Menu = styled.ul`
  list-style: none;
  display: flex;
`;
const Item = styled.li`
font-size:1.3rem;
margin-right:30px;
;
style={
li:nth-child(2) {
  margin: 0px 20px;
}
}
`;



const NavIcon = styled.button`
  background: none;
  cursor: pointer;
  border: none;
  outline: none;

  @media (min-width: 769px) {
    display: none;
  }
`;

const Line = styled.span`
  display: block;
  border-radius: 50px;
  width: 25px;
  height: 3px;
  margin: 5px;
  background-color: #fff;
  transition: width 0.4s ease-in-out;

  :nth-child(2) {
    width: ${props => (props.open ? "40%" : "70%")};
  }
`;

const Overlay = styled.div`
  position: absolute;
  height: ${props => (props.open ? "20vh" : 0)};
  width: 100vw;
  background: rgb(241,196,15,0.6);
  transition: height 0.4s ease-in-out;
z-index:1;
  @media (min-width: 769px) {
    display: none;
  }
`;

const OverlayMenu = styled.ul`
  list-style: none;
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);

  li {
    opacity: ${props => (props.open ? 1 : 0)};
    font-size: 25px;
    margin: 50px 0px;
    transition: opacity 0.4s ease-in-out;
  }

  li:nth-child(2) {
    margin: 50px 0px;
  }
`;












function App() {
  const [setlogin, setlogout] = useState(false)

  const [toggle, toggleNav] = useState(false);
  const history = useHistory()
  function logout() {

    localStorage.removeItem("access-token");

    localStorage.setItem("login-status", false);
    setlogout(false)
    history.push("/")
  }



  return (
    <div className="mainpage">
      <>
        <div className="Nabvar_">
          <Nav >
            <Logo><HighlightIcon />
              Keeper</Logo>
            <Menu>
              <Item>
                <Link className="link" to="/" >{setlogin ? <button

                  style={
                    {
                      border: "0px",
                      backgroundColor: "transparent",
                      color: "white",
                      fontSize: "1.3rem"

                    }
                  }
                  onClick={logout}>Logout</button> : "SignIn"}</Link>
              </Item>
              <Item>
                <Link className="link" to="/about">About</Link>
              </Item>

            </Menu>
            <NavIcon onClick={() => toggleNav(!toggle)}>
              <Line open={toggle} />
              <Line open={toggle} />
              <Line open={toggle} />
            </NavIcon>
          </Nav>
          <Overlay open={toggle}>
            <OverlayMenu open={toggle}>
              <Item>
                <Link className="link" to="/" >{localStorage.getItem("login-status") ? <button onClick={logout}>Logout</button> : "SignIn"}</Link>
              </Item>


              <Item>
                <Link
                to="/"
                style={
                  {
                    textDecoration: "none",
                    color: "white"

                  }
                } >
                  {
                    setlogin ? <button
                      style={{
                        border: "0px",
                        fontSize: "1.5rem",
                        marginTop: "50px",
                        color: "white",
                        backgroundColor: "transparent"
                      }}
                      onClick={logout}
                    >Logout</button> : "SignIn"
                  }
                </Link>
              </Item>


              <Item>
                <Link className="link_toggel" to="/about">About</Link>
              </Item>

            </OverlayMenu>
          </Overlay>
        </div>
      </>



      <Link to="/verification" />
      <Link to="/Kepper" />


      {/* <button onClick={logout}>logout</button> */}
      <AppContainer>
        <Switch>
          <Route exact path="/">
            <div style={{ marginTop: "80px" }}>
              <AccountBox />
            </div>
          </Route>
          <Route exact path="/verification">

            <Profile />
          </Route>
          <Route exact path="/Kepper">

            <Kepper logout_={setlogout} />
          </Route>
          <Route exact path="/about">

            <About  />
          </Route>
        </Switch>

      </AppContainer>
    </div>
  );
}

export default App;
