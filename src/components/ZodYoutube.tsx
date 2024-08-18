import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    username: z.string().nonempty("Username is required"),
    email: z.string().nonempty("Email is required").email("Email format is valid"),
    channel: z.string().nonempty("Channel is required")
})

let renderCount = 0;
interface FormValue {
  username: string;
  email: string;
  channel: string;
}

export const ZodYoutubeForm = () => {
  const form = useForm<FormValue>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
    },
    resolver: zodResolver(schema),
  });

  const { register, control, handleSubmit, formState, reset } = form;

  const { errors, isSubmitSuccessful } = formState;

  renderCount++;

  const submit = (data: FormValue) => {
    console.log("Form Submited", data);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <div>
      <h1>Zod Youtube Form {renderCount / 2}</h1>
      {/* <h2>Form : { JSON.stringify(watch()) }</h2> */}
      <form onSubmit={handleSubmit(submit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" {...register("username")} />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email")} />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input type="text" id="channel" {...register("channel")} />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <button type="submit">Submit</button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};
