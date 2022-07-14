const getItemLocalStorage=(item: string)=>{
    const stringa=window.localStorage.getItem(item)
    return JSON.parse(stringa ? stringa : "null")
}

export default getItemLocalStorage