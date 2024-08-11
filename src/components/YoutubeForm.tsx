import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;
interface FormValue {
  username: string;
  email: string;
  channel: string;
}

export const YoutubeForm = () => {
  const form = useForm<FormValue>({
    defaultValues: {
      username: '',
      email: '',
      channel: ''
    }
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  renderCount++;

  const submit = (data: FormValue) => {
    console.log("Form Submited", data);
  };

  return (
    <div>
      <h1>Youtube Form {renderCount / 2}</h1>
      <form onSubmit={handleSubmit(submit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "Email is required",
              },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value:
                  /^[a-zA-Z0-9. !#$%&'*+/=?^_` {|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid Email Format",
              },
              // for custom validation
              // validate: (inputValue) => {
              //   return inputValue !== 'admain@gmail.com' || 'Enter a different email'
              // }

              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admain@gmail.com" ||
                    "Enter a different email address"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not supported"
                  );
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: "Channel is required",
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
