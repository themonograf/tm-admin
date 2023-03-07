import React, { useState } from "react";
import { Box, Button } from "@tm-wear/core";
import { LoginForm, useLoginUser } from "@tm-wear/app/Login";

const Login = () => {
  const [form, setForm] = useState<LoginForm>({
    username: "",
    password: "",
  });

  // const callback = (res: any) => console.log(res);
  const { mutate } = useLoginUser();

  return (
    <Box
      component="form"
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "url('/images/beautiful-casual-woman-fashion-set.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "300px",
          width: "100%",
        }}
      >
        <div className="flex w-full flex-col">
          <label htmlFor="username">Username</label>
          <input
            className="block w-full rounded-md border-0 bg-white px-2 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id="username"
            value={form.username}
            placeholder="Username"
            onChange={({ target: { value } }) =>
              setForm((prev) => ({ ...prev, username: value }))
            }
          />
        </div>
        <div className="flex w-full flex-col">
          <label htmlFor="password">Password</label>
          <input
            className="block w-full rounded-md border-0 bg-white px-2 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type={"password"}
            id="password"
            value={form.password}
            placeholder="Password"
            onChange={({ target: { value } }) =>
              setForm((prev) => ({ ...prev, password: value }))
            }
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          onClick={(e) => {
            e.preventDefault();
            mutate(form);
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
