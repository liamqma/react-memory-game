var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TileConstants = require('../constants/TileConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _tiles = [
    {
        id: 0,
        image: 'https://c2.staticflickr.com/8/7301/16344760136_a91812142d.jpg',
        flipped: false,
        matched: false
    },
    {
        id: 1,
        image: 'https://c2.staticflickr.com/8/7293/16370327635_04c27353c0_n.jpg',
        flipped: false,
        matched: false
    },
    {
        id: 2,
        image: 'https://c2.staticflickr.com/8/7301/16344760136_a91812142d.jpg',
        flipped: false,
        matched: false
    },
    {
        id: 3,
        image: 'https://c2.staticflickr.com/8/7293/16370327635_04c27353c0_n.jpg',
        flipped: false,
        matched: false
    }
];


/**
 * Check if there is one already flipped
 */
function firstFlipped() {

    for (var id in _tiles) {
        if (_tiles[id].flipped === true && _tiles[id].matched === false) return id;
    }

    return null;

}

/**
 * When a tile is clicked
 */
function clickTile(targetId) {

    var firstFlippedIndex = firstFlipped();

    /**
     * If the tile is already flipped, return false
     */
    if (_tiles[targetId].flipped === true) return false;

    /**
     * Flip the tile
     */
    _tiles[targetId].flipped = true;

    /**
     * Check if there is any matching tile
     */
    for (var id in _tiles) {

        if (_tiles[id].image === _tiles[targetId].image && _tiles[id].flipped === true && _tiles[id].id !== targetId) {

            /**
             * Flag both of them as matched
             */
            _tiles[id].matched = true;
            _tiles[targetId].matched = true;

            return true;
        }
    }

    /**
     * If it's not first flipped and the first one does not match second one
     */
    if (firstFlippedIndex !== null) {
        _tiles[firstFlippedIndex].flipped = false;
        _tiles[targetId].flipped = false;
    }

    return true
}

var TileStore = assign({}, EventEmitter.prototype, {


    /**
     * Get the entire collection of TODOs.
     * @return {object}
     */
    getAll: function () {
        return _tiles;
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// Register callback to handle all updates
AppDispatcher.register(function (action) {

    switch (action.actionType) {
        case TileConstants.TILE_CLICK:
            clickTile(action.id);
            TileStore.emitChange();
            break;

        default:
        // no op
    }
});

module.exports = TileStore;
