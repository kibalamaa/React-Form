import { useForm, type SubmitHandler } from "react-hook-form";
import styles from "./ContactForm.module.css";
import SendMsg from "../../assets/SendMsg.svg";
import Done from "../../assets/Done.svg";

type FormFields = {
  name: string;
  email: string;
  message: string;
};

function ContactForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    try {
      console.log(data);
    } catch (error) {
      setError("root", {
        message: `Error ${error}: This message is already taken`,
      });
    }
  };

  return (
    <form className={styles["hook-form"]} onSubmit={handleSubmit(onSubmit)}>
      <h1>React Hook Form</h1>
      <div className={styles["row"]}>
        <div className={styles["field"]}>
          <input
            {...register("name", { required: "Your name is required!" })}
            type="text"
            placeholder="Full name"
          />
          {errors.name && (
            <span className={styles.error}>{errors.name.message}</span>
          )}
        </div>
        <div className={styles["field"]}>
          <input
            {...register("email", {
              required: "E-mail is required!",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid e-mail",
              },
            })}
            type="text"
            placeholder="Email"
          />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </div>
      </div>

      <div className={styles["row"]}>
        <div className={styles["field-full"]}>
          <textarea
            className={styles["field-full"]}
            {...register("message", {
              required: "Message is required",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters",
              },
            })}
            placeholder="Type a message..."
          />
          {errors.message && (
            <span className={styles.error}>{errors.message.message}</span>
          )}
        </div>
        <button
          disabled={isSubmitSuccessful}
          type="submit"
          className={styles.sendBtn}
        >
          <img src={SendMsg} width={25} height={25} alt="Send" />
        </button>
      </div>

      {errors.root && (
        <span className={styles.error}>{errors.root.message}</span>
      )}
      {isSubmitSuccessful && (
        <span className={styles.sent}>
          message sent sucessfully <img src={Done} width={20} height={20} />
        </span>
      )}
    </form>
  );
}

export default ContactForm;
