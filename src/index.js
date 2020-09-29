import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';

import initialData from './initialData'


import Column from './column'

import {DragDropContext} from 'react-beautiful-dnd'



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

   
    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];
    
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
