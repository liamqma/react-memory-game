/** @jsx React.DOM */

var Game = React.createClass({
    getInitialState() {

        return {playing: true, images: []};
    },
    componentDidMount: function() {

        setTimeout(function(){

            // Here ajax get random images from flickr
            var images = [
                '/images/1.jpg',
                '/images/2.jpg',
                '/images/3.jpg',
                '/images/4.jpg',
                '/images/5.jpg',
                '/images/6.jpg'
            ];

            this.setState({
                images: _.shuffle(images.concat(images))
            });

        }.bind(this), 1);

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
