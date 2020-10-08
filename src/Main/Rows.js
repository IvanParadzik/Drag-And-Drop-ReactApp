
import React from 'react';

import styled from 'styled-components';
import {Droppable} from 'react-beautiful-dnd'
import Column from './Column'

import Navbar from 'react-bootstrap/Navbar'



const RowContainer = styled.div`
    position : relative;
    top : 100px;
    margin-top: 20px;
    width: 70%;
    left: 15%;
    height: 170px;
    display:flex;
`;


const PlaceholderList = styled.div`
    position : relative;
    padding : 8px;
    display: flex;
    width: 100%;
    align-items:center;
`;


const ButtonsNavbar =styled.div`
    position : relative;
    display: flex;
    width: 100%;
    align-items:center;
`;

const Trash = styled.div`
    position : relative;
    display: flex;
    width: 100%;
    align-items:center;
`;


export default class Row extends React.Component{
    
  
    render(){
        const navstyle = {
            width : "70%",
            left: "15%",
            height: "80px",
            alignItems: 'center',
            backgroundColor: "lightgrey",
            
          };

          const trashNav  = {
            width : "10%",
            left: "90%",
            height: "80px",
            backgroundColor: "lightgrey",

          }
          
        
         
       
           if(this.props.row.id === '0'){
            return <Navbar   fixed = 'top' style = {navstyle}>   
            <Droppable droppableId = {this.props.row.id} direction = 'horizontal' type = 'placeholder' isDropDisabled = {true}  >
            {(provided)=>(
             <ButtonsNavbar
             className = 'justify-content-center'
            ref = {provided.innerRef}
            {...provided.droppableProps}
            {...provided.dragHandeProps}
            >
            {Object.values(this.props.columns).map((column, index)=>{
            const elements = column.elementIds.map(elementId => this.props.elements[elementId]);
             return <Column key = {column.id} column = {column}  elements = {elements} row = {this.props.row} index = {index}   />
    })}
    {provided.placeholder}
            
         </ButtonsNavbar>
            )}
         </Droppable> </Navbar>

           }
           else if(this.props.row.id ==='trash') {
            
                return <Navbar  fixed = 'bottom' style = {trashNav}>   
                <Droppable droppableId = {this.props.row.id} direction = 'horizontal' type = 'placeholder'  >
                {(provided)=>(
                 <Trash
                ref = {provided.innerRef}
                {...provided.droppableProps}
                {...provided.dragHandeProps}
                >
                {Object.values(this.props.columns).map((column, index)=>{
                const elements = column.elementIds.map(elementId => this.props.elements[elementId]);
                 return <Column key = {column.id} column = {column}  elements = {elements} row = {this.props.row} index = {index}   />
        })}
        {provided.placeholder}
                
               </Trash>
                )}
             </Droppable> </Navbar>
    
               }

    
           else{
            return <RowContainer >   
            <Droppable droppableId = {this.props.row.id} direction = 'horizontal' type = 'placeholder' >
            {(provided)=>(
             <PlaceholderList
            ref = {provided.innerRef}
            {...provided.droppableProps}
            {...provided.dragHandeProps}
            >
            {Object.values(this.props.columns).map((column, index)=>{
            const elements = column.elementIds.map(elementId => this.props.elements[elementId]);
             return <Column key = {column.id} column = {column}  elements = {elements} row = {this.props.row} index = {index}   />
    })}
    {provided.placeholder}
            
         </PlaceholderList>
            )}
         </Droppable> </RowContainer>
        }}
       
    
}