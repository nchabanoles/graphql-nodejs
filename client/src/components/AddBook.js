import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getAuthorsQuery} from '../queries/queries';


class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name:'',
          genre:'',
          authorId:''
        };
    }
    displayAuthors(){
        var data = this.props.data;
        if(data.loading){
            return(<option disabled>Loading Authors...</option>)
        } else {
            return data.authors.map(author => {
               return(<option key={author.id} value={author.id}>{author.name}</option>)
            });
        }
    }
    submitForm(e){
        // this refers to the component because we called
        // this.submitForm.bind(this) at a time when 'this' was a reference to the component
        e.preventDefault(); // avoid to reload the page when submitting the form
        console.log(this.state);
    }
    render() {
        return (
            <form id="add-book" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={(e) => this.setState({name:e.target.value})}/>
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={(e) => this.setState({genre:e.target.value})}/>
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange={(e) => this.setState({authorId:e.target.value})}>
                        <option>Select author</option>
                        {this.displayAuthors()}
                    </select>
                </div>
                <button>+</button>
            </form>
        );
    }
}

export default graphql(getAuthorsQuery)(AddBook);
