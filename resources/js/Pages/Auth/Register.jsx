import { useState } from "react"
import { router, usePage } from "@inertiajs/react"
import "../../../css/auth.css"

export default function Register({err}) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  })

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    router.post("/register", values)
  }

  return (
    <div className="auth-container">
      <h1>Регистрация</h1>
        {err && <p className="error">{err}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Имя" onChange={handleChange} />
        
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        
        <input name="password" type="password" placeholder="Пароль" onChange={handleChange} />
        
        <input name="password_confirmation" type="password" placeholder="Повторите пароль" onChange={handleChange} />

        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  )
}
