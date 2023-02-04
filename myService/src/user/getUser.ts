import { marshall } from "@aws-sdk/util-dynamodb"
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { DynamoDBClient, DynamoDB ,GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb"
import { QueryCommand } from "@aws-sdk/client-dynamodb";

// const client = new DynamoDBClient({region: 'ap-southeast-1'}); 
const db = new DynamoDB({region: 'ap-southeast-1'}); 

export const get = async (event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult> => {
    console.log(event.pathParameters?.userId)
    const params = {
        TableName: "firstDyno",
        Key: marshall({
            id: event.pathParameters?.userId
        })
    }; 




    try {
        const data = await db.getItem(params)
        console.log('data', data, data?.Item)
        return {
            statusCode: 200,
            body: JSON.stringify(data?.Item)
        }
    } catch (err) {
        console.log(err)
        return err;
    }
    
};