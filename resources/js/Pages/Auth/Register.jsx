import { useState } from "react"
import { router, usePage } from "@inertiajs/react"
import "../../../css/auth.css"

export default function Register() {
  const { errors } = usePage().props
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
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Имя" onChange={handleChange} />
        {errors.name && <p className="error">{errors.name}</p>}
        
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}
        
        <input name="password" type="password" placeholder="Пароль" onChange={handleChange} />
        {errors.password && <p className="error">{errors.password}</p>}
        
        <input name="password_confirmation" type="password" placeholder="Повторите пароль" onChange={handleChange} />

        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  )
}
