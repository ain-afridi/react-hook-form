import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

let renderCount = 0;
interface FormValue {
  username: string;
  email: string;
  channel: string;
  social: {
    facebook: string;
    twitter: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number,
  dob: Date
}

export const YoutubeForm = () => {
  const form = useForm<FormValue>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      social: {
        facebook: "",
        twitter: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
      age: 0,
      dob: new Date()
    },
    // defaultValues: async() => {

    //   const response = await fetch(
    //     `https://jsonplaceholder.typicode.com/users/1`
    //   );
    //   const data = await response.json();

    //   return {
    //     username: 'Batman',
    //     email: data.email,
    //     channel: ''
    //   }
    // }
  });

  const { register, control, handleSubmit, formState, watch, getValues } = form;

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const { errors } = formState;
  renderCount++;

  const submit = (data: FormValue) => {
    console.log("Form Submited", data);
  };

  // for specific value use
  // watch("username")

  // for multiple values
  // watch(['username', 'email'])

  // for all values
  // watch()

  useEffect(() => {
    const subscription = watch((value) => {
      console.log(value)
    })

    return () => subscription.unsubscribe();
  }, [watch])

  const handleGetValues = () => {
    console.log("Get Values", getValues());
    
  }
  

  return (
    <div>
      <h1>Youtube Form {renderCount / 2}</h1>
      {/* <h2>Form : { JSON.stringify(watch()) }</h2> */}
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

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter", {
              required: "Twitter is required",
            })}
          />
          <p className="error">{errors.social?.twitter?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input
            type="text"
            id="facebook"
            {...register("social.facebook", {
              required: "Facebook is required",
            })}
          />
          <p className="error">{errors.social?.facebook?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="primary-phone-number">Primary phone number</label>
          <input
            type="text"
            id="primary-phone-number"
            {...register("phoneNumbers.0", {
              required: "Primary Phone Number is required",
            })}
          />
          {errors.phoneNumbers?.length && (
            <p className="error">{errors.phoneNumbers[0]?.message}</p>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="secondary-phone-number">Secondary phone number</label>
          <input
            type="text"
            id="secondary-phone-number"
            {...register("phoneNumbers.1", {
              required: "Secondary phone number is required",
            })}
          />
          {errors.phoneNumbers?.length && (
            <p className="error">{errors.phoneNumbers[1]?.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="">List of Phone Numbers</label>
          {fields.map((field, index) => (
            <div className="form-control" key={field.id}>
              <input type="text" {...register(`phNumbers.${index}.number`)} />

              {index > 0 && (
                <button type="button" onClick={() => remove(index)}>
                  remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => append({ number: "" })}>
            Add New Phone Number
          </button>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "Age is required",
              },
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
              required: {
                value: true,
                message: "Date of Birth is required",
              },
            })}
          />
          <p className="error">{errors.dob?.message}</p>
        </div>

        <button type="submit">Submit</button>

        <button type="button" onClick={handleGetValues}>Get Values</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
