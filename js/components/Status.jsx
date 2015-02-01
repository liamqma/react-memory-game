var React = require('react');

var Status = React.createClass({
    propTypes: {
        message: React.PropTypes.string.isRequired
    },
    render: function(){
        return (
            <p className='status'>
                {this.props.message}
            </p>
        );
    }
});

module.exports = Status;