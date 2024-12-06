import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message as antMessage } from "antd";
import UserValidator from "../../../../entities/user/User.validator";
import UserApi from "../../../../entities/user/UserApi";
import Button from "../../../../shared/ui/Button/Button";
import { setAccessToken } from "../../../../shared/lib/axiosInstance";
import styles from "./AuthForm.module.css";

export default function AuthForm({ type, setUser }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    username: type === "signUp" ? "" : undefined,
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const changeHandler = ({ target }) => {
    setInputs((prev) => ({ ...prev, [target.name]: target.value }));
  };

  async function submitHandler(e) {
    e.preventDefault();
    const { email, password, username } = inputs;
    setLoading(true);

    const normalizedEmail = email.toLowerCase();
    try {
      if (type === "signin") {
        const { isValid, error: validateError } = UserValidator.validateSignIn({
          email: normalizedEmail,
          password,
        });

        if (!isValid) {
          antMessage.error(validateError);
          return;
        }

        const { statusCode, message, data, error } = await UserApi.signIn({
          email: normalizedEmail,
          password,
        });

        if (error) {
          antMessage.error(error);
          return;
        }

        antMessage.success(message);
        if (statusCode === 200) {
          setAccessToken(data.accessToken);
          setUser(data.user);
          setInputs({ email: "", password: "" });
          navigate("/");
        }
      } else {
        const { isValid, error: validateError } = UserValidator.validateSignUp({
          email: normalizedEmail,
          username,
          password,
        });

        if (!isValid) {
          antMessage.error(validateError);
          return;
        }

        const { statusCode, message, data, error } = await UserApi.signUp({
          email: normalizedEmail,
          username,
          password,
        });

        if (error) {
          antMessage.error(error);
          return;
        }

        antMessage.success(message);
        if (statusCode === 201) {
          setAccessToken(data.accessToken);
          setUser(data.user);
          setInputs({ email: "", password: "", username: "" });
          navigate("/");
        }
      }
    } catch (error) {
      antMessage.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{type === "signin" ? "Login" : "Registration"}</h3>
      <form className={styles.form} onSubmit={submitHandler}>
        <input
          className={styles.input}
          onChange={changeHandler}
          type="email"
          name="email"
          value={inputs.email}
          placeholder="email"
          required
          autoFocus
        />
        <input
          className={styles.input}
          onChange={changeHandler}
          type="password"
          name="password"
          value={inputs.password}
          placeholder="password"
          required
        />
        {type === "signup" && (
          <input
            className={styles.input}
            onChange={changeHandler}
            name="username"
            value={inputs.username}
            placeholder="username"
            required
          />
        )}
        <button
          className={styles.button}
          disabled={loading}
          type="submit"
        >Enter</button>
      </form>
    </div>
  );
}







// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { message as antMessage } from "antd";
// import UserValidator from "../../../../entities/user/User.validator";
// import UserApi from "../../../../entities/user/UserApi";
// import Button from "../../../../shared/ui/Button/Button";
// import { setAccessToken } from "../../../../shared/lib/axiosInstance";
// // import styles from "./AuthForm.module.css";

// export default function AuthForm({ type, setUser }) {
//   const [inputs, setInputs] = useState({
//     email: "",
//     password: "",
//     username: type === "signUp" ? "" : undefined,
//   });

//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const changeHandler = ({ target }) => {
//     setInputs((prev) => ({ ...prev, [target.name]: target.value }));
//   };

//   async function submitHandler(e) {
//     e.preventDefault();
//     const { email, password, username } = inputs;
//     setLoading(true);

//     const normalizedEmail = email.toLowerCase();
//     try {
//       if (type === "signin") {
//         const { isValid, error: validateError } = UserValidator.validateSignIn({
//           email: normalizedEmail,
//           password,
//         });

//         if (!isValid) {
//           antMessage.error(validateError);
//           return;
//         }

//         const { statusCode, message, data, error } = await UserApi.signIn({
//           email: normalizedEmail,
//           password,
//         });

//         if (error) {
//           antMessage.error(error);
//           return;
//         }

//         antMessage.success(message);
//         if (statusCode === 200) {
//           setAccessToken(data.accessToken);
//           setUser(data.user);
//           setInputs({ email: "", password: "" });
//           navigate("/");
//         }
//       } else {
//         const { isValid, error: validateError } = UserValidator.validateSignUp({
//           email: normalizedEmail,
//           username,
//           password,
//         });

//         if (!isValid) {
//           antMessage.error(validateError);
//           return;
//         }

//         const { statusCode, message, data, error } = await UserApi.signUp({
//           email: normalizedEmail,
//           username,
//           password,
//         });

//         if (error) {
//           antMessage.error(error);
//           return;
//         }

//         antMessage.success(message);
//         if (statusCode === 201) {
//           setAccessToken(data.accessToken);
//           setUser(data.user);
//           setInputs({ email: "", password: "", username: "" });
//           navigate("/");
//         }
//       }
//     } catch (error) {
//       antMessage.error(error.message);
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <>
//       <h3>{type === "signin" ? "Sign in" : "Sign up"}</h3>{" "}
//       <form onSubmit={submitHandler}>
//         {" "}
//         <input
//           onChange={changeHandler}
//           type="email"
//           name="email"
//           value={inputs.email}
//           placeholder="email"
//           required
//           autoFocus
//         />
//         <input
//           onChange={changeHandler}
//           type="password"
//           name="password"
//           value={inputs.password}
//           placeholder="password"
//           required
//         />
//         {type === "signup" && (
//           <input
//             onChange={changeHandler}
//             name="username"
//             value={inputs.username}
//             placeholder="username"
//             required
//           />
//         )}
//         {type === "signin" ? (
//           <Button text="enter" color="green" disabled={loading} type="submit" />
//         ) : (
//           <Button
//             text="enter"
//             color="green"
//             disabled={loading}
//             type="submit"
//           />
//         )}
//       </form>
//     </>
//   );
// }
