import AppDispatcher from '../dispatcher/AppDispatcher';
var EventEmitter = require('events').EventEmitter;
import AppConstants from '../constants/AppConstants';
import  _  from 'underscore';



var TopicStore = _.extend({}, EventEmitter.prototype, {

    _topicIndex: 0,
    _topics: [
    {
        id: 0,
        title: "Build application structure",
        description: "Folders, files en dependencies voor het project ",
        thumbnail: "src/assets/images/folder.png",
        minutes: 4,
        seconds: 0,
        active: true

    },
    {
        id: 1,
        title: "Tools? Servers? Config?",
        description: "Webpack? Server? package.json? Even kijken...",
        thumbnail: "src/assets/images/tools.png",
        minutes: 6,
        seconds: 0,
        active: false
    },
    {
        id: 2,
        title: "The app: components, stores and actions.",
        description: "Bouwen van een dataflow met React en Flux pattern.",
        thumbnail: "src/assets/images/app.png",
        minutes: 20,
        seconds: 0,
        active: false
    }
    ],

    handleTopicCompleted() {
        this._topicIndex += 1;
    },


    getActiveTopicIndex: function () {
        return this._topicIndex;
    },

    getTopics: function () {
        return this._topics;
    },
    // Emit Change event
    emitChange: function () {
        this.emit('change');
    },

    // Add change listener
    addChangeListener: function (callback) {
        this.on('change', callback);
    },

    // Remove change listener
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    }
});

// Register callback with AppDispatcher
AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.actionType) {
        case AppConstants.TOPIC_COMPLETED:
            TopicStore.handleTopicCompleted();
            break;
        default:
            return true;
    }

    TopicStore.emitChange();

    return true;

});

module.exports = TopicStore;
