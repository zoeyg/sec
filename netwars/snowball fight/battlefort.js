document.onkeydown = checkKeycode;
function checkKeycode(e) {
  var keycode;
  if (window.event) {
    keycode = window.event.keyCode;
  } else if (e) {
    keycode = e.which;
  }
  if (keycode == 13) {
    // FIRE! or Computer - whichever is active
    if (document.getElementById("fireBtn").disabled) {
      document.getElementById("computerBtn").click();
    } else {
      document.getElementById("fireBtn").click();
    }
  }
}
const reader = new FileReader();
reader.addEventListener("loadend", (e) => {
  const text = e.srcElement.result;
  console.log(text);
});
if (Secure) {
  var ws = new WebSocket(
    "wss://" + document.domain + ":" + location.port + "/ws"
  );
} else {
  var ws = new WebSocket(
    "ws://" + document.domain + ":" + location.port + "/ws"
  );
}
ws.onmessage = function (event) {
  var messageIn = JSON.parse(event.data);
  console.log(messageIn);
  if (messageIn.Type == "SALUTE") {
    document.getElementById("statusVerify").value = messageIn.Verify;
    for (y = 0; y < messageIn.Status["FriendlyLayout"].length; y++) {
      for (x = 0; x < messageIn.Status["FriendlyLayout"][y].length; x++) {
        if (messageIn.Status["FriendlyLayout"][y][x] == 1) {
          document.getElementById("1," + x + "," + y).classList.add("fort");
        }
      }
    }
    for (y = 0; y < messageIn.Status["EnemyLayout"].length; y++) {
      for (x = 0; x < messageIn.Status["EnemyLayout"][y].length; x++) {
        if (messageIn.Status["EnemyLayout"][y][x] == 1) {
          document.getElementById("0," + x + "," + y).classList.add("fort");
        }
      }
    }
  }
  if (messageIn.Type == "ShotOut") {
    // handle cell check response
    // console.log("Status of cell messageIn. Data looks like " + messageIn.Data);
    // Data looks something like { "Type":"ShotOut","Message":"READY TO FIRE","Verify":"Super complex encrypted board state","Cell":[5,3],"Status":0 }
    var targetx = messageIn.Cell[0];
    var targety = messageIn.Cell[1];
    var status = messageIn.Status;
    // console.log("X is "+targetx+", Y is "+targety+', and Status is '+status);
  }
  if (messageIn.Type == "SplashOver") {
    // handle FIRE response
    // console.log("Status of cell messageIn. Data looks like " + messageIn.Data);
    // Data looks something like { "Type":"ShotOut","Message":"HIT!","Verify":"Super complex 'encrypted' board state","Cell":[5,3],"Status":0 }
    var targety = messageIn.Cell[0];
    var targetx = messageIn.Cell[1];
    document.getElementById("statusVerify").value = messageIn.Verify;
    console.log(document.getElementById("statusVerify").value);
    var status = messageIn.Status;
    // console.log("X is "+targetx+", Y is "+targety+', and Status is '+status);
    if (messageIn.Message.length > 0) {
      console.log(messageIn.Message);
      wigwags(messageIn.Message);
    }
    var targetColor = "rgb(0, 0, 0)";
    let newClass = "miss";
    if (status == 1 || status == 3) {
      // if it's a hit (new or old), mark it red
      targetColor = "#f40030";
      newClass = "hit";
    }
    if (status == 2) {
      // if it's a miss (new or old), mark it yellow
      targetColor = "#d8c477";
    }
    var cells = document.getElementsByClassName("enemycell");
    for (i = 0; i < cells.length; i++) {
      if (targetx == cells[i].dataset.x && targety == cells[i].dataset.y) {
        // cells[i].style.backgroundColor = targetColor;
        cells[i].classList.add(newClass);
      }
    }
    document.getElementById("fireBtn").disabled = true;
    document.getElementById("computerBtn").disabled = false;
  }
  if (messageIn.Type == "FortSunk") {
    // handle destroyed fort message
    targetColor = "#780015";
    var cells = document.getElementsByClassName("enemycell");
    var fort = messageIn.Fort;
    for (j = 0; j < fort.length; j++) {
      // for each cell in the sunk fort
      var targety = fort[j][0];
      var targetx = fort[j][1];
      for (i = 0; i < cells.length; i++) {
        // scan through all board cells looking for that cell
        if (targetx == cells[i].dataset.x && targety == cells[i].dataset.y) {
          cells[i].classList.add("sunk");
        }
      }
    }
  }
  if (messageIn.Type == "Incoming") {
    // handle rounds in from computer
    // console.log("Status of cell messageIn. Data looks like " + messageIn.Data);
    // Data looks something like { "Type":"Incoming","Message":"","Verify":"Super complex encrypted board state","Cell":[5,3],"Status":0}
    var targety = messageIn.Cell[0];
    var targetx = messageIn.Cell[1];
    var status = messageIn.Status;
    document.getElementById("statusVerify").value = messageIn.Verify;
    // console.log("X is "+targetx+", Y is "+targety+', and Status is '+status);
    if (messageIn.Message.length > 0) {
      console.log(messageIn.Message);
      wigwags(messageIn.Message);
    }
    var targetColor = "rgb(0,0,0)";
    let newClass = "miss";
    if (status == 1 || status == 3) {
      // if it's a hit (new or old), mark it red
      // targetColor = "rgb(244, 0, 48)";
      newClass = "hit";
    }
    if (status == 2) {
      // if it's a miss, mark it yellow
      targetColor = "rgb(216, 196, 119)";
    }
    var cells = document.getElementsByClassName("friendlycell");
    for (i = 0; i < cells.length; i++) {
      if (targetx == cells[i].dataset.x && targety == cells[i].dataset.y) {
        cells[i].classList.add(newClass);
      }
    }
    document.getElementById("fireBtn").disabled = false;
    document.getElementById("computerBtn").disabled = true;
  }
  if (messageIn.Type == "Message") {
    // handles messages for player
    console.log(messageIn.Message);
    wigwags(messageIn.Message);
    if (messageIn.Message.slice(0, 7) == "NetWars") {
      document.getElementById("EnemyLookout").style.backgroundColor =
        "rgb(244, 0, 48)";
    }
  }
  if (messageIn.Type == "System") {
    // handles system messages
    console.log("Received system message: " + messageIn.Data);
  }
  if (messageIn.Type == "Redirect") {
    // handles system messages
    console.log("Received redirect: " + messageIn.Data);
    document.location = messageIn.Location;
  }
  if (document.getElementById("fireBtn").disabled) {
    document.getElementById("computerBtn").click();
  }
};
var tempColor = "rgb(0, 0, 0)";

function deselectAll() {
  var cells = document.getElementsByClassName("enemycell");
  for (i = 0; i < cells.length; i++) {
    cells[i].classList.remove("selected");
  }
}

function clickCell(cell) {
  // change a cell's color when clicked
  // console.log("Checking cell " + cell.dataset.x + ", " + cell.dataset.y + ", tempColor is " + tempColor); // log click to console
  if (cell.style.backgroundColor != "rgb(255, 255, 0)") {
    // if it isn't yellow, save its color, make it yellow, and set target
    deselectAll();
    cell.classList.add("selected");
    document.getElementById("targety").value = cell.dataset.y;
    document.getElementById("targetx").value = cell.dataset.x;
    //ws.send('{"Type":"ShotOver","Verify":"'+document.getElementById("statusVerify").value+'","Cell":[' + cell.dataset.y + ', ' + cell.dataset.x + ']}'); // ws msg to click given cell
    ws.send(
      '{"Type":"FireForEffect","Verify":"' +
        document.getElementById("statusVerify").value +
        '","Cell":[' +
        cell.dataset.y +
        ", " +
        cell.dataset.x +
        "]}"
    );
  } else {
    // if it IS already yellow, put it back to its old color and unset target
    deselectAll();
    document.getElementById("targety").value = "";
    document.getElementById("targetx").value = "";
  }
  return;
}
var fireButton = document.getElementById("fireBtn");
fireButton.onclick = function () {
  var x = document.getElementById("targetx").value;
  var y = document.getElementById("targety").value;
  var verify = document.getElementById("statusVerify").value;
  ws.send(
    '{"Type":"FireForEffect","Verify":"' +
      document.getElementById("statusVerify").value +
      '","Cell":[' +
      y +
      ", " +
      x +
      "]}"
  );
};
var computerButton = document.getElementById("computerBtn");
computerButton.onclick = function () {
  var verify = document.getElementById("statusVerify").value;
  ws.send(
    '{"Type":"SplashOut","Verify":"' +
      document.getElementById("statusVerify").value +
      '"}'
  );
};
// var reconnectButton = document.getElementById('Reconnect');
// reconnectButton.onclick = function() {
//   ws = new WebSocket('ws://' + document.domain + ':' + location.port + '/ws');
// }
console.log("Asking for initial board setup");
ws.onopen = function (event) {
  console.log("Connected!");
  wigwags("Connected!");
  // document.getElementById("Reconnect").style = "visibility: hidden";
  difficulty = document.getElementById("statusDifficulty").value;
  ws.send('{"Type":"Recon","Verify":"","Difficulty":' + difficulty + "}"); // ws message back to server to get initial state of board
};
ws.onclose = function (event) {
  // show message if websocket drops
  console.log("Disconnected!");
  wigwags("Disconnected!");
  // document.getElementById("Reconnect").style = "visibility: visible";
};

function wigwags(message) {
  var x = document.getElementById("wigwag");
  x.className = "show";
  x.textContent = message;
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}
