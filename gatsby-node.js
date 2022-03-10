exports.createResolvers = ({createResolvers}) => {
    const makeFileResolver = (sourceInstances, field, removeSubstring) =>
        (source, args, context, info) => {
            if (!source[field]) return null;
            const isString = typeof source[field] === 'string';
            const resolved = (isString ? [source[field]] : source[field]).map(value => context.nodeModel.findOne({
                type: "File",
                query: {
                    filter: {
                        sourceInstanceName: {regex: `/^(${sourceInstances})$/`},
                        relativePath: {eq: (value || '').replace(removeSubstring, '')}
                    }
                }
            }));
            return isString ? (resolved[0] || null) : resolved;
        };
    const resolveNav = (source, args, context, info) =>
        source.page && context.nodeModel.findAll({
            type: "File",
            query: {
                filter: {
                    sourceInstanceName: {eq: `pages`},
                    relativeDirectory: {eq: (source.page.replace(/^src\/pages\/|\/?[^\/]+$/g, '') || '')},
                    extension: {eq: "md"}
                }
            }
        }).then(r => r.entries);
    createResolvers({
        MenuYaml: {page: {type: "[File!]!", resolve: resolveNav}},
        ListsYaml: {page: {type: "[File!]", resolve: resolveNav}},
        MarkdownRemarkFrontmatter: {
            image: {type: "File", resolve: makeFileResolver('images', 'image', /^\/media-t51ivd\//)},
            gallery: {type: "[File!]", resolve: makeFileResolver('images', 'gallery', /^\/media-t51ivd\//)},
        },
        MarkdownRemarkFrontmatterSections: {
            file: {type: "File", resolve: makeFileResolver('articles|pages', 'file', /^src\/(articles|pages)\//)},
            image: {type: "File", resolve: makeFileResolver('images', 'image', /^\/media-t51ivd\//)},
            gallery: {type: "[File!]", resolve: makeFileResolver('images', 'gallery', /^\/media-t51ivd\//)},
        },
    });
};
exports.createSchemaCustomization = ({actions}) => {
    const {createTypes} = actions
    createTypes(`
        type MenuYaml {
            page: [File!]!
            title: String
            submenu: [MenuYaml!]
        }
        type ListsYaml implements Node {
            page: [File!]
            submenu: [MenuYaml!]
        }
        type MarkdownRemarkFrontmatter {
            image: File
            gallery: [File!]
        }
        type MarkdownRemarkFrontmatterSections {
            title: String
            subtitle: String
            image: File
            gallery: [File!]
            content: String
            file: File
        }
    `);
};
