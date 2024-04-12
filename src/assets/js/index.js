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
    el.addEventListener('click', () => {
        fetch('http://localhost:3000/admin/sair', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sair: 1 })
        })
        .then(response => {
            if (response.ok) {
                console.log('Logout realizado com sucesso');
                
                window.location.reload();
            } else {
                console.log('Erro ao fazer logout');
            }
        })
    

    
    })
})



// mensagem


function mostrarMensagem() {
    const mensagemDiv = document.querySelector('.caixaMensagem');
    mensagemDiv.classList.add('show');
    setTimeout(() => {
        mensagemDiv.classList.remove('show');
    }, 3000);
}


document.querySelector('.fecharMsg').addEventListener('click', function() {
    document.querySelector('.caixaMensagem').classList.remove('show');
});


window.onload = function() {
    mostrarMensagem();
};
