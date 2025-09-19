import { useState } from "react"
import { Link, router, usePage } from "@inertiajs/react"
import "../../css/dashboard.css"

export default function Dashboard({ user, notifications = [], seminars = [], url }) {
  const [file, setFile] = useState(null)
  const { errors } = usePage().props

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleFileUpload = (e) => {
    e.preventDefault()
    if (!file) return
    const formData = new FormData()
    formData.append("photo", file)
    router.post("/photos", formData)
  }

  const handleSeminarSignup = (seminarId) => {
    router.post(`/seminars/${seminarId}/signup`)
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Личный кабинет</h1>
      <p className="dashboard-user">Привет, {user.name}!</p>

      <button
        className={`btn-notifications ${notifications.length > 0 ? "has-notifications" : ""}`}
      >
        Уведомления ({notifications.length})
      </button>

      <div className="dashboard-seminars">
        <h2>Семинары конференции</h2>
        {seminars.length === 0 ? (
          <p>Пока нет доступных семинаров.</p>
        ) : (
          <ul>
            {seminars.map((seminar) => (
              <li key={seminar.id}>
                <span>{seminar.title}</span>
                <img src={url} alt="" />
                <button onClick={() => handleSeminarSignup(seminar.id)} className="btn">
                  Записаться
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="dashboard-photos">
        <h2>Загрузить фото в архив</h2>
        <form onSubmit={handleFileUpload}>
          <div className="file">
            <input type="file" onChange={handleFileChange} /><span id="add-file">Выбрать файл</span>
          </div>
          {errors?.photo && <p className="error">{errors.photo}</p>}
          <button type="submit" className="btn">Загрузить</button>
        </form>
      </div>

      <form method="post" action="/logout">
        <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').content} />
        <button class="btn" type="submit">Выйти</button>
      </form>
    </div>
  )
}
