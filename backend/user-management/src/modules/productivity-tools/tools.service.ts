
import { generate } from 'generate-password'
import { Utils } from 'src/common/utils';


const utils = new Utils();
export class ToolsService {

        passwordGenerator(requestedInputs: {}) {
                try {
                        let generatedPassword: string;
                        const includedFields = {
                                "all_sets": {
                                        length: requestedInputs?.["length"] ?? 10,
                                        numbers: true,
                                        symbols: true,
                                        uppercase: true,
                                        lowercase: true,
                                        strict: true // ensures at least one char from each requested set
                                },
                                "default": {
                                        length: requestedInputs?.["length"] ?? 10,
                                        numbers: requestedInputs?.["numbers"] ?? false,
                                        symbols: requestedInputs?.["symbols"] ?? false,
                                        uppercase: requestedInputs?.["uppercase"] ?? false,
                                        lowercase: requestedInputs?.["lowercase"] ?? false,
                                }
                        }
                        if (requestedInputs?.["all_sets"] || utils.emptyCheck(requestedInputs?.["all_sets"])) {
                                generatedPassword = generate(includedFields["all_sets"]);
                        } else {
                                generatedPassword = generate(includedFields["default"]);
                        }
                        return generatedPassword;

                } catch (error) {
                        console.log(error);
                }
        }
}
