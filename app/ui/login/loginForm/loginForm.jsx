"use client";

import { authenticate } from "@/app/lib/actions";
import styles from "./loginForm.module.css";
import { useState } from "react";
export default function LoginForm() {
  const [err, setErr] = useState();
  const handleLogin = async (formData) => {
    const data = await authenticate(formData);
    data.error && setErr(data.error);
  };
  return (
    <form action={handleLogin} className={styles.form}>
      <h1>Login</h1>
      <input type="text" name="username" placeholder="username" />
      <input type="password" name="password" placeholder="password" />
      <button>Login</button>
      {err && err}
    </form>
  );
}
