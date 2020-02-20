import React, {Component} from 'react';


class TOC extends Component{
  shouldComponentUpdate(newProps, newState){// (newProps, newState) 렌더링 제어 
    console.log('==========>TOC render shouldComponetUpdate'
    ,newProps.data, this.props.data);//newProps 바뀐 값, this.props.data는 이전 값 
    if(this.props.data === newProps.data){
      return false;
    }
    return true;
  }

    render(){
      console.log('==========>TOC render');
        let lists = [];
        let data = this.props.data;
        let i = 0;
        while(i < data.length){
             lists.push(
             <li key={data[i].id}>
                 <a href={"/content/"+data[i].id}
                //방법1 data-id = {data[i].id} //data-id 가 아닌 data_id로 해주면 오류남 , data-자체가 고유이름  
                 onClick={function(id,e){   
                    //  debugger;             
                     e.preventDefault();
                     //방법 1. this.props.onChangePage(e.target.dataset.id); 
                     this.props.onChangePage(id); //data-X , dataset.X 두 개 일 치

                 }.bind(this, data[i].id)} //함수 안 this에 외부 this를 삽입해줘야함 
                 //방법 1. .bind(this)
                 >{data[i].title}</a></li>);
            i += 1;
        }
      return(
        <nav>
        <ul>
           {lists}
        </ul>
     </nav>
      );
    }
  }
export default TOC;