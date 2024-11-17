let LScounter = 0;
document.querySelector('.ls').onclick = () =>{
    LScounter++;
    localStorage.setItem('b1', LScounter)
}