pipeline {
    agent any  // Run on Jenkins node/container directly

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
                // Use xvfb-run with $WORKSPACE to run headless tests in Jenkins
                sh 'xvfb-run -a npx cypress run --headless --project $WORKSPACE'
            }
        }

        stage('Generate Mochawesome Report') {
            steps {
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
    }
}
