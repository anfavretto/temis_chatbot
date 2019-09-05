const bodyParser = require('body-parser');
const watson = require('../src/watson/client-watson');
const sessionId = "";
const assistantId = '4e65423d-2127-4a94-b6b0-27163c60896c';

watson.listAllLogs({})
  .then(res => {
    console.log(JSON.stringify(res, null, 2));
  })
  .catch(err => {
    console.log(err)
  });

  var porta = process.env.PORT || 8080;
  app.listen(porta);

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