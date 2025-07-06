import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EmailLookup } from './lookups.schema';
import { Model } from 'mongoose';
import { Utils } from 'src/common/utils';


const utils = new Utils();
@Injectable()
export class LookupsService {
    constructor(@InjectModel("email_lookups") private emailLookupModel: Model<EmailLookup>) { }

    async emailLookup(email: {}) {
        const emailData = await this.emailLookupModel.findOne({ emailValue: email?.["email"] }, { _id: 0 });

        if (utils.emptyCheck(emailData)) {
            const emailDetails = await utils.internalCallApi(
                `https://www.ipqualityscore.com/api/json/email/R6qfjJE4NsMKf2UlelWfYC3lLyrOPZPJ/${email?.["email"]}`,
                { method: "GET" }
            );
            const storeResults = {
                emailRequestId: await utils.naniod(),
                emailValue: emailDetails?.["sanitized_email"],
                emailLookupData: emailDetails
            }
            return await this.emailLookupModel.create(storeResults);
        }
        return emailData;
    }
}
