const bodyParser = require('body-parser');
const watson = require('../src/watson/client-watson');
var neo4j = require('neo4j-driver').v1;

var graphenedbURL = process.env.GRAPHENEDB_BOLT_URL;
var graphenedbUser = process.env.GRAPHENEDB_BOLT_USER;
var graphenedbPass = process.env.GRAPHENEDB_BOLT_PASSWORD;
var driver = neo4j.driver(graphenedbURL, neo4j.auth.basic(graphenedbUser, graphenedbPass));

const conversations = [];

const params = {
  workspace_id: '4e65423d-2127-4a94-b6b0-27163c60896c'
};

watson.listLogs(params)
  .then(res => {
    // console.log(JSON.stringify(res, null, 2));
    const tamanho = res.logs.length;
    console.log("tamanho do array " + tamanho);

    // console.log("primeiro conversation_id " + JSON.stringify(res.logs[0].response.context.conversation_id));

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

        console.log("INFORMAÇÕES: nome: "+ nome + " , tamanho cabelo: " + tamanhoCabelo + " cor cabelo: " + corCabelo + " , olhos cor: " + corOlhos
        + " , pele cor: " + corPele + " , BO: " + boletimOcorrencia + " , roupa: " + roupa + " , pai: " + pai + " , mae: " + mae); 

        // SALVAR NO NEO4J
        var session = driver.session();
        session.run("CREATE (Pessoa {nomeCompleto:'" + nome +
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
                                    "'}) RETURN Pessoa")
        .then(function(result) {
            result.records.forEach(function(record) {
                console.log(record)
            });

            session.close();
        })
        .catch(function(error) {
            console.log(error);
        });

        // FALTA DA PESSOA: dataNascimento: 16/10/1995 genero: F
      }
      
    });
  })
  .catch(err => {
    console.log(err)
  });

  // var session = driver.session();
  // session.run("CREATE (n {hello: 'World'}) RETURN n.name")
  // .then(function(result) {
  //     result.records.forEach(function(record) {
  //         console.log(record)
  //     });

  //     session.close();
  // })
  // .catch(function(error) {
  //     console.log(error);
  // });


    // watson.createSession({
    //     assistant_id: assistantId
    // })
    // .then(res => {
    //   console.log(JSON.stringify(res, null, 2));
    //   sessionId = res;
    // })
    // .catch(err => {
    //   console.log(err);
    // });


    // watson.deleteSession({
    //   assistant_id: assistantId,
    //   session_id: sessionId,
    // })
    //   .then(res => {
    //     console.log(JSON.stringify(res, null, 2));
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });