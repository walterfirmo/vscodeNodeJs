const { request } = require('express');
const { response } = require('express');
const express = require('express');
const router = express.Router();
const db = require("../db");

/* GET home page. */
router.get('/', function(req, res, next) {
  db.findCustomers()
    .then(customers => {
      //console.log(customers);
      res.render("index", {title: "Express", customers});
    })
    .catch(error => console.log(error));
  
});

router.get('/new', (request, response) => {
  response.render("customer", {title: "Cadastro de Cliente", customer: {}});
})

router.get('/edit/:customerId', (request, response) => {
  const id = request.params.customerId;
  db.findCustomer(id)
    .then(customer => response.render("customer", {title: "Edição de Cadastro", customer}))
    .catch(error => console.log (error));
})

router.post('/new', (request, response) => {
  if(!request.body.nome) 
    return response.redirect("/?error=O campo nome é obiratório!");

  if (request.body.idade && !/[0-9]+/.test(request.body.idade))
  return response.redirect("/new?error=O campo idade é numérico!");

  const id = request.body.id;
  const nome = request.body.nome;
  const idade = parseInt(request.body.idade);
  const cidade = request.body.cidade;
  const uf = request.body.uf.length > 2 ? '' : request.body.uf;

  const customer = {nome, idade, cidade, uf};
  const promise = id ? db.updateCustomer(id, customer)
                     : db.insertCustomer(customer);

  promise
    .then(result => {
      response.redirect("/");
    })
    .catch(error => {
      return console.log(error);
    })

})

module.exports = router;
