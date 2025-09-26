import { useState } from "react"
import { Link, router, usePage } from "@inertiajs/react"
import "../../../css/dashboard.css"

export default function Dashboard({ user, seminars = [] }) {
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

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Админ панель</h1>
      <p className="dashboard-user">Привет, {user.name}!</p>

      <div className="dashboard-seminars">
        <h2>Семинары конференции</h2><br />
        <Link className="Link" href="/admin/seminar">
            Создать
        </Link>
        <br /><br />
        {seminars.length === 0 ? (
          <p>Пока нет доступных семинаров.</p>
        ) : (
          <ul>
            {seminars.map((seminar) => (
              <li key={seminar.id}>
                <span>{seminar.title}</span>
                <Link className="Link" href={"/admin/seminar/" + seminar.id}>
                    Редактировать
                </Link>
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

      <form method="get" action="/logout">
        <button className="btn" type="submit">Выйти</button>
      </form>
    </div>
  )
}
