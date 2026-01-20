pipeline {
    agent any  // Run on Jenkins node/container directly

    environment {
        CYPRESS_PROJECT = "${WORKSPACE}"
    }

    stages {
        stage('Prepare Workspace') {
            steps {
                // Clean workspace to avoid permission issues
                cleanWs()
            }
        }

        stage('Checkout') {
            steps {
                // Checkout code from GitHub
                git branch: 'main', url: 'https://github.com/trexaiimae/BarBooks.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                // Run Cypress headless inside Xvfb and fail if tests fail
                sh '''
                    xvfb-run -a npx cypress run --headless --project $CYPRESS_PROJECT
                    if [ $? -ne 0 ]; then
                        echo "Cypress tests failed"
                        exit 1
                    fi
                '''
            }
        }

        stage('Generate Mochawesome Report') {
            steps {
                // Merge and generate reports, do not fail if these fail
                sh 'npm run report:merge || true'
                sh 'npm run report:generate || true'
            }
        }

        stage('Archive Reports') {
            steps {
                archiveArtifacts artifacts: 'cypress/reports/**/*', allowEmptyArchive: true
                archiveArtifacts artifacts: 'cypress/screenshots/**/*', allowEmptyArchive: true
                archiveArtifacts artifacts: 'cypress/videos/**/*', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished'
        }
        success {
            echo 'All stages passed!'
        }
        failure {
            echo 'Some stages failed. Deployment stopped!'
        }
    }
}
