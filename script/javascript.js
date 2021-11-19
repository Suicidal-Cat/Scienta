const dodaj=function stavka(event){
    event.preventDefault();
    const uneti_tekst=document.querySelector('input').value;
    //provera dali uneti tekst vec postoji
    for(let i=0;i<localStorage.length;i++){
        const key=localStorage.key(i);
        const value=localStorage.getItem(key);
        const value1=value.split('>');
        let pomocni='';
        pomocni+=value1[1];
        const value2=pomocni.split('<');
        if(value2[0].toUpperCase()===uneti_tekst.toUpperCase()){
            alert("Vec postoji obaveza sa tim nazivom!");
            event.target.reset();
            return;
        }
    }
    if(uneti_tekst){
        const boja=vratiboju();
        const nova_stavka='<li '+boja+ ' class="stavka">'+uneti_tekst+'<button>&#8680;</button></li>';
        let i=localStorage.getItem("index");
        i++;
        localStorage.setItem("prvi_"+i,nova_stavka);
        localStorage.setItem("index",i);
        document.querySelector('#dodaj').insertAdjacentHTML('beforeend',nova_stavka);      
        event.target.reset();//prazni tekst posle submit
    }
}
const vratiboju=function(){
    var boja;
    const tezina=document.getElementById('tezina');
        if(tezina.innerHTML==='Easy')boja='style="background-color:#8FBC8F;"';
        else if(tezina.innerHTML==='Medium')boja='style="background-color:#F0E68C;"';
        else boja='style="background-color:#F08080;"'
    return boja;
}
const promeniTezinu=function tezina(dogadjaj){
    const tezina=dogadjaj.target;
    //const tezina=document.getElementById('tezina');
    if(tezina.innerHTML==='Easy')tezina.innerHTML='Medium';
    else if(tezina.innerHTML==='Medium')tezina.innerHTML='Hard';
    else tezina.innerHTML='Easy';
}
const prebaciUProg=function(dogadjaj){
    if(dogadjaj.target.matches('button')){
        var elem=dogadjaj.target;
        document.querySelector('#ubaci').insertAdjacentHTML('beforeend',elem.parentNode.outerHTML);
        for(let j=0;j<localStorage.length;j++){
            const key=localStorage.key(j);
            const value=localStorage.getItem(key);
            const key_1=key.split('_');
            const value1=value.split('>');
            let pomocni='';
            pomocni+=value1[1];
            const value2=pomocni.split('<');
            const value3=elem.parentNode.innerHTML.split('<');
            if(key_1[0]==="prvi" && value2[0]==value3[0]){
                localStorage.removeItem(key);
                break;
            }
        }
        let i=localStorage.getItem("index");
        i++;
        localStorage.setItem("drugi_"+i,elem.parentNode.outerHTML);
        localStorage.setItem("index",i);
        elem.parentNode.parentNode.removeChild(elem.parentNode);
        }
}
const prebaciUDone=function(dogadjaj){
    if(dogadjaj.target.matches('button')){
        const elem=dogadjaj.target;
        const string=elem.parentNode.innerHTML.split('<');
       const nova_stavka='<li class="stavka done">'+string[0]+'</li>'; 
       document.querySelector('#DONE').insertAdjacentHTML('beforeend',nova_stavka);
       for(let j=0;j<localStorage.length;j++){
        const key=localStorage.key(j);
        const value=localStorage.getItem(key);
        const key_1=key.split('_');
        const value1=value.split('>');
        let pomocni='';
        pomocni+=value1[1];
        const value2=pomocni.split('<');
        const value3=elem.parentNode.innerHTML.split('<');
        if(key_1[0]==="drugi" && value2[0]==value3[0]){
            localStorage.removeItem(key);
            break;
        }
    }
    let i=localStorage.getItem("index");
    i++;
    localStorage.setItem("treci_"+i,nova_stavka);
    localStorage.setItem("index",i);
        elem.parentNode.parentNode.removeChild(elem.parentNode);
        }
}
function obrisiel(dogadjaj){
    if(dogadjaj.target.matches('li')){
        var elem=dogadjaj.target;
        for(let j=0;j<localStorage.length;j++){
            const key=localStorage.key(j);
            const value=localStorage.getItem(key);
            const key_1=key.split('_');
            const value1=value.split('>');
            let pomocni='';
            pomocni+=value1[1];
            const value2=pomocni.split('<');
            if(key_1[0]==="treci" && value2[0]===elem.innerHTML){
                        localStorage.removeItem(key);
                        break; 
                    }
            }
        elem.parentNode.removeChild(elem);
        }

        
}
document.querySelector('form').addEventListener('submit',dodaj)//dodaje zahtev kada se unese forma

document.querySelector('#tezina').addEventListener('click',promeniTezinu)//menja tezinu na click

document.querySelector('#dodaj').addEventListener('click',prebaciUProg)//prebacuje na karticu proggres, i brise sa todo

document.querySelector('#ubaci').addEventListener('click',prebaciUDone)//prebacuje na karticu done, i brise sa progress

document.querySelector('#DONE').addEventListener('click',obrisiel);//brise kada klines na karticu done

//ucitavanja iz local storage
if(localStorage.length==1)localStorage.setItem('index',0);
for(let i=0;i<localStorage.length;i++){
    const key=localStorage.key(i);
    const value=localStorage.getItem(key);
    const key_1=key.split('_');
     if(key_1[0]==="prvi"){
        document.querySelector('#dodaj').insertAdjacentHTML('beforeend',value);
    }
    if(key_1[0]==="drugi"){
        document.querySelector('#ubaci').insertAdjacentHTML('beforeend',value);
    }
    if(key_1[0]==="treci"){
        document.querySelector('#DONE').insertAdjacentHTML('beforeend',value);
    }
}