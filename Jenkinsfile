pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/trexaiimae/BarBooks.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image from Dockerfile in project root
                    docker.build('barbooks-cypress')
                }
            }
        }

        stage('Run Cypress Tests') {
            steps {
                script {
                    // Run the tests inside the Docker container
                    docker.image('barbooks-cypress').inside {
                        sh 'npx cypress run --headless'
                    }
                }
            }
        }

        stage('Generate Mochawesome Report') {
            steps {
                script {
                    docker.image('barbooks-cypress').inside {
                        // Merge and generate Mochawesome reports
                        sh 'npm run report:merge || true'
                        sh 'npm run report:generate || true'
                    }
                }
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
    }
}
