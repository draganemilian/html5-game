$(document).ready(function () {
  var pubnub = new PubNub({
    publishKey: "pub-c-81e5a2a2-7566-4369-90a1-9707e89b7686",
    subscribeKey: "sub-c-edbc1067-b152-41c9-98f0-86bc13379c69",
  });

  var handlePresence = function () {
    pubnub.hereNow({
      channel: "pongnub_lobby",
      callback: function (m) {
        if (m.occupancy >= 3) {
          pubnub.hereNow({
            channel: "pongnub_game",
            state: true,
            callback: multiPlayer,
          });
        }
      },
    });
  };

  pubnub.subscribe({
    channel: "pongnub_lobby",
    callback: function (m) {
      console.log(m);
    },
    presence: function (m) {
      // Move this to a timeout loop or for pongnub_game.
      pubnub.here_now({
        channel: "pongnub_lobby",
        callback: function (m) {
          if (m.occupancy >= 3) {
            pubnub.here_now({
              channel: "pongnub_game",
              state: true,
              callback: multiPlayer,
            });
          }
        },
      });
    },
  });

  pubnub.subscribe({
    channel: "pongnub_game",
    callback: function (m) {
      console.log(m);
    },
    presence: function (m) {
      // Move this to a timeout loop or for pongnub_game.
      pubnub.here_now({
        channel: "pongnub_lobby",
        callback: function (m) {
          if (m.occupancy >= 3) {
            pubnub.here_now({
              channel: "pongnub_game",
              state: true,
              callback: multiPlayer,
            });
          }
        },
      });
    },
  });

  var multiPlayer = function (m) {
    console.log(m);
    var left = false;
    var right = false;

    for (var i = 0; i < m.uuids.length; i++) {
      if (m.uuids[i].state !== undefined) {
        if (m.uuids[i].state.side === "left") {
          left = true;
        } else if (m.uuids[i].state.side === "right") {
          right = true;
        }
      }
    }

    if (left && right) {
      window.location.href = "http://larrywu.com/pongnub";
    }
  };
});
