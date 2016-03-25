const AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants = require('../constants/AppConstants');

// Define action methods
var TopicActions = {
  topicCompleted: () => {
    AppDispatcher.handleAction({
      actionType: AppConstants.TOPIC_COMPLETED,
      data: {}
    });
  }
};

module.exports = TopicActions;
