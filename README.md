# expression-calculator
Web-Service performing a simple equation calculation
---------------------

To see the web service in action please use:

        https://g8fd2787c5.execute-api.us-east-2.amazonaws.com/Prod/calculus?query=[input]

The input shall be base64 encoded utf-8 string. For example:

 - Expression: 5 + 2 * (4 - 3) -> With encoding: NSArIDIgKiAoNCAtIDMp

Full example request: 

        curl https://g8fd2787c5.execute-api.us-east-2.amazonaws.com/Prod/calculus?query=NSArIDIgKiAoMyAtIDQp

Expected result:

        {
            "error": "false",
            "result": "3"
        }

In case no query parameter or invalid parameter is given as input, the following result will be returned:

        https://g8fd2787c5.execute-api.us-east-2.amazonaws.com/Prod/calculus?query====

        {
            "error": "true",
            "message": "Calculation error: Invalid expression passed as query."
        }


To start the server at localhost:3939

        npm install

        node app.js



To execute the tests (please stop the server first):

        npm test

The to test the server with docker at localhost:49160 run:
        docker build -t eyesfree/expression-calculator .
        docker run -p 49160:3939 -d eyesfree/expression-calculator




Deployment
-----------------
The app is deployed as serverless web-service lambda expression on AWS.
It was created with CodeStar, it's build is configured with the buildspec.yml and it's deployment is configured by the template.yml file. 
The source code build is automatically triggered on push on the master branch. If it succeeds then an artifact is deployed on the Amazon S3 Bucket. 


Dependencies explanation:
----------------
        {
            "express": "to handle the REST API",
            "mathjs-expression-parser": "light version of calculation lib mathjs",
            "request": "to test the API with mocha",
            "mocha" : "testing framework",
            "helmet": "security shield",
            "aws-serverless-express": "integration with aws",
            "i18n": "light-weight i18n translation module"
        }


Files
-----------

This project includes:

* README.md - this file
* buildspec.yml - this file is used by AWS CodeBuild to package your
  service for deployment to AWS Lambda
* app.js - this file contains the sample Node.js code for the web service
* index.js - this file contains the AWS Lambda handler code
* template.yml - this file contains the AWS Serverless Application Model (AWS SAM) used
  by AWS CloudFormation to deploy your service to AWS Lambda and Amazon API
  Gateway.
* tests/ - this directory contains unit tests for your application
* template-configuration.json - this file contains the project ARN with placeholders used for tagging resources with the project ID
* locales - i18n messages files
