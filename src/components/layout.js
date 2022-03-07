import React from "react"
import NavBar from "./nav-bar"
import {Link} from "gatsby";
import "../css/typography.css";
import styled, {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
    html {
        --ink: #222222;
        --paper: #eeeeee;
        --cyan: #00afc4;
    }
    * {
        padding: 0;
        margin: 0;
        border: 0 none;
    }
    body {
        background-color: var(--paper);
        color: var(--ink);
        font-family: "Latina", sans-serif;
    }
    pre, code {
        font-family: "JetBrains", monospace;
    }
    blockquote, dl, figure, hr, menu, ol, p, pre, table, ul {
        margin: 1rem 0;
    }
    ol ol, ol ul, ul ol, ul ul {
        margin: 0;
    }
    li {
        margin-left: 1.5rem;
        padding-left: .2rem;
    }
    a[href] {
        color: var(--cyan);
    }
`;
const Header = styled.header`
    border: 1px dashed #f00;
    margin: 1rem;
`;
const Main = styled.main`
    border: 1px dashed #0f0;
    margin: 1rem;
`;
const Footer = styled.footer`
    border: 1px dashed #00f;
    margin: 1rem;
`;

const Layout = ({children}) => {
    return <>
        <GlobalStyle/>
        <Header>
            <div className="sitename">
                <h1><a href="/"><i className="sitename-logo"></i>Exampl Ltd.</a></h1>
            </div>
            <div className="sitename-banner"></div>
            <div className="navigation-banner"></div>
            <NavBar/>
        </Header>
        <Main>
            <h1>#</h1>
            {children}
        </Main>
        <Footer>
            <div className="siteinfo">
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
            </div>
            <div className="siteinfo-banner"></div>
        </Footer>
    </>;
};

export default Layout