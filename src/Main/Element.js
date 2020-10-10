import React from "react";

import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const ContainerNavbar = styled.div`
  border: 1px solid grey;
  width: 100%;
  height: 100%;
  border-radius: 2px;
  padding: 8px;
  items-align: center;
  text-align: center;
  background-color: white;
`;

const ContainerElements = styled.div`
  border: 1px solid grey;
  width: 100%;
  height: 100%;

  border-radius: 2px;
  padding: 1px;
  background-color: white;
`;

export default class Element extends React.Component {
  render() {
    const isDragDisabled = this.props.row.id !== "0";

    if (this.props.row.id === "0") {
      return (
        <Draggable
          draggableId={this.props.element.id}
          index={this.props.index}
          isDragDisabled={isDragDisabled}
        >
          {(provided) => (
            <ContainerNavbar
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              {this.props.element.content}
            </ContainerNavbar>
          )}
        </Draggable>
      );
    }

    return (
      <Draggable
        draggableId={this.props.element.id}
        index={this.props.index}
        isDragDisabled={isDragDisabled}
      >
        {(provided) => (
          <ContainerElements
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {this.props.element.content}
          </ContainerElements>
        )}
      </Draggable>
    );
  }
}
