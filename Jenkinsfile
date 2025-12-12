pipeline {
    agent any

    environment {
        IMAGE_NAME = "playwright-tests"
        CONTAINER_NAME = "pw-container"
    }

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
                bat 'npx playwright test --reporter=junit --output=test-results'
            }
        }

        stage('Archive Test Reports') {
            steps {
                junit 'test-results/**/*.xml'
                archiveArtifacts artifacts: 'test-results/**/*', fingerprint: true
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}
//Docker Version (commented for future use)
        /* 
        stage('Build Docker Image') {
            steps {
                bat "docker build -t ${IMAGE_NAME} ."
            }
        }

        stage('Run Tests in Docker') {
            steps {
                bat """
                docker run --name ${CONTAINER_NAME} ^
                -v %CD%/test-results:/app/test-results ^
                ${IMAGE_NAME}
                """
            }
        }
        */
