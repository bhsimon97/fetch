import { useState } from "react";
import { loginFields } from "../constants/formFields";
import Input from "./Input";
import FormActions from "./FormActions";
import axios from "axios";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = "https://frontend-take-home-service.fetch.com";

export default function Login() {
  //todo: implement loginState after api call

  const [loginState, setLoginState] = useState(fieldsState);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: loginState.username,
      email: loginState.email,
    };

    axios.defaults.withCredentials = true;

    axios
      .post(apiUrl + "/auth/login", userData, {
        withCredentials: true,
        headers: {
          "fetch-api-key": apiKey,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        //
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      <FormActions text="Login" />
    </form>
  );
}
