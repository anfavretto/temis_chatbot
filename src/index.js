const bodyParser = require('body-parser');
const express = require('express');
const watson = require('../src/watson/client-watson');
var neo4j = require('neo4j-driver').v1;
var cors = require('cors');

var graphenedbURL = process.env.GRAPHENEDB_BOLT_URL;
var graphenedbUser = process.env.GRAPHENEDB_BOLT_USER;
var graphenedbPass = process.env.GRAPHENEDB_BOLT_PASSWORD;
var driver = neo4j.driver(graphenedbURL, neo4j.auth.basic(graphenedbUser, graphenedbPass));
const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());

app.get('/', function(req, res) {
  res.send('hello world');
}).listen(process.env.PORT || 5000);


// function saveConversations(){
  const conversations = [];

  const params = {
    workspace_id: '4e65423d-2127-4a94-b6b0-27163c60896c'
  };

  watson.listLogs(params)
    .then(res => {
      var session = driver.session();
      const tamanho = res.logs.length;
      console.log("tamanho do array " + tamanho);

      res.logs.forEach(log => {
        var conversationId = log.response.context.conversation_id;
        if(conversations.indexOf(conversationId) < 1) {
          conversations.push(conversationId);
        }
      });

      var groups = [];
      conversations.forEach(conversation => {
        var current = res.logs.filter((log) => {
          return log.response.context.conversation_id === conversation;
        });
        groups.push(current);
      });
      console.log("number of groups: " + groups.length);

      groups.forEach((group) => {
        group.sort(function(a,b){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.response_timestamp) - new Date(a.response_timestamp);
        });
        console.log("numbers of messages of this group: " + group.length);
        console.log("context of last message: " + JSON.stringify(group[0].request));
        var context = group[0].request.context;
        var nome = context.nome;
        if (nome != undefined) {
          var tamanhoCabelo = context.tamanhoCabelo;
          var corCabelo = context.cabelo;
          var tipoCabelo = context.tipoCabelo;
          var corOlhos = context.olhos;
          var corPele = context.pele;
          var boletimOcorrencia = context.boletimOcorrencia;
          var roupa = context.roupa;
          var pai = context.pai;
          var mae = context.mae;
          var dataDesaparecimento = context.date;
          var temCicatriz = context.tem_cicatriz;
          var localCicatriz = context.local_cicatriz;
          var descricaoCicatriz = context.descricao_cicatriz;
          var temTatuagem = context.tem_tatuagem;
          var localTatuagem = context.local_tatuagem;
          var descricaoTatuagem = context.descricao_tatuagem;
          var jaDesapareceuAnteriormente = context.ja_desapareceu;
          var motivoDesapAnterior = context.motivo_desap_anterior;
          var emailContato = context.email_contato;
          var telefoneContato = context.telefone_contato;
          var nomeContato = context.nome_contato;
          var nomeAcompanhante = context.acomp_nome;
          var relacionamentoAcomp = context.relacionamento_acomp;
          var roupasAcomp = context.roupas_acomp;
          var estavaEmVeiculo = context.estava_veiculo;
          var tipoVeiculo = context.tipo_veiculo;
          var marcaVeiculo = context.marca_veiculo;
          var modeloVeiculo = context.modelo_veiculo;
          var corVeiculo = context.cor_veiculo;
          var placaVeiculo = context.placa_veiculo;
          var caracteristicaVeiculo = context.caracteristica_veiculo;
          var ultimoLocalVisto = context.local_visto;
          var possivelMotivoDesap = context.possivel_motivo;
          var nascimento = context.nascimento;
          var genero = context.genero;
          var estavaAcompanhado = context.estava_acompanhada;
          var horarioDesap = context.time;

          console.log("INFORMAÇÕES: nome: "+ nome + " , tamanho cabelo: " + tamanhoCabelo + " cor cabelo: " + corCabelo + " , olhos cor: " + corOlhos
          + " , pele cor: " + corPele + " , BO: " + boletimOcorrencia + " , roupa: " + roupa + " , pai: " + pai + " , mae: " + mae); 

          // SALVAR PESSOA
          session.run("MATCH (n:Pessoa) WHERE n.nomeCompleto='" + nome + "' RETURN n")
          .then(function(result) {
            if (result.records.length === 0){
              session.run("CREATE (n:Pessoa {nomeCompleto:'" + nome +
                          "',comprimentoCabelo:'" + tamanhoCabelo + 
                          "',corCabelo:'" + corCabelo + 
                          "',tipoCabelo:'" + tipoCabelo +
                          "',corOlhos:'" + corOlhos + 
                          "',corPele:'" + corPele + 
                          "',temCicatrizMarcaSinal:'" + temCicatriz + 
                          "',descricaoCicatrizMarcaSinal:'" + descricaoCicatriz +
                          "',localCicatrizMarcaSinal:'" + localCicatriz + 
                          "',temTatuagem:'" + temTatuagem +
                          "',descricaoTatuagem:'" + descricaoTatuagem + 
                          "',localTatuagem:'" + localTatuagem +
                          "',nomeMae:'" + mae +
                          "',nomePai:'" + pai +
                          "',genero:'" + genero + 
                          "',dataNascimento:'" + nascimento + 
                          "'}) RETURN n")
              .catch(function(error) {
                console.log(error);
              });

              // SALVAR DESAPARECIMENTO
            session.run("MATCH (n:Desaparecimento) WHERE n.boletimOcorrencia='" + boletimOcorrencia + "' RETURN n")
            .then(function(result) {
              if (result.records.length === 0){
                session.run("CREATE (n:Desaparecimento {boletimOcorrencia:'" + boletimOcorrencia +
                            "',data:'" + dataDesaparecimento + 
                            "',horario:'" + horarioDesap + 
                            "',roupa:'" + roupa +
                            "',ultimoLocalAvistado:'" + ultimoLocalVisto + 
                            "',estavaAcompanhado:'" + estavaAcompanhado + 
                            "',estavaEmUmVeiculo:'" + estavaEmVeiculo + 
                            "',jaDesapareceuAnteriormente:'" + jaDesapareceuAnteriormente +
                            "',motivoDesaparecimentoAnterior:'" + motivoDesapAnterior + 
                            "',possivelMotivo:'" + possivelMotivoDesap +
                          "'}) RETURN n")
                .catch(function(error) {
                    console.log(error);
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });

            // SALVAR ACOMPANHANTE
            if(nomeAcompanhante != undefined && nomeAcompanhante !== "") {
              session.run("MATCH (n:Acompanhante) WHERE n.nomeCompleto='" + nomeAcompanhante + "' RETURN n")
              .then(function(result) {
                if (result.records.length === 0){
                  session.run("CREATE (n:Acompanhante {nomeCompleto:'" + nomeAcompanhante +
                    "',relacionamento:'" + relacionamentoAcomp + 
                    "',roupa:'" + roupasAcomp + 
                    "'}) RETURN n")
                  .catch(function(error) {
                    console.log(error);
                  });
                }
              })
              .catch(function(error) {
                console.log(error);
              });
            }

            // SALVAR VEICULO
            if (placaVeiculo !== undefined && tipoCabelo !== undefined) {
              session.run("MATCH (n:Veiculo) WHERE n.placa='" + placaVeiculo + "' AND n.tipo='"+ tipoVeiculo +"' AND n.modelo='"+ modeloVeiculo+"' RETURN n")
              .then(function(result) {
                if (result.records.length === 0){
                  session.run("CREATE (n:Veiculo {tipo:'" + tipoVeiculo +
                    "',placa:'" + placaVeiculo + 
                    "',modelo:'" + modeloVeiculo + 
                    "',cor:'" + corVeiculo + 
                    "',marca:'" + marcaVeiculo + 
                    "',caracteristicaMarcante:'" + caracteristicaVeiculo + 
                    "'}) RETURN n")
                  .catch(function(error) {
                    console.log(error);
                  });
                }
              })
              .catch(function(error) {
                console.log(error);
              });
            }

            // SALVAR CONTATO
            session.run("CREATE (n:Contato {nome:'" + nomeContato +
                "',email:'" + emailContato + 
                "',telefone:'" + telefoneContato +  
              "'}) RETURN n")
            .catch(function(error) {
              console.log(error);
            });
            session.close();
          }
        })
        .catch(function(error) {
            console.log(error);
        });
        
      }
    }
    )}
  );
// }