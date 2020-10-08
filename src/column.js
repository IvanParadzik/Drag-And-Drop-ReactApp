
import React from 'react';

import styled from 'styled-components';
import {Droppable} from 'react-beautiful-dnd'
import Element from './element'


import Navbar from 'react-bootstrap/Navbar'

const Container = styled.div`
    position : relative;
    top : 100px;
    margin-top: 20px;
    width: 70%;
    left: 15%;
    height: 170px;
    

    border-radius: 2px;
    display:flex;
`;


const ElementList = styled.div`
    position : relative;
    padding : 8px;
    display: flex;
    width: 100%;
    align-items:center;
`;


export default class Column extends React.Component{
    
  
    render(){
        const navstyle = {
           
            backgroundColor: "lightgrey",
            padding: "10px", 
        
           
          };
      
        if(this.props.column.id === '0'){
        
            return <Navbar fixed ='top' style = {navstyle}>   <Droppable droppableId = {this.props.column.id} direction = 'horizontal'>
            {(provided)=>(
         <ElementList
            ref = {provided.innerRef}
            {...provided.droppableProps}
         >
            {this.props.elements.map((element,index) => 
            <Element key = {element.id} element ={element} index = {index}   column = {this.props.column.id}/>)}
            
         </ElementList>
            )}
         </Droppable> </Navbar>
        }
        else{
            return  <Container>
                 <Droppable droppableId = {this.props.column.id} direction = 'horizontal'>
            {(provided)=>(
         <ElementList
            ref = {provided.innerRef}
            {...provided.droppableProps}
         >
            {this.props.elements.map((element,index) => 
            <Element key = {element.id} element ={element} index = {index} column = {this.props.column.id}/>)}
            
         </ElementList>
            )}
         </Droppable> </Container> 
        }
        
       
      
    }
}