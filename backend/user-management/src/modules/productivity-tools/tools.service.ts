
import { InternalServerErrorException } from '@nestjs/common';
import { generate } from 'generate-password'
import { Utils } from 'src/common/utils';


const utils = new Utils();
export class ToolsService {

        passwordGenerator(requestedInputs: {}) {
                try {
                        let generatedPassword: string;
                        const includedFields = {
                                "default": {
                                        length: requestedInputs?.["length"] ?? 10,
                                        numbers: requestedInputs?.["numbers"] ?? false,
                                        symbols: requestedInputs?.["symbols"] ?? false,
                                        uppercase: requestedInputs?.["uppercase"] ?? false,
                                        lowercase: requestedInputs?.["lowercase"] ?? false,
                                }
                        }
                        if (parseInt(requestedInputs?.["length"]) < 4) {
                                return "Password length must be greater than four";
                        }
                        generatedPassword = generate(includedFields["default"]);
                        return { generatedPassword };

                } catch (error) {
                        throw new InternalServerErrorException(error?.["message"]);
                }
        }
}
