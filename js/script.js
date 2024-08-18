let musicas = [
    // Array de objetos contendo informações sobre cada música
    {titulo:'Anjo Querubim', artista:'limão Com Meu', source:'musicas/ANJO QUERUBIM.mp3', img:'imagens/MUSICA1.jpg'},
    {titulo:'E o vento levou', artista:'Calcinha Preta', source:'musicas/E O VENTO LEVOU.mp3', img:'imagens/MUSICA2.jpg'},
    {titulo:'Paixão Fatal', artista:'Yara Tche', source:'musicas/PAIXAO FATAL.mp3', img:'imagens/MUSICA3.jpg'},
    {titulo:'Planeta de Cores', artista:'Tropykália', source:'musicas/PLANETA DE CORES.mp3', img:'imagens/MUSICA4.jpg'}
];

// Variável que seleciona o elemento <audio> da página
let musica = document.querySelector('audio');
// Índice atual da música sendo reproduzida
let musicaIndex = 0;

// Seleciona os elementos para exibir as informações da música e artista
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');
// Seleciona a imagem do álbum
let imagem = document.querySelector('img');
// Seleciona os elementos para mostrar o tempo decorrido e a duração total da música
let tempoDecorrido = document.querySelector('.tempo .inicio');
let duracaoMusica = document.querySelector('.tempo .fim');

// Chama a função para renderizar a primeira música ao carregar a página
renderizarMusica(musicaIndex);

// Adiciona o evento de clique para o botão de play
document.querySelector('.botao-play').addEventListener('click', tocarMusica);

// Adiciona o evento de clique para o botão de pause
document.querySelector('.botao-pause').addEventListener('click', pausarMusica);

// Atualiza a barra de progresso conforme a música toca
musica.addEventListener('timeupdate', atualizarBarra);

// Evento para passar para a música anterior
document.querySelector('.anterior').addEventListener('click', () => {
    musicaIndex--; // Diminui o índice da música
    // Se o índice for menor que 0, volta para a última música da lista
    if (musicaIndex < 0) {
        musicaIndex = musicas.length - 1;
    }
    // Renderiza a nova música
    renderizarMusica(musicaIndex);
});

// Evento para passar para a próxima música
document.querySelector('.proximo').addEventListener('click', () => {
    musicaIndex++; // Aumenta o índice da música
    // Se o índice for maior que o número total de músicas, volta para a primeira música
    if (musicaIndex >= musicas.length) {
        musicaIndex = 0;
    }
    // Renderiza a nova música
    renderizarMusica(musicaIndex);
});

// Função para carregar e exibir os dados da música no player
function renderizarMusica(musicaIndex) {
    // Define o caminho da música atual
    musica.setAttribute('src', musicas[musicaIndex].source);

    // Aguarda até que os dados da música sejam carregados
    musica.addEventListener('loadeddata', () => {
        // Atualiza o título da música, artista e imagem do álbum
        nomeMusica.textContent = musicas[musicaIndex].titulo;
        nomeArtista.textContent = musicas[musicaIndex].artista;
        imagem.src = musicas[musicaIndex].img;
        
        // Converte a duração da música de segundos para o formato minutos:segundos
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    });
}

// Função para reproduzir a música
function tocarMusica() {
    // Verifica se a música está carregada antes de iniciar a reprodução
    if (musica.readyState >= 2) {
        musica.play(); // Inicia a reprodução da música
        // Alterna a exibição dos botões de play e pause
        document.querySelector('.botao-play').style.display = 'none';
        document.querySelector('.botao-pause').style.display = 'block';
    }
}

// Função para pausar a música
function pausarMusica() {
    musica.pause(); // Pausa a reprodução da música
    // Alterna a exibição dos botões de pause e play
    document.querySelector('.botao-play').style.display = 'block';
    document.querySelector('.botao-pause').style.display = 'none';
}

// Função para converter segundos para o formato minutos:segundos
function segundosParaMinutos(segundos) {
    let campoMinutos = Math.floor(segundos / 60); // Calcula os minutos
    let campoSegundos = segundos % 60; // Calcula os segundos restantes

    // Adiciona um zero à esquerda se os segundos forem menores que 10
    if (campoSegundos < 10) {
        campoSegundos = '0' + campoSegundos;
    }

    // Retorna a string formatada no formato minutos:segundos
    return `${campoMinutos}:${campoSegundos}`;
}

// Função para atualizar a barra de progresso conforme a música toca
function atualizarBarra() {
    let barra = document.querySelector('progress');
    // Atualiza o valor da barra de progresso com base no tempo atual da música
    barra.value = musica.currentTime / musica.duration;
    // Atualiza o tempo decorrido exibido no player
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}
