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
    }

    post {
        always {

            // ✅ Publish JUnit results
            junit 'test-results/results.xml'

            // ✅ Publish Playwright HTML Report
            publishHTML(target: [
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report',
                keepAll: true,
                alwaysLinkToLastBuild: true,
                allowMissing: false
            ])

            // ✅ Archive screenshots, videos, traces
            archiveArtifacts artifacts: 'test-results/**, playwright-report/**', allowEmptyArchive: true
        }
    }
}
