# expression-calculator
Web Service performing a simple equation calculation
==============================================

To see the web service in action please use: 
https://g8fd2787c5.execute-api.us-east-2.amazonaws.com/Prod/calculate?query=[input]

The input shall be base64 encoded utf-8 string. For example:

Original query: 2 * (23/(33))- 23 * (23)
With encoding: MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk


To start:
npm install
node app.js

To test:
npm test

Dependencies explanation:
{
    "express": "to handle the REST API",
    "mathjs-expression-parser": "lightweight version of mathjs to calculate the mathematical expression",
    "request": "to test the API with mocha",
    "mocha" : "testing framework",
    "express-session": "use session to store user language option",
    "cookie-parser": "to edit cookie object in user session",
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

Getting Started
---------------

These directions assume you want to develop on your local computer or a Cloud9 environment.

To work on the sample code, you'll need to clone your project's repository to your
local computer. If you haven't, do that first. You can find instructions in the
AWS CodeStar user guide.

1. Install Node.js on your computer.  For details on available installers visit
   https://nodejs.org/en/download/. If you're using a Cloud9 environment, Node.js is already installed.

2. Install NPM dependencies:

        $ npm install
        
3. Install the SAM CLI. For details visit 
https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html.

4. Start the development server:

        $ sam local start-api -p 8080

5. Open http://127.0.0.1:8080/ in a web browser to view your service.

What Do I Do Next?
------------------

If you have checked out a local copy of your repository you can start making
changes to the sample code.  We suggest making a small change to app.js first,
so you can see how changes pushed to your project's repository are automatically
picked up by your project pipeline and deployed to AWS Lambda and Amazon API Gateway.
(You can watch the pipeline progress on your AWS CodeStar project dashboard.)
Once you've seen how that works, start developing your own code, and have fun!

To run your tests locally, go to the root directory of the
sample code and run the `npm test` command, which
AWS CodeBuild also runs through your `buildspec.yml` file.

To test your new code during the release process, modify the existing tests or
add tests to the tests directory. AWS CodeBuild will run the tests during the
build stage of your project pipeline. You can find the test results
in the AWS CodeBuild console.

Learn more about AWS CodeBuild and how it builds and tests your application here:
https://docs.aws.amazon.com/codebuild/latest/userguide/concepts.html

Learn more about AWS Serverless Application Model (AWS SAM) and how it works here:
https://github.com/awslabs/serverless-application-model/blob/master/HOWTO.md

AWS Lambda Developer Guide:
http://docs.aws.amazon.com/lambda/latest/dg/deploying-lambda-apps.html

Learn more about AWS CodeStar by reading the user guide, and post questions and
comments about AWS CodeStar on our forum.

User Guide: http://docs.aws.amazon.com/codestar/latest/userguide/welcome.html

Forum: https://forums.aws.amazon.com/forum.jspa?forumID=248

What Should I Do Before Running My Project in Production?
------------------

AWS recommends you review the security best practices recommended by the framework
author of your selected sample application before running it in production. You
should also regularly review and apply any available patches or associated security
advisories for dependencies used within your application.

Best Practices: https://docs.aws.amazon.com/codestar/latest/userguide/best-practices.html?icmpid=docs_acs_rm_sec
