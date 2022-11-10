# Build & Deploy SAPUI5 Freestyle Applications to SAP BTP, Cloud Foundry Environment
[![REUSE status](https://api.reuse.software/badge/github.com/SAP-samples/ui5-deployments)](https://api.reuse.software/info/github.com/SAP-samples/ui5-deployments)
## Intro
This repo aims to showcase a simple UI5 freestyle application that can be deployed to SAP BTP, Cloud Foundry Environment with:
- Managed approuter setup
- Standalone approuter setup
- Hybrid setup

<img width="1262" alt="" src="https://user-images.githubusercontent.com/7225881/199363555-10de43ac-80c9-493f-b849-b7675b7c1df3.png">

A full explanation can be found in this [SAP Community blog post](https://blogs.sap.com/2022/11/01/build-and-deploy-ui5-freestyle-applications-to-sap-btp-cloud-foundry-environment/).

## Requirements
- Access to a SAP BTP subaccount (trial is sufficient)
- Cloud foundry environment provisioned
- Launchpad, Workzone, or comparable subscription with managed approuter functionality
- Quota for the HTML5 Application Repository Service
- Developer-Access to a CF Space
- SAP Business Application Studio Subscription or comparable local IDE like VSCode
- CF CLI & Node available locally on your machine or in BAS dev space

## Build Steps
Run the mbt build command with either of the mta.yaml files either directly or via the npm scripts in the root package.json:
- mbt build -p=cf -s=./_build_standalone -t=../mta_archives
- mbt build -p=cf -s=./_build_managed -t=../mta_archives

More info: https://sap.github.io/cloud-mta-build-tool/usage/

### Standalone mta
- This will generate an mtar that includes a standalone approuter that will be deployed together with the html5 module
- This way you have full control of your approuter

### Managed mta
- This will generate an mtar which will leverage the managed approuter for running after deployment
- This will only work if you have subscribed to a service that includes the managed approuter functionality (launchpad/portal/workzone)

## Deploy Steps
Enable cf deploy and cf undeploy commands (see also [multiapps-cli-plugin](https://github.com/cloudfoundry/multiapps-cli-plugin))
- cf install-plugin multiapps

Login to your preferred BTP Cloud Foundry Space & deploy the MTAR archives
- cf login
- cf deploy ./mta_archives/ui5-standalone_1.0.0.mtar -f
- cf deploy ./mta_archives/ui5-managed_1.0.0.mtar -f

In case of undeploy, you can undeploy the mta projects completely using:
- cf undeploy ui5-standalone --delete-services --delete-service-keys
- cf undeploy ui5-managed --delete-services --delete-service-keys

## After Deployment
### Verify service instances and application
Make sure that all service instances and the cf application for the standalone scenario have been deployed successfully
<img width="745" alt="" src="https://user-images.githubusercontent.com/7225881/198842721-d778ec3c-3554-43b6-a816-c7e02461f1f8.png">

### Verify html5 app content in html5 application repository
Make sure that the html5 module content has been uploaded successfully in the html5 app repo host service instance
- cf html5-list & cf html5-info
<img width="954" alt="" src="https://user-images.githubusercontent.com/7225881/198842691-d98165f0-ab18-4ff4-8f4d-bdf1439b0bca.png">

More info: https://sap.github.io/cf-html5-apps-repo-cli-plugin/

### Authorize
- map the generated user role templates to a role collection and assign it to your endusers
<img width="805" alt="" src="https://user-images.githubusercontent.com/7225881/198842657-9e5a4867-d863-450c-a31d-e7f3b818205d.png">

### Execute
run the app either via
- the custom route of the approuter (standalone) 
- the html5 applications tab on the left (managed - requires a a managed approuter e.g. from launchpad service)

## Further Topics
### Testing the app within BAS
- Navigate to the html5module folder and execute npm run start
- The ui5.yaml is used to proxy the requests via pathmapping (substitutes the xs-app files)
- (Needs to be maintained on same subaccount as BAS instance - see comments in ui5.yaml)

## How to obtain support
[Create an issue](https://github.com/SAP-samples/<repository-name>/issues) in this repository if you find a bug or have questions about the content.
 
For additional support, [ask a question in SAP Community](https://answers.sap.com/questions/ask.html).

## Contributing
If you wish to contribute code, offer fixes or improvements, please send a pull request. Due to legal reasons, contributors will be asked to accept a DCO when they create the first pull request to this project. This happens in an automated fashion during the submission process. SAP uses [the standard DCO text of the Linux Foundation](https://developercertificate.org/).

## Code of Conduct
The [SAP-samples CoC](https://github.com/SAP-samples/.github/blob/main/CODE_OF_CONDUCT.md) applies.

## License
Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSE) file.
