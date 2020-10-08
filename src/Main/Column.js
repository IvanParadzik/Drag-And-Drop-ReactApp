import React from 'react'

import {Draggable,Droppable} from 'react-beautiful-dnd'
import styled from 'styled-components'

import Element from './Element'

const Container = styled.div`
    border : 1px dashed grey;
    width: 33%;
    height: 100%;
    border-radius:2px;
    padding : 8px;
    margin: 8px;
    background-color : white;
    
`;

const FirstRowContainer =  styled.div`
    border : 1px dashed grey;
    width: 100%;
    height: 100%;
    border-radius:2px;
    padding : 8px;
    margin: 8px;
    background-color : white;

`;

const ContainerNavbar = styled.div`
    border : ${props => (props.isDragDisabled ? "none": "1px solid grey")};
    width: 25%;
    margin-right : 10px;
    height:100%;
    border-radius:2px;
    background-color : white;
    items-align: center;
    text-align :center;
`;


const ButtonListNavbar = styled.div`
    position : relative;
    display: flex;
    width: 100%;
    align-items:center;
    text-align :center;
      
`;


const ElementList = styled.div`
    position : relative;
    display: flex;
    width: 100%;
    height: 100%;
    align-items:center;
   
`;





export default class Column extends React.Component{
    render(){
            const placholderStyle = {
                fontSize : "28px",
                fontWeight: "300",
                textAlign :"center",
                itemsAlign: "center",
            }
          
        
            const isDragDisabled = this.props.column.id === 'col-2' 
            const isDropDisabled = Object.keys(this.props.column.elementIds).length !== 0 || this.props.row.id === '0'
           
            if(this.props.row.id === '0'){
                return(
                    <Draggable draggableId = {this.props.column.id} index = {this.props.index} isDragDisabled = {isDragDisabled}>
                    {(provided) =>(
                        
                    <ContainerNavbar
                 
                      {...provided.draggableProps}
                      isDragDisabled = {isDragDisabled}
                     {...provided.dragHandleProps}
                     ref = {provided.innerRef}>
                
                   <Droppable droppableId = {this.props.column.id} direction = 'horizontal' type = 'elements' isDropDisabled = {isDropDisabled}>
                {(provided)=>(
            
            <ButtonListNavbar
             
                ref = {provided.innerRef}
                {...provided.droppableProps}
             >
               
                    
             {this.props.elements.map((element,index) => 
             <Element key = {element.id} element ={element} index = {index}   row = {this.props.row}/>)}
                 {provided.placeholder}
             </ButtonListNavbar>
      
                )}
             </Droppable> 
             <h style = {placholderStyle}> {this.props.column.name}</h>
             </ContainerNavbar>
                )}
                </Draggable>)}


            else if(this.props.row.id === '1'){
                return(
                    <Draggable draggableId = {this.props.column.id} index = {this.props.index} isDragDisabled = {isDragDisabled}>
                    {(provided) =>(
                        
                    <FirstRowContainer
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref = {provided.innerRef}>
                
                <Droppable droppableId = {this.props.column.id} direction = 'horizontal' type = 'elements' isDropDisabled = {isDropDisabled}>
                {(provided)=>(
            <ElementList
            
                ref = {provided.innerRef}
                {...provided.droppableProps}
            >
              

            {this.props.elements.map((element,index) => 
            <Element key = {element.id} element ={element} index = {index}   row = {this.props.row}/>)}
                {provided.placeholder}
            </ElementList>

                )}
            </Droppable> 
            </FirstRowContainer>
                )}
                </Draggable>)}

        
          
              return(
                <Draggable draggableId = {this.props.column.id} index = {this.props.index} isDragDisabled = {isDragDisabled}>
                {(provided) =>(
                    
                <Container
                  {...provided.draggableProps}
                 {...provided.dragHandleProps}
                 ref = {provided.innerRef}>
            {this.props.column.name}
               <Droppable droppableId = {this.props.column.id} direction = 'horizontal' type = 'elements' isDropDisabled = {isDropDisabled}>
            {(provided)=>(
         <ElementList
            ref = {provided.innerRef}
            {...provided.droppableProps}
         >

         {this.props.elements.map((element,index) => 
         <Element key = {element.id} element ={element} index = {index}   row = {this.props.row}/>)}
             {provided.placeholder}
         </ElementList>
  
            )}
         </Droppable> 
         </Container>
            )}
            </Draggable>
    
            )

        
     

    }
}