const dodaj=function stavka(event){
    event.preventDefault();
    const uneti_tekst=document.querySelector('input').value;
    if(uneti_tekst){
        const boja=vratiboju();
        const nova_stavka='<li '+boja+ ' class="stavka">'+uneti_tekst+'<button>&#8680;</button></li>';
        document.querySelector('#dodaj').insertAdjacentHTML('beforeend',nova_stavka);      
        event.target.reset();//prazni tekst posle submit
    }
}
const vratiboju=function(){
    var boja;
    const tezina=document.getElementById('tezina');
        if(tezina.innerHTML==='LAKO')boja='style="background-color: aqua;"';
        else if(tezina.innerHTML==='SREDNJE')boja='style="background-color:royalblue;"';
        else boja='style="background-color:orange;"'
    return boja;
}
const promeniTezinu=function tezina(dogadjaj){
    const tezina=dogadjaj.target;
    //const tezina=document.getElementById('tezina');
    if(tezina.innerHTML==='LAKO')tezina.innerHTML='SREDNJE';
    else if(tezina.innerHTML==='SREDNJE')tezina.innerHTML='TESKO';
    else tezina.innerHTML='LAKO';
}
const prebaciUProg=function(dogadjaj){
    if(dogadjaj.target.matches('button')){
        var elem=dogadjaj.target;
        document.querySelector('#ubaci').insertAdjacentHTML('beforeend',elem.parentNode.outerHTML);
        elem.parentNode.parentNode.removeChild(elem.parentNode);
        }
}
const prebaciUDone=function(dogadjaj){
    if(dogadjaj.target.matches('button')){
        const elem=dogadjaj.target;
        const string=elem.parentNode.innerHTML.split('<');
       const nova_stavka='<li class="stavka done">'+string[0]+'</li>'; 
       document.querySelector('#DONE').insertAdjacentHTML('beforeend',nova_stavka);
        elem.parentNode.parentNode.removeChild(elem.parentNode);
        }
}
document.querySelector('form').addEventListener('submit',dodaj)//dodaje zahtev kada se unese forma

document.querySelector('#tezina').addEventListener('click',promeniTezinu)//menja tezinu na click

document.querySelector('#dodaj').addEventListener('click',prebaciUProg)//prebacuje na karticu proggres, i brise sa todo

document.querySelector('#ubaci').addEventListener('click',prebaciUDone)//prebacuje na karticu done, i brise sa progress
