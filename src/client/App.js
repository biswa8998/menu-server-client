import React, { useEffect, useState } from "react";
import "./App.css";

const host = "http://localhost:8080/api";

export default () => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [timeId, setTimeId] = useState(null);
  let dietaryTypes = {};
  let keyCounter = 0;

  // On load of the application, populate the left sidebar
  useEffect(() => {
    fetch(`${host}/items`)
      .then(strResponse => strResponse.json())
      .then(response => {
        setItems(response.items);
      });
  }, []);

  // on change of text, wait for the user to end typing
  // and then call the search api
  useEffect(() => {
    let url =
      searchKey.trim().length > 0
        ? `${host}/search/${searchKey}`
        : `${host}/items`;

    if (timeId) clearTimeout(timeId);
    let tId = setTimeout(() => {
      fetch(url)
        .then(strResponse => strResponse.json())
        .then(response => {
          console.log(response);
          setItems(response.items);
        });
    }, 500);

    setTimeId(tId);
  }, [searchKey]);

  // add items to the selected list
  const addToSelectedItems = item => {
    let newItems = [...selectedItems];
    newItems.push(item);
    setSelectedItems(newItems);
  };

  // remove items from the selected list
  const removeSelectedItem = idx => {
    let newItems = [...selectedItems];
    newItems.splice(idx, 1);
    setSelectedItems(newItems);
  };

  // set the search value
  const doSearch = textValue => {
    setSearchKey(textValue);
  };

  // find the different types of diets from selected items
  selectedItems.forEach(item => {
    item.dietaries.forEach(diet => {
      if (Object.keys(dietaryTypes).indexOf(diet) === -1) {
        dietaryTypes[diet] = 1;
      } else {
        dietaryTypes[diet] = dietaryTypes[diet] + 1;
      }
    });
  });

  return (
    <div className="wrapper">
      {/*
       ***************** Menu Section *********************
       */}
      <div className="menu-summary">
        <div className="container">
          <div className="row">
            <div className="col-6 menu-summary-left">
              <span>{selectedItems.length} items</span>
            </div>
            <div className="col-6 menu-summary-right">
              {Object.keys(dietaryTypes).length > 0 &&
                Object.keys(dietaryTypes).map((key, idx) => {
                  return (
                    <React.Fragment key={idx}>
                      {`${dietaryTypes[key]}x`}
                      <span className="dietary" key={idx}>
                        {key}
                      </span>
                    </React.Fragment>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="container menu-builder">
        <div className="row">
          {/*
           ***************** Left Sidebar *********************
           */}
          <div className="col-4">
            <div className="filters">
              <input
                className="form-control"
                placeholder="Name"
                value={searchKey}
                onChange={e => {
                  doSearch(e.target.value);
                }}
              />
            </div>
            <ul className="item-picker">
              {items.length > 0 &&
                items.map(it => {
                  const k = keyCounter++;
                  return (
                    <li
                      className="item"
                      key={k}
                      onClick={() => {
                        addToSelectedItems(it);
                      }}
                    >
                      <h2>{it.name}</h2>
                      <p>
                        {it.dietaries.length > 0 &&
                          it.dietaries.map((diet, idx2) => {
                            return (
                              <span className="dietary" key={`${k}${idx2}`}>
                                {diet}
                              </span>
                            );
                          })}
                      </p>
                    </li>
                  );
                })}
            </ul>
          </div>

          {/*
           ***************** Right Section *********************
           */}
          <div className="col-8">
            <h2>Menu preview</h2>
            {selectedItems.length === 0 && <p>Select items from left</p>}
            <ul className="menu-preview">
              {selectedItems.length > 0 &&
                selectedItems.map((it, idx) => {
                  const k = keyCounter++;
                  return (
                    <li className="item" key={k}>
                      <h2>{it.name}</h2>
                      <p>
                        {it.dietaries.length > 0 &&
                          it.dietaries.map((diet, idx2) => {
                            return (
                              <span className="dietary" key={`${k}${idx2}`}>
                                {diet}
                              </span>
                            );
                          })}
                      </p>
                      <button
                        className="remove-item"
                        onClick={() => {
                          removeSelectedItem(idx);
                        }}
                      >
                        x
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
