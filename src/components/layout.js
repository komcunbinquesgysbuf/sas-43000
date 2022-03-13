import React from "react"
import NavBar from "./nav-bar"
import {Link} from "gatsby";
import "../css/typography.css";
import styled, {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
    html { --cyan: #005f62 }
    * { margin: 0; padding: 0; border 0 none }
    body { margin: 0 1rem; font-family: "Latina", sans-serif }
    pre, code { font-family: "JetBrains", monospace }
    blockquote, dl, figure, hr, menu, ol, p, pre, table, ul { margin: 1rem 0 }
    header, main, footer { margin: 1rem 0 }
    ol ol, ol ul, ul ol, ul ul { margin: 0 }
    li { margin-left: 1.5rem; padding-left: .2rem }
    a[href] { color: var(--cyan) }
`;
const Header = styled.header``;
const Main = styled.main``;
const Footer = styled.footer``;

const Layout = ({children, currentLanguage, availableLanguages, currentPage}) => {
    return <>
        <GlobalStyle/>
        <Header>
            <NavBar
                currentLanguage={currentLanguage}
                availableLanguages={availableLanguages}
                currentPage={currentPage}
            />
        </Header>
        <Main id='main'>{children}</Main>
        <Footer>
            <div className="notice1">
                <p>Example Ltd.<br/>27 Nowhere Ave.<br/>Far far Away<br/>3FF6SE</p>
            </div>
            <dl>
                <dt>Phone</dt>
                <dd>+98 765 432</dd>
                <dt>Fax</dt>
                <dd>+98 765 433</dd>
                <dt>Email</dt>
                <dd><a href="mailto:info@example.com">info@example.com</a></dd>
            </dl>
            <ul>
                <li><Link to="/">Impressum</Link> (de)</li>
                <li><Link to="/">Terms &amp; Conditions</Link></li>
                <li><Link to="/">Privacy</Link></li>
            </ul>
            <p>This website does not use any cookies and does not attempt to track you in any way.</p>
        </Footer>
    </>;
};

export default Layout