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
                    alwaysLinkToLastBuild: true,
                    allowMissing: false,
                    includes: '**/*'
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
            // Keep raw artifacts if needed
            archiveArtifacts artifacts: 'playwright-report/**/*, test-results/**/*', allowEmptyArchive: true
        }
    }
}
