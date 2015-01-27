var React = require('react');
var TileStore = require('../stores/TileStore');
var Tile = require('./Tile.react.jsx');

/**
 * Retrieve the current TODO data from the TodoStore
 */
function getTilesState() {
    return {
        allTiles: TileStore.getAll()
    };
}


var GameApp = React.createClass({

    getInitialState: function() {
        return getTilesState();
    },


    componentDidMount: function() {
        TileStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TileStore.removeChangeListener(this._onChange);
    },

    render: function() {
        // This section should be hidden by default
        // and shown when there are tiles.
        if (Object.keys(this.state.allTiles).length < 1) {
            return null;
        }

        var allTiles = this.state.allTiles;
        var tiles = [];

        for (var key in allTiles) {
            tiles.push(<Tile key={allTiles[key].id} id={allTiles[key].id} image={allTiles[key].image} flipped={allTiles[key].flipped} />);
        }

        return (
            <section id="main">
                {tiles}
            </section>
        );
    },

    /**
     * Event handler for 'change' events coming from the TodoStore
     */
    _onChange: function() {
        this.setState(getTilesState());
    }
});

module.exports = GameApp;