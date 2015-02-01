var React = require('react');
var TileStore = require('../stores/TileStore');
var MessageStore = require('../stores/MessageStore');
var Tile = require('./Tile.jsx');
var Status = require('./Status.jsx');
var TileActions = require('../actions/TileActions');

/**
 * Retrieve the current TODO data from the TodoStore
 */
var GameApp = React.createClass({

    getInitialState: function () {
        return {
            allTiles: TileStore.getAll(),
            message: MessageStore.getMessage(),
            isWaiting: false
        };
    },
    componentDidMount: function () {
        MessageStore.addChangeListener(this._onMessageChange);
        TileStore.addChangeListener(this._onTileChange);
    },

    componentWillUnmount: function () {
        MessageStore.removeChangeListener(this._onMessageChange);
        TileStore.removeChangeListener(this._onTileChange);
    },
    onTileClick: function (index) {
        if(this.state.isWaiting) return;
        if(TileStore.getFirstFlipIndex() !== null) {
            this.setState({
                isWaiting: true
            });
        }
        TileActions.clickTile(index);
        setTimeout(function () {
            TileActions.matchCheck();
            this.setState({
                isWaiting: false
            });
        }.bind(this), 2000);
    },
    render: function () {
        // This section should be hidden by default
        // and shown when there are tiles.
        if (Object.keys(this.state.allTiles).length < 1) {
            return null;
        }

        var allTiles = this.state.allTiles;
        var tiles = [];

        for (var id in allTiles) {
            id = parseInt(id);
            tiles.push(<Tile key={id} onTileClick={this.onTileClick} id={id} image={allTiles[id].image} flipped={allTiles[id].flipped} />);
        }

        return (
            <section id="main">
                <Status message={this.state.message} />
                {tiles}
            </section>
        );
    },

    /**
     * Event handler for 'change' events coming from the TileStore
     */
    _onTileChange: function () {
        this.setState({
            allTiles: TileStore.getAll()
        });
    },

    _onMessageChange: function () {
        this.setState({
            message: MessageStore.getMessage()
        });
    }

});

module.exports = GameApp;