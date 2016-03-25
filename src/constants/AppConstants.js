const keyMirror = require('keymirror');

// Define action constants
module.exports = keyMirror({
  TIMER_STARTED: "timerStarted",
  TOPIC_COMPLETED: "topicCompleted"
});
