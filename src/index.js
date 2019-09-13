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
      console.log("context of last message: " + group[group.length - 1].request.context);
      // group.forEach((msg) => {
      //   console.log("GROUP: "+ JSON.stringify(msg.request));
      // })
      // console.log(" intent: " + group.response.intents.length + " , " + group.response.intents[group.response.intents.length - 1].intent);
      // console.log(" entities " + group.response.entities.length);
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