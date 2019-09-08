const bodyParser = require('body-parser');
const watson = require('../src/watson/client-watson');

const params = {
  workspace_id: '4e65423d-2127-4a94-b6b0-27163c60896c'
};

watson.listLogs(params)
  .then(res => {
    // console.log(JSON.stringify(res, null, 2));
    const tamanho = res.logs.length;
    console.log("tamanho do array " + tamanho);

    console.log("primeiro conversation_id " + JSON.stringify(res.logs[0].response.context.conversation_id));
  })
  .catch(err => {
    console.log(err)
  });

  const groupBy = key => array =>
    array.reduce((objectsByKeyValue, obj) => {
      const value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});


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