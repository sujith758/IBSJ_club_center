import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "use-local-storage";
import PropTypes from "prop-types";
import "./Kanban.css";
import Navbar from "./Navbar/Navbar";
import Board from "./Board/Board";
import Editable from "./Editable/Editable";
import "../../bootstrap.css";

function Kanban({ sessionKey }) {
  const sessionDataKey = `kanban-board-${sessionKey}`;
  const [data, setData] = useLocalStorage(sessionDataKey, []);
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to WebSocket server
    const newSocket = io("https://d25kfh1l-3000.inc1.devtunnels.ms/");

    newSocket.on("update", (updatedData) => {
      // Update local storage data with WebSocket updates
      setData(updatedData);
    });

    // Set the socket in the state
    setSocket(newSocket);

    return () => {
      // Disconnect the socket on component unmount
      newSocket.disconnect();
    };
  }, [setData]);

  const switchTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) return;

    const updatedData = dragCardInBoard(source, destination);
    // Update local storage and emit update to WebSocket server
    setData(updatedData);
    socket.emit("update", updatedData);
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
    // Update local storage and emit update to WebSocket server
    setData(updatedData);
    socket.emit("update", updatedData);
  };

  const addCard = (title, bid) => {
    const updatedData = data.map((item) =>
      item.id === bid
        ? { ...item, card: [...item.card, { id: uuidv4(), title, tags: [], task: [] }] }
        : item
    );
    // Update local storage and emit update to WebSocket server
    setData(updatedData);
    socket.emit("update", updatedData);
  };

  const removeCard = (boardId, cardId) => {
    const updatedData = data.map((item) =>
      item.id === boardId
        ? { ...item, card: item.card.filter((card) => card.id !== cardId) }
        : item
    );
    // Update local storage and emit update to WebSocket server
    setData(updatedData);
    socket.emit("update", updatedData);
  };

  const addBoard = (title) => {
    const updatedData = [...data, { id: uuidv4(), boardName: title, card: [] }];
    // Update local storage and emit update to WebSocket server
    setData(updatedData);
    socket.emit("update", updatedData);
  };

  const removeBoard = (bid) => {
    const updatedData = data.filter((item) => item.id !== bid);
    // Update local storage and emit update to WebSocket server
    setData(updatedData);
    socket.emit("update", updatedData);
  };
  

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App" data-theme={theme}>
        <Navbar switchTheme={switchTheme} resetData={() => setData([])} />
        <div className="app_outer">
          <div className="app_boards">
            {data.map((item) => (
              
              <React.memo key={item.id}>
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
              </React.memo>

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
  );
}

Kanban.propTypes = {
  sessionKey: PropTypes.string.isRequired,
};

export default Kanban;
