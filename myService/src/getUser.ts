import { marshall } from "@aws-sdk/util-dynamodb"
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { DynamoDBClient, GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb"
import { QueryCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({region: 'ap-southeast-1'}); 
let data: any;

module.exports.get = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const params = {
        TableName: "firstDynamo",
        Key: marshall({
            id: event.pathParameters?.userId
        })
    }; 

    try {
         data = await client.send(new GetItemCommand(params)); 
      } catch (err) {
        console.error(err);
      }
    return{
        statusCode: 200,
        body: JSON.stringify(`Here is your user data: ${data}`)
    }; 
};