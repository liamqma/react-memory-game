var AppDispatcher = require('../dispatcher/AppDispatcher');
var TileConstants = require('../constants/TileConstants');

var TileActions = {

    /**
     * @param  {string} text
     */
    clickTile: function(id) {
        AppDispatcher.dispatch({
            actionType: TileConstants.TILE_CLICK,
            id: id
        });
    },

    matchCheck: function() {
        AppDispatcher.dispatch({
            actionType: TileConstants.MATCH_CHECK
        });
    }

};

module.exports = TileActions;
