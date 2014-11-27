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

        $.ajax({
            url: '/api/images',
            dataType: 'json',
            type: 'get',
            success: function(data) {
                setTimeout(function(){

                    data.forEach(function(photo){

                        images.push("/flickr/" + photo);

                    });

                    self.setState({
                        images: _.shuffle(images.concat(images))
                    });

                }, 1000)
            }
        })

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
