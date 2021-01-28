const WebSocket = require('ws');
 
const wss = new WebSocket.Server({
  port: 8080,
  perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024 // Size (in bytes) below which messages
    // should not be compressed.
  }
});
 
wss.on('connection', function connection(ws) {

  function send(obj) {
    ws.send(JSON.stringify(obj));
  }

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    let id = JSON.parse(message).id;

    if (message.includes('Page.getResourceTree')) {
      send({"id":id,"result":{"frameTree":{"frame":{"id":"3E9637FD8421BB07879F8D9C7D9499DE","loaderId":"5DED936C1615A7C99BCC738701CD4AB3","url":"http://172.25.0.1:22473/test.html","securityOrigin":"http://172.25.0.1:22473","mimeType":"text/html"},"resources":[]}}});
    } if(message.includes('Page.getNavigationHistory')) {
      send({"id":id,"result":{"currentIndex":1,"entries":[{"id":1,"url":"data:,","userTypedURL":"data:,","title":"","transitionType":"auto_toplevel"},{"id":5,"url":"http://172.25.0.1:22473/test.html","userTypedURL":"http://172.25.0.1:22473/test.html","title":"","transitionType":"reload"}]}})
      send({"id":id,"method":"Page.getNavigationHistory","params":{}})
      send()
    } if (message.includes('Page.getResourceTree')) {
      send({"id":id,"result":{"frameTree":{"frame":{"id":"3E9637FD8421BB07879F8D9C7D9499DE","loaderId":"5DED936C1615A7C99BCC738701CD4AB3","url":"http://172.25.0.1:22473/test.html","securityOrigin":"http://172.25.0.1:22473","mimeType":"text/html"},"resources":[]}}})
      send({"method":"Target.targetCreated","params":{"targetInfo":{"targetId":"3E9637FD8421BB07879F8D9C7D9499DE","type":"page","title":"172.25.0.1:22473/test.html","url":"http://172.25.0.1:22473/test.html","attached":true,"browserContextId":"2201E403B7100FFB59E433B235502ACF"}}});
      send({"method":"Target.targetCreated","params":{"targetInfo":{"targetId":"7F056880605C7AFF83E0BEB7CBD800C4","type":"background_page","title":"Chrome Automation Extension","url":"chrome-extension://aapnijgdinlhnhlmodcfapnahmbfebeb/_generated_background_page.html","attached":false,"browserContextId":"2201E403B7100FFB59E433B235502ACF"}}})
    } else {
      send({id,"result":{}});
      send({"method":"Runtime.consoleAPICalled","params":{"type":"log","args":[{"type":"string","value":"<script>alert()</script>"}],"executionContextId":11,"timestamp":1.6054197150507969e+12,"stackTrace":{"callFrames":[{"functionName":"","scriptId":"34","url":"http://172.25.0.1:22473/test-local.html","lineNumber":5,"columnNumber":10}]}}})
    }
  });
 
  setTimeout(() => {
    ws.send(JSON.stringify({"method":"Runtime.consoleAPICalled","params":{"type":"log","args":[{"type":"string","value":"<script>alert();</script>"}],"executionContextId":7,"timestamp":1.605414763635187e+12,"stackTrace":{"callFrames":[{"functionName":"","scriptId":"21","url":"http://172.25.0.1:22473/test.html","lineNumber":2,"columnNumber":12}]}}}));
  }, 5000)
});

