pipeline {
    agent any

    stages {
        stage('Prepare Workspace') {
            steps {
                // Clean workspace to avoid permission issues
                cleanWs()
            }
        }

        stage('Checkout Repo A (BarBooks)') {
            steps {
                git branch: 'main', url: 'https://github.com/trexaiimae/BarBooks.git'
            }
        }

        stage('Checkout Repo B (Cypress-Demo)') {
            steps {
                // Optional: check out into a subfolder so it doesn't mix with BarBooks files
                dir('Cypress-Demo') {
                    git branch: 'main', url: 'https://github.com/trexaiimae/Cypress-Demo.git'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Cypress Tests for BarBooks') {
            steps {
                // Run Cypress tests for BarBooks repo
                sh 'xvfb-run -a npx cypress run --headless --project $WORKSPACE'
            }
        }

        stage('Run Cypress Tests for Cypress-Demo') {
            steps {
                // Run Cypress tests from Repo B inside its own folder
                dir('Cypress-Demo') {
                    sh 'xvfb-run -a npx cypress run --headless --project $WORKSPACE'
                }
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
