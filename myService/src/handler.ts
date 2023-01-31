import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";
const client = new S3Client({region: "ap-southeast-1"});  
import { marshall } from "@aws-sdk/util-dynamodb";
let check: boolean = false;
let data: any

module.exports.hello = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const params = {
     Bucket: "coupitsson", 
  }

  // let id = event.pathParameters?.id;

  try {
    // if (id) {
    //   return {
    //      statusCode: 200,
    //      body: JSON.stringify(`My id: ${id}`)
    //   } 
    // }

     data = await client.send(new ListObjectsCommand(params));
  } catch(err) {
     console.log(err); 
  }
  return {
    statusCode: 200,
    body: JSON.stringify({message: `Scanned successfully! , DATA: ${data}`}),
  };
};
