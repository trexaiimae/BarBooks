pipeline {
    agent any  // Run on Jenkins node/container directly

    stages {
        stage('Prepare Workspace') {
            steps {
                // Clean the workspace to avoid permission issues
                cleanWs()
            }
        }

        stage('Checkout') {
            steps {
                // Checkout code after cleaning workspace
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
                // Run Cypress and fail the build if tests fail
                sh '''
                    xvfb-run -a npx cypress run --headless --project $WORKSPACE
                    if [ $? -ne 0 ]; then
                        echo "Cypress tests failed"
                        exit 1
                    fi
                '''
            }
        }

        stage('Generate Mochawesome Report') {
            steps {
                // Don't fail pipeline if report scripts fail
                sh 'npm run report:merge || true'
                sh 'npm run report:generate || true'
            }
        }

        stage('Archive Reports') {
            steps {
                archiveArtifacts artifacts: 'cypress/reports/**/*', allowEmptyArchive: true
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
