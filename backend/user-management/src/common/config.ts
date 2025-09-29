
import { config } from 'dotenv';
config();
const env = process.env

export class Config {
    PORT(): number {
        if (!env.PORT) {
            throw new Error('PORT environment variable is not defined.');
        }
        return parseInt(env.PORT, 10);
    }

    USERS_DB() {
        if (!env.USERS_DB) {
            throw new Error('USERDB is not connected.');
        }
        console.log("USERS_DB CONNECTED");
        return env.USERS_DB
    }

    IDENTITY_DB() {
        if (!env.IDENTITY_DB) {
            throw new Error('LOOKUPDB is not connected.');
        }
        console.log("IDENTITY_DB CONNECTED");
        return env.IDENTITY_DB
    }

}
