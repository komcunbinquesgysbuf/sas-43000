import React from "react"
import {graphql, Link, useStaticQuery} from "gatsby"
import styled from "styled-components";

const Nav = styled.nav``;
const SkipToMain = styled.a.attrs(() => ({href: '#main'}))`
    position: absolute; top: -2.5rem; left: 0; transition: top .4s ease; padding: .5rem 1rem; background-color: var(--cyan); border-bottom-right-radius: .5rem;
    && {
        color: #fff;
    }
    &:focus {
        top: 0;
    }
`;
const ShowMenuButton = styled.button.attrs(() => ({role: 'img', 'aria-label': 'show menu'}))`
    display: flex; flex-flow: column; justify-content: space-between; font-size: 0; width: 1rem; height: 1rem; transition: all .4s ease; background-color: transparent;
    &:hover, &:active, &:focus {
        background-color: transparent;
    }
    &::before, span, &::after {
        content: ""; padding: .2rem 0 0 0; background-color: #000; color: #fff; border-radius: .2rem;
    }
    &::before {
        border-top-left-radius: .5rem; border-top-right-radius: .5rem;
    }
    &::after {
        border-bottom-left-radius: .5rem; border-bottom-right-radius: .5rem;
    }
    @media only screen and (min-width: 50rem) {
        position: absolute; top: -2.5rem;
    }
`;
const MenuList = styled.ul.attrs(() => ({role: 'menu'}))`
    @supports selector(:focus-within) {
        position: relative; left: -10rem; max-height: 0; margin: 0; transition: all .4s ease;
        ${Nav}:focus-within > & {
            left: 0; margin: 1rem 0; max-height: 12rem;
        }
    }
    @media only screen and (min-width: 50rem) {
        left: 0; max-height: 10rem; margin: 1rem 0; display: flex;
        ${SkipToMain}:focus ~ & {
            left: 10rem;
        }
    }
`;
const MenuItem = styled.li.attrs(() => ({role: 'menuitem'}))`
    list-style: none; margin: 0 1rem .2rem 0; padding: .2rem .5rem;
`;

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
    return <Nav>
        <SkipToMain>skip to content</SkipToMain>
        <ShowMenuButton><span></span></ShowMenuButton>
        <MenuList className="pages">
            <MenuItem>
                <Link activeClassName='active' to={itemUrl(homePageFile)}>
                    {itemLinkTitle(childListsYaml, homePageFile)}
                </Link>
            </MenuItem>
            {(childListsYaml.submenu || []).map(item =>
                (file => (
                    <MenuItem key={itemUrl(file)}>
                        <Link activeClassName='active' to={itemUrl(file)}>
                            {itemLinkTitle(item, file)}
                        </Link>
                    </MenuItem>
                ))(fileForCurrentLanguage(item.page)))}
        </MenuList>
        <MenuList className="other-languages">
            {availableLanguages.map(l => (
                <MenuItem key={l}>
                    <Link activeClassName='active' to={`/${l}/${currentPage}/`.replace(/\/+$/, '/')}>{l}</Link>
                </MenuItem>
            ))}
        </MenuList>
    </Nav>;
}