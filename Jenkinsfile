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
                bat '''
                npm install
                npx playwright install
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat '''
                npx playwright test
                '''
            }
        }

        stage('Publish Reports') {
            steps {

                // ✅ Publish JUnit XML (for test trend & pass/fail)
                junit 'test-results/**/*.xml'

                // ✅ Publish Playwright HTML report (FULL folder, not just index.html)
                publishHTML(target: [
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright HTML Report',
                    keepAll: true,
                    alwaysLinkToLastBu
