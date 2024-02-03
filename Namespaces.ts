namespace Validator 
{
    export interface MovementValidator<T> {
        isValid(value: T): boolean;
    }

    export class MoveSpacesValidator implements MovementValidator<number> {
        isValid(input : number) : boolean {
            return ((input > 0) && (input < 100));
        }
    }
}
let validators: { [s : string ]: Validator.MovementValidator<number> } = {};

validators["moveSpaces"] = new Validator.MoveSpacesValidator();
validators["moveSpaces"].isValid(10); // True
validators["moveSpaces"].isValid(101); // False
validators["moveSpaces"].isValid(-1); // False

// Aliases

namespace CustomValidators // This would be considered bad namespacing. 
{
    export namespace PlayerValidators {
        export class MoveSpeedValidator { isValid: (input: number) => true; }
    }
}
import scopedValidators = CustomValidators.PlayerValidators;
const moveSpeedValidator = new scopedValidators.MoveSpeedValidator();
moveSpeedValidator.isValid(10); // True
moveSpeedValidator.isValid(101); // True
moveSpeedValidator.isValid(-1); // True