
import { nanoid } from 'nanoid';
import * as bcrypt from 'bcrypt';

export class Utils {

    naniod() {
        return nanoid();
    }

    async generatePasswordHash(password: string) {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }

    emptyCheck(data: unknown){
        if (
            !data ||
            data["length"] === 0 ||
            (typeof data === "object" && Object.keys(data).length === 0)
        ) {
            return true;
        }
        return false;
    }

}