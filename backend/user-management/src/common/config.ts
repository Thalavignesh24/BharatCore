
import { config } from 'dotenv';
config();
const env = process.env

export class Config {
    port(): number {
        if (!env.PORT) {
            throw new Error('PORT environment variable is not defined.');
        }
        return parseInt(env.PORT, 10);
    }

    USERDB() {
        if (!env.USERDB) {
            throw new Error('USERDB is not connected.');
        }
        return env.USERDB
    }

    LOOKUPDB() {
        if (!env.LOOKUPDB) {
            throw new Error('LOOKUPDB is not connected.');
        }
        return env.LOOKUPDB
    }

}
