//Diz qual o banco de dados está sendo utilizado
const firebaseConfig = {
    apiKey: "AIzaSyBk9uiSZsYYv8gk7B8fkzbuGaKtp7Q-MN4",
    authDomain: "mary-5c710.firebaseapp.com",
    databaseURL: "https://mary-5c710-default-rtdb.firebaseio.com",
    projectId: "mary-5c710",
    storageBucket: "mary-5c710.appspot.com",
    messagingSenderId: "967224294576",
    appId: "1:967224294576:web:44c849d5c3a85775dc4f75"
};

//inicializa o banco de dados
firebase.initializeApp(firebaseConfig);

//Verifica se o evento de pressionar uma tecla foi executado
window.addEventListener("keydown", teclaPressionada);

//Função que verifica se a tecla direcional cima ou baixo foi pressionada
function teclaPressionada(evento){
  let tecla = evento.keyCode;

  if(tecla == 38){
    document.getElementById("audioCima").play();
  }else if(tecla == 40){
    document.getElementById("audioBaixo").play();
  }
}

//BANCO DE DADOS
let musicas;

//cima
document.getElementById("arquivoCima").addEventListener("change", arquivo);

function arquivo(evento) {
  musicas = evento.target.files;
};

document.getElementById("enviarCima").addEventListener("click", bancoDeDadosCima);

function bancoDeDadosCima(){
  let nomeUsuario = document.getElementById("nomeUsuario").value;
  //cria uma referência no banco de dados
  console.log(nomeUsuario);
  let storage = firebase.storage().ref("/" + nomeUsuario + "/cima" );

  //carregamento do arquivo
  let upload = storage.put(musicas[0]);

  //barra de carregamento do arquivo
  upload.on(
    "state_changed",
    function progress(snapshot) {
      let porcentagem =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      document.getElementById("progresso").value = porcentagem;
    },

    function error() {
      alert("erro em carregar arquivo");
    },

    function complete() {
      document.getElementById("carregando").innerHTML += musicas[0].name +" carregado <br>";
    }
  );
}

document.getElementById("pegarArquivoCima").addEventListener("click", pegarArquivoCima);

function pegarArquivoCima() {
  let nomeUsuario = document.getElementById("nomeUsuario").value;
  console.log(nomeUsuario);
  //cria referencia no armazenamento
  let storage = firebase.storage().ref("/" + nomeUsuario + "/cima");
  console.log(storage);
  //pega a url
  storage
    .getDownloadURL()
    .then(function(url) {
      console.log(url);
      document.getElementById("testeCima").innerHTML = "Seu áudio cima está pronto para ser testado!";
      document.getElementById("audioCima").src = url;
    })
    .catch(function(error) {
      console.log("ocorreu um erro");
    });
}

//baixo
document.getElementById("arquivoBaixo").addEventListener("change", arquivo);

document.getElementById("enviarBaixo").addEventListener("click", bancoDeDadosBaixo);

function bancoDeDadosBaixo(){
  let nomeUsuario = document.getElementById("nomeUsuario").value;
  //cria uma referência no banco de dados
  console.log(nomeUsuario);
  let storage = firebase.storage().ref("/" + nomeUsuario + "/baixo" );

  //carregamento do arquivo
  let upload = storage.put(musicas[0]);

  //barra de carregamento do arquivo
  upload.on(
    "state_changed",
    function progress(snapshot) {
      let porcentagem =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      document.getElementById("progresso").value = porcentagem;
    },

    function error() {
      alert("erro em carregar arquivo");
    },

    function complete() {
      document.getElementById("carregando").innerHTML += musicas[0].name +" carregado <br>";
    }
  );
}

document.getElementById("pegarArquivoBaixo").addEventListener("click", pegarArquivoBaixo);

function pegarArquivoBaixo() {
  let nomeUsuario = document.getElementById("nomeUsuario").value;
  //cria referencia no armazenamento
  let storage = firebase.storage().ref("/" + nomeUsuario + "/baixo");
  //pega a url
  storage
    .getDownloadURL()
    .then(function(url) {
      document.getElementById("testeBaixo").innerHTML = "Seu áudio baixo está pronto para ser testado!";
      document.getElementById("audioBaixo").src = url;
    })
    .catch(function(error) {
      console.log("ocorreu um erro");
    });
}