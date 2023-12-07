export class formatTime{
    static getTime():string{
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth()+1;
        let date = currentDate.getDate();
        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();
        let seconds = currentDate.getSeconds();
        return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
    }
}