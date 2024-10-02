const { DynamoDB } = require("@aws-sdk/client-dynamodb");

exports.handler = async function (event) {
  console.log("request:", JSON.stringify(event, undefined, 2));

  // Create AWS SDK clients
  const dynamo = new DynamoDB();

  const body = JSON.parse(event.body);

  const params = {
    TableName: process.env.CUSTOMERS_TABLE_NAME,
    Item: {
      customerId: { S: body.customerId },
      name: { S: body.name },
      email: { S: body.email },
    },
  };

  try {
    await dynamo.putItem(params);
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Cliente criado com sucesso!' }),
    };
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao criar cliente', error }),
    };
  }
};

