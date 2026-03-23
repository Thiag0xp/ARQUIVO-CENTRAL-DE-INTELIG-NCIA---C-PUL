const membros = [
    { nome: "MADRUGA", id: "200", numero: "2879-8629", foto: "arquivos/madugra.png" },
    { nome: "Yan / fenômeno", id: "2", numero: "0000-0002", foto: "arquivos/yan.png" },
    { nome: "Algen DelaCruz", id: "775", numero: "1003-8333", foto: "arquivos/Algen DelaCruz.jpeg" },
    { nome: "Grego", id: "442", numero: "0000-0003", foto: "arquivos/Grego .jpeg" },
    { nome: "Bella Donna", id: "16333", numero: "6485-1731", foto: "arquivos/bella.jpeg" },
    { nome: "Junior Robert", id: "012", numero: "3386-9212", foto: "arquivos/image.png" }
];

const provas = [
    { 
        titulo: "Reunião da Cúpula - Prova 01", 
        data: "23/03", 
        foto: "arquivos/mq2.webp", 
        videoUrl: "https://youtu.be/wF04gzZ0QFY" 
    }
];

// FUNÇÃO PARA ARRUMAR O LINK DO YOUTUBE AUTOMATICAMENTE
function formatarLinkYoutube(url) {
    let id = '';
    if (url.includes('youtu.be/')) {
        id = url.split('youtu.be/')[1].split(/[?#]/)[0];
    } else if (url.includes('youtube.com/watch')) {
        id = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtube.com/embed/')) {
        return url; // Já está no formato certo
    }
    return `https://www.youtube.com/embed/${id}`;
}

function mudarAba(aba) {
    document.querySelectorAll('.aba-content').forEach(a => a.classList.remove('active'));
    document.querySelectorAll('.abas-sistema button').forEach(b => b.classList.remove('active'));
    document.getElementById('aba-' + aba).classList.add('active');
    document.getElementById('btn-' + aba).classList.add('active');
}

function render() {
    const gridM = document.getElementById('gridMembros');
    const gridP = document.getElementById('gridProvas');

    if (gridM) {
        gridM.innerHTML = membros.map(m => `
            <div class="card">
                <img src="${m.foto}" onclick="abrirVisualizador('${m.foto}', 'foto')" onerror="this.src='https://via.placeholder.com/300x400?text=ARQUIVO+FALTANDO'">
                <div class="info-box">
                    <span class="tag-cupula">MEMBRO CÚPULA</span>
                    <div class="nome">${m.nome}</div>
                    <div class="id-jogo">ID: ${m.id} | TEL: ${m.numero}</div>
                </div>
            </div>
        `).join('');
    }

    if (gridP) {
        gridP.innerHTML = provas.map(p => `
            <div class="card">
                <img src="${p.foto}" onclick="abrirVisualizador('${p.videoUrl}', 'video')" onerror="this.src='https://via.placeholder.com/300x400?text=SEM+CAPA'">
                <div class="info-box">
                    <span class="tag-cupula" style="color:red; border-color:red;">EVIDÊNCIA</span>
                    <div class="nome">${p.titulo}</div>
                    <div class="id-jogo">DATA: ${p.data}</div>
                    <div style="color: #00ff41; font-size: 10px; margin-top: 5px;">▶ CLIQUE NA IMAGEM PARA VER</div>
                </div>
            </div>
        `).join('');
    }
}

function abrirVisualizador(src, tipo) {
    const modal = document.getElementById('zoomModal');
    const conteudo = document.getElementById('conteudoVisualizador');
    
    if (tipo === 'foto') {
        conteudo.innerHTML = `<img src="${src}" style="max-width:100%; border:2px solid #002d5e; animation: zoomIn 0.3s ease;">`;
    } else {
        // Aqui ele usa a função que arruma o link antes de mostrar
        const linkCerto = formatarLinkYoutube(src);
        conteudo.innerHTML = `<iframe src="${linkCerto}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width: 80vw; height: 45vw; max-width: 800px; max-height: 450px; border: 2px solid #002d5e;"></iframe>`;
    }
    modal.style.display = 'flex';
}

function fecharVisualizador() {
    document.getElementById('zoomModal').style.display = 'none';
    document.getElementById('conteudoVisualizador').innerHTML = ''; 
}

// Inicia o sistema
render();