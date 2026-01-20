pipeline {
    agent any

    environment {
        REPORT_DIR = 'cypress/reports'
    }

    stages {
        stage('Checkout BarBooks') {
            steps {
                git branch: 'main', url: 'https://github.com/trexaiimae/BarBooks.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install npm dependencies on the host (inside Jenkins container)
                sh 'npm install'
            }
        }

        stage('Run Cypress Tests in Docker') {
            steps {
                script {
                    // Use host Docker to run Cypress inside the Cypress Docker image
                    docker.image('cypress/included:12.12.0').inside {
                        // Run your npm script
                        sh 'npm run runAll_CI'
                        // Merge and generate Mochawesome reports
                        sh 'npm run report:merge'
                        sh 'npm run report:generate'
                    }
                }
            }
        }

        stage('Archive Mochawesome Reports') {
            steps {
                archiveArtifacts artifacts: 'cypress/reports/**/*', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished'
        }
    }
}
