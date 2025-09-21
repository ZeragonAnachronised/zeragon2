import { useState } from "react"
import { router, usePage } from "@inertiajs/react"
import "../../../css/auth.css"

export default function Login({err}) {
  const [values, setValues] = useState({ email: "", password: "" })

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    router.post("/login", values)
  }

  return (
    <div className="auth-container">
      <h1>Вход</h1>
        {err && <p className="error">{err}</p>}
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />

        <input name="password" type="password" placeholder="Пароль" onChange={handleChange} />

        <button type="submit">Войти</button>
      </form>
    </div>
  )
}
