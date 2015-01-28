var React = require('react');
var ReactAddons = require('react/addons');
var TileActions = require('../actions/TileActions');

var cx = ReactAddons.addons.classSet;

var Tile = React.createClass({
    propTypes: {
        id: React.PropTypes.number.isRequired,
        image: React.PropTypes.string.isRequired,
        flipped: React.PropTypes.bool.isRequired,
    },
    getInitialState: function () {
        return {
            flipped: false
        }
    },
    onClick: function () {
        this.setState({flipped: true});
        setTimeout(function () {
            this.setState({flipped: false});
            TileActions.clickTile(this.props.id);
        }.bind(this), 1000);

    },
    render: function () {

        var backStyle = {
            backgroundImage: 'url(' + this.props.image + ')'
        }

        return (
            <div className="flip-container">
                <div
                    className={cx({
                        'flipper': true,
                        'flipped': this.state.flipped ? this.state.flipped : this.props.flipped
                    })}
                    onClick={this.onClick}>
                    <div className="front"></div>
                    <div style={backStyle} className="back"></div>
                </div>
            </div>
        );
    }
});

module.exports = Tile;