const setItemLocalStorage=(nome: string, contenuto: Object)=>{
    window.localStorage.setItem(nome,JSON.stringify(contenuto))
}

export default setItemLocalStorage