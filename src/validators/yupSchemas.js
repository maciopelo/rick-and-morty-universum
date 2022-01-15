import * as yup from "yup";

export const registerSchema = yup.object({
  login: yup.string().required("required"),
  email: yup.string().required("required").email("bad email address"),
  password: yup
    .string()
    .required("required")

    .matches(/(?=.{6,})/, "min. 6 characters")
    .matches(/(?=.*[A-Z])/, "min. 1 great letter"),
});

export const loginSchema = yup.object({
  login: yup.string().required("required"),
  password: yup.string().required("required"),
});

export const commentSchema = yup.object({
  text: yup
    .string()
    .required("required")
    .test("len", "min. 20 characters", (val) => val.length > 20)
    .test("len", "max. 500 characters", (val) => val.length < 500),
});
