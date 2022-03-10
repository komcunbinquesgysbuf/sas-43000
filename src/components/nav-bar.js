import React from "react"
import {graphql, Link, useStaticQuery} from "gatsby"

export default function NavBar({currentLanguage, availableLanguages, currentPage}) {
    const {file: {childListsYaml}} = useStaticQuery(graphql`
        query NavBarStaticQuery {
            file(sourceInstanceName: {eq: "lists"}, relativePath: {eq: "nav.yml"}) {
                childListsYaml {
                    title
                    page { relativeDirectory name childMarkdownRemark { frontmatter { title: name } } }
                    submenu {
                        title
                        page { relativeDirectory name childMarkdownRemark { frontmatter { title: name } } }
                        submenu {
                            title
                            page { relativeDirectory name childMarkdownRemark { frontmatter { title: name } } }
                        }
                    }
                }
            }
        }
    `)
    const itemTitle = (file) => file.childMarkdownRemark?.frontmatter.title || '';
    const itemLinkTitle = (item, file) => item.title || itemTitle(file);
    const itemUrl = (file) => `/${file.name}/${file.relativeDirectory}/`.replace(/\/+$/g, '/');
    const fileForCurrentLanguage = (pageFiles) => pageFiles.find(file => file.name === currentLanguage) || pageFiles[0];
    const homePageFile = fileForCurrentLanguage(childListsYaml.page);
    return <div className="navigation" role="navigation">
        <input type="checkbox" id="ckrh130vr00026686mnjl9jmw"/>
        <label className="toggle-menu" htmlFor="ckrh130vr00026686mnjl9jmw">
            <i className="one"></i>
            <i className="two"></i>
            <i className="three"></i>
        </label>
        <ul className="pages">
            <li>
                <Link activeClassName='active' title={itemTitle(homePageFile)} to={itemUrl(homePageFile)}>
                    {itemLinkTitle(childListsYaml, homePageFile)}
                </Link>
            </li>
            {(childListsYaml.submenu || []).map(item => {
                const file = fileForCurrentLanguage(item.page);
                return <li key={itemUrl(file)}>
                    <Link activeClassName='active' title={itemTitle(file)} to={itemUrl(file)}>
                        {itemLinkTitle(item, file)}
                    </Link>
                </li>
            })}
        </ul>
        <ul className="other-languages">
            {availableLanguages.map(l => <li key={l}><Link activeClassName='active' to={`/${l}/${currentPage}/`.replace(/\/+$/, '/')}>{l}</Link></li>)}
        </ul>
    </div>;
}