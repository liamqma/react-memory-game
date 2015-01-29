var React = require('react');
var TileStore = require('../stores/TileStore');
var Tile = require('./Tile.react.jsx');
var TileActions = require('../actions/TileActions');

/**
 * Retrieve the current TODO data from the TodoStore
 */
var GameApp = React.createClass({

    getInitialState: function() {
        return {
            allTiles: TileStore.getAll()
        }
    },
    componentDidMount: function() {
        TileStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TileStore.removeChangeListener(this._onChange);
    },
    onTileClick: function(index) {
        TileActions.clickTile(index);
        setTimeout(function(){
            TileActions.matchCheck();
        }, 2000);
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
            var flipped = (allTiles[key].id === this.state.clickedTileIndex)? true : allTiles[key].flipped;
            tiles.push(<Tile key={allTiles[key].id} onTileClick={this.onTileClick} id={allTiles[key].id} image={allTiles[key].image} flipped={flipped} />);
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
        this.setState({
            allTiles: TileStore.getAll()
        });
    }
});

module.exports = GameApp;