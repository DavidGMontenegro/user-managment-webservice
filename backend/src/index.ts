import "reflect-metadata";
import app from "./app";
import {AppDataSource} from './db';

async function main() {
    try {
        await AppDataSource.initialize();
        console.log('Database connected')
        const port = 2809;
        app.listen(port);
        console.log('Server is listening on port', port);
    } catch (err) {
        console.error(err);
    }
}

main()