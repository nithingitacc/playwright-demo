pipeline {
    agent any

    stages {

        stage('Checkout') {
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

        stage('Run Tests') {
            steps {
                // Allow pipeline to continue even if tests fail
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    bat 'npx playwright test'
                }
            }
        }

        stage('Publish Reports') {
            steps {

                // ✅ JUnit report (pass/fail, trends)
                junit 'test-results/results.xml'

                // ✅ Playwright HTML report (folder-based SPA)
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

        stage('Publish Report to Nginx') {
            steps {
                bat '''
                xcopy /E /I /Y playwright-report D:\\Devops\\nginx\\html\\playwright-report
                '''
            }
        }
    }

    post {
        always {
            // Preserve raw artifacts for audit/debugging
            archiveArtifacts artifacts: 'playwright-report/**/*, test-results/**/*',
                             allowEmptyArchive: true
        }
    }
}
