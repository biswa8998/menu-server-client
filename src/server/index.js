const express = require("express");
const cors = require("cors");
const items = require("./items");

const app = express();

const port = process.env.PORT || 8080;

app.use(express.static("dist"));

app.get("/api/items", cors(), (req, res) => res.send({ items }));

app.get("/api/search/:searchKey", cors(), (req, res) => {
  let searchedArr = [];
  items.forEach(item => {
    if (
      item.name.toLowerCase().indexOf(req.params.searchKey.toLowerCase()) !== -1
    ) {
      searchedArr.push(item);
    }
  });
  return res.send({ items: searchedArr });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
