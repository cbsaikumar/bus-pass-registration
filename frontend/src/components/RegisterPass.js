import { Button } from "@blueprintjs/core";
import { DateInput2 } from "@blueprintjs/datetime2";
import axios from "axios";
import { format, parse } from "date-fns";
import { useCallback } from "react";
import { AppToaster } from "./notification/Toaster";
import { Controller, useForm } from "react-hook-form";
import "./RegisterPass.css";

export default function Register() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm();

  const dateFnsFormat = "MM/dd/yyyy";
  const formatDate = useCallback((date) => format(date, dateFnsFormat), []);
  const parseDate = useCallback((date) => parse(date, dateFnsFormat, null), []);

  const onSubmit = async (data) => {
    console.log({
      errors,
      isDirty,
      isValid,
      isSubmitting,
      data,
    });

    try {
      const resp = await axios.post("/api/users/register", data);

      if (resp.data) {
        return AppToaster.show({
          message: "Bus pass registered successfully",
          intent: "success",
        });
      } else {
        return AppToaster.show({
          message: "Something went wrong during the registration",
          intent: "danger",
        });
      }
    } catch (error) {
      return AppToaster.show({
        message: "Something went wrong during the registration",
        intent: "danger",
      });
    }
  };

  return (
    <main className="container">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h2>Register</h2>
        <div className="bp4-input-group first-name">
          <input
            type="text"
            {...register("firstName", {
              required: "First name is required",
              maxLength: 20,
            })}
            className="bp4-input"
            placeholder="Enter your first name..."
          />
          <span className="bp4-icon bp4-icon-highlight"></span>
        </div>
        {errors.firstName && (
          <p role="alert" className="error form-error">
            {errors.firstName?.message}
          </p>
        )}
        <div className="bp4-input-group last-name">
          <input
            type="text"
            {...register("lastName", {
              required: "Last name is required",
              maxLength: 20,
            })}
            className="bp4-input"
            placeholder="Enter your last name..."
          />
          <span className="bp4-icon bp4-icon-highlight"></span>
        </div>
        {errors.lastName && (
          <p role="alert" className="error form-error">
            {errors.lastName?.message}
          </p>
        )}
        <div className="bp4-input-group password">
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              maxLength: 20,
            })}
            className="bp4-input"
            placeholder="Enter your password..."
          />
          <span className="bp4-icon bp4-icon-lock"></span>
        </div>
        {errors.password && (
          <p role="alert" className="error form-error">
            {errors.password?.message}
          </p>
        )}
        <div className="bp4-input-group password">
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Password is required",
              maxLength: 20,
              validate: (val) => {
                if (watch("password") !== val) {
                  return "Your passwords do no match";
                } else {
                  return null;
                }
              },
            })}
            className="bp4-input"
            placeholder="Enter your password again..."
          />
          <span className="bp4-icon bp4-icon-lock"></span>
        </div>
        {errors.confirmPassword && (
          <p role="alert" className="error form-error">
            {errors.confirmPassword?.message}
          </p>
        )}
        <div className="bp4-input-group email">
          <input
            className="bp4-input"
            placeholder="Enter your email..."
            {...register("email", {
              required: "Email Address is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Enter a valid email address",
              },
            })}
            aria-invalid={errors.mail ? "true" : "false"}
          />
          <span className="bp4-icon bp4-icon-envelope"></span>
        </div>
        {errors.email && (
          <p role="alert" className="error form-error">
            {errors.email?.message}
          </p>
        )}
        <div className="gender">
          <label>Select your gender...</label>

          <div className="gender-options">
            <label htmlFor="gender-male">
              <input
                type="radio"
                className="gender-option"
                label="Male"
                value="male"
                id="gender-male"
                {...register("gender", { required: "Gender is required" })}
              />
              Male
            </label>
            <label htmlFor="gender-female">
              <input
                type="radio"
                className="gender-option"
                label="Female"
                value="female"
                id="gender-female"
                {...register("gender", { required: "Gender is required" })}
              />{" "}
              Female{" "}
            </label>
            <label htmlFor="gender-other">
              <input
                type="radio"
                className="gender-option"
                label="Other"
                value="other"
                id="gender-other"
                {...register("gender", { required: "Gender is required" })}
              />
              Other
            </label>
          </div>
        </div>
        {errors.gender && (
          <p role="alert" className="error form-error">
            {errors.gender?.message}
          </p>
        )}
        <div className="bp4-input-group dob calendar">
          <label className="bp4-label">Enter your date of birth...</label>
          <Controller
            control={control}
            name="dob"
            rules={{ required: "Date of birth is required" }}
            render={({ field }) => (
              <DateInput2
                className="calendar"
                placeholder="DD/MM/YYYY"
                formatDate={formatDate}
                parseDate={parseDate}
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
        </div>
        {errors.dob && (
          <p role="alert" className="error form-error">
            {errors.dob?.message}
          </p>
        )}
        <Button type="submit" loading={isSubmitting} intent="primary" large>
          Register
        </Button>
      </form>
    </main>
  );
}
