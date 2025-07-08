import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EmailLookup } from './lookups.schema';
import { PhoneLookup } from './lookups.schema';
import { Model } from 'mongoose';
import { Utils } from 'src/common/utils';


const utils = new Utils();
@Injectable()
export class LookupsService {
    constructor(
        @InjectModel("email_lookups") private emailLookupModel: Model<EmailLookup>,
        @InjectModel("phone_lookups") private phoneLookupModel: Model<PhoneLookup>,
    ) { }

    async emailLookup(email: {}) {
        const emailData = await this.emailLookupModel.findOne({ emailValue: email?.["email"] }, { _id: 0, __v: 0 });

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

    async phoneLookup(phone:{}) {
        const phoneValue = String(phone?.["phoneCode"]) + String(phone?.["phoneNumber"]);
        const result = phoneValue.substr(1);
        const phoneData = await this.phoneLookupModel.findOne({ phoneValue: result }, { _id: 0, __v: 0 });

        if (utils.emptyCheck(phoneData)) {
            const phoneDetails = await utils.internalCallApi(
                `https://www.ipqualityscore.com/api/json/phone/R6qfjJE4NsMKf2UlelWfYC3lLyrOPZPJ/${result}`,
                { method: "GET" }
            );
            const storeResults = {
                phoneRequestId: await utils.naniod(),
                phoneValue: phoneDetails?.["formatted"].substr(1),
                phoneLookupData: phoneDetails
            }
            return await this.phoneLookupModel.create(storeResults);
        }
        return phoneData;
    }
}
