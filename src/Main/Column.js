import React from "react";

import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

import Element from "./Element";

const Container = styled.div`
  border: 1px dashed grey;
  width: 33%;
  height: 100%;
  border-radius: 2px;
  padding: 8px;
  margin: 8px;
  background-color: ${(props) => (props.isDragging ? "lightgrey" : "white")};
`;

const FirstRowContainer = styled.div`
  border: 1px dashed grey;
  width: ${(props) => (props.isDragging ? "50px" : "100%")};
  height: 100%;
  border-radius: 2px;
  padding: 8px;
  margin: 8px;
  background-color: ${(props) => (props.isDragging ? "lightgrey" : "white")};
`;

const ContainerNavbar = styled.div`
  border: ${(props) => (props.isDragDisabled ? "none" : "1px solid grey")};
  width: ${(props) => (props.columnId === "col-1" ? "15%" : "25%")};
  margin-right: 10px;
  height: 100%;
  border-radius: 2px;
  background-color: white;
  items-align: center;
  text-align: center;
`;

const ButtonListNavbar = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  text-align: center;
`;

const ElementList = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  background-color: ${(props) => (props.isDraggingOver ? "lightgreen" : "")};
`;

export default class Column extends React.Component {
  render() {
    const placholderStyle = {
      fontSize: "28px",
      fontWeight: "300",
      textAlign: "center",
      itemsAlign: "center",
    };

    const isDragDisabled =
      this.props.column.id === "col-2" || this.props.column.id === "col-trash";
    const isDropDisabled =
      Object.keys(this.props.column.elementIds).length !== 0 ||
      this.props.row.id === "0";

    if (this.props.row.id === "0" || this.props.row.id === "1") {
      return (
        <Draggable
          draggableId={this.props.column.id}
          index={this.props.index}
          isDragDisabled={isDragDisabled}
        >
          {(provided) => (
            <ContainerNavbar
              columnId={this.props.column.id}
              {...provided.draggableProps}
              isDragDisabled={isDragDisabled}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <Droppable
                droppableId={this.props.column.id}
                direction="horizontal"
                type="elements"
                isDropDisabled={isDropDisabled}
              >
                {(provided) => (
                  <ButtonListNavbar
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {this.props.elements.map((element, index) => (
                      <Element
                        key={element.id}
                        element={element}
                        index={index}
                        row={this.props.row}
                      />
                    ))}
                    {provided.placeholder}
                  </ButtonListNavbar>
                )}
              </Droppable>
              <h style={placholderStyle}> {this.props.column.name}</h>
            </ContainerNavbar>
          )}
        </Draggable>
      );
    } else if (this.props.row.id === "2") {
      return (
        <Draggable
          draggableId={this.props.column.id}
          index={this.props.index}
          isDragDisabled={isDragDisabled}
        >
          {(provided, snapshot) => (
            <FirstRowContainer
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
            >
              <Droppable
                droppableId={this.props.column.id}
                direction="horizontal"
                type="elements"
                isDropDisabled={isDropDisabled}
              >
                {(provided, snapshot) => (
                  <ElementList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                  >
                    {this.props.elements.map((element, index) => (
                      <Element
                        key={element.id}
                        element={element}
                        index={index}
                        row={this.props.row}
                      />
                    ))}
                    {provided.placeholder}
                  </ElementList>
                )}
              </Droppable>
            </FirstRowContainer>
          )}
        </Draggable>
      );
    }
    return (
      <Draggable
        draggableId={this.props.column.id}
        index={this.props.index}
        isDragDisabled={isDragDisabled}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {this.props.column.name}
            <Droppable
              droppableId={this.props.column.id}
              direction="horizontal"
              type="elements"
              isDropDisabled={isDropDisabled}
            >
              {(provided, snapshot) => (
                <ElementList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {this.props.elements.map((element, index) => (
                    <Element
                      key={element.id}
                      element={element}
                      index={index}
                      row={this.props.row}
                    />
                  ))}
                  {provided.placeholder}
                </ElementList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }
}
