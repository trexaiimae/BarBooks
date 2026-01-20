pipeline {
    agent any

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
                sh 'xvfb-run -a npx cypress run --headless --project $WORKSPACE'
            }
        }

        stage('Generate Mochawesome Report') {
            steps {
                sh 'npm run report:merge || true'
                sh 'npm run report:generate || true'
            }
        }

        stage('Archive Reports and Media') {
            steps {
                archiveArtifacts artifacts: 'cypress/reports/**/*', allowEmptyArchive: true
                archiveArtifacts artifacts: 'cypress/screenshots/**/*', allowEmptyArchive: true
                archiveArtifacts artifacts: 'cypress/videos/**/*', allowEmptyArchive: true

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
    }
}
