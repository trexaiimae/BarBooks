pipeline {
    agent {
        docker {
            image 'cypress/base:16'       // Cypress Docker image with Node and dependencies
            args '-v /dev/shm:/dev/shm'   // Optional: improves Cypress performance
        }
    }

    environment {
        CYPRESS_CACHE_FOLDER = '/root/.cache/Cypress'  // Optional: cache Cypress
    }

    stages {
        stage('Checkout') {
            steps {
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
                // Run Cypress headless inside Docker
                sh 'npx cypress run --headless --project $PWD'
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
                // Archive Mochawesome reports
                archiveArtifacts artifacts: 'cypress/reports/**/*', allowEmptyArchive: true
                // Archive screenshots of failed tests
                archiveArtifacts artifacts: 'cypress/screenshots/**/*', allowEmptyArchive: true
                // Archive videos of test runs
                archiveArtifacts artifacts: 'cypress/videos/**/*', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished'
        }
    }
}
