// import React from 'react';
import  React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import Contents from "./components/Contents";
import UpdateContent from "./components/UpdateContent";
import Subject from "./components/Subjects";
import Control from "./components/Control";
import CreateContent from "./components/CreateContent";

//class type 

class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state ={
      mode:'welcome',    
      selected_content_id:2,
      subject:{title:'WEB', sub:'World wide web!@!'},
      welcome:{title:'Welcome',desc:'Hello,React!!'},
      contents:[
        {id:1, title: 'HTML',desc:'HTML is for information'},
        {id:2, title: 'CSS',desc:"CSS is for design"},
        {id:3, title: 'JavaScript',desc:"JavaScript is for interactive"}
      ]
    }   
  }
  getReadContent(){
    let i = 0;
      while(i< this.state.contents.length){
        let data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          return data;
        }
        i+= 1;
      }
  }
  getContent(){
    console.log('App render');
    let _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }
    else if(this.state.mode === 'read'){
      var _content = this.getReadContent();
      console.log(_content)
      // debugger;
      // _title = this.state.contents[0].title;
      // _desc = this.state.contents[0].desc;
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    }
    else if(this.state.mode === 'create'){
      _article = <CreateContent  onSubmit={function(_title, _desc){
        // debugger;
        console.log(_title,_desc);
        this.max_content_id = this.max_content_id+1;
        //push 방식 
        // this.state.contents.push(
        //   { id:this.max_content_id, title: _title , desc: _desc});
        // concat 방식 
        // let _contents = this.state.contents.concat(
        //   { id:this.max_content_id, title: _title , desc: _desc}
        // );
        var _contents = Array.from(this.state.contents);
        _contents.push({ id:this.max_content_id, title: _title , desc: _desc});
        
        this.setState({
          contents: _contents,
          mode : 'read',
          selected_content_id : this.max_content_id
          });
      }.bind(this)}></CreateContent>
    }
    
    else if(this.state.mode === 'update'){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} 
      onSubmit={
        function(_id, _title, _desc){
        // debugger;
        console.log(_id,_title,_desc);
        var _contents = Array.from(this.state.contents);
        var i = 0;
        while(i< _contents.length)
        {
          if(_contents[i].id === _id){
            _contents[i]= {id:_id, title:_title, desc:_desc};
          }
          i += 1;
        }
        // this.state.contents.push(
        //   { id:this.max_content_id, title: _title , desc: _desc});

        // let length = this.state.contents.length;
        // this.state.contents[length] ={ zid:this.max_content_id, title: _title , desc: _desc};

        this.setState(
          { contents: _contents,
            mode: 'read'});
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }
  render(){
    console.log('render',this);
    return (
      <div className="App">

       <Subject title={this.state.subject.title} sub={this.state.subject.sub}
       onChangePage={function(){
        this.setState({mode:'welcome'});
        }.bind(this)}
        >
        </Subject>
       {/* <header>
    <h1><a href="/" onClick={function(e){
      console.log(e);
      e.preventDefault();
      // this.state.mode = 'welcome';
      this.setState({
        mode:'welcome'
      });
      // debugger; //디버깅시 
    }.bind(this)}>{this.state.subject.title}</a></h1>
                   {this.state.subject.sub}
                 </header> */}
       <TOC onChangePage={function(id){
        //  debugger;
          this.setState({
            mode:'read',
            selected_content_id:Number(id)
          });
       }.bind(this)} data={this.state.contents}></TOC>
       <Control onChangeMode={function(_mode){
        if(_mode ==='delete'){
            if(window.confirm("정말 삭제할것입니까?")){//window붙여줘야함
              var _contents = Array.from(this.state.contents);
              let i = 0;
              while(i < _contents.length){
                if(_contents[i].id === this.state.selected_content_id)
                {
                  _contents.splice(i,1);
                  break;
                }
                i+= 1; 
              }
              this.setState({
                mode:'welcome',
                contents:_contents
              })
            }
        }else{
        this.setState({
          mode:_mode
        });
      }
       }.bind(this)}></Control>
      {this.getContent()}
      {/* <Contents title="HTML2"desc="ths"></Contents> */}
      </div>
      );  
   }
   
}

export default App;


// function type:

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
