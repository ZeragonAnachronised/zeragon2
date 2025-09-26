import { useEffect, useState } from "react"
import { Link, router, usePage } from "@inertiajs/react"
import "../../../css/dashboard.css"

export default function Seminar({ seminar, images }) {

    const [title, setTitle] = useState()
    const [about, setAbout] = useState()
    const [date, setDate] = useState()
    const [img, setImg] = useState()

    const pageTitle = seminar ? 'Редактирование семинара ' + seminar.title : 'Создание семинара'

    const formAction = seminar ? '/admin/seminar/' + seminar.id : '/admin/seminar'

    useEffect(() => {
        if(seminar) {
            setTitle(seminar.title)
            setAbout(seminar.about)
            setDate(seminar.date)
            setImg(seminar.img_id)
        }
    }, [])

    const [imgList, setImgList] = useState(false)
    const imgWindow = ['imgWindow']

    if(imgList) {
        imgWindow.push('active')
    }

    const handleSeminarCreate = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', title)
        formData.append('about', about)
        formData.append('date', date)
        formData.append('img_id', img)
        router.post(formAction, formData)
    }

    const handleDelete = (e) => {
        e.preventDefault()
    }

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">{pageTitle}</h1>
            { img ?
                <img src={images.find(image => image.id == img).path} onClick={e => [e.preventDefault(), setImgList(true)]}/> :
                <button onClick={e => [e.preventDefault(), setImgList(true)]}>Выбрать картинку</button>
            }
            <div className={imgWindow.join(' ')}>
                {images.map(image => (
                    <img key={image.id} src={image.path} onClick={e => setImg(image.id)} />
                ))}
                <button onClick={e => setImgList(false)}>Закрыть</button>
            </div>
            <form method="post">
                <input type="text" value={title} name="title" onChange={e => setTitle(e.target.value)}/>
                <input type="text" value={about} name="about" onChange={e => setAbout(e.target.value)}/>
                <input type="date" value={date} name="date" onChange={e => setDate(e.target.value)}/>
                <input type="hidden" name="img_id" value={img} />
                <button onClick={e => handleSeminarCreate(e)}>Сохранить</button>
                {seminar ? <button onClick={e => handleDelete(e)}>Удалить</button> : <></>}
            </form>
        </div>
    )
}
