export const html = (strings: string[] | ArrayLike<string>, ...values: any[]) => String.raw({raw: strings}, ...values);

export const getPageHtml = (title: string = 'Node.js Server', content: string = '') => {
    return html`
        <html lang="en">
            <head>
                <title>${title}</title>
            </head>
            <body>
                ${content}
            </body>
        </html>
    `;
};
