/** @jsx React.DOM */

var Game = React.createClass({
    getInitialState() {
        return {playing: true, words: _.shuffle(['a', 'a', 'b', 'b', 'c', 'c'])};
    },
    render() {
        return (
            <Board
                words={this.state.words}
                max={this.state.words.length / 2}
            />
        );
    }
});
