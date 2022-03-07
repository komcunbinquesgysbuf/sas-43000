import React from "react"
import NavBar from "./nav-bar"
import {Link} from "gatsby";

const Layout = ({children}) => {
    return <div className='page'>
        <div className="header" role="banner">
            <div className="sitename">
                <h1><a href="/"><i className="sitename-logo"></i>Exampl Ltd.</a></h1>
            </div>
            <div className="sitename-banner"></div>
            <div className="navigation-banner"></div>
            <NavBar/>
        </div>
        <div className="content">
            <div className="main" role="main">
                <h1>#</h1>
                {children}
            </div>
        </div>
        <div className="footer" role="contentinfo">
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
        </div>
    </div>;
};

export default Layout