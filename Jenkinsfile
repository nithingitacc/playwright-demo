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
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    bat 'npx playwright test'
                }
            }
        }

        stage('Publish JUnit Report') {
            steps {
                junit 'test-results/results.xml'
            }
        }

        stage('Publish Report to Nginx') {
            steps {
                bat '''
                xcopy /E /I /Y playwright-report D:\\Devops\\nginx\\html\\playwright-report
                '''
            }
        }

        stage('Playwright Report URL') {
            steps {
                echo '=================Enclosed Link to View Playwright Report============================='
                echo '✅ Playwright HTML Report (Nginx Hosted):'
                echo '👉 http://localhost/playwright-report/index.html'
                echo '=================Enclosed Link to View Playwright Report============================='
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**/*, test-results/**/*',
                             allowEmptyArchive: true
        }
    }
}
