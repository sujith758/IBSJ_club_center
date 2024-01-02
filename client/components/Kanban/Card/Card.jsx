import React, { useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { CheckSquare, Clock, MoreHorizontal } from "react-feather";
import Tag from "../Tags/Tag";
import "./Card.css";
import CardDetails from "./CardDetails/CardDetails";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Card = (props) => {
  const [dropdown, setDropdown] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  // Load saved date from localStorage on component mount
  useEffect(() => {
    const savedDate = localStorage.getItem(`selectedDate_${props.id}`);
    if (savedDate) {
      setSelectedDateTime(new Date(savedDate));
    }
  }, [props.id]);

  const handleDateChange = (date) => {
    setSelectedDateTime(date);
    // Save selected date to localStorage
    localStorage.setItem(`selectedDate_${props.id}`, date.toISOString());
  };

  const formatDate = (date) => {
    return date ? date.toLocaleDateString('en-GB') : "";
  };

  return (
    <Draggable
      key={props.id.toString()}
      draggableId={props.id.toString()}
      index={props.index}
    >
      {(provided) => (
        <>
          {modalShow && (
            <CardDetails
              updateCard={props.updateCard}
              onClose={() => setModalShow(false)}
              card={props.card}
              bid={props.bid}
              removeCard={props.removeCard}
            />
          )}

          <div
            className="custom__card"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="card__text">
              <p>{props.title}</p>
              <MoreHorizontal
                className="car__more"
                onClick={() => {
                  setDropdown(true);
                  setModalShow(true);
                }}
              />
            </div>

            <div className="card__tags">
              {props.tags?.map((item, index) => (
                <Tag key={index} tagName={item.tagName} color={item.color} />
              ))}
            </div>

            <div className="card__footer">
              <div className="cardfooter__date">
                <span className="icon__sm">
                    <Clock />
                  </span>
              <p className="date__footer">{formatDate(selectedDateTime)}</p>
              </div>
              {!selectedDateTime && (
                <div className="datepicker__container">
                  <DatePicker
                    selected={selectedDateTime}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/YYYY"
                    popperPlacement="right"
                    placeholderText="Choose a date"
                    portalId="root"
                  />
                </div>
              )}

              {props.card.task.length !== 0 && (
                <div className="task">
                  <CheckSquare />
                  <span>
                    {props.card.task.length !== 0
                      ? `${
                          props.card.task?.filter(
                            (item) => item.completed === true
                          ).length
                        } / ${props.card.task.length}`
                      : "0/0"}
                  </span>
                </div>
              )}
            </div>

            {provided.placeholder}
          </div>
        </>
      )}
    </Draggable>
  );
};

export default Card;
