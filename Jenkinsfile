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

        stage('Run Cypress Tests in Docker') {
            steps {
                script {
                    // run everything inside cypress/included docker
                    docker.image('cypress/included:12.12.0').inside {
                        sh 'npm install'
                        sh 'npm run runAll_CI'
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
