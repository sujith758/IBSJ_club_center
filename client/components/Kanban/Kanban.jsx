import React from "react";
import { useState, useEffect, useRef } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "use-local-storage";
import "./Kanban.css";
import Navbar from "./Navbar/Navbar";
import Board from "./Board/Board";
import Editable from "./Editable/Editable";
import "../../bootstrap.css";
import { io } from "socket.io-client";


function Kanban({ sessionKey }) {
  const socket = io(`http://localhost:3000/#/kanban/?session=${sessionKey}`);

  const sessionDataKey = `kanban-board-${sessionKey}`;
  const [data, setData] = useLocalStorage(sessionDataKey, []);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem(sessionDataKey);
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, [sessionDataKey, setData]);

  useEffect(() => {
    
    const handleBroadcastedData = (broadcastedData) => {
      // Update the local state
      setData(broadcastedData);
    
      // Update local storage
      localStorage.setItem(sessionDataKey, JSON.stringify(broadcastedData));
    
      console.log("Received broadcasted data:", broadcastedData);
    
      // Trigger a refresh by toggling the refresh state
      setRefresh((prevRefresh) => !prevRefresh);
    };

    socket.on("kanban_data_broadcast", handleBroadcastedData);

    return () => {
      socket.off("kanban_data_broadcast", handleBroadcastedData);
    };
  }, [setData, sessionDataKey, socket, refresh]);

  const handleUpdateButtonClick = () => {
    console.log("Emitting updated data:", data);
    socket.emit("kanban_data_updated", { sessionKey, data });
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

  const addCard = (title, bid) => {
    const updatedData = data.map((item) =>
      item.id === bid
        ? {
            ...item,
            card: [...item.card, { id: uuidv4(), title, tags: [], task: []}],
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
    const updatedData = [...data, { id: uuidv4(), boardName: title, card: [] }];
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
          <Navbar resetData={() => setData([])} />
          <div className="app_outer">
            <div className="app_boards">
              {data.map((item) => (
                <Board
                  key={item.id}
                  id={item.id}
                  name={item.boardName}
                  card={item.card}
                  setName={setName}
                  addCard={addCard}
                  removeCard={removeCard}
                  removeBoard={removeBoard}
                  

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
      <button onClick={handleUpdateButtonClick}>Update Data</button>
    </>
  );
}

export default Kanban;
