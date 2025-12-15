pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'playwright-tests'
        DOCKER_CONTAINER = 'playwright-container'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        /*
        ======================================================
        OPTION A: Run Playwright DIRECTLY on Jenkins node
        ======================================================
        */
/*
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

*/       /* 
        ======================================================
        OPTION B: Run Playwright INSIDE DOCKER (Enable later)
        ======================================================
        */
        stage('Docker Build Image') {
            steps {
                bat '''
                docker build -t %DOCKER_IMAGE% .
                '''
            }
        }

        stage('Run Tests in Docker') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    bat '''
                    docker run --rm ^
                      -v "%cd%\\playwright-report:/app/playwright-report" ^
                      -v "%cd%\\test-results:/app/test-results" ^
                      %DOCKER_IMAGE%
                    '''
                }
            }
        }
        /**/

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
                echo '================= Playwright HTML Report ================='
                echo '👉 http://localhost/playwright-report/index.html'
                echo '=========================================================='
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
