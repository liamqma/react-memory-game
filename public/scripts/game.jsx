/** @jsx React.DOM */

var Game = React.createClass({
    getInitialState() {

        return {images: []};
    },
    componentDidMount() {

        this.getImages();

    },
    retry() {

        this.setState({images: []});
        this.getImages();

    },
    getImages() {

        var self = this;
        var images = [];

        setTimeout(function(){

            var i;

            for (i = 1; i < 10; i++) {
                images.push("/images/flickr/" + i + ".jpg");
            }

            images = _.shuffle(images);
            images.shift();
            images = images.concat(images);

            self.setState({
                images: images
            });

        }, 1000);

    },
    render() {
        return (
            this.state.images.length?
            <div>
                <button className="btn btn-danger retry" onClick={this.retry}>
                    <span className="glyphicon glyphicon-refresh"></span>
                </button>
                <Board
                    images={this.state.images}
                    max={this.state.images.length / 2}
                />
            </div>
            :
            <Loading />
        );
    }
});
