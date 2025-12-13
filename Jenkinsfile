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
                npx playwright test --reporter=html
                '''
            }
        }

        stage('Publish Reports') {
            steps {
                junit 'test-results/**/*.xml'

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
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**/*, test-results/**/*', allowEmptyArchive: true
        }
    }
}
