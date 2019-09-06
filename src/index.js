const bodyParser = require('body-parser');
const watson = require('../src/watson/client-watson');

const params = {
  workspace_id: '4e65423d-2127-4a94-b6b0-27163c60896c'
};

watson.listLogs(params)
  .then(res => {
    var contact = JSON.parse(res);
    console.log(contact.toString());

    var array = Object.keys(res).map(i => JSON.parse(res[Number(i)]));
    console.log("array: " + array.toString());
    console.log(JSON.stringify(res, null, 2));
  })
  .catch(err => {
    console.log(err)
  });


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