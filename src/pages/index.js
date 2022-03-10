import React from "react"
import {graphql, useStaticQuery} from "gatsby"

const Home = ({navigate}) => {
    const defaultLang = (
        (typeof window === 'undefined' && 'en')
        || (window.navigator.languages && window.navigator.languages[0])
        || window.navigator.language
        || window.navigator.browserLanguage
        || window.navigator.userLanguage
        || 'en'
    ).replace(/-.*/, '');
    const {file: {childListsYaml: {page: {relativeDirectory, name}}}} = useStaticQuery(graphql`
        {
            file(relativePath: {eq: "nav.yml"}) {
                childListsYaml {
                    page { relativeDirectory name }
                }
            }
        }
    `);
    typeof window !== 'undefined' && navigate(`/${[defaultLang, relativeDirectory].filter(p => !!p).join('/')}/`);
    return null;
};
export default Home;
