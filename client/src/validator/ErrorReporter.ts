import { errors } from "@vinejs/vine";
import {
  FieldContext,
  ErrorReporterContract,
} from "@vinejs/vine/build/src/types";

export default class ErrorReporter implements ErrorReporterContract {

  hasErrors: boolean = false;

  errors: any = {};

  report(message: string, rule: string, field: FieldContext, meta?: any) {
    this.hasErrors = true;

    this.errors[field.wildCardPath] = message;
  }

  createError() {
    return new errors.E_VALIDATION_ERROR(this.errors);
  }
}
