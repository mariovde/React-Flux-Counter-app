import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import TimerUtils from '../utils/TimerUtils';
import _ from 'underscore';

const EventEmitter = require('events').EventEmitter;




let TimerStore = _.extend({}, EventEmitter.prototype, {


    _isPlaying: false,
    _interval: 0,
    _timerProperties: {totalTimeInSeconds: 0},
    _elapsedSeconds: 0,


    setIsPlaying() {
        this._isPlaying = true;
    },

    tick() {
        this._timerProperties.totalTimeInSeconds -= 1;
        if (this._timerProperties.totalTimeInSeconds === 0) {
            clearInterval(this._interval);
        }
        else {
            this._elapsedSeconds += 1;
        }
        this.emitChange();
    },


    startTicking(timerProperties) {
        this._timerProperties = timerProperties;
        this._interval = setInterval(this.tick.bind(this), this._timerProperties.interval);
    },


    getIsPlaying() {
        return this._isPlaying;
    },

    getFormatedTime() {
        return TimerUtils.getFormatedTime(this._timerProperties.totalTimeInSeconds);
    },

    getElapsedSeconds() {
        return this._elapsedSeconds;
    },

    getCurrentTimeInSeconds() {
        return this._timerProperties.totalTimeInSeconds;
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
AppDispatcher.register((payload) => {
    let action = payload.action;
    switch (action.actionType) {
        case AppConstants.TIMER_STARTED:
            TimerStore.setIsPlaying();
            TimerStore.startTicking(action.data);
            break;
        default:
            return true;
    }

    TimerStore.emitChange();

    return true;
});

module.exports = TimerStore;
