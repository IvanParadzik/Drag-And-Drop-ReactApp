import React from "react";

import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Column from "./Column";

import Navbar from "react-bootstrap/Navbar";

import trash from "../trash-can.png";

const RowContainer = styled.div`
  position: relative;
  top: 100px;
  margin-top: 20px;
  width: 70%;
  left: 15%;
  height: 170px;
  display: flex;
`;

const PlaceholderList = styled.div`
  position: relative;
  padding: 8px;
  display: flex;
  width: 100%;
  align-items: center;
  background-color: ${(props) => (props.isDraggingOver ? "lightgreen" : "")};
`;

const ButtonsNavbar = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
`;

const Trash = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  min-height: 100%;
  background-color: ${(props) =>
    props.isDraggingOver ? "rgb(255, 77, 77)" : ""}; ;
`;

export default class Row extends React.Component {
  render() {
    const navstyle = {
      width: "70%",
      left: "15%",
      height: "80px",
      alignItems: "center",
      backgroundColor: "lightgrey",
    };

    const trashNav = {
      width: "10%",
      left: "0%",
      height: "200px",
      backgroundColor: "rgba(100,100,100,0.5)",
    };

    if (this.props.row.id === "0") {
      return (
        <Navbar fixed="top" style={navstyle}>
          <Droppable
            droppableId={this.props.row.id}
            direction="horizontal"
            type="placeholder"
            isDropDisabled={true}
          >
            {(provided) => (
              <ButtonsNavbar
                className="justify-content-center"
                ref={provided.innerRef}
                {...provided.droppableProps}
                {...provided.dragHandeProps}
              >
                {Object.values(this.props.columns).map((column, index) => {
                  const elements = column.elementIds.map(
                    (elementId) => this.props.elements[elementId]
                  );
                  return (
                    <Column
                      key={column.id}
                      column={column}
                      elements={elements}
                      row={this.props.row}
                      index={index}
                    />
                  );
                })}
                {provided.placeholder}
              </ButtonsNavbar>
            )}
          </Droppable>{" "}
        </Navbar>
      );
    } else if (this.props.row.id === "1") {
      return (
        <Navbar fixed="top" style={trashNav}>
          <Droppable
            droppableId={this.props.row.id}
            direction="horizontal"
            type="placeholder"
          >
            {(provided, snapshot) => (
              <Trash
                isDraggingOver={snapshot.isDraggingOver}
                ref={provided.innerRef}
                {...provided.droppableProps}
                {...provided.dragHandeProps}
              >
                <img alt="trash" src={trash} width="100%" height="100%"></img>
                {provided.placeholder}
              </Trash>
            )}
          </Droppable>{" "}
        </Navbar>
      );
    } else {
      return (
        <RowContainer>
          <Droppable
            droppableId={this.props.row.id}
            direction="horizontal"
            type="placeholder"
          >
            {(provided, snapshot) => (
              <PlaceholderList
                ref={provided.innerRef}
                {...provided.droppableProps}
                {...provided.dragHandeProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {Object.values(this.props.columns).map((column, index) => {
                  const elements = column.elementIds.map(
                    (elementId) => this.props.elements[elementId]
                  );
                  return (
                    <Column
                      key={column.id}
                      column={column}
                      elements={elements}
                      row={this.props.row}
                      index={index}
                    />
                  );
                })}
                {provided.placeholder}
              </PlaceholderList>
            )}
          </Droppable>{" "}
        </RowContainer>
      );
    }
  }
}
