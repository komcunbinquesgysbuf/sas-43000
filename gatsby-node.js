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
    createResolvers({
        MenuYaml: {
            file: {type: "File!", resolve: makeFileResolver('pages', 'file', /^src\/pages\//)},
        },
        ListsYaml: {
            file: {type: "File", resolve: makeFileResolver('pages', 'file', /^src\/pages\//)},
        },
        MarkdownRemarkFrontmatter: {
            image: {type: "File", resolve: makeFileResolver('images', 'image', /^\/ckzmnri0c000ipj862t51ivd1\//)},
            gallery: {
                type: "[File!]",
                resolve: makeFileResolver('images', 'gallery', /^\/ckzmnri0c000ipj862t51ivd1\//)
            },
        },
        MarkdownRemarkFrontmatterSections: {
            file: {type: "File", resolve: makeFileResolver('articles|pages', 'file', /^src\/(articles|pages)\//)},
            image: {type: "File", resolve: makeFileResolver('images', 'image', /^\/ckzmnri0c000ipj862t51ivd1\//)},
            gallery: {
                type: "[File!]",
                resolve: makeFileResolver('images', 'gallery', /^\/ckzmnri0c000ipj862t51ivd1\//)
            },
        },
    });
};
exports.createSchemaCustomization = ({actions}) => {
    const {createTypes} = actions
    createTypes(`
        type MenuYaml {
            file: File!
            title: String
            submenu: [MenuYaml!]
        }
        type ListsYaml implements Node {
            file: File
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
