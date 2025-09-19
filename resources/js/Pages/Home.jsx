import { Link } from "@inertiajs/react"
import "../../css/home.css"

export default function Home({ user }) {
  return (
    <div className="home">
      <video
        className="home-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>
      <div className="home-overlay">
        <h1 className="home-title">Добро пожаловать на IT конференцию 2025</h1>
        <p className="home-subtitle">
          Регистрируйтесь и участвуйте в главном событии этого года.
        </p>

        {!user ? (
          <div className="home-buttons">
            <Link href="/login" className="btn btn-primary">
              Войти
            </Link>
            <Link href="/register" className="btn btn-secondary">
              Регистрация
            </Link>
          </div>
        ) : (
          <div className="home-user">
            <p>Вы вошли как <strong>{user.name}</strong></p>
            <Link href="/dashboard" className="btn btn-primary">
              Перейти в кабинет
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
