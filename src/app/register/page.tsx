"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // set data to API
    const resp = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValue),
    });

    if (resp.ok) {
      router.push("/");
    } else {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <h1>Register Page</h1>
      <form onSubmit={onSubmit}>
        <div className="m-6 py-1">
          <input
            required
            type="email"
            name="username"
            value={formValue.username}
            onChange={handleChange}
            placeholder="Email address"
            className="form-control"
          />
        </div>
        <div className="m-6 py-1">
          <input
            required
            type="password"
            name="password"
            value={formValue.password}
            onChange={handleChange}
            placeholder="Password"
            className="form-control"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
}
