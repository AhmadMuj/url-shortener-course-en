import Validator from "validatorjs";
import httpError from "http-errors";

type RequestBody = { [key: string]: any };

const validateBody = (
  body: RequestBody,
  validationSchema: Validator.Rules
) => {
  let validation = new Validator(body, validationSchema);
  if (validation.fails()) {
    const errors = validation.errors.all();
    const aggregatedErrors: string[] = [];
    Object.keys(errors).forEach((key) => {
      aggregatedErrors.push(validation.errors.first(key) as string);
    });
    throw new httpError.BadRequest(aggregatedErrors.join(" , "));
  } else {
    return true;
  }
};

export const validateCreateShortURL = (body: RequestBody) =>
  validateBody(body, {
    url: "url|required",
    id: "string|min:5|max:10|not_in:urls,visits,auth",
  });

export const validateUpdateShortURL = (body: RequestBody) =>
  validateBody(body, {
    url: "url|required",
  });

export const validateRegister = (body: RequestBody) =>
  validateBody(body, {
    username: "string|required|min:4|max:8",
    password: "string|required|min:6",
  });

export const validateLogin = (body: RequestBody) =>
  validateBody(body, {
    username: "string|required",
    password: "string|required",
  });
