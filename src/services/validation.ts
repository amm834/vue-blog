// validate("value", [required(), length({ min: 5, max: 10 })]);

interface Rule {
  type: "required" | "length";
}

interface Required extends Rule {
  type: "required";
}

interface LengthOptions {
  min: number;
  max: number;
}

interface Length extends Rule {
  type: "length";
  options: LengthOptions;
}


export function required(): Required {
  return {
    type: "required"
  };
}


export function length(options: LengthOptions): Length {
  return {
    type: "length",
    options
  };
}


export interface Status {
  valid: boolean;
  message?: string;
}

type InputValue = string | undefined;
type Validators = Required | Length;

export function validate(value: InputValue, validators: Validators[]): Status {

  for (let validator of validators) {
    if (validator.type === "required") {
      if (!value || value.length === 0) {
        return {
          valid: false,
          message: "This value must not be empty"
        };
      }
    }

    if (validator.type === "length") {
      const len = value!.length;
      if (len < validator.options.min || len > validator.options.max) {
        return {
          valid: false,
          message: `This value must be between ${validator.options.min} and ${validator.options.max} characters`
        };
      }
    }

  }

  return {
    valid: true
  };
}
