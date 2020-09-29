
import React from 'react';

import styled from 'styled-components';
import {Droppable} from 'react-beautiful-dnd'
import Element from './element'
import Card from 'react-bootstrap/Card'
const Container = styled.div`
    margin: 8px;
    border : 1px solid grey;
    border-radius: 2px;
`;

const ElementList = styled.div`
    padding : 8px;
`;


export default class Column extends React.Component{
    
    renderRows() {
        let results = this.props.elements;
        let finalArr = [], columns = [];
      
        results.forEach ((result, i) => {
      
          // prepare the array
       
          columns.push(
            <div key ={i} className="col-md-4">
              <Card result={result}></Card> 
            </div>
          );
      
          // after three items add a new row 
          if((i+1) % 3 === 0) {
            finalArr.push(<div className ="row mt-4">{columns}</div>);
            columns = [];
          }
        });
        return finalArr;
      }
    render(){
        return (
        <Container>
        
        <Droppable droppableId = {this.props.column.id}>
            {(provided)=>(
         <ElementList
            ref = {provided.innerRef}
            {...provided.droppableProps}
         >
            {this.props.elements.map((element,index) => 
            <Element key = {element.id} element ={element} index = {index}/>)}
            {provided.placeholder}
         </ElementList>
            )}
         </Droppable>
        </Container>
        )
    }
}