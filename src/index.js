import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';

//import initialData from './initialData'



//import Column from './column'

//import {DragDropContext, Droppable} from 'react-beautiful-dnd'


/*
class App extends React.Component{
  state = initialData;
  
  onDragEnd = result=>{
    
    const {destination, source, draggableId} =result;

    if(!destination){
      return;}
    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ){return ; }

 
    if(source.droppableId ==='0'){
      
       
 
        let newID = (Object.keys(initialData['elements']).length-2).toString()
        if(source.index === 0){
          let newElement = {id :newID , content: '' }
          initialData['elements'][newID] = newElement
        }
        else if (source.index ===1){
          let newElement = {id :newID , content:<textarea  style={{height:"100%", width: "100%", resize: "none"}}></textarea>}
          initialData['elements'][newID] = newElement
        }
        else{
          let newElement = {id :newID , content:  (<img alt="Qries" src="https://www.qries.com/images/banner_logo.png"
          width="100%" height="130"/>)}

          initialData['elements'][newID] = newElement
        }
        
        initialData['columns'][destination.droppableId]['elementIds'].splice(destination.index,0,newID)
      
        const finish = initialData['columns'][destination.droppableId]
        const newElementIds = Array.from(finish.elementIds);
 
        if(newElementIds.length>3 || (destination.droppableId ==='1' && newElementIds.length>1) ){
          
          var ColumnSize = Object.keys(this.state.columns).length -1;

          for(let i =ColumnSize ; i >  parseInt(destination.droppableId) ; i--){
            let cols =  initialData['columns'][i-1]
            let rowEl = Array.from(cols.elementIds)
         
            let lastElId = rowEl.slice(-1)[0]
         
            rowEl.splice(-1,1)
            let nextRow  = initialData['columns'][i]
            let nextRowIds = Array.from(nextRow.elementIds)
            nextRowIds.splice(0,0,lastElId)
       
           
            if(i !== ColumnSize){
                nextRowIds.splice(-1,1)
            }
            
            initialData['columns'][i]['elementIds'] = nextRowIds
           
            
          }
          newElementIds.splice(-1,1)
          initialData['columns'][destination.droppableId]['elementIds'] = newElementIds
            
        }
        //check if last row is more then 3 to create new row
          
        let columnSize = Object.keys(this.state.columns).length-1
        const  lastRow = initialData['columns'][columnSize]
        const lastRowElementIds =  Array.from(lastRow.elementIds)
        const position = (columnSize+1).toString()
        let NewRow = { id : position, elementIds : []}
        if(lastRowElementIds.length === 3 || (destination.droppableId ===`1` && columnSize ===1)){
          initialData['columns'][position] = NewRow
          initialData['columnOrder'].splice(parseInt(position)+1,0,position)

        }
        this.setState(initialData) 
       
    
      return ; 
    }
    
  
   
    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];
    //Draggin in rows
    if(start === finish){
      const newElementIds = Array.from(start.elementIds);
        newElementIds.splice(source.index,1)
        newElementIds.splice(destination.index,0, draggableId);
        const newColumn = {
          ...start,
          elementIds : newElementIds
        }
        const newState = {
          ...this.state,
          columns : {
            ...this.state.columns,
            [newColumn.id] : newColumn,
          }
        }
        this.setState(newState)
        return;
    }
    //DRAGING BETWEEN ROWS
    const startElementIds = Array.from(start.elementIds);
    startElementIds.splice(source.index,1);
    const newStart ={
      ...start,
      elementIds : startElementIds
    }
    const finishElementIds = Array.from(finish.elementIds)
    finishElementIds.splice(destination.index,0,draggableId)
    const newFinish ={
      ...finish,
      elementIds : finishElementIds,
    }
    const newState = {
      ...this.state,
      columns : {
        ...this.state.columns,
        [newStart.id] : newStart,
        [newFinish.id] : newFinish,
      }
    }

    var size = Object.keys(this.state.columns).length -1;

    if((newFinish.elementIds.length >3 || size.toString() === newFinish.id.toString() )&& newStart.id < newFinish.id ){
      
   
     
      const NewColumn = []
     
      for(let i = parseInt(newStart.id); i < parseInt(newFinish.id); i++){
      
          let cols = this.state.columns[i+1]
         
          let firstEl = Array.from(cols.elementIds)
          let firstElID = firstEl.slice(0)[0]
       
          
          let nextCol  = this.state.columns[i]
          let nextColumnIds = Array.from(nextCol.elementIds)
          if(i ===1){
            nextColumnIds.splice(0,1);
            nextColumnIds.splice(2,0, firstElID)
           }
         
           else{
            nextColumnIds.splice(source.index,1);
            nextColumnIds.splice(2,0, firstElID)
           }
           if(destination.index ===0){
               return;
           }
           
          
     
          let Col = {
            ...this.state.columns[i],
            elementIds : nextColumnIds
          }
        
          NewColumn[i] = Col
         
        }

     
        finishElementIds.splice(0, 1)
        
        const newF = {
          ...finish,
          elementIds : finishElementIds
        }
        
      NewColumn.push(newF)  

      
      let Ar = {...this.state.columns}
      let columns = Object.values(Ar)
      for(let i = parseInt(newStart.id) ; i <= parseInt(newFinish.id); i++){
        columns.splice(i, 1)
        columns.splice(i,0, NewColumn[i])
      }
        let newState = {
          ...this.state,
          columns 
        }
  
        this.setState(newState)
      
    
        
    
    return;
      }
  

   
    else if ((newFinish.elementIds.length >3  || newFinish.id ===`1`)  && newStart.id > newFinish.id){
      const NewColumn = []
       console.log(destination.index)
      if(destination.index ===3 || (destination.droppableId ==='1' && destination.index ===1 )){
         
        return;
    }
      for(let i = parseInt(newStart.id); i > parseInt(newFinish.id); i--){
     
        let cols = this.state.columns[i-1]
       
        let lastEl = Array.from(cols.elementIds)
        let lastElID = lastEl.slice(-1)[0]
     
        
        let nextCol  = this.state.columns[i]
        let nextColumnIds = Array.from(nextCol.elementIds)
       if( i === parseInt(newStart.id)){
          nextColumnIds.splice(source.index,1);
          nextColumnIds.splice(0,0, lastElID)
       }
        else{
          nextColumnIds.splice(-1,1);
          nextColumnIds.splice(0,0, lastElID)
        }
       

        
   
        let Col = {
          ...this.state.columns[i],
          elementIds : nextColumnIds
        }
      
        NewColumn[i] = Col
       
      }
      
      finishElementIds.splice(-1, 1)
        
      const newF = {
        ...finish,
        elementIds : finishElementIds
      }
      var filtered = NewColumn.filter(function (el) {
        return el != null;
      });
      
      filtered.unshift(newF)  
  
      
      let Ar = {...this.state.columns}
      let columns = Object.values(Ar)
      for(let i = 0 ; i < filtered.length; i++){
       
        columns.splice(filtered[i].id, 1)
        columns.splice(filtered[i].id,0, filtered[i])
      }
     
      let newState = {
        ...this.state,
        columns 
      }

      this.setState(newState)
    
    return;
    }
   
    this.setState(newState)
  };

  render(){
    return (<DragDropContext
        
        onDragEnd = {this.onDragEnd}
    
    >
        {this.state.columnOrder.map((columnId)=>{
        const column = this.state.columns[columnId];
        const elements = column.elementIds.map(elementId => this.state.elements[elementId]);

        return <Column key = {column.id} column = {column} elements = {elements}/>
    })}
    </DragDropContext>)
  };
}
*/

import App from './Main/Main'



//import {Main} from './Components/Main'
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
