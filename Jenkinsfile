pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '''
                npm ci
                npx playwright install --with-deps
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Reporters are controlled ONLY via playwright.config.ts
                bat '''
                npx playwright test
                '''
            }
        }

        stage('Publish Test Results (JUnit)') {
            steps {
                // Jenkins-native test reporting (safe & supported)
                junit 'test-results/results.xml'
            }
        }
    }

    post {
        always {
            // Archive Playwright HTML report for download
            archiveArtifacts artifacts: 'playwright-report/**/*',
                             allowEmptyArchive: true

            // Optional: archive raw test artifacts
            archiveArtifacts artifacts: 'test-results/**/*',
                             allowEmptyArchive: true
        }

        failure {
            echo '❌ Playwright tests failed. Check JUnit results and HTML report artifacts.'
        }

        success {
            echo '✅ Playwright tests passed successfully.'
        }
    }
}
