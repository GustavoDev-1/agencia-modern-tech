// Mudar estilo do Navbar ao rolar
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.style.padding = '1rem 10%';
        nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
    } else {
        nav.style.padding = '1.5rem 10%';
        nav.style.boxShadow = 'none';
    }
});

// Scroll Suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const form = document.getElementById('form-contato');
const toast = document.getElementById('toast');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o recarregamento da página

        // Ativa a animação da notificação
        toast.classList.add('active');

        // Limpa os campos do formulário
        form.reset();

        // Faz a notificação sumir depois de 4 segundos
        setTimeout(() => {
            toast.classList.remove('active');
        }, 4000);
    });
}

// Aguarda o carregamento total da página
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO CONTATO (Toast Notification) ---
    const formContato = document.getElementById('form-contato');
    const toast = document.getElementById('toast');

    if (formContato) {
        formContato.addEventListener('submit', (e) => {
            e.preventDefault();
            toast.classList.add('active');
            formContato.reset();
            setTimeout(() => toast.classList.remove('active'), 4000);
        });
    }

    // --- LÓGICA DE PAGAMENTO (Valor automático e Cupom) ---
    const params = new URLSearchParams(window.location.search);
    const precoBase = parseFloat(params.get('preco'));

    if (precoBase) {
        // Atualiza os valores na tela de pagamento
        const subtotalElement = document.getElementById('subtotal');
        const totalElement = document.getElementById('total-final');
        
        if (subtotalElement) subtotalElement.innerText = `R$ ${precoBase.toFixed(2)}`;
        if (totalElement) totalElement.innerText = `R$ ${precoBase.toFixed(2)}`;
    }
});

// --- FUNÇÃO DE TROCAR MÉTODOS (Pix/Cartão) ---
function switchMethod(methodId) {
    document.querySelectorAll('.method-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.payment-section').forEach(sec => sec.classList.remove('active'));
    
    event.currentTarget.classList.add('active');
    document.getElementById(methodId).classList.add('active');
}

const btnCopy = document.getElementById('copy-pix');
if (btnCopy) {
    btnCopy.addEventListener('click', () => {
        const chaveExemplo = "contato@moderntech.com";
        navigator.clipboard.writeText(chaveExemplo);
        
        const textoOriginal = btnCopy.innerText;
        btnCopy.innerText = "✓ Chave Copiada!";
        btnCopy.style.color = "#22c55e";
        
        setTimeout(() => {
            btnCopy.innerText = textoOriginal;
            btnCopy.style.color = "#6366f1";
        }, 2000);
    });
}

document.getElementById('btn-copy-pix').addEventListener('click', function() {
    // 1. A chave aleatória que será copiada
    const chavePix = "00020126360014BR.GOV.BCB.PIX011412345678901234520400005303986540510.005802BR5920Modern Tech Services6009SAO PAULO62070503***6304E2B1";
    
    // 2. Comando para copiar para a área de transferência (teclado)
    navigator.clipboard.writeText(chavePix).then(() => {
        
        const msgCopiado = document.getElementById('msg-copiado');
        const btnTexto = document.getElementById('btn-copy-pix');

        // 3. Feedback visual: muda a cor e mostra o texto de sucesso
        btnTexto.style.opacity = "0.5";
        msgCopiado.style.display = "block";

        // 4. Faz a mensagem sumir depois de 3 segundos
        setTimeout(() => {
            msgCopiado.style.display = "none";
            btnTexto.style.opacity = "1";
        }, 3000);
        
    }).catch(err => {
        console.error('Erro ao copiar: ', err);
    });
});
