const { randomUUID } = require("crypto");
const express = require("express");
const morgan = require("morgan");
const { ppid } = require("process");

const app = express();

// Fake database:
const customersFakeDB = [];

// Middlewares:
app.use(express.json());
app.use(morgan("dev"));

// app.use(verifyIfExistsAccountCPF); todos as rotas executaria esse middleware previamente.
function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers;

  const customer = customersFakeDB.find((customer) => customer.cpf === cpf);

  if (!customer)
    return response.status(404).json({
      error: "Customer not found 🎃",
    });

  request.customer = customer;

  return next();
}

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === "credit") {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0);

  return balance;
}

// Routes:
app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = customersFakeDB.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists)
    return response.status(400).json({ error: "Customer already exists 🎃" });

  customersFakeDB.push({
    id: randomUUID(),
    cpf,
    name,
    statement: [],
    created_at: new Date(),
    updated_at: new Date(),
  });

  return response.status(201).send();
});

app.get("/statement", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  return response.status(200).json(customer.statement);
});

app.get("/statement/date", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  const { date } = request.query;

  const dateFormat = new Date(date + " 00:00");

  const statement = customer.statement.filter(
    (statement) =>
      statement.created_at.toDateString() ===
      new Date(dateFormat).toDateString()
  );

  return response.status(200).json(statement);
});

app.post("/deposit", verifyIfExistsAccountCPF, (request, response) => {
  const { description, amount } = request.body;

  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit",
  };

  customer.statement.push(statementOperation);

  return response.status(201).send();
});

app.post("/withdraw", verifyIfExistsAccountCPF, (request, response) => {
  const { amount } = request.body;
  const { customer } = request;

  const balance = getBalance(customer.statement);

  if (balance < amount)
    return response.status(400).json({
      error: "Insufficient funds 🎃",
    });

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: "debit",
  };

  customer.statement.push(statementOperation);

  return response.status(201).send();
});

app.put("/account", verifyIfExistsAccountCPF, (request, response) => {
  const { name } = request.body;
  const { customer } = request;

  customer.name = name;

  return response.status(201).send();
});

app.get("/account", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  return response.status(200).json(customer);
});

app.delete("/account", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  // remove apenas um elemento do array
  customersFakeDB.splice(customer, 1);

  return response.status(200).json(customersFakeDB);
});

app.get("/balance", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  const balance = getBalance(customer.statement);

  return response.status(200).json(balance);
});

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`App running on port ${port}... 💻`);
});
