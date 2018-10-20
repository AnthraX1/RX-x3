export default {
    formatDate(data = 0) {
        let year = new Date(data).getFullYear()
        let month = new Date(data).getMonth() + 1
        let date = new Date(data).getDate()
        let hours = new Date(data).getHours()
        let minutes = new Date(data).getMinutes()

        year = year > 10 ? year : `0${year}`
        month = month > 10 ? month : `0${month}`
        date = date > 10 ? date : `0${date}`
        hours = hours > 10 ? hours : `0${hours}`
        minutes = minutes > 10 ? minutes : `0${minutes}`

        return `${year}-${month}-${date} ${hours}:${minutes}`
    }
}