import React, {Component} from 'react';

class CreateContent extends Component{
    render(){
      console.log('Create render');
      return(
        // <article><h2>HTML</h2>
        // HTML is HyperText Markup Language.</article>
        <article>
        <h2>Create</h2>
        <form action="/create_process" method="post" 
        onSubmit = {function(e){
            e.preventDefault();
            // debugger;
            this.props.onSubmit(
                e.target.title.value,
                e.target.desc.value
            );
            // alert(name);
        }.bind(this)}
        >
            
            <p><input type="text" name="title" placeholder="title"></input></p>
            <p>
                <textarea name="desc" placeholder="description">
                </textarea>
            </p>
            <p>
                <input type="submit"></input>
            </p>
        </form>
        {this.props.desc}
      </article>
      );
    }
  }
export default CreateContent;