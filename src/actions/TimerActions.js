const AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants = require('../constants/AppConstants');

// Define action methods
let TimerActions = {
  timerStarted: (timerProperties) => {
    AppDispatcher.handleAction({
      actionType: AppConstants.TIMER_STARTED,
      data: timerProperties
    });
  }
};

module.exports = TimerActions;
