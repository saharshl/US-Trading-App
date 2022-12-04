const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const bankAcct = req.body.bankAcct;
  const password = req.body.password;
  const wallet=0;
  const newUser = new User({username,bankAcct,password,wallet});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/:id').post((req,res) => {
  User.findById(req.params.id)
  .then(user => {
    user.wallet = req.body.wallet;
  
    user.save()
      .then(() => res.json('Wallet updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/stock/:id').post((req,res) => {
  var check=1;
  User.findById(req.params.id)
  .then(user => {

    user.stocks.map(stock=>{
      if(stock.name===req.body.stock.name){
        stock.quantity=stock.quantity+req.body.stock.quantity;
        check=0;
      }
    })
    if(check===1){
    user.stocks.push(req.body.stock);}
    
    user.save()
      .then(() => res.json('Stock updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').post((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.stocks.map(stock=>{
        if(stock.name===req.body.name){
          var index=user.stocks.indexOf(stock);
          user.stocks.splice(index,1);
          return;
        }
      })
      user.save()
      .then(() => res.json('Stock deleted!'))
      .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;