import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb"
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
const client = new DynamoDBClient({region: 'ap-southeast-1'}); 

module.exports.create = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    const params = {
        TableName: "firstDyno", 
        Item: marshall({
            id: event.pathParameters?.userId,
            userName: 'FirstUser',
            age: '20',
            job: 'hckr',
        })
    }; 

    try {
        await client.send(new PutItemCommand(params)); 
    } catch(err) {
        console.log(err); 
    }
    return {
        statusCode: 200,
        body: JSON.stringify(`Successfully created a new user to dynamodb , ID: ${event.pathParameters?.userId}`)
    }
}; 

//create completed ,2nd mission: i want to get specific user and also wanna see what it gives in my response body, 3rd mission i want to delete specific user id cos i ain't like that user , 4th mission: lastly i want to update my userName but HOW XD"  