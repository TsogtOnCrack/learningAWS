import { DeleteItemCommand, DynamoDB } from "@aws-sdk/client-dynamodb"
import { marshall } from "@aws-sdk/util-dynamodb"
import { APIGatewayAuthorizerEvent, APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda"
import { REGION } from "../var/region"


const db = new DynamoDB({region:REGION})

export const deleteUser = async (event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult> =>{

    const params ={
        TableName:"firstDyno",
        Key: marshall({
            id: event.pathParameters?.id
        })
    }

    try {
        await db.send(new DeleteItemCommand(params));
        console.log("Success. Item deleted.");
      } catch (err) {
        console.error(err);
      }
    return{
        statusCode: 200,
        body: JSON.stringify("deleted.")
    }
}