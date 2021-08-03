//jshint esversion:6

require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const itemsSchema = {
  name: String,
};
const Item = mongoose.model("Item", itemsSchema);
const item1 = new Item({
  name: "heyo!",
});
const item2 = new Item({
  name: "how you doing?",
});
const item3 = new Item({
  name: "feeling well?",
});
const defaultItems = [item1, item2, item3];
const listSchema = {
  name: String,
  items: [itemsSchema],
};
const List = mongoose.model("List", listSchema);

app.get("/", function (req, res) {
  Item.find({}, function (err, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Success: saved default items to DB;");
        }
      });
      res.redirect("/");
    }
    res.render("list", { listTitle: "Browse to /Alex, /Work, or /<anything> to have your new persistent and shareable list", newItems: foundItems });
  });
});

app.post("/", function (req, res) {
  let item = req.body.item;
  let listTitle = req.body.listTitle;
  if(item === null || item === "") {
    if (listTitle === "Browse to /Alex, /Work, or /<anything> to have your new persistent and shareable list") {
      return res.redirect("/");
    } else {
        return res.redirect(listTitle);
    }
  }
  const itemDoc = new Item({
    name: item,
  });
  if (listTitle === "Browse to /Alex, /Work, or /<anything> to have your new persistent and shareable list") {
    itemDoc.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listTitle }).then((foundList) => {
      foundList.items.push(itemDoc);
      foundList.save();
      res.redirect(listTitle);
    });
  }
});

app.post("/delete", function (req, res) {
  let listTitle = req.body.listTitle;
  if (listTitle === "Browse to /Alex, /Work, or /<anything> to have your new persistent and shareable list") {
    Item.findOneAndDelete({ _id: req.body.checkbox }, function (err, result) {
      if (err) {
        console.log(err);
      }
      res.redirect("/");
    });
  } else {
    List.findOneAndUpdate(
      { name: listTitle },
      { $pull: { items: { _id: req.body.checkbox } } },
      function (err, foundList) {
        if (err) {
          console.log(err);
        }
        res.redirect(listTitle);
      }
    );
  }
});

app.get("/:listName", function (req, res) {
  const listName = _.capitalize(req.params.listName);
  const list = new List({
    name: listName,
    items: defaultItems,
  });

  List.findOne({ name: listName }, function (err, foundList) {
    if (foundList === null) {
      list.save().then(function () {
        res.redirect(listName);
      });
    } else {
      res.render("list", {
        listTitle: listName,
        newItems: foundList.items,
      });
    }
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Server started successfully')
})
