const caixaPergunta = document.querySelectorAll(".caixaPergunta");

const caixaResposta =[...document.querySelectorAll(".caixaResposta")];

function fechacaixa(index){
    caixaResposta.map((el,n)=>{
        if(n!=index)
            el.classList.add("caixaFechada")
    })

}

function trocarCeta(index) {
    if(caixaPergunta[index].children[1].textContent=="keyboard_arrow_up"){
        caixaPergunta[index].children[1].textContent="Expand_More"
    }else{
        caixaPergunta[index].children[1].textContent="keyboard_arrow_up"
    }
}

caixaPergunta.forEach((elem,index)=>{
    elem.addEventListener('click',()=>{
    fechacaixa(index)
    caixaResposta[index].classList.toggle("caixaFechada")
    trocarCeta(index);
    
    })

});

// Admin
const btnSair=[...document.querySelectorAll('.btnSair')];

btnSair.map((el)=>{
        el.addEventListener('click',()=>{
            fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sair: 1 })
            })
    })
})



