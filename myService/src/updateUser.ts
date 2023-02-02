import { marshall } from "@aws-sdk/util-dynamodb"
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { DynamoDBClient, DynamoDB ,GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb"
import { QueryCommand } from "@aws-sdk/client-dynamodb";

// const client = new DynamoDBClient({region: 'ap-southeast-1'}); 
const db = new DynamoDB({region: 'ap-southeast-1'}); 

export const update = async (event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult> => {
    


    const params = {
        TableName: "firstDyno",
        Key: marshall({
            id: event.pathParameters?.id
        }),
        AttributeUpdates: marshall({
            name:"tsogt1111",
        })
    };

    const data = await db.updateItem(params)

    return {
        statusCode: 200,
        body: JSON.stringify(data)

        
    }


}

