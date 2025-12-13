pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test'
            }
        }

        stage('Publish Reports') {
            steps {
                // Publish Playwright HTML Report
                publishHTML(target: [
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright HTML Report',
                    keepAll: true,
                    alwaysLinkToLastBuild: true,
                    allowMissing: false
                ])

                // Publish JUnit results
                junit 'test-results/**/*.xml'
            }
        }

        /*
        ===============================
        DOCKER (ENABLE LATER)
        ===============================
        stage('Build Docker Image') {
            steps {
                bat 'docker build -t playwright-tests .'
            }
        }

        stage('Run Tests in Docker') {
            steps {
                bat 'docker run playwright-tests'
            }
        }
        */
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
        }
    }
}
