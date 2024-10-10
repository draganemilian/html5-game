$(document).ready(function () {
  window.pubnub = new PubNub({
    publishKey: "pub-c-81e5a2a2-7566-4369-90a1-9707e89b7686",
    subscribeKey: "sub-c-edbc1067-b152-41c9-98f0-86bc13379c69",
  });

  var pongnub = function (m) {
    console.log("inside pongnub: " + JSON.stringify(m));

    if (m.message.side === "left") {
      if (m.message.target === "up") {
        if (m.message.type === "touchstart") {
          PongGame.leftPaddle.moveUp();
        } else {
          PongGame.leftPaddle.stopMovingUp();
        }
      } else if (m.message.target === "down") {
        if (m.message.type === "touchstart") {
          PongGame.leftPaddle.moveDown();
        } else {
          PongGame.leftPaddle.stopMovingDown();
        }
      }
    } else if (m.message.side === "right") {
      if (m.message.target === "up") {
        if (m.message.type === "touchstart") {
          PongGame.rightPaddle.moveUp();
        } else {
          PongGame.rightPaddle.stopMovingUp();
        }
      } else if (m.message.target === "down") {
        if (m.message.type === "touchstart") {
          PongGame.rightPaddle.moveDown();
        } else {
          PongGame.rightPaddle.stopMovingDown();
        }
      }
    }
  };

  var id = getURLParameter("id");

  window.pubnub.addListener({
    status: function (statusEvent) {
      if (statusEvent.category === "PNConnectedCategory") {
        //publishSampleMessage();
      }
    },
    message: pongnub,
  });

  window.pubnub.subscribe({
    channels: ["pongnub" + id],
    withPresence: true,
  });
});
