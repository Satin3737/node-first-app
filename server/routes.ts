import fs from 'node:fs';
import {IncomingMessage, ServerResponse} from 'node:http';
import {SEPARATOR} from '@/const';
import {METHODS, ROUTES} from '@/enum';
import {getPageHtml, html} from '@/helper';

export const requestHandler = (req: IncomingMessage, res: ServerResponse<IncomingMessage> & {req: IncomingMessage}) => {
    const url = req.url;
    const method = req.method;

    res.setHeader('Content-Type', 'text/html');

    if (url === ROUTES.home) {
        res.write(
            getPageHtml(
                'Send message',
                html`
                    <h1>Hello there!</h1>
                    <div>Create new user:</div>
                    <form action="${ROUTES.createUser}" method="${METHODS.POST}">
                        <input type="text" name="user" required />
                        <button>Send</button>
                    </form>
                    <a href="${ROUTES.users}">Current users list</a>
                `
            )
        );
        return res.end();
    }

    if (url === ROUTES.users) {
        const users = fs.existsSync('users.txt')
            ? fs.readFileSync('users.txt', 'utf8').split(SEPARATOR).filter(Boolean)
            : [];

        res.write(
            getPageHtml(
                'Users List',
                html`
                    <h1>Users List</h1>
                    ${!!users?.length
                        ? `<ul>${users.map(user => `<li>${user}</li>`).join('')}</ul>`
                        : '<div>No users created yet</div>'}
                    <a href="${ROUTES.home}">To home page</a>
                `
            )
        );
        return res.end();
    }

    if (url === ROUTES.createUser && method === METHODS.POST) {
        const body: any[] | readonly Uint8Array<ArrayBufferLike>[] = [];

        req.on('data', chunk => Array.isArray(body) && body?.push(chunk));

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const newUser = parsedBody.split('=')[1].replaceAll('+', ' ');

            fs.appendFile('users.txt', `${newUser}${SEPARATOR}`, () => {
                res.statusCode = 302;
                res.setHeader('Location', ROUTES.users);
                return res.end();
            });
        });
    }

    res.write(
        getPageHtml(
            'Not Found',
            html`
                <h1>This page does not exist</h1>
                <div>Go to the one of this:</div>
                <ul>
                    <li><a href="${ROUTES.home}">Home</a></li>
                    <li><a href="${ROUTES.users}">Users List</a></li>
                </ul>
            `
        )
    );
    return res.end();
};
