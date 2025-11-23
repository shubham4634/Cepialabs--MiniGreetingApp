import React, { useState, useEffect } from "react";

function GreetingApp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: null,
    terms: false
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  // Validation Logic
  useEffect(() => {
    const newErrors = {};

    if (form.name.length < 2) newErrors.name = "Name must be at least 2 characters.";

    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format.";

    if (form.password.length < 8) newErrors.password = "Password must be at least 8 characters.";
    else setPasswordStrength(getPasswordStrength(form.password));

    if (form.confirmPassword !== form.password)
      newErrors.confirmPassword = "Passwords do not match.";

    if (!form.terms) newErrors.terms = "Please accept the terms and conditions.";

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [form]);

  function getPasswordStrength(password) {
    if (password.length < 8) return "";
    let strength = 0;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    if (strength <= 1) return "Weak";
    if (strength === 2) return "Medium";
    return "Strong";
  }

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") setForm({ ...form, [name]: checked });
    else if (type === "file") setForm({ ...form, [name]: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) setSuccess(true);
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>Name:</label>
          <input name="name" value={form.name} onChange={handleChange} />
          <div style={{ color: "red" }}>{errors.name}</div>
        </div>
        <div>
          <label>Email:</label>
          <input name="email" value={form.email} onChange={handleChange} />
          <div style={{ color: "red" }}>{errors.email}</div>
        </div>
        <div>
          <label>Password:</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
          <div style={{ color: "red" }}>{errors.password}</div>
          {form.password && (
            <div>
              Strength: <b>{passwordStrength}</b>
            </div>
          )}
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          <div style={{ color: "red" }}>{errors.confirmPassword}</div>
        </div>
        <div>
          <label>Profile Picture (optional):</label>
          <input type="file" name="profilePic" accept="image/*" onChange={handleChange} />
          {form.profilePic && (
            <div>File Selected: {form.profilePic.name}</div>
          )}
        </div>
        <div>
          <label>
            <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} />
            I accept the Terms and Conditions
          </label>
          <div style={{ color: "red" }}>{errors.terms}</div>
        </div>
        <button type="submit" disabled={!isValid}>Register</button>
      </form>
      {success && <div style={{ color: "green", marginTop: 10 }}>Registration successful! Welcome {form.name}!</div>}
    </div>
  );
}

export default GreetingApp;
