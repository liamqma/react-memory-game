/** @jsx React.DOM */

var Game = React.createClass({
    getInitialState() {

        var images = [
            '/images/1.jpg',
            '/images/2.jpg',
            '/images/3.jpg',
            '/images/4.jpg',
            '/images/5.jpg',
            '/images/6.jpg'
        ];

        return {playing: true, images: _.shuffle(images.concat(images))};
    },
    render() {
        return (
            <Board
                images={this.state.images}
                max={this.state.images.length / 2}
            />
        );
    }
});
