pipeline {
    agent any

    environment {
        IMAGE_NAME     = 'playwright-tests'
        CONTAINER_NAME = 'pw-container'
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

        stage('Run Playwright Tests (Local)') {
            steps {
                bat 'npx playwright test'
            }
        }

        stage('Archive Test Reports') {
            steps {
                junit 'test-results/results.xml'
                archiveArtifacts artifacts: 'test-results/**', fingerprint: true
            }
        }

        /*
        ================================
        🐳 DOCKER PIPELINE (DISABLED)
        ================================

        stage('Build Docker Image') {
            steps {
                bat "docker build -t ${IMAGE_NAME} ."
            }
        }

        stage('Run Tests in Docker') {
            steps {
                bat """
                docker run --name ${CONTAINER_NAME} ^
                -v %CD%\\test-results:/app/test-results ^
                ${IMAGE_NAME}
                """
            }
        }
        */
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true

            /*
            🔽 Enable only when Docker is active
            bat "docker rm -f ${CONTAINER_NAME} || exit 0"
            */
        }
    }
}
