import { useState } from "react"
import { router, usePage } from "@inertiajs/react"
import "../../../css/auth.css"

export default function Login() {
  const { errors } = usePage().props
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
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}

        <input name="password" type="password" placeholder="Пароль" onChange={handleChange} />
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit">Войти</button>
      </form>
    </div>
  )
}
