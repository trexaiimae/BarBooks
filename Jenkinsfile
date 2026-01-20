pipeline {
    agent any

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

        stage('Checkout Barbooks Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/trexaiimae/BarBooks.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Cypress Tests for BarBooks') {
            steps {
                // Fail the build if Cypress tests fail
                sh 'xvfb-run -a npx cypress run --headless --project $CYPRESS_PROJECT || exit 1'
            }
        }

        stage('Generate Mochawesome Report') {
            steps {
                // Don't fail pipeline if report scripts fail
                sh 'npm run report:merge || true'
                sh 'npm run report:generate || true'
            }
        }

        stage('Archive Reports and Media') {
            steps {
                archiveArtifacts artifacts: 'cypress/reports/**/*', allowEmptyArchive: true
                archiveArtifacts artifacts: 'cypress/screenshots/**/*', allowEmptyArchive: true
                archiveArtifacts artifacts: 'cypress/videos/**/*', allowEmptyArchive: true

                // Optional alternative paths
                archiveArtifacts artifacts: 'Cypress-Demo/cypress/reports/**/*', allowEmptyArchive: true
                archiveArtifacts artifacts: 'Cypress-Demo/cypress/screenshots/**/*', allowEmptyArchive: true
                archiveArtifacts artifacts: 'Cypress-Demo/cypress/videos/**/*', allowEmptyArchive: true
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
            echo 'Some stages failed. deployment stop!'
        }
    }
}
