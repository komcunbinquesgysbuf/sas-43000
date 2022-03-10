import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import {graphql} from "gatsby";

const NotFoundPage = ({data}) => {
    const {allFile: {availableLanguages}} = data;
    const defaultLang = (
        (typeof window === 'undefined' && 'en')
        || (window.navigator.languages && window.navigator.languages[0])
        || window.navigator.language
        || window.navigator.browserLanguage
        || window.navigator.userLanguage
        || 'en'
    ).replace(/-.*/, '');
    return (
        <Layout
            availableLanguages={availableLanguages.map(l => l.code)}
            currentLanguage={defaultLang}
            currentPage=''
        >
            <Seo title="404: Not found"/>
            <h1>404: Not Found</h1>
            <p>You just hit a route that doesn't exist... the sadness.</p>
        </Layout>
    );
}
export const pageQuery = graphql`
    query {
        allFile(filter: {relativeDirectory: {eq: ""} extension: {eq: "md"}}) {
            availableLanguages: nodes {
                code: name
            }
        }
    }
`
export default NotFoundPage
