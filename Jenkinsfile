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
                sh 'npm install'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                // Run all Cypress tests using your npm script
                sh 'npm run runAll_CI'
            }
        }

        stage('Merge & Generate Mochawesome Report') {
            steps {
                sh 'npm run report:merge'
                sh 'npm run report:generate'
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
