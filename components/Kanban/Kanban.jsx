import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "use-local-storage";
import "./Kanban.css";
import Navbar from "./Navbar/Navbar";
import Board from "./Board/Board";
import Editable from "./Editable/Editable";
import { io } from "socket.io-client";

const socket = io(`http://localhost:3001`);

function Kanban({ sessionKey }) {
  const sessionDataKey = `kanban-board-${sessionKey}`;
  const [data, setData] = useLocalStorage(sessionDataKey, []);
  useEffect(() => {
    const storedData = localStorage.getItem(sessionDataKey);
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, [sessionDataKey, setData]);

  const emitDataToServer = () => {
    // Emit the current data to the server through the socket connection
    socket.emit("update_data_text", { sessionKey, data });
  };

  useEffect(() => {
    const socket = io(`http://localhost:3001`);

    // Join the room corresponding to the sessionKey
    socket.emit("join_room", sessionKey);
    socket.on(`recieve_data_text_${sessionKey}`, (recievedData) => {
      console.log("Data recieved from the server!", recievedData);
      setData(recievedData);
    });
  }, [sessionKey, socket]);

  const onCardDateChange = (boardId, cardId, date) => {
    const formattedDate = date.toLocaleDateString("en-GB");
    const updatedData = data.map((board) => {
      if (board.id === boardId) {
        const updatedCard = board.card.map((card) =>
          card.id === cardId ? { ...card, selectedDate: formattedDate } : card
        );
        return { ...board, card: updatedCard };
      }
      return board;
    });
    setData(updatedData);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;

    const updatedData = dragCardInBoard(source, destination);
    setData(updatedData);
  };

  const dragCardInBoard = (source, destination) => {
    const tempData = [...data];
    const destinationBoardIdx = tempData.findIndex(
      (item) => item.id.toString() === destination.droppableId
    );
    const sourceBoardIdx = tempData.findIndex(
      (item) => item.id.toString() === source.droppableId
    );
    tempData[destinationBoardIdx].card.splice(
      destination.index,
      0,
      tempData[sourceBoardIdx].card[source.index]
    );
    tempData[sourceBoardIdx].card.splice(source.index, 1);

    return tempData;
  };

  const setName = (title, bid) => {
    const updatedData = data.map((item) =>
      item.id === bid ? { ...item, boardName: title } : item
    );
    setData(updatedData);
  };

  const addCard = (title, bid, selectedDate) => {
    const updatedData = data.map((item) =>
      item.id === bid
        ? {
            ...item,
            card: [
              ...item.card,
              { id: uuidv4(), title, tags: [], task: [], selectedDate: null },
            ],
          }
        : item
    );
    setData(updatedData);
  };

  const removeCard = (boardId, cardId) => {
    const updatedData = data.map((item) =>
      item.id === boardId
        ? { ...item, card: item.card.filter((card) => card.id !== cardId) }
        : item
    );
    setData(updatedData);
  };

  const addBoard = (title) => {
    const updatedData = [
      ...data,
      { id: uuidv4(), boardName: title, card: [] },
    ];
    setData(updatedData);
  };

  const removeBoard = (bid) => {
    const updatedData = data.filter((item) => item.id !== bid);
    setData(updatedData);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="App">
        <Navbar
            resetData={() => setData([])}
            emitDataToServer={emitDataToServer} 
          />
          <div className="app_outer">
            <div className="app_boards">
              {data && data.map((item) => (
                <Board
                  key={item.id}
                  id={item.id}
                  name={item.boardName}
                  card={item.card}
                  setName={setName}
                  addCard={(title, bid, selectedDate) => addCard(title, bid, selectedDate)}
                  removeCard={removeCard}
                  removeBoard={removeBoard}
                  onCardDateChange={onCardDateChange} // Pass the date change handler to Board component
                />
              ))}
              <Editable
                class={"add__board"}
                name={"Add Board"}
                btnName={"Add Board"}
                onSubmit={addBoard}
                placeholder={"Enter Board Title"}
              />
            </div>
          </div>
        </div>
      </DragDropContext>
      
    </>
  );
}

export default Kanban;