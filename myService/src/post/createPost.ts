import { DynamoDB, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { ContinuationEventFilterSensitiveLog } from "@aws-sdk/client-s3";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { REGION } from "../var/region";

const db = new DynamoDB({region: REGION})


export const makePost = async(event:APIGatewayProxyEvent):Promise<APIGatewayProxyResult>=>{

    const params = {
        TableName: "Posts",
        Item: marshall({
            title: event.pathParameters?.title,
            content: "this would be the content",
            author: event.pathParameters?.author,
            date: new Date().toISOString(),
            id: event.pathParameters?.id,

        })
    }

    try{
        await db.send(new PutItemCommand(params));
    }catch(err){console.log(err)}

    return {
        statusCode: 200,
        body: JSON.stringify("you just make a post.")
    }

}