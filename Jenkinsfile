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
                // ⚠️ DO NOT override reporters here
                // Reporters are controlled via playwright.config.ts
                bat '''
                npx playwright test
                '''
            }
        }

        stage('Publish Reports') {
            steps {

                // ✅ JUnit report (from playwright.config.ts)
                junit 'test-results/results.xml'

                // ✅ Playwright HTML report (FULL folder)
                publishHTML(target: [
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright HTML Report',
                    keepAll: true,
                    alwaysLinkToLastBuild: true,
                    allowMissing: false
                ])
            }
        }

        /*
        ===============================
        DOCKER (Enable Later)
        ===============================

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t playwright-tests .'
            }
        }

        stage('Run Tests in Docker') {
            steps {
                bat '''
                docker run --rm ^
                -v %cd%\\playwright-report:/app/playwright-report ^
                -v %cd%\\test-results:/app/test-results ^
                playwright-tests
                '''
            }
        }
        */

    }

    post {
        always {
            // Optional: keep raw files for debugging
            archiveArtifacts artifacts: 'playwright-report/**/*, test-results/**/*',
                             allowEmptyArchive: true
        }
    }
}
