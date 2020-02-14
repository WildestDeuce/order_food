const express = require('express');

const bodyparser = require('body-parser');

const app = express();

const port = process.env.PORT || 3200;

const orders = [{food_name:'chicken pot pie', customer_name:'Charles', food_qty:'2'}];

//middleware

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended:false }));

//API get method to get all food orders
app.get('/get_orders', (req, res) => {
  res.status(200).send(orders);
});

//API post method accepts and validates incoming data then pushes it to order array
app.post('/new_order', (req, res) => {
 const order = req.body;

 if (order.food_name && order.customer_name && order.food_qty) {
   orders.push({
     ...order,
     id: `${orders.lenght + 1}`,
     date: Date.now().toString()
   });

   res.status(200).json({
     message: 'Order created successfully'
   });
 } else {
   res.status(404).json({
     message: 'Invalid Order creation'
   });
 }

});

//API patch method to partially update data

app.patch('/order/:id', (req, res) => {
  const order_id = req.params.id;
  const order_update = req.body;

  for(let order of orders) {
    if (order.id == order_id) {
      if (order_update.food_name != null || undefined)
      order.food_name = order_update.food_name;

      if (order_update.food_qty != null || undefined)
      order.food_qty = order_update.food_qty;

      if(order_update.customer_name != null || undefined)
      order.customer_name = order_update.customer_name;

      return res
      .status(200)
      .json({ message: 'Updated Successfully', data: order});
    }
  }
  res.status(404).json({message: 'Invalid Order ID'});
})

// API delete method to delete an order based on the id of that order

app.delete('/order/:id', (req, res) => {
  const order_id = req.params.id;

  for( let order of orders) {
    if (order.id == order_id) {
      orders.splice(orders.indexOf(order), 1);

      return res.send(200).json({
        message: 'Deleted Successfully'
      });
    }
  }
res.status(404).json({message: 'Invalid Order ID'});
});

//server notification
app.listen(port, () => {
  console.log(`running at port ${port}`)
});
