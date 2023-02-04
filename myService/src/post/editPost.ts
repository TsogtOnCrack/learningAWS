import { DynamoDB, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { REGION } from "../var/region";

const db = new DynamoDB({region:REGION})

export const editPost = async(event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult>=>{

    const params = {
        TableName: "Posts",
        Key: marshall({
            id: event.pathParameters?.id,
        }),
        "UpdateExpression": `set ${event.pathParameters?.tochange} = :val1`,
        "ExpressionAttributeValues":marshall( {
            ":val1": event.pathParameters?.changevalue
        }),
    }

        const data = await db.updateItem(params)
    return{
        statusCode: 200,
        body: JSON.stringify("post was edited")
    }

}