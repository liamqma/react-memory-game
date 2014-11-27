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

        //$.ajax({
        //    url: 'https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&format=json&per_page=6&api_key=ac2595fc19d820ccda1c1efc636be360',
        //    dataType: 'jsonp',
        //    type: 'GET',
        //    jsonpCallback: 'jsonFlickrApi',
        //    success: function(data){
        //
        //        setTimeout(function(){
        //
        //            data.photos.photo.forEach(function(photo){
        //
        //                images.push("https://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg");
        //
        //            });
        //
        //            self.setState({
        //                images: _.shuffle(images.concat(images))
        //            });
        //
        //        }, 1000)
        //
        //    },
        //    error: function( jqXHR, textStatus, errorThrown) {
        //
        //        console.log(errorThrown);
        //
        //    }
        //});

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
