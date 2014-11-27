/** @jsx React.DOM */

var Board = React.createClass({
    propTypes: {
        images: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        max: React.PropTypes.number.isRequired,
        retry: React.PropTypes.func.isRequired
    },

    getInitialState() {
        return {
            correctIndexes: [],
            firstFlipIndex: null,
            found: 0,
            isWaiting: false,
            message: 'choosetile',
            wrongIndexes: []
        };
    },

    onTileClicked(index) {
        if (this.state.isWaiting) {
            return;
        }

        var correctIndexes = this.state.correctIndexes;
        var firstFlipIndex = this.state.firstFlipIndex;
        var images = this.props.images;

        // turn up lone tile
        if (firstFlipIndex === null) {
            this.setState({
                firstFlipIndex: index,
                message: 'findmate'
            });
            return;
        }

        // clicked second
        if (images[index] === images[firstFlipIndex]) {
            this.setState({
                correctIndexes: correctIndexes.concat([index, firstFlipIndex]),
                firstFlipIndex: null,
                found: this.state.found + 1,
                isWaiting: true,
                message: 'foundmate',
            });
        } else {
            this.setState({
                firstFlipIndex: null,
                isWaiting: true,
                message: 'wrong',
                wrongIndexes: [index, firstFlipIndex]
            });
        }

        setTimeout(
            () => {
                if (!this.isMounted()) {
                    return;
                }

                this.setState({
                    isWaiting: false,
                    message: 'choosetile',
                    wrongIndexes: []
                });
            },
            2000
        );
    },

    render() {
        return (
            <div id="game">
                <div className="header">
                    <button className="btn btn-danger retry" onClick={this.props.retry}>
                        <span className="glyphicon glyphicon-refresh"></span>
                    </button>
                    <Status
                        found={this.state.found}
                        max={this.props.max}
                        message={this.state.message}
                    />
                </div>
        {this.props.images.map((image, index) => {
            var isFirstFlip = index === this.state.firstFlipIndex;
            var isCorrect = _.contains(this.state.correctIndexes, index);
            var isWrong = _.contains(this.state.wrongIndexes, index);
            return (
                <Tile
                    image={image}
                    key={index}
                    index={index}
                    isFlipped={isFirstFlip || isCorrect || isWrong}
                    isCorrect={isCorrect}
                    isWrong={isWrong}
                    onClick={this.onTileClicked}
                />
            );
        })}
            </div>
        );
    }
});
