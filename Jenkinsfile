pipeline {
  // Use 'any' agent correctly
  agent any 

  environment {
    // FRONTEND Application ID for Dokploy (Your retrieved ID)
    APP_ID = "yz9xW_7ZSmNsSiknvDctq"
  }

  parameters {
    string(name: 'DEPLOY_URL_CRED_ID', defaultValue: 'DEPLOY_URL', description: 'Credentials ID for the deployment URL (Secret Text)')
    string(name: 'DEPLOY_KEY_CRED_ID', defaultValue: 'DEPLOY_KEY', description: 'Credentials ID for the deployment API key (Secret Text)')
    
    // Parameter to pass the Backend API URL (Your Dokploy server IP)
    // NOTE: Port 8000 is used because that's where Django runs inside the container
    string(name: 'VITE_CANDIDATES_ENDPOINT', 
           defaultValue: 'http://65.0.68.233:8000/api/candidates/', 
           description: 'Endpoint for candidates API used by the frontend')
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Setup .env') {
      steps {
        // FIX: Writes the backend URL parameter directly into the .env file
        sh "echo 'VITE_CANDIDATES_ENDPOINT=${params.VITE_CANDIDATES_ENDPOINT}' > .env"
        sh 'echo ".env created with VITE_CANDIDATES_ENDPOINT"'
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm install' 
      }
    }
    
    stage('Run tests') {
      steps {
        sh 'npm test -- --run'
      }
    }

    // New stage to build the production files
    stage('Build Application') {
      steps {
        sh 'npm run build'
      }
    }
  }

  post {
    success {
      echo "✅ Tests passed, triggering deployment API..."
      withCredentials([
        string(credentialsId: params.DEPLOY_URL_CRED_ID, variable: 'DEPLOY_URL'),
        string(credentialsId: params.DEPLOY_KEY_CRED_ID, variable: 'DEPLOY_KEY')
      ]) {
        sh '''
          json_payload=$(printf '{"applicationId":"%s"}' "$APP_ID")
          curl -fS -X POST \
            "$DEPLOY_URL" \
            -H 'accept: application/json' \
            -H 'Content-Type: application/json' \
            -H "x-api-key: $DEPLOY_KEY" \
            --data-binary "$json_payload" \
            -w "\nHTTP %{http_code}\n"
        '''
      }
      mail to: 'xaioene@gmail.com',
          subject: "Jenkins Success: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
          body: "Deployment API was triggered successfully for the Frontend."
    }
    failure {
      mail to: 'xaioene@gmail.com',
          subject: "Jenkins Failure: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
          body: "Frontend pipeline failed. Check console output for details."
    }
  }
}
